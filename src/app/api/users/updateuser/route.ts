import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/verifyToken";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function PUT(req: NextRequest) {
  try {
    let token = (await cookies()).get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Token not found in cookies" },
        { status: 401 }
      );
    }
    const decoded = verifyToken(token);

    const body = await req.json();
    const { email, name, role } = body;

    if (!email && !name && !role) {
      return NextResponse.json(
        { message: "No fields provided for update." },
        { status: 400 }
      );
    }

    const userUpdateData: any = {};

    if (email) userUpdateData.email = email;
    if (name) userUpdateData.name = name;
    if (role) userUpdateData.role = role;

    // Update user data
    const updatedUser = await prisma.user.update({
      where: { id: decoded.id },
      data: userUpdateData,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        courses: true,
      },
    });

    return NextResponse.json({
      message: "User information successfully updated.",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
}

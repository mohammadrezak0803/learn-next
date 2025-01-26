import { verifyToken } from "@/lib/verifyToken";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    let token = (await cookies()).get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Token not found in cookies" },
        { status: 401 }
      );
    }
    const decoded = verifyToken(token);

    if (!decoded?.id) {
      return NextResponse.json(
        { message: "Instructor ID is required." },
        { status: 400 }
      );
    }

    const instructor = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!instructor || instructor.role !== "INSTRUCTOR") {
      return NextResponse.json(
        { message: "Only instructors can access this resource." },
        { status: 403 }
      );
    }

    const courses = await prisma.course.findMany();

    return NextResponse.json({
      message: "Courses retrieved successfully.",
      courses,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Server error. Please try again later." },
      { status: 500 }
    );
  }
}

import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
// import {decodeToken} from '@/helper/authentication';
import { cookies } from "next/headers";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/verifyToken";

const prisma = new PrismaClient();

export async function GET() {
  try {
    let token = (await cookies()).get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Token not found in cookies" },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
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
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {}
}

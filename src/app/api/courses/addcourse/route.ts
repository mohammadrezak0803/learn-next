import { verifyToken } from "@/lib/verifyToken";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
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

    const body = await req.json();
    const { title, description, price, instructorId } = body;

    if (!title || !description || !price || !instructorId) {
      return NextResponse.json(
        { message: "All fields are required and must be valid." },
        { status: 400 }
      );
    }

    const instructor = await prisma.user.findUnique({
      where: { id: instructorId },
    });

    if (!instructor) {
      return NextResponse.json(
        { message: "Instructor not found." },
        { status: 404 }
      );
    }

    if (instructor.role !== "INSTRUCTOR") {
      return NextResponse.json(
        { message: "Only instructors can add courses." },
        { status: 403 } 
      );
    }

    const course = await prisma.course.create({
      data: {
        title,
        description,
        price,
        instructorId,
      },
    });

    return NextResponse.json({
      message: "Course added successfully.",
      course,
    });
  } catch (error) {
    console.error("Error adding course:", error);
    return NextResponse.json(
      { message: "Server error. Please try again later." },
      { status: 500 }
    );
  }
}

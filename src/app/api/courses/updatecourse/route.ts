import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, title, description, price, instructorId } = body;

    // Validate the input
    if (!id || !title || !description || !price || !instructorId) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    // Find the course
    const course = await prisma.course.findUnique({
      where: { id },
    });

    if (!course) {
      return NextResponse.json(
        { message: "Course not found." },
        { status: 404 }
      );
    }

    // Ensure the instructor owns the course
    if (course.instructorId !== instructorId) {
      return NextResponse.json(
        { message: "You are not authorized to update this course." },
        { status: 403 }
      );
    }

    // Update the course
    const updatedCourse = await prisma.course.update({
      where: { id },
      data: {
        title,
        description,
        price,
      },
    });

    return NextResponse.json({
      message: "Course updated successfully.",
      course: updatedCourse,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Server error. Please try again later." },
      { status: 500 }
    );
  }
}

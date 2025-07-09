import { createGuest, getGuest } from "@/app/_lib/data-service";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return Response.json(
        { message: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    const existingGuest = await getGuest(email);
    if (existingGuest) {
      return Response.json(
        { message: "Email already in use" },
        {
          status: 409,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await createGuest({
      email,
      password: hashedPassword,
      fullName: name,
    });

    return Response.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { message: "User could not be created" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const phone = formData.get("phone") as string;
    const image = formData.get("image") as File | null;

    if (!name || !email || !password || !phone || !image) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    const apiFormData = new FormData();
    apiFormData.append("name", name);
    apiFormData.append("email", email);
    apiFormData.append("password", password);
    apiFormData.append("phone", phone);
    apiFormData.append("image", image);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/register`,
      {
        method: "POST",
        body: apiFormData,
      }
    );

    if (!response.ok) {
      throw new Error("Registration failed");
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      user: data.data.user,
      token: data.token,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Registration failed, please try again." },
      { status: 500 }
    );
  }
}

import connectToDatabase from "@/lib/database";
import User from "@/lib/database/models/users";
import { NextRequest, NextResponse } from "next/server";
connectToDatabase();
export async function POST(request: NextRequest) {
  const { clerkId, IGUsername, IGPassword } = await request.json();

  try {
    const user = await User.create({
      clerkId,
      IGUsername,
      IGPassword,
    });
    return NextResponse.json(user, { status: 201 });
  } catch (err) {
    return NextResponse.json(err, { status: 404 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const clerkId = searchParams.get("clerkId");
  try {
    if (!clerkId) {
      return NextResponse.json(
        { error: "clerkId parameter is required" },
        { status: 400 }
      );
    }
    const user = await User.findOne({ clerkId: clerkId });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    return NextResponse.json(err, { status: 505 });
  }
}

import connectToDatabase from "@/lib/database";
import User from "@/lib/database/models/users";
import { NextRequest, NextResponse } from "next/server";
connectToDatabase();
export async function POST(request: NextRequest) {
  const { clerkId, igUsername, igPassword } = await request.json();

  try {
    if (!clerkId || !igUsername || !igPassword) {
      const user = await User.create({
        clerkId,
        igUsername,
        igPassword,
      });
    } else {
      const user = await User.findOneAndUpdate(
        { clerkId },
        { $set: { igUsername, igPassword } }
      );
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
    }
    return NextResponse.json("user created or updated", { status: 201 });
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

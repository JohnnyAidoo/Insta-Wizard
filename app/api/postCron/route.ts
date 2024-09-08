import connectToDatabase from "@/lib/database";
import PostCron from "@/lib/database/models/postCron";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  await connectToDatabase();
  const { clerkId, igUsername, igPassword, imageUrl, scheduledTime, status } =
    await request.json();
  try {
    const post_data = await PostCron.create({
      clerkId,
      igUsername,
      igPassword,
      imageUrl,
      scheduledTime,
      status,
    });
    return Response.json(post_data, { status: 201 });
  } catch (err) {
    Response.json(err, { status: 404 });
  }
  return Response.json("did not send post data to database", { status: 501 });
}

export async function GET(request: NextRequest) {
  await connectToDatabase();

  const { searchParams } = new URL(request.url);
  const clerkId = searchParams.get("clerkId");

  // find all document with status of pending , relating to a specific user
  try {
    const docs = await PostCron.find({
      clerkId: clerkId,
      status: "pending",
    });
    if (docs) {
      return Response.json(docs, { status: 200 });
    } else {
      return Response.json({ error: "No Pending Post" });
    }
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}

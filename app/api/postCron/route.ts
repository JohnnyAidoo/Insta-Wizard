import connectToDatabase from "@/lib/database";
import PostCron from "@/lib/database/models/postCron";
import axios from "axios";
import { NextRequest } from "next/server";
connectToDatabase();
export async function POST(request: NextRequest) {
  const {
    clerkId,
    igUsername,
    igPassword,
    imageUrl,
    scheduledTime,
    easycronId,
    status,
  } = await request.json();

  // create a new post cron document in the database
  try {
    const post_data = await PostCron.create({
      clerkId,
      igUsername,
      igPassword,
      imageUrl,
      scheduledTime,
      easycronId,
      status,
    });
    return Response.json(post_data, { status: 201 });
  } catch (err) {
    Response.json(err, { status: 404 });
  }
  return Response.json("did not send post data to database ...  ", {
    status: 501,
  });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const clerkId = searchParams.get("clerkId");

  // find all document with status of pending , relating to a specific user
  try {
    const docs = await PostCron.find({ clerkId });
    if (docs) {
      return Response.json(docs, { status: 200 });
    } else {
      return Response.json({ error: "No Pending Post" });
    }
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (id) {
    try {
      const item = await PostCron.findById(id);
      if (item) {
        axios.delete(
          `https://api.easycron.com/v1/cron-jobs/${item.easycronId}`,
          {
            headers: { "X-API-Key": "a5b028271620c0f961e8e984336f77cd" },
          }
        );
        // delete the item from the database using its id
        await PostCron.findByIdAndDelete(id);
        return Response.json({ message: "Item Deleted" });
      } else {
        return Response.json({ error: "Item not found" });
      }
    } catch (err: any) {
      return Response.json({ error: err.message }, { status: 500 });
    }
  } else {
    return Response.json({ message: "id is required" }, { status: 404 });
  }
}

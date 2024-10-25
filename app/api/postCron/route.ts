import connectToDatabase from "@/lib/database";
import PostCron from "@/lib/database/models/postCron";
import axios from "axios";
import { NextRequest } from "next/server";

// Initialize database connection once
let isConnected = false;

async function ensureConnection() {
  if (!isConnected) {
    await connectToDatabase();
    isConnected = true;
  }
}

// Increase max duration for Vercel
export const maxDuration = 10;

// Configure runtime for edge compatibility
export const runtime = "nodejs";

// Reusable error handler
const handleError = (error: any) => {
  console.error("API Error:", error);
  return Response.json(
    { error: error.message || "Internal server error" },
    { status: error.status || 500 }
  );
};

export async function POST(request: NextRequest) {
  try {
    await ensureConnection();

    const {
      clerkId,
      title,
      igUsername,
      igPassword,
      imageUrl,
      scheduledTime,
      easycronId,
      status,
    } = await request.json();

    const post_data = await PostCron.create({
      clerkId,
      title,
      igUsername,
      igPassword,
      imageUrl,
      scheduledTime,
      easycronId,
      status,
    });

    if (!post_data) {
      throw new Error("Failed to create post data");
    }

    return Response.json(post_data, { status: 201 });
  } catch (error: any) {
    return handleError(error);
  }
}

export async function GET(request: NextRequest) {
  try {
    await ensureConnection();

    const { searchParams } = new URL(request.url);
    const clerkId = searchParams.get("clerkId");

    if (!clerkId) {
      return Response.json({ error: "ClerkId is required" }, { status: 400 });
    }

    const docs = await PostCron.find({ clerkId })
      .lean() // Converts mongoose documents to plain JS objects (faster)
      .select("-__v") // Exclude version key
      .exec(); // Execute the query

    if (!docs || docs.length === 0) {
      return Response.json({ message: "No posts found" }, { status: 404 });
    }

    return Response.json(docs, { status: 200 });
  } catch (error: any) {
    return handleError(error);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await ensureConnection();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return Response.json({ error: "ID is required" }, { status: 400 });
    }

    const item = await PostCron.findById(id);

    if (!item) {
      return Response.json({ error: "Item not found" }, { status: 404 });
    }

    // Use Promise.all to run operations in parallel
    await Promise.all([
      // Delete from EasyCron
      axios.delete(`https://api.easycron.com/v1/cron-jobs/${item.easycronId}`, {
        headers: { "X-API-Key": "a5b028271620c0f961e8e984336f77cd" },
        timeout: 5000, // 5 second timeout for external API
      }),
      // Delete from database
      PostCron.findByIdAndDelete(id),
    ]);

    return Response.json(
      { message: "Item deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    // Special handling for axios errors
    if (axios.isAxiosError(error)) {
      return Response.json(
        { error: "Failed to delete cron job", details: error.message },
        { status: error.response?.status || 500 }
      );
    }
    return handleError(error);
  }
}

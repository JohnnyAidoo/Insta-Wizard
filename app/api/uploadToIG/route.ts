import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { IgApiClient } from "instagram-private-api";

export async function POST(request: NextRequest) {
  const { igUsername, igPassword, imageUrl, caption, clerkId } =
    await request.json();

  try {
    const ig = new IgApiClient();
    ig.state.generateDevice(igUsername);

    // Fetch image as a buffer using axios
    const imageResponse = await axios.get(imageUrl, {
      responseType: "arraybuffer", // This ensures the image is returned as a buffer
    });
    const imageBuffer = Buffer.from(imageResponse.data);
    console.log(imageResponse);

    await ig.simulate.preLoginFlow();
    const loggedInUser = await ig.account.login(igUsername, igPassword);
    // await ig.simulate.postLoginFlow();

    // Ensure the image buffer is valid before posting
    if (!imageBuffer) {
      throw new Error("Failed to fetch image or image buffer is invalid.");
    }

    // Publish the photo to Instagram
    await ig.publish.photo({
      file: imageBuffer, // Buffer of the image file
      caption: caption, // The caption for the image
    });

    return NextResponse.json(
      { message: "Image posted to Instagram" },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Error posting to Instagram:", err);
    return NextResponse.json(
      { message: "Failed to post image", error: err.message },
      { status: 500 }
    );
  }
}

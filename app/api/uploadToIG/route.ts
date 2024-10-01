import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { get } from "request-promise";
import { IgApiClient } from "instagram-private-api";
import MainURL from "@/app/components/url";

export async function POST(request: NextRequest) {
  const { igUsername, igPassword, imageUrl, caption, clerkId } =
    await request.json();

  try {
    // let IGusername = "speeq.up";
    // let IGpassword = "1752004GRACIOUS";

    const ig = new IgApiClient();
    ig.state.generateDevice(igUsername);

    const imageBuffer = await get({
      url: imageUrl, // random picture with 800x800 size
      encoding: null, // this is required, only this way a Buffer is returned
    });

    const loggedInUser = await ig.account.login(igUsername, igPassword);

    await ig.publish.photo({
      file: imageBuffer,
      caption: caption,
    });

    // Optional: To safely log out or clean up
    // await ig.simulate.postLoginFlow();

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

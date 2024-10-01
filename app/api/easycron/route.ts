import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { url, cron_expression, http_message_body, http_method } =
      await request.json();

    const response = await axios.post(
      "https://api.easycron.com/v1/cron-jobs",
      { url, cron_expression, http_message_body, http_method: "POST" },
      {
        headers: { "X-API-Key": "a5b028271620c0f961e8e984336f77cd" },
      }
    );

    // Return success response with data
    return NextResponse.json(
      { success: true, data: response.data },
      { status: 200 }
    );
  } catch (error: any) {
    // Handle both Axios and general errors
    const errorMessage =
      error.response?.data?.message || error.message || "An error occurred";

    // Return error response
    return NextResponse.json(
      {
        success: false,
        message: errorMessage,
      },
      { status: 400 }
    );
  }
}

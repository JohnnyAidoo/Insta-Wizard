import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { IgApiClient } from "instagram-private-api";
import { readFile } from "fs/promises"; // Using promises version directly
import { join } from "path";

// Configuration constants
const CONFIG = {
  AXIOS_TIMEOUT: 3000,
  MIN_FILE_SIZE: 1024,
  CACHE_MAX_AGE: 30 * 60 * 1000, // 30 minutes
} as const;

// Create a single axios instance with optimized settings
const axiosInstance = axios.create({
  timeout: CONFIG.AXIOS_TIMEOUT,
  responseType: "arraybuffer",
  maxContentLength: 10 * 1024 * 1024, // 10MB max
  headers: { "Accept-Encoding": "gzip,deflate" },
});

// Improved cache implementation with TTL
class InstagramClientCache {
  private cache = new Map<string, { client: IgApiClient; timestamp: number }>();

  async get(username: string, password: string): Promise<IgApiClient> {
    const cacheKey = `${username}-${password}`;
    const cached = this.cache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < CONFIG.CACHE_MAX_AGE) {
      return cached.client;
    }

    const ig = new IgApiClient();
    ig.state.generateDevice(username);
    await Promise.all([
      ig.simulate.preLoginFlow(),
      ig.account.login(username, password),
    ]);

    this.cache.set(cacheKey, { client: ig, timestamp: Date.now() });
    return ig;
  }
}

const igClientCache = new InstagramClientCache();

// Optimized file reading with validation
async function readMediaFile(filePath: string): Promise<Buffer> {
  try {
    const resolvedPath = join(process.cwd(), filePath);
    const buffer = await readFile(resolvedPath);

    if (buffer.length < CONFIG.MIN_FILE_SIZE) {
      throw new Error(`File too small: ${filePath}`);
    }

    return buffer;
  } catch (error) {
    throw new Error(`Media file error: ${(error as Error).message}`);
  }
}

// Main handler with optimized error handling
export async function POST(request: NextRequest) {
  try {
    const { igUsername, igPassword, imageUrl, caption } = await request.json();
    const mediaType = new URL(request.url).searchParams.get("mediaType");

    // Get Instagram client
    const ig = await igClientCache.get(igUsername, igPassword);

    if (mediaType === "reel") {
      // Parallel file reading
      const [video, cover] = await Promise.all([
        readMediaFile("./public/uploads/myVideo.mp4"),
        readMediaFile("./public/uploads/myVideoCover.jpg"),
      ]);

      const publishResult = await ig.publish.video({
        video,
        coverImage: cover,
        caption,
      });

      return NextResponse.json({
        message: "Video posted",
        mediaId: publishResult.media.id,
      });
    } else {
      const imageBuffer = await axiosInstance
        .get(imageUrl)
        .then((response) => Buffer.from(response.data));

      if (!imageBuffer.length) throw new Error("Invalid image");

      await ig.publish.photo({ file: imageBuffer, caption });
      return NextResponse.json({ message: "Image posted" });
    }
  } catch (error) {
    console.error("Instagram post error:", error);
    return NextResponse.json(
      {
        error: (error as Error).message || "Unknown error",
      },
      { status: 500 }
    );
  }
}

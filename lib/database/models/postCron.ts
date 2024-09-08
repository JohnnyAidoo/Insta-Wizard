import { Schema, model, models } from "mongoose";

const PostCronSchema = new Schema({
  clerkId: { type: String, required: true },
  imageUrl: { type: String, required: true },
  igUsername: { type: String, required: true },
  igPassword: { type: String, required: true },
  scheduledTime: { type: String, required: true, default: Date.now() },
  status: { type: String, required: true, default: "pending" },
});

const PostCron = models.PostCron || model("PostCrons", PostCronSchema);

export default PostCron;

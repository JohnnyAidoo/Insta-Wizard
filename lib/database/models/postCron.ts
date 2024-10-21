import { Schema, model, models } from "mongoose";

const PostCronSchema = new Schema({
  clerkId: { type: String, required: true },
  imageUrl: { type: String, required: true },
  title: { type: String, required: true },
  igUsername: { type: String, required: true },
  igPassword: { type: String, required: true },
  easycronId: { type: String, required: true },
  scheduledTime: { type: String, required: true },
  status: { type: String, required: true },
});

// Check if the model already exists in the 'models' object.
// If it does, use it. Otherwise, create a new model.
const PostCron = models.PostCron || model("PostCron", PostCronSchema);

export default PostCron;

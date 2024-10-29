import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  igUsername: { type: String, required: true },
  igPassword: { type: String, required: true },
  isSubscribed: { type: Boolean, default: true },
});

const User = models.User || model("User", UserSchema);

export default User;

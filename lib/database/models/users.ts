import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String },
  igUsername: { type: String, required: true },
  igPassword: { type: String, required: true },
  isSubscribed: { type: Boolean, default: false },
  subscriptionId: { type: String },
  subscriptionPlan: { type: String },
  subscriptionCurrentPeriodEnd: { type: Date },
  stripeCustomerId: { type: String },
  subscriptionStatus: {
    type: String,
    enum: ["active", "canceled", "past_due", "unpaid", "none"],
    default: "none",
  },
});

const User = models.User || model("User", UserSchema);

export default User;

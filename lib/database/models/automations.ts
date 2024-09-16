import { Schema, model, models } from "mongoose";

const AutomationsSchema = new Schema({
  clerkId: { type: String, required: true },
  automationId: { type: String, required: true },
  dateCreated: { type: Date, required: true, default: Date.now() },
});

const Automations =
  models.Automations || model("Automations", AutomationsSchema);

export default Automations;

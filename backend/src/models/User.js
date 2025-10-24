import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  orgId: { type: mongoose.Schema.Types.ObjectId, ref: "Org", required: true },
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["viewer", "editor", "admin"], default: "viewer" }
}, { timestamps: true });
export default mongoose.model("User", UserSchema);

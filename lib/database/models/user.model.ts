import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  clerkId: { type: String, requiered: true, unique: true },
  email: { type: String, requiered: true, unique: true },
  username: { type: String, requiered: true, unique: true },
  firstname: { type: String, requiered: true },
  lastname: { type: String, requiered: true },
  photo: { type: String, requiered: true },
});

const User = models.User || model("User", UserSchema);

export default User;

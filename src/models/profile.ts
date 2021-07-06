import { Document, Model, model, Schema } from "mongoose";
import { IUser } from "./user";

export interface IProfile extends Document {
    user: IUser["_id"];
    firstName: string;
    lastName: string;
    username: string;
}
const profileSchema: Schema = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
    },
    createdDate: {
      type: Date,
      default: Date.now
    }
});
  
const Profile: Model<IProfile> = model("Profile", profileSchema);

export default Profile;
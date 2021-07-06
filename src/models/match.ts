import { Document, Model, model, Schema } from "mongoose";

export interface IMatch extends Document {
    match_id: number;
    title: string;
    modified: Date;
    format: number;
    format_str: string;
    status: number;
    status_str: string;
}

const matchSchema: Schema = new Schema({
    match_id: {
      type: Number,
      required: true,
      unique: true
    },
    title: {
      type: String,
      required: true
    },
    status: {
      type: Number,
      required: true
    },
    modified: {
      type: Date,
      required: true
    }
});
  
const Match: Model<IMatch> = model("Match", matchSchema);

export default Match;
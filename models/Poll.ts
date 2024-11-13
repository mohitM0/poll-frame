// models/Poll.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

interface PollDocument extends Document {
  _id: mongoose.Types.ObjectId;  
  question: string;
  options: { text: string; votes: number }[];
}

const pollSchema: Schema = new Schema({
  question: { type: String, required: true },
  options: [
    {
      text: { type: String, required: true },
      votes: { type: Number, default: 0 },
    },
  ],
}, { timestamps: true }); 
const Poll: Model<PollDocument> = mongoose.models.Poll || mongoose.model<PollDocument>('Poll', pollSchema);

export default Poll;

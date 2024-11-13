// models/Poll.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

interface PollDocument extends Document {
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
});

const Poll: Model<PollDocument> = mongoose.model<PollDocument>('Poll', pollSchema);

export default Poll;

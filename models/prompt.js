import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        

    },
    description: {
        type: String,

    },
    category:{
        type: String,
    },
    doe: {
        type: Date,

    },
    amount: {
        type: Number,

    },
});

const Prompt = models.Prompt || model('Prompt', PromptSchema);

export default Prompt;
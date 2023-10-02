import mongoose from "mongoose";
const { Schema } = mongoose;
const postSchema = new Schema({
  topic: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, {
  timestamps: true
}
);

export default mongoose.models.Post || mongoose.model("Post" , postSchema);

// const Topic = mongoose.models.titledesc || mongoose.model("Post", postSchema);

// export default Topic;

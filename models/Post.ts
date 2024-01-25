//title, content, slug, tags, thumbnail, meta, author, date

import mongoose, { Schema } from "mongoose";

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 100,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 100,
    },
    tags: {
      type: [String],
    },
    thumbnail: {
      type: Object,
      url: String,
      public_id: String,
    },
    meta: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.models?.Post || mongoose.model("Post", PostSchema);

export default Post;

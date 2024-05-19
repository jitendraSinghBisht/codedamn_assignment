import mongoose from "mongoose";

const volumeSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true
    },
    volumeName: {
      type: String,
      require: true
    },
    volumeLocation: {
      type: String,
      require: true
    },
  },
  { timestamps: true }
)

export const Volume = mongoose.model("Volume",volumeSchema)
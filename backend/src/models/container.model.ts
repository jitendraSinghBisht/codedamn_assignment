import mongoose from "mongoose";

const containerSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true
    },
    containerName: {
      type: String,
      require: true
    },
    volumeLocation: {
      type: String,
      require: true
    },
    session: {
      type: String
    },
  },
  { timestamps: true }
)

export const Container = mongoose.model("Container",containerSchema)
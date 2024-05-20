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
    volumeImage: {
      type: String,
      require: true
    },
    volumeLang: {
      type: String,
      require: true
    },
    volumeStructure: {
      type: String,
    },
  },
  { timestamps: true }
)

export const Volume = mongoose.model<VolumeDocument>("Volume",volumeSchema)

interface VolumeDocument {
  owner: mongoose.Schema.Types.ObjectId,
  volumeName: string,
  volumeImage: string,
  volumeLang: string,
  volumeStructure: string,
}

export type { VolumeDocument }
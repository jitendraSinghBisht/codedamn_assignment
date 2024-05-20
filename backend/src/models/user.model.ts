import mongooes from "mongoose";

const userSchema = new mongooes.Schema(
  {
    username: {
      type: String,
      require: true
    },
    email: {
      type: String,
      require: true,
      unique: true
    },
    password: {
      type: String,
      require: true
    },
    session: {
      type: String
    },
  },
  { timestamps: true }
)

export const User = mongooes.model<UserDocument>("User", userSchema);

interface UserDocument{
  _id: mongooes.Schema.Types.ObjectId,
  username: string,
  email: string,
  password: string,
  session: string
}

export type { UserDocument }
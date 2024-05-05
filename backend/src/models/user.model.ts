import mongooes from "mongoose";

const userSchema = new mongooes.Schema(
  {
    username: {
      type: String,
      require: true
    },
    email: {
      type: String,
      require: true
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

export const User = mongooes.model("User", userSchema);
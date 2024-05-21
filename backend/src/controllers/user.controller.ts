import { Request, Response, NextFunction } from "express"
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

interface IReqBody {
  username?: string;
  email: string;
  password: string;
}

const signUp = asyncHandler(async (req: Request, res: Response) => {

  const { username, email, password }: IReqBody = req.body

  if (!(username || email || password)) {
    throw new ApiError(400, "All details are required")
  }

  const existedUser = await User.findOne({ email });

  if (existedUser) {
    throw new ApiError(400, "User with username or email already exist");
  }

  const user = await User.create({
    username,
    email,
    password
  })

  if (!user) {
    throw new ApiError(500, "Registration Failed")
  }
  user.password = ""

  return res.status(200).json(new ApiResponse(200, user, "User signup successful"))
})

const signIn = asyncHandler(async (req: Request, res: Response) => {
  const { email, password }: IReqBody = req.body

  const user = await User.findOne({ email })

  if (user?.password !== password) {
    throw new ApiError(401, "Unauthorized access")
  }

  user.session = `${Date.now()}`
  await user.save()

  return res
    .cookie(
      'userSession',
      user.session,
      {
        httpOnly: true,
        secure: true
      })
    .status(200)
    .json(new ApiResponse(200, {
      userId: user._id,
      username: user.username,
      email: user.email,
    }, "Successfully logged in"))
})

const logOut = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params

  const user = await User.findByIdAndUpdate(userId,{session: null})

  if (!user) {
    throw new ApiError(500, "Unable to logout")
  }

  return res
    .clearCookie('userSession')
    .status(200)
    .json(new ApiResponse(200,{},"Logged out successfully"))
})

export { signUp, signIn, logOut }
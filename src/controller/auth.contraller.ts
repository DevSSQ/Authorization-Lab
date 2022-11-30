import { User } from "@prisma/client"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { Request, Response } from "express"
import { prisma } from "../config/db";
import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";


export const loginHandller = async (req: Request, res: Response) => {
    const { username, password } = req.body as User
    const user = await prisma.user.findUnique({
        where: { username },
      });
      if (!user) {
        return res
          .status(400)
          .json({ message: " wrong username ! " });
      }
    const isValidPassword = await argon2.verify(user.password, password);
     if (!isValidPassword) {
    return res
      .status(400)
      .json({ message: " wrong password ! " });
    }
    const token = jwt.sign({id:user.id, username:user.username },
      process.env.JWT_SECRET as string
      )

    return res.status(200).json({
        message:'Welcome Back !',
        token:token,
    })
  }

  export const rigesterHandller = async (req: Request, res: Response) => {
    try{
         const newUser = req.body as User;
         const hashedPassword = await argon2.hash(newUser.password);
         newUser.password = hashedPassword;
         await prisma.user.create({
            data: newUser
         })
         return res.status(201).json({ message: "User successfully rigestered !" });
    }
    catch (error) {
        console.log(error);
        const prismaError = error as PrismaClientKnownRequestError;
        return res.status(400).json({
            message:prismaError.message})
    }
}
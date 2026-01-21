import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";
import { GenerateToken } from "../utils/jwt.js";

export const RegisterService = async (data) => {
  const { email, password, username, name } = data;
  const checkEmail = await prisma.user.findFirst({
    where: { email: email },
  });
  if (checkEmail) {
    throw {
      errors: {
        status: 400,
        messageEmail: "Email already exists",
      },
    };
  }

  const checkUsername = await prisma.user.findFirst({
    where: { username: username },
  });
  if (checkUsername) {
    throw {
      errors: {
        status: 400,
        messageUsername: "Username already exists",
      },
    };
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashPassword,
      name,
    },
    select: {
      id: true,
      username: true,
      email: true,
      name: true,
    },
  });

  return user;
};

export const LoginService = async (email, password) => {
    const user = await prisma.user.findFirst({
        where: {email : email}
    });
    if (!user) {
        throw {
            status: 400,
            message: "Email or password incorrect"
        }
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) {
        throw {
            status: 400,
            message: "Email or password incorrect"
        }
    }

    const token = GenerateToken(user);
    
    return {token, user};
}

import {
  SignInResponse,
  SignUpRequest,
  SignInRequest,
  SignUpResponse,
} from "../api";
import { ExpressHandler } from "../types";
import { db } from "../data";
import { User } from "../types";
import crypto from "crypto";
export const signUp: ExpressHandler<SignUpRequest, SignUpResponse> = async (
  req,
  res
) => {
  const { email, firstName, lastName, password, userName } = req.body;

  if (!email || !userName || !password) {
    return res.sendStatus(400);
  }

  const existing =
    (await db.getUserByEmail(email)) || (await db.getUserByUsername(userName));
  if (existing) {
    return res.status(403);
  }

  const user: User = {
    id: crypto.randomUUID(),
    email,
    firstName,
    lastName,
    userName,
    password,
  };
  await db.createUser(user);
  return res.sendStatus(200);
};

export const signIn: ExpressHandler<SignInRequest, SignInResponse> = async (
  req,
  res
) => {
  const { login, password } = req.body;
  if (!login || !password) {
    return res.sendStatus(400);
  }

  const existing =
    (await db.getUserByEmail(login)) || (await db.getUserByUsername(login));
  if (!existing || existing.password !== password) {
    return res.sendStatus(403);
  }

  return res.status(200).send({
    email: existing.email,
    firstName: existing.firstName,
    lastName: existing.lastName,
    id: existing.id,
    userName: existing.userName,
  });
};

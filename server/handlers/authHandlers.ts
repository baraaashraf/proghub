import {
  SignInResponse,
  SignUpRequest,
  SignInRequest,
  SignUpResponse,
} from "../../shared/src/api";
import { ExpressHandler, JwtObject } from "../types";
import { db } from "../data";
import { User } from "../../shared/src/types";
import crypto from "crypto";
import { signJwt } from "../auth";

export const signUp: ExpressHandler<SignUpRequest, SignUpResponse> = async (
  req,
  res
) => {
  const { email, firstName, lastName, password, userName } = req.body;

  if (!email || !userName || !firstName || !lastName || !password) {
    return res.status(400).send({ error: "Enter all fields" });
  }

  const existing =
    (await db.getUserByEmail(email)) || (await db.getUserByUsername(userName));
  if (existing) {
    return res.status(403).send({ error: "Already Existing" });
  }

  const passwordHash = hashPassword(password)
  const user: User = {
    id: crypto.randomUUID(),
    email,
    firstName,
    lastName,
    userName,
    password: passwordHash,
  };
  await db.createUser(user);
  const jwt = signJwt({ userId: user.id });
  return res.status(200).send({ jwt });
};

export const signIn: ExpressHandler<SignInRequest, SignInResponse> = async (
  req,
  res
) => {
  const { login, password } = req.body;
  if (!login || !password) {
    return res.sendStatus(400);
  }

  const passwordHash = hashPassword(password)

  const existing =
    (await db.getUserByEmail(login)) || (await db.getUserByUsername(login));
  if (!existing || existing.password !== passwordHash) {
    return res.sendStatus(403);
  }

  const jwt = signJwt({
    userId: existing.id,
  });

  return res.status(200).send({
    user: {
      email: existing.email,
      firstName: existing.firstName,
      lastName: existing.lastName,
      id: existing.id,
      userName: existing.userName,
    },
    jwt,
  });
};

function hashPassword(password:string):string{
  return crypto
    .pbkdf2Sync(password, process.env.PASSWORD_SALT, 10, 64, "SHA512")
    .toString("hex");
}

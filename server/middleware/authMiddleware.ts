import { verifyJwt } from "../auth";
import { ExpressHandler } from "../types";
import { db } from "../data";
export const authMiddleware: ExpressHandler<any, any> = async (
  req,
  res,
  next
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const payload = verifyJwt(token);
    const user = await db.getUserById(payload.userId);
    if (!user) {
      throw "User Not Found";
    }

    res.locals.userId = user.id;

    next();
  } catch (error) {
    return res.status(401).send({ error: "bad token" });
  }
};

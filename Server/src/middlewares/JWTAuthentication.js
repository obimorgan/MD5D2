/** @format */

import jwt from "jsonwebtoken";

export const JWTAuthentication = async (user) => {
  // Given the user returns an access token for him/her
  const accessToken = await generateJWTToken({
    _id: user._id,
    role: user.role,
  });
  const refreshToken = await generateRefreshJWTToken({ _id: user._id });

  // user is a mogoose document - so it can receieve the mongoose save() method
  user.refreshToken = refreshToken;
  await user.save();

  // return both tokens
  return { accessToken, refreshToken };
};

// Generate first access tokewn
const generateJWTToken = (payload) =>
  new Promise((resolve, reject) =>
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1m" },
      (err, token) => {
        if (err) reject(err);
        else resolve(token);
      }
    )
  );

// USAGE: const token = await generateJWTToken({_id: "oaijsdjasdojasoidj"})

// generates second/refresh token
const generateRefreshJWTToken = (payload) =>
  new Promise((resolve, reject) =>
    jwt.sign(
      payload,
      process.env.REFRESH_JWT_SECRET,
      { expiresIn: "1 week" },
      (err, token) => {
        if (err) reject(err);
        else resolve(token);
      }
    )
  );

// verify the first access token
export const verifyJWT = (token) =>
  new Promise((resolve, reject) =>
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) reject(err);
      else resolve(payload);
    })
  );

// verify the second token once the first access token is expired
const verifyRefreshToken = (token) =>
  new Promise((resolve, reject) =>
    jwt.verify(token, process.env.REFRESH_JWT_SECRET, (err, payload) => {
      if (err) reject(err);
      else resolve(payload);
    })
  );

// USAGE: const payload = await verifyJWT(token)

export const verifyRefreshTokenAndGenerateNewTokens = async (
  currentRefreshToken
) => {
  try {
    // 1. Check the validity of the current refresh token (exp date and integrity)
    const payload = await verifyRefreshToken(currentRefreshToken);

    // 2. If token is valid, we shall check if it is the same as the one saved in db
    const user = await UsersModel.findById(payload._id);

    if (!user)
      throw new createHttpError(404, `User with id ${payload._id} not found!`);

    if (user.refreshToken && user.refreshToken === currentRefreshToken) {
      // 3. If everything is fine --> generate accessToken and refreshToken
      const { accessToken, refreshToken } = await JWTAuthentication(user);

      // 4. Return tokens
      return { accessToken, refreshToken };
    } else {
      throw new createHttpError(401, "Refresh token not valid!");
    }
  } catch (error) {
    throw new createHttpError(401, "Refresh token expired or compromised!");
  }
};

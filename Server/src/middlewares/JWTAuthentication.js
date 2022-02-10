/** @format */

import jwt from "jsonwebtoken";

export const JWTAuthentication = async (user) => {
  // Given the user returns an access token for him/her
  const accessToken = await generateJWTToken({
    _id: user._id,
    role: user.role,
  });
  return accessToken;
};

const generateJWTToken = (payload) =>
  new Promise((resolve, reject) =>
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "30m" },
      (err, token) => {
        if (err) reject(err);
        else resolve(token);
      }
    )
  );

// USAGE: const token = await generateJWTToken({_id: "oaijsdjasdojasoidj"})

export const verifyJWT = (token) =>
  new Promise((resolve, reject) =>
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) reject(err);
      else resolve(payload);
    })
  );

// USAGE: const payload = await verifyJWT(token)

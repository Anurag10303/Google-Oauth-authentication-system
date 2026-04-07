import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import User from "../models/User.js";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

function signAuthToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
}

function setAuthCookie(res, token) {
  const isProduction = process.env.NODE_ENV === "production";
  res.cookie("token", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

async function googleAuth(req, res) {
  try {
    const { credential, accessToken } = req.body;

    if (!credential && !accessToken) {
      return res
        .status(400)
        .json({
          message:
            "Either Google credential token or access token is required.",
        });
    }

    let payload;
    if (credential) {
      const ticket = await googleClient.verifyIdToken({
        idToken: credential,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      payload = ticket.getPayload();
    } else {
      const profileResponse = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (!profileResponse.ok) {
        return res
          .status(401)
          .json({ message: "Invalid Google access token." });
      }

      payload = await profileResponse.json();
    }

    if (!payload?.email) {
      return res
        .status(400)
        .json({ message: "Unable to read Google profile data." });
    }

    const email = payload.email.toLowerCase();
    const name = payload.name || email.split("@")[0];
    const image = payload.picture || "";

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email, image });
    }

    const token = signAuthToken(String(user._id));
    setAuthCookie(res, token);

    return res.status(200).json({
      user: {
        id: String(user._id),
        name: user.name,
        email: user.email,
        image: user.image,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    return res.status(401).json({ message: "Google authentication failed." });
  }
}

async function getMe(req, res) {
  return res.status(200).json({
    user: {
      id: String(req.user._id),
      name: req.user.name,
      email: req.user.email,
      image: req.user.image,
      createdAt: req.user.createdAt,
    },
  });
}

async function logout(req, res) {
  const isProduction = process.env.NODE_ENV === "production";
  res.clearCookie("token", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
  });

  return res.status(200).json({ message: "Logged out successfully." });
}

export { googleAuth, getMe, logout };

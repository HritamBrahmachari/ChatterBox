import jwt from "jsonwebtoken";

const generateTokenAndSetCookies = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, //milliseconds
    httpOnly: true, // prevent XSS attacks cross-site scripting attacks
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", // Allow cross-site cookies in production
    secure: true, // Cookies only work with HTTPS
  });
};

export default generateTokenAndSetCookies;

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const jwt = require("jsonwebtoken");
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).send({ message: "Token is missing" });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "UnAuthorized" });
      } else {
        next();
      }
    });
  } else {
    return res.status(401).send({ message: "Authorization header is missing" });
  }
};
module.exports = { verifyToken };

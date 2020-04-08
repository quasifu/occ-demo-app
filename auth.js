const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    // TO BE USED LATER TO VERIFY USER!!! const { authorization } = req.headers;
    // if (!authorization)
    //   throw new Error("You must send an Authorization header");

    // const [authType, token] = authorization.trim().split(" ");
    // if (authType !== "Bearer") throw new Error("Expected a Bearer token");
    // jwt.verify(token, process.env.SECRET);
    next();
  } catch (error) {
    next(error.message);
  }
};

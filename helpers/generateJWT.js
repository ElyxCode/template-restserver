const jwt = require("jsonwebtoken");

const generateJWT = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      process.env.SECRET_PRIVATE_KEY,
      {
        expiresIn: "4h",
      },
      (error, token) => {
        if (error) {
          console.log(error);
          reject("could not generate the token");
        }

        resolve(token);
      }
    );
  });
};

module.exports = generateJWT;

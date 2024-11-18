import jwt from "jsonwebtoken";
export const generalAccessToken = async (payload) => {
  const access_token = jwt.sign(
    {
      ...payload,
    },
    process.env.ACCESS_TOKEN,
    { expiresIn: "2d" }
  );
  return access_token;
};

export const generalRefreshToken = async (payload) => {
  let refresh_token = await jwt.sign(
    {
      ...payload,
    },
    process.env.REFRESH_TOKEN,
    {
      expiresIn: "2d",
    }
  );
  return refresh_token;
};

export const refreshTokenJWTService = async (token) => {
  try {
    jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
      if (err) {
        return {
          status: "ERROR",
          message: "The authentication",
        };
      }
      const access_token = await generalAccessToken({
        email: user.email,
        role: user.isAdmin,
        gender: user.gender,
      });
      return {
        status: "OK",
        message: "Refresh token success!",
        access_token,
      };
    });
  } catch (e) {
    return {
      status: "ERROR",
      message: e.toString(),
    };
  }
};

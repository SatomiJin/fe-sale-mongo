import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import * as JWTServices from "./JWTService.js";

export const createUser = async (data) => {
  try {
    if (!data.username || !data.email || !data.password || !data.phoneNumber || !data.address) {
      return {
        status: "ERROR",
        message: "Missing parameters...",
      };
    }
    let checkUser = await User.findOne({
      $or: [{ username: data.username }, { email: data.email }],
    });
    if (checkUser) {
      return {
        status: "ERROR",
        message: "username or email is exist!",
      };
    }

    const hashPass = bcrypt.hashSync(data.password, 10);
    const createUser = await User.create({
      username: data.username,
      email: data.email,
      password: hashPass,
      isAdmin: data.isAdmin || false,
      phoneNumber: data.phoneNumber,
      address: data.address || {},
      image: data.images || "",
      gender: data.gender,
    });
    if (createUser) {
      return {
        status: "OK",
        message: "Create new user is success!",
      };
    } else {
      return {
        status: "ERROR",
        message: "Create new user is fail! try again!",
      };
    }
  } catch (e) {
    return {
      status: "ERROR",
      message: e.toString(),
    };
  }
};

export const signIn = async (data) => {
  try {
    if (!data.password || !data.username) {
      return {
        status: "ERROR",
        message: "Please, fill in all information!",
      };
    }
    let checkUser = await User.findOne({
      username: data.username,
    });
    if (!checkUser) {
      return {
        status: "ERROR",
        message: "Username is not exist!",
      };
    }
    let checkPass = bcrypt.compareSync(data.password, checkUser.password);
    if (!checkPass) {
      return {
        status: "ERROR",
        message: "Password is wrong!",
      };
    }

    if (checkPass) {
      let access_token = await JWTServices.generalAccessToken({
        email: checkUser.email,
        role: checkUser.isAdmin,
        gender: checkUser.gender,
      });
      let refresh_token = await JWTServices.generalRefreshToken({
        email: checkUser.email,
        role: checkUser.isAdmin,
        gender: checkUser.gender,
      });
      return {
        status: "OK",
        message: "Sign in success!",
        access_token,
        refresh_token,
      };
    }
  } catch (e) {
    return {
      status: "ERROR",
      message: e.toString(),
    };
  }
};

export const getDetailUser = async (data) => {
  try {
    if (!data.username || !data._id) {
      return {
        status: "ERROR",
        message: "Missing parameters...",
      };
    }
    let userDetail = await User.findOne({
      $or: [{ username: data.username }, { _id: data._id }],
    });
    if (!userDetail) {
      return {
        status: "ERROR",
        message: "User is not defined!",
      };
    } else {
      return {
        status: "OK",
        message: "Get user's detail is success!",
        user: userDetail,
      };
    }
  } catch (e) {
    return {
      status: "ERROR",
      message: e.toString(),
    };
  }
};

export const updateUser = async (data) => {
  try {
    if (!data._id) {
      return {
        status: "ERROR",
        message: "Missing parameters...",
      };
    }
    let checkUser = await User.findOne({
      _id: data._id,
    });
    if (!checkUser) {
      return {
        status: "ERROR",
        message: "User is not exist!",
      };
    } else {
      if (data.oldPass) {
        let checkPass = bcrypt.compareSync(data.oldPass, checkUser.password);
        if (!checkPass) {
          return {
            status: "ERROR",
            message: "Old password and current password is not equal!",
          };
        } else {
          let newPassword = bcrypt.hashSync(data.newPassword, 10);
          checkUser.password = newPassword;
        }
      }
      checkUser.phoneNumber = data.phoneNumber;
      checkUser.address = data.address;
      checkUser.image = data.image;
      checkUser.gender = data.gender;

      await checkUser.save();
      return {
        status: "OK",
        message: "Update user is success!",
        user: checkUser,
      };
    }
  } catch (e) {
    return {
      status: "ERROR",
      message: e.toString(),
    };
  }
};

export const getAllUser = async (data) => {
  try {
    console.log(data);

    if (!data.isadmin) {
      return {
        status: "ERROR",
        message: "Authentication is fail! try later",
      };
    } else {
      let listUser = await User.find();
      if (listUser.length > 0) {
        return {
          status: "OK",
          message: "Get list user success!",
          data: listUser,
        };
      } else {
        return {
          status: "ERROR",
          message: "Data is empty!",
        };
      }
    }
  } catch (e) {
    console.log(e);

    return {
      status: "ERROR",
      message: e.toString(),
    };
  }
};

export const deleteUser = async (data) => {
  try {
    if (!data.username || !data.isAdmin) {
      return {
        status: "ERROR",
        message: "The Authentication is fail!! try again",
      };
    } else {
      let checkUser = await User.findOne({
        username: data.username,
      });
      if (!checkUser.isAdmin) {
        return {
          status: "ERROR",
          message: "The Authentication is fail!! try again",
        };
      }

      let deleteUser = await User.deleteOne({
        _id: data.deleteId,
      });
      if (deleteUser) {
        return {
          status: "OK",
          message: "User was deleted!",
        };
      } else {
        return {
          status: "ERROR",
          message: "Delete user is fail!! Try again",
        };
      }
    }
  } catch (e) {
    console.log(e);
    return {
      status: "ERROR",
      message: e.toString(),
    };
  }
};

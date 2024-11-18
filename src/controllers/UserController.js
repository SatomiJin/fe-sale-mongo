import * as UserService from "../services/UserService.js";
//
// try {
//   let res = await UserService.createUser(req.body);
//   return res.status(200).json(res);
// } catch (e) {
//   return res.status(500).json({
//     status: "ERROR",
//     message: "Error from server...",
//   });
// }
//
export const createUser = async (req, res) => {
  try {
    let response = await UserService.createUser(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      status: "ERROR",
      message: "Error from server...",
    });
  }
};
export const signIn = async (req, res) => {
  try {
    let response = await UserService.signIn(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      status: "ERROR",
      message: "Error from server...",
    });
  }
};
export const getDetailUser = async (req, res) => {
  try {
    let response = await UserService.getDetailUser(req.headers);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "ERROR",
      message: "Error from server...",
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    let response = await UserService.updateUser(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "ERROR",
      message: "Error from server...",
    });
  }
};

export const getAllUser = async (req, res) => {
  try {
    let response = await UserService.getAllUser(req.headers);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "ERROR",
      message: "Error from server...",
    });
  }
};
export const deleteUser = async (req, res) => {
  try {
    let response = await UserService.deleteUser(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "ERROR",
      message: "Error from server...",
    });
  }
};

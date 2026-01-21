import { LoginService, RegisterService } from "../services/auth.service.js";

export const register = async (req, res) => {
  try {
    const user = req.body;
    const data = await RegisterService(user);
    res.status(200).json({ user: data, message: "Successfully" });
  } catch (error) {
    res.status(400).json({
      errors: error.errors || { general: error.message },
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const {token, user} = await LoginService(email, password);
    res.cookie("accessToken", token, {
      httpOnly: true,
    });
    res.status(200).json({
      message: "Login successful",
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        profilePic: user.profilePic,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("accessToken", {
      secure: true,
      samSite: "none",
    });
    res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    console.log(error);
  }
};

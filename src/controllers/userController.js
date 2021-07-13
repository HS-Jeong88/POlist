import User from "../models/User";
import fetch from "node-fetch";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJoin = async (req, res) => {
  console.log(req.body);
  const {
    userId,
    password,
    password2,
    name,
    nickname,
    phoneNum1,
    phoneNum2,
    phoneNum3,
    zipCode,
    address,
    detailAddress,
    email1,
    email2,
    birth,
    gender,
  } = req.body;
  let { allowingEmail, allowingSMS } = req.body;
  const pageTitle = "Join";
  if (password !== password2) {
    return res
      .status(400)
      .render("join", { pageTitle, errorMessage: "비밀번호가 일치하지 않습니다" });
  }
  const existsId = await User.exists({
    $or: [
      {
        userId,
      },
    ],
  });
  if (existsId) {
    return res
      .status(400)
      .render("join", { pageTitle, errorMessage: "이미 존재하는 아이디 입니다" });
  }
  const existsEmail = await User.exists({
    $or: [
      {
        email: `${email1}@${email2}`,
      },
    ],
  });
  if (existsEmail) {
    return res
      .status(400)
      .render("join", { pageTitle, errorMessage: "이미 존재하는 이메일 입니다" });
  }
  try {
    await User.create({
      userId,
      password,
      name,
      nickname,
      phoneNumber: `${phoneNum1}${phoneNum2}${phoneNum3}`,
      zipCode,
      address,
      detailAddress,
      email: `${email1}@${email2}`,
      birth,
      gender,
      allowingEmail: allowingEmail === "Email" ? (allowingEmail = true) : (allowingEmail = false),
      allowingSMS: allowingSMS === "SMS" ? (allowingSMS = true) : (allowingSMS = false),
    });
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.status(400).render("join", {
      pageTitle: "Join",
      errorMessage: error._message,
    });
  }
};

export const getLogin = (req, res) => res.render("login", { pageTitle: "Login" });
export const postLogin = async (req, res) => {
  const { userId, password } = req.body;
  const pageTitle = "Login";
  const user = await User.findOne({ userId });
  if (!user) {
    req.flash("error", "this ID does not exists.");
    return res.status(400).render("index", { pageTitle, errorMessage: "this ID does not exists." });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render("index", { pageTitle, errorMessage: "Wrong password" });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};
export const startGithubLogin = (req, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: process.env.GH_CLIENT,
    allow_signup: false,
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
};
export const finishGithubLogin = async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const tokenRequest = await (
    await fetch(finalUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();
  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    const apiUrl = "https://api.github.com";
    const userData = await (
      await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const emailData = await (
      await fetch(`${apiUrl}/user/emails`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const emailObj = emailData.find((email) => email.primary === true && email.verified === true);
    if (!emailObj) {
      // set notification
      return res.redirect("/login");
    }
    let user = await User.findOne({ email: emailObj.email });
    if (!user) {
      user = await User.create({
        avatarUrl: userData.avatar_url,
        name: userData.name,
        userId: userData.login,
        email: emailObj.email,
        password: "",
        socialOnly: true,
        location: userData.location,
      });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
  } else {
    return res.redirect("/login");
  }
};
export const logout = (req, res) => {
  req.flash("info", "Bye Bye");
  req.session.destroy();
  return res.redirect("/");
};
export const getEdit = (req, res) => {
  return res.render("edit-profile", { pageTitle: "Edit Profile" });
};
export const postEdit = async (req, res) => {
  const {
    session: {
      user: { _id, avatarUrl },
    },
    body: { name, email, userId, nickname, phoneNumber, address, birth, gender },
    file,
  } = req;
  let {
    body: { allowingEmail, allowingSMS },
  } = req;
  const updatedUser = await User.findByIdAndUpdate(
    _id,
    {
      avatarUrl: file ? file.path : avatarUrl,
      name,
      email,
      userId,
      nickname,
      phoneNumber,
      address,
      birth,
      gender,
      allowingEmail: allowingEmail === "Email" ? (allowingEmail = true) : (allowingEmail = false),
      allowingSMS: allowingSMS === "SMS" ? (allowingSMS = true) : (allowingSMS = false),
    },
    { new: true }
  );
  req.session.user = updatedUser;
  return res.redirect("/users/edit");
};
export const getChangePassword = (req, res) => {
  if (req.session.user.socialOnly === true) {
    req.flash("error", "Can't change password.");
    return res.redirect("/");
  }
  return res.render("users/change-password", { pageTitle: "Change Password" });
};
export const postChangePassword = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { oldPassword, newPassword, newPasswordConfirmation },
  } = req;
  const user = await User.findById(_id);
  const ok = await bcrypt.compare(oldPassword, user.password);
  if (!ok) {
    return res.status(400).render("users/change-password", {
      pageTitle: "Change Password",
      errorMessage: "The current password is incorrect",
    });
  }
  if (newPassword !== newPasswordConfirmation) {
    return res.status(400).render("users/change-password", {
      pageTitle: "Change Password",
      errorMessage: "The password does not match the confirmation",
    });
  }
  user.password = newPassword;
  await user.save();
  req.flash("info", "Passowrd updated");
  return res.redirect("/users/logout");
};

export const see = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate({
    path: "videos",
    populate: {
      path: "owner",
      model: "User",
    },
  });
  if (!user) {
    return res.status(404).render("404", { pageTitle: "User not found." });
  }
  return res.render("users/profile", {
    pageTitle: user.name,
    user,
  });
};

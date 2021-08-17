import User from "../models/User";
import Site from "../models/sitelists";
import fetch from "node-fetch";
import bcrypt from "bcrypt";

export const getResign = (req, res) => res.render("users/resign", {});
export const postResign = async (req, res) => {
  const {
    session: {
      user: { _id },
      site: { owner },
    },
  } = req;
  // await User.findOneAndDelete(_id);
  Site.find(owner, async (err, data) => {
    console.log(data[0]._id);
    await Site.findOneAndDelete({ _id: data[0]._id });
  });
  req.flash("info", "Bye Bye");
  req.session.destroy();
  return res.redirect("/");
};

export const getJoin = (req, res) => res.render("join", {});
export const postJoin = async (req, res) => {
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
  if (password !== password2) {
    req.flash("error", "비밀번호가 일치하지 않습니다");
    return res.redirect("/join");
  }
  const existsId = await User.exists({
    $or: [
      {
        userId,
      },
    ],
  });
  if (existsId) {
    req.flash("error", "이미 존재하는 아이디 입니다");
    return res.redirect("/join");
  }
  const existsEmail = await User.exists({
    $or: [
      {
        email: `${email1}@${email2}`,
      },
    ],
  });
  if (existsEmail) {
    req.flash("error", "이미 존재하는 이메일 입니다");
    return res.redirect("/join");
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
    req.flash("info", "회원가입이 완료되었습니다.");
    return res.redirect("/");
  } catch (error) {
    req.flash("error", "*표시항목의 내용을 전부 입력해 주세요");
    return res.status(400).render("join", {
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
    });
  }
};

export const getLogin = (req, res) => res.render("login", {});

export const postLogin = async (req, res) => {
  const { userId, password } = req.body;
  const user = await User.findOne({ userId });
  if (!user) {
    // res.redirect("/login");
    await req.flash("error", "계정정보가 존재하지 않습니다.");
    console.log(req.flash);
    return res.redirect("/login");
  } else {
    const site = await Site.find({ owner: user._id });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      await req.flash("error", "비밀번호가 틀립니다.");
      return res.redirect("/login");
    } else {
      req.session.loggedIn = true;
      req.session.user = user;
      req.session.site = site;
    }
  }
  res.redirect("/");
};
export const logout = (req, res) => {
  req.flash("info", "Bye Bye");
  req.session.destroy();
  return res.redirect("/");
};
export const getEdit = (req, res) => {
  const {
    session: {
      user: { phoneNumber, email },
    },
  } = req;
  const phoneNumber1 = phoneNumber.substr(0, 3);
  const phoneNumber2 = phoneNumber.substr(3, 4);
  const phoneNumber3 = phoneNumber.substr(7, 4);
  let email1, email2;
  if (email) {
    const emailStr = email.split("@");
    email1 = emailStr[0];
    email2 = emailStr[1];
  }
  return res.render("edit-profile", { phoneNumber1, phoneNumber2, phoneNumber3, email1, email2 });
};
export const postEdit = async (req, res) => {
  const {
    session: {
      user: { _id, avatarUrl },
    },
    body: {
      name,
      email1,
      email2,
      userId,
      nickname,
      phoneNumber1,
      phoneNumber2,
      phoneNumber3,
      zipCode,
      address,
      detailAddress,
      birth,
      gender,
    },
    file,
  } = req;
  let {
    body: { allowingEmail, allowingSMS },
  } = req;
  console.log(req.file);
  const updatedUser = await User.findByIdAndUpdate(
    _id,
    {
      avatarUrl: file ? file.path : avatarUrl,
      name,
      email: `${email1}@${email2}`,
      userId,
      nickname,
      phoneNumber1,
      phoneNumber2,
      phoneNumber3,
      zipCode,
      address,
      detailAddress,
      birth,
      gender,
      allowingEmail: allowingEmail === "Email" ? (allowingEmail = true) : (allowingEmail = false),
      allowingSMS: allowingSMS === "SMS" ? (allowingSMS = true) : (allowingSMS = false),
    },
    { new: true }
  );
  req.session.user = updatedUser;
  req.flash("info", "프로필 수정사항이 저장되었습니다.");
  return res.redirect("/users/edit");
};
export const getChangePassword = (req, res) => {
  if (req.session.user.socialOnly === true) {
    req.flash("error", "Can't change password.");
    return res.redirect("/");
  }
  return res.render("users/change-password", {});
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
    req.flash("error", "기존 비밀번호와 다릅니다");
    return res.status(400).render("users/change-password", {});
  }
  if (newPassword !== newPasswordConfirmation) {
    req.flash("error", "비밀번호가 서로 맞지 않습니다.");
    return res.status(400).render("users/change-password", {});
  }
  user.password = newPassword;
  await user.save();
  req.flash("info", "비밀번호가 변경되었습니다.");
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
      return res.redirect("/");
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
    return res.redirect("/");
  }
};

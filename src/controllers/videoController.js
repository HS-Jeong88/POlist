import Video from "../models/Video";
import User from "../models/User";
import Site from "../models/sitelists";
import mongoose from "mongoose";
import webdriver from "selenium-webdriver";
import { Builder, By, Key, until } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";

export const home = async (req, res) => {
  return res.render("home", { pageTitle: "Home" });
};
export const getSitelist = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  const query = Site.find();
  query instanceof mongoose.Query;
  const docs = await query;

  let keyList = [];
  let values = [];
  let valuesIndex = [];
  if (docs) {
    const keyValue = Object.keys(docs[0]._doc);
    for (let i = 1; i < keyValue.length - 2; i++) {
      keyList.push(keyValue[i]);
    }
    for (let j = 0; j < docs.length; j++) {
      const valuesObj = {};
      for (let i = 0; i < keyList.length; i++) {
        valuesObj[keyList[i]] = docs[j][keyList[i]];
      }
      values.push(valuesObj);
    }
  }
  return res.render("sitelist", { pageTitle: "sitelist", keyList, values });
};

export const postSiteForm = async (req, res) => {
  const { siteUrl, siteName, owner } = req.body;
  await Site.create({
    siteUrl,
    siteName: siteName,
    owner: req.session.user._id,
  });
  res.redirect("/");
};

export const getAutoLogin = async (req, res) => {
  res.redirect("/");
};
export const postAutoLogin = async (req, res) => {
  const { getUrl, inputId, inputPw } = req.body;
  const run = async () => {
    const service = new chrome.ServiceBuilder(
      "/Users/jhs/Defragmentation/bird/POList/src/chromedriver"
    ).build();
    chrome.setDefaultService(service);

    const driver = await new webdriver.Builder().forBrowser("chrome").build();
    await driver.manage().setTimeouts({
      implicit: 10000,
      pageLoad: 30000,
      script: 30000,
    });

    await driver.get(getUrl);
    if (getUrl === "https://www.naver.com/") {
      const loginBtn = await driver.findElement(By.css(`#account > a`));
      await loginBtn.click();
      const idInput = await driver.findElement(By.css(`#id`));
      await new Promise((r) => setTimeout(r, 1000));
      await idInput.sendKeys(inputId);
      const pwInput = await driver.findElement(By.css(`#pw`));
      await new Promise((r) => setTimeout(r, 1000));
      await pwInput.sendKeys(inputPw);
      await new Promise((r) => setTimeout(r, 1000));
      await pwInput.sendKeys("webdriver", Key.RETURN);
    } else if (getUrl === "https://cometoplay.kr/") {
      const loginBtn = await driver.findElement(
        By.css(`#wrap > div.top_menu > div > div.right_menu > a:nth-child(1)`)
      );
      await loginBtn.click();
      const idInput = await driver.findElement(By.css(`#mb_id`));
      await new Promise((r) => setTimeout(r, 1000));
      await idInput.sendKeys(inputId);
      const pwInput = await driver.findElement(By.css(`#mb_password`));
      await new Promise((r) => setTimeout(r, 1000));
      await pwInput.sendKeys(inputPw);
      await new Promise((r) => setTimeout(r, 1000));
      await pwInput.sendKeys("webdriver", Key.RETURN);
    }
    setTimeout(async () => {
      await driver.quit();
      process.exit(0);
    }, 3000);
  };
  run();
  res.redirect("/");
};

export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id).populate("owner");
  if (!video) {
    return res.render("404", { pageTitle: "Video not found." });
  }
  return res.render("watch", { pageTitle: video.title, video });
};
export const getEdit = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  if (String(video.owner) !== String(_id)) {
    req.flash("error", "Not authorized");
    return res.status(403).redirect("/");
  }
  return res.render("edit", { pageTitle: `Edit: ${video.title}`, video });
};
export const postEdit = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await Video.exists({ _id: id });
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  if (String(video.owner) !== String(_id)) {
    req.flash("error", "You are not the owner of the video");
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  req.flash("success", "Changes saved.");
  return res.redirect(`/videos/${id}`);
};
export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};
export const postUpload = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  const { path: fileUrl } = req.file;
  const { title, description, hashtags } = req.body;
  try {
    const newVideo = await Video.create({
      title,
      description,
      fileUrl,
      owner: _id,
      hashtags: Video.formatHashtags(hashtags),
    });
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.status(400).render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};
export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndDelete(id);
  return res.redirect("/");
};
export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(`${keyword}$`, "i"),
      },
    }).populate("owner");
  }
  return res.render("search", { pageTitle: "Search", lists });
};

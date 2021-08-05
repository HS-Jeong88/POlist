import Group from "../models/Group";
import User from "../models/User";
import Site from "../models/sitelists";
import mongoose from "mongoose";

export const home = async (req, res) => {
  return res.render("home", {});
};
export const getSitelist = async (req, res) => {
  let modalSwitch = 0;
  const {
    user: { _id },
  } = req.session;
  const query = Site.find();
  query instanceof mongoose.Query;
  const docs = await query;
  let keyList = [];
  let values = [];
  if (docs != false) {
    const keyValue = Object.keys(docs[0]._doc);
    for (let i = 1; i < keyValue.length - 1; i++) {
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
  return res.render("sitelist", { keyList, values, _id, modalSwitch });
};

export const postSiteForm = async (req, res) => {
  const { siteUrl, siteName, siteDetail, inputId, inputPw, modalSwitch } = req.body;
  const existsUrl = await Site.exists({
    $and: [{ owner: req.session.user._id }, { siteUrl }],
  });
  if (!existsUrl) {
    await Site.create({
      owner: req.session.user._id,
      siteUrl,
      siteName,
      siteDetail,
      inputId,
      inputPw,
    });
  } else {
    if (modalSwitch == 1) {
      const filter = { $and: [{ owner: req.session.user._id, siteUrl }] };
      const update = {
        owner: req.session.user._id,
        siteUrl,
        siteName,
        siteDetail,
        inputId,
        inputPw,
      };
      await Site.findOneAndUpdate(filter, update);
    } else {
      req.flash("error", "이미 등록된 사이트 입니다.");
    }
  }
  res.redirect("/");
};

export const deleteRow = async (req, res) => {
  const { getUrl } = req.body;
  const owner = req.session.user._id;
  const filter = { $and: [{ owner, siteUrl: getUrl }] };
  await Site.findOneAndDelete(filter);
  return res.redirect("/");
};

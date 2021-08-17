import mongoose, { now } from "mongoose";
import Site from "../models/sitelists";
import Notification from "../models/notifications";

export const home = async (req, res) => {
  return res.render("home", {});
};
export const getFindPw = async (req, res) => {
  res.render("findpw", {});
};
export const postFindPw = async (req, res) => {
  res.redirect("/findpw");
};
export const getFindId = async (req, res) => {
  res.render("findid", {});
};
export const postFindId = async (req, res) => {
  res.redirect("/findid");
};
export const getJoinSelect = async (req, res) => {
  res.render("joinselect", {});
};
export const postJoinSelect = async (req, res) => {
  res.redirect("/joinselect");
};
export const getSharecomingsoon = async (req, res) => {
  res.render("sharecomingsoon", {});
};
export const postSharecomingsoon = async (req, res) => {
  res.redirect("/sharecomingsoon");
};
export const getGroupprofile = async (req, res) => {
  res.render("groupprofile", {});
};
export const postGroupprofile = async (req, res) => {
  res.redirect("/groupprofile");
};
export const getInvite = async (req, res) => {
  res.render("invite", {});
};
export const postInvite = async (req, res) => {
  res.redirect("/invite");
};
export const getNotification = async (req, res) => {
  const query = Notification.find();
  query instanceof mongoose.Query;
  const docs = await query;
  const reverseDocs = docs.reverse();
  let newCheck = false;
  docs.forEach(async (item) => {
    if (item.check == false) {
      newCheck = true;
    }
    const filter = { _id: item._id };
    const update = { check: true };
    await Notification.findOneAndUpdate(filter, update);
  });
  res.render("notification", { reverseDocs, newCheck });
};
export const postNotification = async (req, res) => {
  res.redirect("/notification");
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
    for (let i = 0; i < keyValue.length; i++) {
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
  const query2 = Notification.find();
  query2 instanceof mongoose.Query;
  const docs2 = await query2;
  let newCheck = false;
  docs2.forEach((item) => {
    if (item.check == false) {
      newCheck = true;
    }
  });
  return res.render("sitelist", { keyList, values, _id, modalSwitch, newCheck });
};

export const postSiteForm = async (req, res) => {
  const { siteUrl, siteName, siteDetail, inputId, inputPw, memo, rowId, modalSwitch } = req.body;
  const {
    user: { _id, userId },
  } = req.session;
  const groupName = "";
  if (modalSwitch == 0) {
    await Site.create({
      owner: _id,
      siteUrl,
      siteName,
      siteDetail,
      memo,
      inputId,
      inputPw,
    });
    await Notification.create({
      user_id: _id,
      userId,
      siteUrl,
      siteName,
      siteDetail,
      date: Date.now(),
      CRUD: "C",
      groupName,
    });
  } else if (modalSwitch == 1) {
    const filter = {
      $and: [{ owner: _id, _id: rowId }],
    };
    const update = {
      owner: _id,
      siteUrl,
      siteName,
      siteDetail,
      memo,
      inputId,
      inputPw,
    };
    console.log(req.session.user);
    await Notification.create({
      user_id: _id,
      userId,
      siteUrl,
      siteName,
      siteDetail,
      date: Date.now(),
      CRUD: "U",
      groupName,
    });
    await Site.findOneAndUpdate(filter, update);
  }
  res.redirect("/");
};

export const deleteRow = async (req, res) => {
  const { getUrl, rowId } = req.body;
  const owner = req.session.user._id;
  const groupName = "";
  const filter = { $and: [{ owner, _id: rowId }] };
  let siteName, siteDetail;
  Site.find(filter, function (err, docs) {
    siteName = docs[0].siteName;
    siteDetail = docs[0].siteDetail;
  });
  await Site.findOneAndDelete(filter);

  await Notification.create({
    userId: req.session.user.userId,
    siteUrl: getUrl,
    siteName,
    siteDetail,
    date: Date.now(),
    CRUD: "D",
    groupName,
  });
  return res.redirect("/");
};
export const deleteRowAll = async (req, res) => {
  const { getUrl } = req.body;
  const owner = req.session.user._id;
  const filter = { $and: [{ owner, siteUrl: getUrl }] };
  const user = Site({ owner: owner });
  // await Site.findOneAndDelete(filter);
};

import User from "../models/User";
import fetch from "node-fetch";
import bcrypt from "bcrypt";

export const index = (req, res) => res.render("index", { pageTitle: "index" });

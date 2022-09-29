const Med = require("../models/Med");
const express = require('express');
const router = express.Router();
const {ensureAuth} = require('../middleware/auth')

module.exports = {
  getProfile: async (req, res) => {
    try {
      //const meds = await Med.find({ user: req.user.id });
      res.render("profile.ejs");
    } catch (err) {
      console.log(err);
    }
  },
  getList: async (req, res) => {
    try {
      const meds = await Med.find({user: req.user.id});
      res.render("list.ejs", {meds: meds, user: req.user});
    } catch (err) {
      console.log(err);
    }
  },
  getAddDelete: async (req, res) => {
    try {
      //const meds = await Med.find({ user: req.user.id });
      res.render("addDelete.ejs");
    } catch (err) {
      console.log(err);
    }
  },
  getHistory: async (req, res) => {
    try {
      // const post = await Post.findById(req.params.id);
      // const comments = await Comment.find({post:req.params.id}).sort({ createdAt: "desc" }).lean();
      // res.render("post.ejs", { post: post, user: req.user, comments: comments});
      res.render("history.ejs");
    } catch (err) {
      console.log(err);
    }
  },

  createMed: async (req, res) => {
    try{
      await Med.create({
        substance: req.body.substance,
        dosage: req.body.dosage,
        notes: req.body.notes,
        user: req.user.id
      })
      res.redirect("/profile");
      console.log("Substance has been added!");
    } catch (err) {
      console.log(err);
    }
  },
  takeMed: async (req, res) => {
    try {
      await Med.findOneAndUpdate(
        { _id: req.params.id },
        {
          $currentDate: {createdAt: Date.now},
        }
      );
      console.log("You've taken your dose");
      res.redirect("/list");
    } catch (err) {
      console.log(err);
    }
  },
  deleteMed: async (req, res) => {
    try {
      // Delete med from db
      await Med.remove({ _id: req.params.id });
      console.log("Deleted Med");
      res.redirect("/list");
    } catch (err) {
      res.redirect("/list");
    }
  },
};
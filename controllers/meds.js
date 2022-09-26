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
      const meds = await Med.find({userId: req.user.id})
      //const meds = await Med.find().sort({ createdAt: "desc" }).lean();
      res.render("list.ejs", { med: req.user.med, notes: req.body.notes, dosage: req.body.dosage});
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
        meds: req.body.med,
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
          $inc: {createdAt: Date.now},
        }
      );
      console.log("You've taken your dose");
      res.redirect("list");
    } catch (err) {
      console.log(err);
    }
  },
  deleteMed: async (req, res) => {
    try {
      // Find post by id
      let med = await Med.findById({ _id: req.params.id });
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Med");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
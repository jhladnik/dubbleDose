const Med = require("../models/Med");
const express = require('express');
const router = express.Router();
const {ensureAuth} = require('../middleware/auth')

module.exports = {
  getProfile: async (req, res) => {
    try {
      res.render("profile.ejs");
    } catch (err) {
      console.log(err);
    }
  },

  getList: async (req, res) => {
    try {
      const meds = await Med.find({user: req.user.id});
      //if there are no entries, just render page without any grid
      if(meds.length<1){
        res.render("list.ejs", {meds: meds, user: req.user});
      }else{
        //render any unique objects
        const noDupes = meds.filter(obj => {
          return obj.type===0;
        })
      console.log(noDupes);
      res.render("list.ejs", {meds: noDupes, user: req.user});
      }
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

      //grab all of the user's files that state the med was taken
      const userRcds= await Med.find({user: req.user.id, times: 1});

      let today = new Date().toString().slice(0,15);

      console.log(today);
      res.render("history.ejs", {userRcds: userRcds, today: today});
    } catch (err) {
      console.log(err);
    }
  },

  deleteHistory: async (req, res) => {
    try {
      // Delete med from db
      await Med.remove({ _id: req.params.id });
      console.log("Deleted Med");
      res.redirect("/history");
    } catch (err) {
      res.redirect("/history");
    }
  },


  createMed: async (req, res) => {
    try{
      const dayOfDate = new Date().toString();
      await Med.create({
        substance: req.body.substance,
        dosage: req.body.dosage,
        notes: req.body.notes,
        times: 0,
        lastTaken: `${dayOfDate}`,
        type: 0,
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
      const dayOfDate = new Date().toString();
      const dateCheck = await Med.findById({ _id: req.params.id });
      const dateOfLast = (dateCheck.createdAt).toString().slice(0,15);

        await Med.create(
          //create a new day entry in the database for the user and the substance
          {
            substance: dateCheck.substance,
            dosage: dateCheck.dosage,
            notes: dateCheck.notes,
            times: 1,
            lastTaken:dayOfDate,
            type: 1,
            user: req.user.id,
          }
        );
      
      console.log(`Last taken now: ${dateOfLast}`);
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
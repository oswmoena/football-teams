const express = require("express");
const bodyParser = require("body-parser");
const League = require("../models/league");

const app = express();

app.use(bodyParser.json());

app.get("/leagues", (req, res, next) => {
  let from = req.query.from || 0;
  from = Number(from);
  let per = req.query.per || 5;
  per = Number(per);

  return League.find({ state: true }, "name country code")
    .skip(from)
    .limit(per)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }

      League.estimatedDocumentCount((err, count) => {
        if (err) throw err;
        res.status(200).json({
          ok: true,
          data,
          count,
        });
      });
    });
});

app.post("/league", (req, res, next) => {
  let body = req.body;

  let league = new League({
    name: body.name,
    country: body.country,
    code: body.code,
  });

  return league.save((err, leagueDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    res.json({
      ok: true,
      user: leagueDB,
    });
  });

  next();
});

module.exports = app;

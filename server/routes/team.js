const express = require("express");
const bodyParser = require("body-parser");
const Team = require("../models/team");
const League = require("../models/league");

const app = express();

app.use(bodyParser.json());

app.get("/teams", (req, res, next) => {
  let from = req.query.from || 0;
  from = Number(from);
  let per = req.query.per || 5;
  per = Number(per);

  return Team.find({ state: true }, "name img league")
    .skip(from)
    .limit(per)
    .exec((err, teams) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }

      Team.estimatedDocumentCount((err, count) => {
        if (err) throw err;
        League.populate(teams, { path: "league" }, function (err, data) {
          res.status(200).json({
            ok: true,
            data,
            count,
          });
        });
      });
    });
});

app.post("/team", (req, res, next) => {
  let body = req.body;

  let team = new Team({
    name: body.name,
    img: body.img,
    league: body.league,
  });

  return team.save((err, teamDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    res.json({
      ok: true,
      user: teamDB,
    });
  });
});

app.post("/teams", (req, res, next) => {
    let bodyArr = req.body;
  
    return bodyArr.map((body) => { 
        let team = new Team({
            name: body.name,
            img: body.img,
            league: body.league,
          });
        
          return team.save((err, teamDB) => {
            if (err) {
              return res.status(400).json({
                ok: false,
                err,
              });
            }
            res.json({
              ok: true,
              user: teamDB,
            });
          });
    });
});

module.exports = app;

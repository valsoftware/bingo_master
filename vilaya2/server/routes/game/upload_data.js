const { pool } = require("../../mySQLDB");
const formidable = require("formidable");
const { imageToBase64 } = require("../../io");
const fs = require("fs");
const { type } = require("os");
const { json } = require("express");

const ww01_q_a = (req, res) => {
  new formidable.IncomingForm().parse(req, async (err, fields, files) => {
    let { game_id } = req.params;

    let val = Object.entries(fields);

    let newArr = [];

    for (let index = 0; index < val.length; index++) {
      newArr.push([game_id, val[index][0], val[index][1]]);
    }

    console.log(newArr);

    newArr.forEach(async (itm) => {
      await pool.query(
        "INSERT INTO ww01_q_a(game_id,question,answer)  VALUES(?,?,?)",
        itm
      );
    });

    res.json("best");
  });
};

const wp02_a = (req, res) => {
  let { game_id } = req.params;

  let form = new formidable.IncomingForm();
  form.parse(req);

  form.on("fileBegin", function (name, file) {
    file.path = __dirname + "/temp/" + file.name;
  });

  form.on("file", async (name, file) => {
    base64data = imageToBase64(file.path);

    await pool.query(
      "INSERT INTO wp02_q_a (game_id,answer) VALUES(?,?)",
      [game_id, base64data],
      async (err, rows) => {
        res.json("uploaded successfully");
      }
    );
  });
};

const wp02_middleware = async (req, res) => {
  let { game_id } = req.params;

  await pool.query(
    "SELECT * FROM wp02_q_a where game_id = ? ",
    [game_id],
    (err, rows) => {
      res.json(rows);
    }
  );
};

const wp02_q = (req, res) => {
  new formidable.IncomingForm().parse(req, async (err, fields, files) => {
    let { game_id } = req.params;

    let val = Object.entries(fields);

    console.log(val);

    val.forEach(async (itm) => {
      await pool.query(
        "UPDATE wp02_q_a SET question = ? WHERE q_a_id = ?",
        itm
      );
    });
    res.json('done')
  });
};

module.exports = {
  ww01_q_a,
  wp02_a,
  wp02_q,
  wp02_middleware,
};

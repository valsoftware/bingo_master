const { pool } = require("../../mySQLDB");
const formidable = require("formidable");

const ww01_invitation = (req, res) => {
  new formidable.IncomingForm().parse(req, async (err, fields, files) => {
    let { user_id } = req.params;

    await pool.query(
      "SELECT invite.game_type,invite.game_id, games.game_name,room_id, users.user_name, attendee_user_id as logo FROM  invite INNER JOIN users ON users.user_id = invite.user_id INNER JOIN games ON invite.game_id = games.game_id WHERE attendee_user_id = ? AND invite.game_type = 1 GROUP BY invite.game_id,invite.room_id,users.user_name",
      [user_id],
      (err, rows) => {
        res.json(rows);
      }
    );
  });
};

const wp02_invitation = (req, res) => {
  new formidable.IncomingForm().parse(req, async (err, fields, files) => {
    let { user_id } = req.params;
    await pool.query(
      "SELECT invite.game_type,invite.game_id, games.game_name,room_id, users.user_name, attendee_user_id,max(answer) as logo FROM  invite INNER JOIN users ON users.user_id = invite.user_id INNER JOIN games ON invite.game_id = games.game_id INNER JOIN wp02_q_a ON wp02_q_a.game_id = invite.game_id WHERE attendee_user_id = ? AND invite.game_type = 2 GROUP BY invite.game_id,invite.room_id,users.user_name",
      [user_id],
      (err, rows) => {
        res.json(rows);
      }
    );
  });
};

const ww01_game_info = (req, res) => {
  new formidable.IncomingForm().parse(req, async (err, fields, files) => {
    let { user_id } = req.params;

    await pool.query(
      "select games.game_id,about_game,games.user_id,game_level, game_name, game_type , MAX(ww01_q_a.answer) as logo from games left join ww01_q_a  on games.game_id = ww01_q_a.game_id where games.user_id=? and games.game_type = 1 GROUP BY games.game_id",
      [user_id],
      (err, rows) => {
        res.json(rows);
      }
    );
  });
};

const wp02_game_info = (req, res) => {
  new formidable.IncomingForm().parse(req, async (err, fields, files) => {
    let { user_id } = req.params;

    await pool.query(
      "select games.game_id,about_game,games.user_id, game_name,game_level, game_type , MAX(wp02_q_a.answer) as logo from games left join wp02_q_a  on games.game_id = wp02_q_a.game_id where games.user_id=? and games.game_type = 2 GROUP BY games.game_id",
      [user_id],
      (err, rows) => {
        res.json(rows);
      }
    );
  });
};

const ww01_game = (req, res) => {
  new formidable.IncomingForm().parse(req, async (err, fields, files) => {
    let { game_id } = req.params;

    await pool.query(
      "SELECT * from ww01_q_a where game_id = ?",
      [game_id],
      (err, rows) => {
        res.json(rows);
      }
    );
  });
};

const wp02_game = (req, res) => {
  new formidable.IncomingForm().parse(req, async (err, fields, files) => {
    let { game_id } = req.params;

    await pool.query(
      "SELECT * from wp02_q_a where game_id = ?",
      [game_id],
      (err, rows) => {
        res.json(rows);
      }
    );
  });
};

module.exports = {
  ww01_game,
  wp02_game,
  ww01_invitation,
  wp02_invitation,
  ww01_game_info,
  wp02_game_info,
};

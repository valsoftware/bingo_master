const { pool } = require("../../mySQLDB");
const formidable = require("formidable");

const invite = (req, res) => {
  new formidable.IncomingForm().parse(req, async (err, fields, files) => {
    let game_type = 1;

    await pool.query(
      "select * from users where email_id = ?",
      [fields.attendeeMailId],
      async (err, rows) => {
        if (rows[0]) {
          await pool.query(
            "select * from invite where attendee_user_id = ? and room_id = ? ",
            [rows[0].user_id, fields.roomId],
            async (err, row) => {
              if (row[0]) {
                res.json("Already Invited");
              } else {
                await pool.query(
                  "INSERT INTO invite(user_id,game_id,attendee_user_id,game_type,room_id) VALUES(?,?,?,?,?)",
                  [
                    fields.userId,
                    fields.gameId,
                    rows[0].user_id,
                    fields.gameCode,
                    fields.roomId,
                  ],
                  (err, rows) => {
                    res.json("Invited Successfully");
                  }
                );
              }
            }
          );
        } else {
          res.json("Not Bingo a User");
        }
      }
    );
  });
};

module.exports = {
  invite,
};

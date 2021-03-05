const { pool } = require("../../mySQLDB");
const formidable = require("formidable");

const delete_game = (req, res) => {
  new formidable.IncomingForm().parse(req, async (err, fields, files) => {
    let { game_type, game_id } = req.params;

    if (game_type == 1) {
      await pool.query(
        "DELETE from ww01_q_a WHERE game_id = ? ",
        [game_id],
        async (err, rows) => {
          await pool.query(
            "DELETE from invite WHERE game_id = ? ",
            [game_id],
            async (err, rows) => {
              await pool.query(
                "DELETE from games WHERE game_id = ? ",
                [game_id],
                async (err, rows) => {
                  res.json("Deleted Succcessfully");
                }
              );
            }
          );
        }
      );
    } else if (game_type == 2) {
      await pool.query(
        "DELETE from wp02_q_a WHERE game_id = ? ",
        [game_id],
        async (err, rows) => {
          await pool.query(
            "DELETE from invite WHERE game_id = ? ",
            [game_id],
            async (err, rows) => {
              await pool.query(
                "DELETE from games WHERE game_id = ? ",
                [game_id],
                async (err, rows) => {
                  res.json("Deleted Succcessfully");
                }
              );
            }
          );
        }
      );
    }
  });
};

module.exports = {
  delete_game,
};

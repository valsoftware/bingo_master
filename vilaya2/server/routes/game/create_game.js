const { pool } = require("../../mySQLDB");
const formidable = require("formidable");

const game_info = (req, res) => {
    new formidable.IncomingForm().parse(req, async (err, fields, files) => {
      let { user_id } = req.params;
  
      await pool.query(
        "INSERT INTO games (user_id, game_type ,game_name, game_level, about_game) VALUES(?,?,?,?,?)",
        [user_id, fields.gameType, fields.gameName, fields.gameLevel , fields.aboutGame ],
        (err,rows)=>{
          res.json(rows.insertId)
        }
      );
    });
  };
  
  
module.exports = {
    game_info,
  };
  
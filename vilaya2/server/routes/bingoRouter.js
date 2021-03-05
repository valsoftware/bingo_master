const { json } = require("express");
const express = require("express");
const { register, login ,user_info} = require('./auth');
const {game_info} = require('./game/create_game')
const {wp02_a,wp02_q,wp02_middleware,ww01_q_a} = require('./game/upload_data')
const {ww01_game_info,wp02_game_info,ww01_invitation,wp02_invitation,ww01_game,wp02_game} = require('./game/play_game')
const {invite} = require('./game/invite_game')
const {delete_game} = require('./game/delete_game')


function routes() {
  const bingoRouter = express.Router();

  // auth
  bingoRouter.route("/register").post(register); 
  bingoRouter.route("/login").post(login);
  bingoRouter.route("/user_info/:user_id").get(user_info); 

  //create game
  bingoRouter.route("/game_info/:user_id").post(game_info);

      //ww01 game
      bingoRouter.route("/ww01_q_a/:game_id").post(ww01_q_a)

      //wp02 game
      bingoRouter.route("/wp02_a/:game_id").post(wp02_a)
      bingoRouter.route("/wp02_middleware/:game_id").get(wp02_middleware) 
      bingoRouter.route("/wp02_q/:game_id").post(wp02_q) 
 

  //play game 
  bingoRouter.route("/ww01_invitation/:user_id").get(ww01_invitation);

  bingoRouter.route("/wp02_invitation/:user_id").get(wp02_invitation);
  
  bingoRouter.route("/ww01_game_info/:user_id").get(ww01_game_info);
      bingoRouter.route("/ww01_game/:game_id").get(ww01_game);
  
  bingoRouter.route("/wp02_game_info/:user_id").get(wp02_game_info);
      bingoRouter.route("/wp02_game/:game_id").get(wp02_game);


bingoRouter.route("/delete_game/:game_type/:game_id").delete(delete_game);
bingoRouter.route("/invite").post(invite);



  return bingoRouter;
}

module.exports = routes;
         
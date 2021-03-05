import React, { Component, Fragment } from "react";
import WordGame from "../../components/gameComponents/WordBoard";
import Dice from "../../components/gameComponents/Dice";
import "../Stylesheets/invite.css";
import NavBar from "../../components/Navigation";
import AutoDice from "../../components/gameComponents/AutoDice";
import "../Stylesheets/boardGrid.css";

export default class WordSinglePlayGame extends Component {
  render() {
    return (
      <Fragment>
        <NavBar activeGames="text-danger" />
        <div class="container table-bordered border-danger" id="main">
          <div id="clueBoard">
            <AutoDice
              api={this.props.api}
              id={"/ww01_game/" + this.props.location.state.game_id}
            />
          </div>

          <div id="pictureBoard">
            <WordGame
              api={this.props.api}
              id={this.props.location.state.game_id}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}

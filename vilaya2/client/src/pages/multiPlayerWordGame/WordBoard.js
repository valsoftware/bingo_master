import React, { Component, Fragment } from "react";
import WordGame from "../../components/gameComponents/WordBoard";
import Clues from "../../components/gameComponents/Clues";
import NavBar from "../../components/Navigation";
import "../Stylesheets/boardGrid.css";

export default class WordBoardGame extends Component {
  render() {
    return (
      <Fragment>
        <NavBar activeGames="text-danger" />
        <div class="container table-bordered border-danger" id="main">
          <div id="clueBoard">
            <Clues
              roomId={this.props.location.state.roomId}
              userId={this.props.location.state.userId}
            />
          </div>

          <div id="pictureBoard">
            <WordGame
              api={this.props.api}
              id={this.props.location.state.game_id}
            />{" "}
          </div>
        </div>
      </Fragment>
    );
  }
}

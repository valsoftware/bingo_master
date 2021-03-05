import PictureBoard from "../../components/gameComponents/PictureBoard";
import Dice from "../../components/gameComponents/Dice";
import React, { Component, Fragment } from "react";
import NavBar from "../../components/Navigation";
import AutoDice from "../../components/gameComponents/AutoDice";
import "../Stylesheets/boardGrid.css";

export default class PictureSinglePlayGame extends Component {
  render() {

    return (
      <Fragment>
        <NavBar activeGames="text-danger" />
        <div class="container table-bordered border-danger" id="main">
          <div id="clueBoard">
            <AutoDice
              api={this.props.api}
              id={"/wp02_game/" + this.props.location.state.game_id}
            />{" "}
          </div>

          <div id="pictureBoard">
            <PictureBoard
              api={this.props.api}
              id={this.props.location.state.game_id}
            />{" "}
          </div>
        </div>
      </Fragment>
    );
  }
}

import React, { Component, Fragment } from "react";
import {
  getRandom,
  removeElement,
  shuffleArray,
  loadJsonDataToArray,
} from "../../modules/io";

export default class AutoDice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clues: [],
      clue: "",
      endGame: "",
      time: 0,
      hideStartButton: false,
    };
  }

  componentDidMount = async () => {
    try {
      let response = await fetch(this.props.api + this.props.id);

      let jsonData = await response.json();

      let clueArray = loadJsonDataToArray(jsonData, "question");

      let shuffledArray = shuffleArray(clueArray);

      this.setState({ clues: shuffledArray });
    } catch (err) {
      console.error(err.message);
    }
  };

  Timer() {
    this.state.hideStartButton = true;

    setInterval(() => {
      this.setState({ time: this.state.time });

      if (this.state.time == 1) {
        if (this.state.clues.length == 0) {
          this.setState({ endGame: "End Game" });
        } else {
          var randomWord = getRandom(this.state.clues);

          removeElement(randomWord, this.state.clues);

          this.setState({ clue: randomWord });
        }
      }

      if (this.state.endGame) {
        this.state.time = 0;
      }

      this.state.time = this.state.time + 1;

      if (this.state.time == 11) {
        this.state.time = 1;
      }
    }, 1000);
  }

  render() {
    return (
      <Fragment>
        <div>
          <p style={{ textAlign: "center" }}>{this.state.time}</p>

          <div className="col">
            <button class="btn btn-squar-default btn-warning">
              {this.state.endGame ? (
                <h1 style={{ color: "#ea7066" }}>{this.state.endGame}</h1>
              ) : (
                <h5 className="text-danger">{this.state.clue}</h5>
              )}{" "}
            </button>
          </div>
          {!this.state.hideStartButton && (
            <button
              type="button"
              style={{
                alignItems: "center",
                margin: 30,
              }}
              className="btn btn-danger submit"
              onClick={this.Timer.bind(this)}
            >
              Start
            </button>
          )}
        </div>
      </Fragment>
    );
  }
}

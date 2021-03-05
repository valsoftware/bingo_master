import React, { Fragment, Component } from "react";
import "./Dice.css";
import io from "socket.io-client";
import {getRandom,removeElement,shuffleArray,loadJsonDataToArray} from '../../modules/io'

const socket = io.connect("/");

export default class Dice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clues: [], 
      endGame: "",
      clue: "",

    };
  }

  componentDidMount = async () => {
    try {

      let response = await fetch(this.props.api + this.props.id);

      let jsonData = await response.json();


      let clueArray = loadJsonDataToArray(jsonData, 'question')


      let shuffledArray = shuffleArray(clueArray)


      this.setState({ clues: shuffledArray });
    } catch (err) {
      console.error(err.message);     
    }
       
  };

 
  runDice() { 
    if (this.state.clues.length == 0) {
      this.setState({ endGame: "End Game" });
    } else {
      var randomWord = getRandom(this.state.clues)

      removeElement(randomWord,this.state.clues)


      socket.emit('sendMessage',{dice:randomWord,roomId:this.props.roomId})

      this.setState({ clue: randomWord });

    }
  }

  render() {
    return (   
      <Fragment>
          <div>
            <button class="btn clue-board btn-success">
              {this.state.endGame ? (
                <h1 style={{ color: "#ea7066" }}>{this.state.endGame}</h1>
              ) : (
                <h5 className='text-danger'>{this.state.clue}</h5>
              )}
            </button>
  
            <div> 
              <button
                type="button"
                style={{marginTop:20}}
                class="btn btn-danger submit"
                onClick={this.runDice.bind(this)}
              >
                Roll
              </button>
            </div>
          </div>

      </Fragment>
    );
  }



}
     
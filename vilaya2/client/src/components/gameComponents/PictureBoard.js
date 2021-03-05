import React, { Fragment, Component } from "react";
import "./PictureBoard.css";
import Preloader from '../Preloader'
import { shuffleArray, loadJsonDataToArray } from '../../modules/io'
import { GAME_TITLE,WON,FAIL } from '../../modules/constants'
import { constants } from "buffer";

export default class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cells: [],
      images: [],
      hide: 0.15,
      show:1,
      preloader: true,
      result:''
    };

    for (var i = 0; i < 25; i++) this.state.cells[i] = false;
  }


  clicked(id) {
    if (document.getElementById(id).style.opacity == this.state.hide){
      document.getElementById(id).style.opacity = this.state.show
      document.getElementById(id).style.cursor = "pointer";
      this.state.cells[id] = !this.state.cells[id];
      return;
    }
 
    document.getElementById(id).style.opacity = this.state.hide;
    this.state.cells[id] = !this.state.cells[id];
    document.getElementById(id).style.cursor = "auto";
  }

result(){
  let index=this.validate()
  if(index){
    this.setState({result:<h2 style={{color:'green'}}>{WON}</h2>})
  }else{
    this.setState({result:<h2 style={{color:'red'}}>{FAIL}</h2>})
  }
}

 validate()
  {
      return  (this.state.cells[0]  && this.state.cells[1]  && this.state.cells[2]  && this.state.cells[3]  && this.state.cells[4])  || // 0 horizontal
              (this.state.cells[5]  && this.state.cells[6]  && this.state.cells[7]  && this.state.cells[8]  && this.state.cells[9])  || // 5 horizontal
              (this.state.cells[10] && this.state.cells[11] && this.state.cells[12] && this.state.cells[13] && this.state.cells[14]) || // 10 horizontal
              (this.state.cells[15] && this.state.cells[16] && this.state.cells[17] && this.state.cells[18] && this.state.cells[19]) || // 15 horizontal
              (this.state.cells[20] && this.state.cells[21] && this.state.cells[22] && this.state.cells[23] && this.state.cells[24]) || // 20 horizontal
              (this.state.cells[0]  && this.state.cells[5]  && this.state.cells[10] && this.state.cells[15] && this.state.cells[20]) || // 0 vertical
              (this.state.cells[1]  && this.state.cells[6]  && this.state.cells[11] && this.state.cells[16] && this.state.cells[21]) || // 1 vertical
              (this.state.cells[2]  && this.state.cells[7]  && this.state.cells[12] && this.state.cells[17] && this.state.cells[22]) || // 2 vertical
              (this.state.cells[3]  && this.state.cells[8]  && this.state.cells[13] && this.state.cells[18] && this.state.cells[23]) || // 3 vertical
              (this.state.cells[4]  && this.state.cells[9]  && this.state.cells[14] && this.state.cells[19] && this.state.cells[24]) || // 4 vertical
              (this.state.cells[0]  && this.state.cells[6]  && this.state.cells[12] && this.state.cells[18] && this.state.cells[24]) || // 0 diagonal
              (this.state.cells[4]  && this.state.cells[8]  && this.state.cells[12] && this.state.cells[16] && this.state.cells[20])    // 4 diagonal
          ;
  }

  componentDidMount = async () => {

    try {
      let response = await fetch(
        this.props.api + "/wp02_game/" + this.props.id
      );
      let jsonData = await response.json();

      this.setState({ preloader: false })

      let pictureArray = loadJsonDataToArray(jsonData, 'answer')

      let shuffledArray = shuffleArray(pictureArray)

      this.setState({ images: shuffledArray });
    } catch (err) {
      console.error(err.message);
    }

  };

  render() {
    return (
      <Fragment>
        {this.state.preloader && <Preloader />}
        <div className="container-fluid" >
          <table
            className="table-pic border-danger table-size"
          >
            <tr>
              <td onClick={this.clicked.bind(this,0)} className="td">
                {" "}
                <img
                  id='0'
                  className="boardImageSize"
                  src={`data:image/png;base64,${this.state.images[0]}`}
                />
              </td>
              <td onClick={this.clicked.bind(this,1)} className="td">
                {" "}
                <img
                  id="1"
                  className="boardImageSize"
                  src={`data:image/png;base64,${this.state.images[1]}`}
                />
              </td>
              <td onClick={this.clicked.bind(this,2)} className="td">
                {" "}
                <img
                  id="2"
                  className="boardImageSize"
                  src={`data:image/png;base64,${this.state.images[2]}`}
                />
              </td>
              <td onClick={this.clicked.bind(this,3)} className="td">
                {" "}
                <img
                  id="3"
                  className="boardImageSize"
                  src={`data:image/png;base64,${this.state.images[3]}`}
                />
              </td>
              <td onClick={this.clicked.bind(this,4)} className="td">
                {" "}
                <img
                  id="4"
                  className="boardImageSize"
                  src={`data:image/png;base64,${this.state.images[4]}`}
                />
              </td>
            </tr>
            <tr>
              <td onClick={this.clicked.bind(this,5)} className="td">
                {" "}
                <img
                  id="5"
                  className="boardImageSize"
                  src={`data:image/png;base64,${this.state.images[5]}`}
                />
              </td>
              <td onClick={this.clicked.bind(this,6)} className="td">
                {" "}
                <img
                  id="6"
                  className="boardImageSize"
                  src={`data:image/png;base64,${this.state.images[6]}`}
                />
              </td>
              <td onClick={this.clicked.bind(this,7)} className="td">
                {" "}
                <img
                  id="7"
                  className="boardImageSize"
                  src={`data:image/png;base64,${this.state.images[7]}`}
                />
              </td>
              <td onClick={this.clicked.bind(this,8)} className="td">
                {" "}
                <img
                  id="8"
                  className="boardImageSize"
                  src={`data:image/png;base64,${this.state.images[8]}`}
                />
              </td>
              <td onClick={this.clicked.bind(this,9)} className="td">
                {" "}
                <img
                  id="9"
                  className="boardImageSize"
                  src={`data:image/png;base64,${this.state.images[9]}`}
                />
              </td>
            </tr>
            <tr>
              <td onClick={this.clicked.bind(this,10)} className="td">
                {" "}
                <img
                  id="10"
                  className="boardImageSize"
                  src={`data:image/png;base64,${this.state.images[10]}`}
                />
              </td>
              <td onClick={this.clicked.bind(this,11)} className="td">
                {" "}
                <img
                  id="11"
                  className="boardImageSize"
                  src={`data:image/png;base64,${this.state.images[11]}`}
                />
              </td>
              <td onClick={this.clicked.bind(this,12)} className="td">
                {" "}
                <img
                  id="12"
                  className="boardImageSize"
                  src={`data:image/png;base64,${this.state.images[12]}`}
                />
              </td>
              <td onClick={this.clicked.bind(this,13)} className="td">
                {" "}
                <img
                  id="13"
                  className="boardImageSize"
                  src={`data:image/png;base64,${this.state.images[13]}`}
                />
              </td>
              <td onClick={this.clicked.bind(this,14)} className="td">
                {" "}
                <img
                  id="14"
                  className="boardImageSize"
                  src={`data:image/png;base64,${this.state.images[14]}`}
                />
              </td>
            </tr>
            <tr>
              <td onClick={this.clicked.bind(this,15)} className="td">
                {" "}
                <img
                  id="15"
                  className="boardImageSize"
                  src={`data:image/png;base64,${this.state.images[15]}`}
                />
              </td>
              <td onClick={this.clicked.bind(this,16)} className="td">
                {" "}
                <img
                  id="16"
                  className="boardImageSize"
                  src={`data:image/png;base64,${this.state.images[16]}`}
                />
              </td>
              <td onClick={this.clicked.bind(this,17)} className="td">
                {" "}
                <img
                  id="17"
                  className="boardImageSize"
                  src={`data:image/png;base64,${this.state.images[17]}`}
                />
              </td>
              <td onClick={this.clicked.bind(this,18)} className="td">
                {" "}
                <img
                  id="18"
                  className="boardImageSize"
                  src={`data:image/png;base64,${this.state.images[18]}`}
                />
              </td>
              <td onClick={this.clicked.bind(this,19)} className="td">
                {" "}
                <img
                  id="19"
                  className="boardImageSize"
                  src={`data:image/png;base64,${this.state.images[19]}`}
                />
              </td>
            </tr>
            <tr>
              <td onClick={this.clicked.bind(this,20)} className="td">
                {" "}
                <img
                  id="20"
                  className="boardImageSize"
                  src={`data:image/png;base64,${this.state.images[20]}`}
                />
              </td>
              <td onClick={this.clicked.bind(this,21)} className="td">
                {" "}
                <img
                  id="21"
                  className="boardImageSize"
                  src={`data:image/png;base64,${this.state.images[21]}`}
                />
              </td>
              <td onClick={this.clicked.bind(this,22)} className="td">
                {" "}
                <img
                  id="22"
                  className="boardImageSize"
                  src={`data:image/png;base64,${this.state.images[22]}`}
                />
              </td>
              <td onClick={this.clicked.bind(this,23)} className="td">
                {" "}
                <img
                  id="23"
                  className="boardImageSize"
                  src={`data:image/png;base64,${this.state.images[23]}`}
                />
              </td>
              <td onClick={this.clicked.bind(this,24)} className="td">
                {" "}
                <img
                  id="24"
                  className="boardImageSize"
                  src={`data:image/png;base64,${this.state.images[24]}`}
                />
              </td>
            </tr>
          </table>
          {this.state.result}
          <button
            type="button"
            style={{ alignItems: "center"}}
            className="btn btn-danger submit"
            onClick={this.result.bind(this)}
          >
            {GAME_TITLE}
          </button>
        </div>
      </Fragment>
    );
  }
}

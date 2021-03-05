import React, { Component, Fragment } from "react";
import "./WordBoard.css";
import Preloader from '../Preloader'
import {shuffleArray,loadJsonDataToArray} from '../../modules/io'
import {GAME_TITLE,WON,FAIL} from '../../modules/constants'

export default class WordBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cells: [],
      words: [],
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
      const response = await fetch(this.props.api + "/ww01_game/" + this.props.id);
      const jsonData = await response.json();

      console.log(jsonData)

      this.setState({preloader:false})
      
      let wordArray = loadJsonDataToArray(jsonData,'answer')
 
      var shuffledArray = shuffleArray(wordArray)

      this.setState({ words: shuffledArray });
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
            className="table-red "
            style={{ height: 300, width: 300 }}
          >
            <tr>
              <td>
                <button
                  id="0"
                  onClick={this.clicked.bind(this,0)}
                  type="button"
                  class="btn btn-squared-default btn-primary  buttonText "
                >
                 <p className='buttonFeatures'> {this.state.words[0]}</p>
                </button>
              </td>
              <td>
                <button
                  id="1"
                  onClick={this.clicked.bind(this,1)}
                  type="button"
                  class="btn btn-squared-default btn-primary  buttonText"
                >
                 <p className='buttonFeatures'> {this.state.words[1]}</p>
                </button>
              </td>
              <td>
                <button
                  id="2"
                  onClick={this.clicked.bind(this,2)}
                  type="button"
                  class="btn btn-squared-default btn-primary  buttonText"
                >
                 <p className='buttonFeatures'> {this.state.words[2]}</p>
                </button>
              </td>
              <td>
                <button
                  id="3"
                  onClick={this.clicked.bind(this,3)}
                  type="button"
                  class="btn btn-squared-default btn-primary  buttonText"
                >
                 <p className='buttonFeatures'> {this.state.words[3]}</p>
                </button>
              </td>
              <td>
                <button
                  id="4"
                  onClick={this.clicked.bind(this,4)}
                  type="button"
                  class="btn btn-squared-default btn-primary  buttonText"
                >
                 <p className='buttonFeatures'> {this.state.words[4]}</p>
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <button
                  id="5"
                  onClick={this.clicked.bind(this,5)}
                  type="button"
                  class="btn btn-squared-default btn-primary  buttonText"
                >
                 <p className='buttonFeatures'> {this.state.words[5]}</p>
                </button>
              </td>
              <td>
                <button
                  id="6"
                  onClick={this.clicked.bind(this,6)}
                  type="button"
                  class="btn btn-squared-default btn-primary  buttonText"
                >
                 <p className='buttonFeatures'> {this.state.words[6]}</p>
                </button>
              </td>
              <td>
                <button
                  id="7"
                  onClick={this.clicked.bind(this,7)}
                  type="button"
                  class="btn btn-squared-default btn-primary  buttonText"
                >
                 <p className='buttonFeatures'> {this.state.words[7]}</p>
                </button>
              </td>
              <td>
                <button
                  id="8"
                  onClick={this.clicked.bind(this,8)}
                  type="button"
                  class="btn btn-squared-default btn-primary  buttonText"
                >
                 <p  className='buttonFeatures'> {this.state.words[8]}</p>
                </button>
              </td>
              <td>
                <button
                  id="9"
                  onClick={this.clicked.bind(this,9)}
                  type="button"
                  class="btn btn-squared-default btn-primary  buttonText"
                >
                 <p className='buttonFeatures'> {this.state.words[9]}</p>
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <button
                  id="10"
                  onClick={this.clicked.bind(this,10)}
                  type="button"
                  class="btn btn-squared-default btn-primary  buttonText"
                >
                 <p className='buttonFeatures'> {this.state.words[10]}</p>
                </button>
              </td>
              <td>
                <button
                  id="11"
                  onClick={this.clicked.bind(this,11)}
                  type="button"
                  class="btn btn-squared-default btn-primary  buttonText"
                >
                 <p className='buttonFeatures'> {this.state.words[11]}</p>
                </button>
              </td>
              <td>
                <button
                  id="12"
                  onClick={this.clicked.bind(this,12)}
                  type="button"
                  class="btn btn-squared-default btn-primary  buttonText"
                >
                 <p className='buttonFeatures'> {this.state.words[12]}</p>
                </button>
              </td>
              <td>
                <button
                  id="13"
                  onClick={this.clicked.bind(this,13)}
                  type="button"
                  class="btn btn-squared-default btn-primary  buttonText"
                >
                 <p className='buttonFeatures'> {this.state.words[13]}</p>
                </button>
              </td>
              <td>
                <button
                  id="14"
                  onClick={this.clicked.bind(this,14)}
                  type="button"
                  class="btn btn-squared-default btn-primary  buttonText"
                >
                 <p className='buttonFeatures'> {this.state.words[14]}</p>
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <button
                  id="15"
                  onClick={this.clicked.bind(this,15)}
                  type="button"
                  class="btn btn-squared-default btn-primary  buttonText"
                >
                 <p className='buttonFeatures'> {this.state.words[15]}</p>
                </button>
              </td>
              <td>
                <button
                  id="16"
                  onClick={this.clicked.bind(this,16)}
                  type="button"
                  class="btn btn-squared-default btn-primary  buttonText"
                >
                 <p className='buttonFeatures'> {this.state.words[16]}</p>
                </button>
              </td>
              <td>
                <button
                  id="17"
                  onClick={this.clicked.bind(this,17)}
                  type="button"
                  class="btn btn-squared-default btn-primary  buttonText"
                >
                 <p className='buttonFeatures'> {this.state.words[17]}</p>
                </button>
              </td>
              <td>
                <button
                  id="18"
                  onClick={this.clicked.bind(this,18)}
                  type="button"
                  class="btn btn-squared-default btn-primary  buttonText"
                >
                 <p className='buttonFeatures'> {this.state.words[18]}</p>
                </button>
              </td>
              <td>
                <button
                  id="19"
                  onClick={this.clicked.bind(this,19)}
                  type="button"
                  class="btn btn-squared-default btn-primary  buttonText"
                >
                 <p className='buttonFeatures'> {this.state.words[19]}</p>
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <button
                  id="20"
                  onClick={this.clicked.bind(this,20)}
                  type="button"
                  class="btn btn-squared-default btn-primary  buttonText"
                >
                 <p className='buttonFeatures'> {this.state.words[20]}</p>
                </button>
              </td>
              <td>
                <button
                  id="21"
                  onClick={this.clicked.bind(this,21)}
                  type="button"
                  class="btn btn-squared-default btn-primary  buttonText"
                >
                 <p className='buttonFeatures'> {this.state.words[21]}</p>
                </button>
              </td>
              <td>
                <button
                  id="22"
                  onClick={this.clicked.bind(this,22)}
                  type="button"
                  class="btn btn-squared-default btn-primary  buttonText"
                >
                 <p className='buttonFeatures'> {this.state.words[22]}</p>
                </button>
              </td>
              <td>
                <button
                  id="23"
                  onClick={this.clicked.bind(this,23)}
                  type="button"
                  class="btn btn-squared-default btn-primary  buttonText"
                >
                 <p className='buttonFeatures'> {this.state.words[23]}</p>
                </button>
              </td>
              <td>
                <button
                  id="24"
                  onClick={this.clicked.bind(this,24)}
                  type="button"
                  class="btn btn-squared-default btn-primary  buttonText"
                >
                 <p className='buttonFeatures'> {this.state.words[24]}</p>
                </button>
              </td>
            </tr>
          </table>
          {this.state.result}
          <button
            type="button"
            style={{ alignItems: "center" }}
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

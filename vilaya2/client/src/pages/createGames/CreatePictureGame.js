import React, { Component, Fragment } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import NavBar from "../../components/Navigation";
import Uploader from "../../components/Uploader/ImageUploader";
import { Upload } from "@progress/kendo-react-upload";
import "@progress/kendo-theme-material/dist/all.css";

export default class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      api: this.props.api,

      pictureGame: "",
      gameLevel: "",
      aboutGame: "",
      game_id: "",
      setQuestion: false,
      answerArray: [],
      done:""
    };
    this.handlechangearray = this.handlechangearray.bind(this);
  }

  handlechangearray(id, e) {
    const { name, value } = e.target;
    let answerArray = [...this.state.answerArray];
    answerArray[id][name] = value;
    this.setState({ answerArray });
  }

  handlechange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

 async uploadQuestion () {

    let formData =new FormData();


    for (let index = 0; index < this.state.answerArray.length; index++) {
      formData.append(this.state.answerArray[index].question,this.state.answerArray[index].q_a_id)      
      }


    axios
      .post(this.props.api + "/wp02_q/" + this.state.game_id, formData)
      .then((res) => {if(res.data){
        this.setState({      pictureGame: "",
        gameLevel: "",
        aboutGame: "",
        game_id: "",
        setQuestion: false,
        answerArray: [],
        done:""
  })
      }});
    
  }

  async setQuestion() {
    try {
      let response = await fetch(
        this.state.api + "/wp02_middleware/" + this.state.game_id
      );
      let jsonData = await response.json();
      this.setState({ answerArray: jsonData });
    } catch (err) {
      console.error(err.message);
    }

    this.setState({ setQuestion: true });
  }

  pictureGameUpload() {
    if (
      this.state.pictureGame &&
      this.state.gameLevel &&
      this.state.aboutGame
    ) {
      let formData = new FormData();
      formData.append("gameName", this.state.pictureGame);
      formData.append("gameLevel", this.state.gameLevel);
      formData.append("aboutGame", this.state.aboutGame);
      formData.append("gameType", "02");

      axios
        .post(this.state.api + "/game_info/" + this.props.userId, formData)
        .then((res) => this.setState({ game_id: res.data }));
    } else {
      document.getElementById("gameName").className =
        "form-control border-warning";
    }
  }

  render() {
    return (
      <Fragment>
        <NavBar activeCreate="text-success" />
        {!this.props.userId && <Redirect to="/login" />}
        <div style={{ marginTop: 60 }}>
          <div
            class="section-title justify-content-center mb-4 mb-md-8 wow fadeInUp"
            style={{
              visibility: "visible",
              animationName: "fadeInUp",
            }}
          >
            <span class="shape shape-left bg-success"></span>
            <h2 class="text-danger">Create Picture Game</h2>
            <span class="shape shape-right bg-success"></span>
          </div>

          {!this.state.game_id && !this.state.setQuestion && !this.state.done ? (
            <div>
              <div
                class="col-sm-6 col-xs-12"
                style={{ maxWidth: "500px", margin: "20px auto" }}
              >
                <form>
                  <div class="form-group form-group-icon">
                    <input
                      type="text"
                      id="gameName"
                      name="pictureGame"
                      class="form-control border-success"
                      placeholder="Game name"
                      maxlength="10"
                      value={this.state.pictureGame}
                      onChange={this.handlechange.bind(this)}
                      required
                    />
                  </div>
                  <div class="form-group form-group-icon">
                    <input
                      type="email"
                      maxLength="5"
                      class="form-control border-success"
                      name="gameLevel"
                      placeholder="Game level"
                      value={this.state.gameLevel}
                      onChange={this.handlechange.bind(this)}
                      required
                    />
                  </div>
                  <div class="form-group form-group-icon">
                    <i class="fa fa-comments "></i>
                    <textarea
                      class="form-control border-success"
                      name="aboutGame"
                      maxLength="50"
                      value={this.state.aboutGame}
                      onChange={this.handlechange.bind(this)}
                      placeholder="About game"
                      rows="3"
                    ></textarea>
                  </div>
                  <button
                    type="button"
                    onClick={this.pictureGameUpload.bind(this)}
                    class="btn btn-danger float-right text-uppercase"
                  >
                    Next<i class="fa fa-arrow-right"></i>
                  </button>
                </form>
              </div>
            </div>
          ) : this.state.game_id && !this.state.setQuestion && !this.state.done ? (
            <div style={{ maxWidth: "500px", margin: "20px auto" }}> 
              <Upload
                autoUpload={false}
                batch={false}
                multiple={true}
                defaultFiles={[]}
                restrictions={{
                  allowedExtensions: [".jpg", ".png", ".jpeg"],
                }}
                withCredentials={false}
                saveUrl={this.props.api + "/wp02_a/" + this.state.game_id}
                removeUrl={
                  "https://demos.telerik.com/kendo-ui/service-v4/upload/remove"
                }
              />
              <button
              style={{marginTop:20}}
                type="button"
                onClick={this.setQuestion.bind(this)}
                class="btn btn-danger float-right text-uppercase"
              >
                Next<i class="fa fa-arrow-right"></i>
              </button>{" "}
            </div>
          ) : 
            this.state.game_id && this.state.setQuestion &&  (
              <div class="section-title justify-content-center mb-4 mb-md-8 wow fadeInUp">
                <table>
                  {this.state.answerArray.map((itm, id) => (
                    <tr key={id}>
                      <td>{itm.q_a_id}</td>
                      <td>
                        <textarea
                          type="text"
                          name="question"
                          value={itm.question}
                          onChange={this.handlechangearray.bind(this, id)}
                          style={{ height: 120, width: 300 }}
                          class="form-control border-info"
                          placeholder="Question ? "
                        />
                      </td>
                      <td>
                        <img
                          style={{ height: 120, width: 120 }}
                          src={`data:image/png;base64,${itm.answer}`}
                        />
                      </td>
                    </tr>
                  ))}
                </table>
                <button
                  onClick={this.uploadQuestion.bind(this)}
                  type="button"
                  class="btn btn-danger float-right text-uppercase"
                >
                  Submit
                </button>
              </div>
            )
          }
        </div>
      </Fragment>
    );
  }
}

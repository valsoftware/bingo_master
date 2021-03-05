import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import NavBar from "../../components/Navigation";

export default class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      api: this.props.api,
      wordGame: "",
      gameLevel: "",
      aboutGame: "",
      response: "",
      numOfRow: 0,
      rows: [],
    };
    this.handlechange =this.handlechange.bind(this) 
  }

  handlechange(id,e) {
    const {name,value} = e.target ; 
    let rows = [...this.state.rows]
    rows[id][name] = value;
    this.setState({rows})
  }

  uploadData(){
    let formData =new FormData();


    for (let index = 0; index < this.state.rows.length; index++) {
      formData.append(this.state.rows[index].question,this.state.rows[index].answer)      
      }

    axios.post(this.state.api + "/ww01_q_a/" + this.state.response,formData)
    .then((res) => {if(res.data){
      this.setState({      wordGame: "",
      gameLevel: "",
      aboutGame: "",
      response: "",
      numOfRow: 0,
      rows: [],})
    }});

  }
  
  handlechangea(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  increaseRow() {
    this.setState(
      (this.state.rows[this.state.rows.length] = { question: "", answer: "" })
    );
  }

  wordGameUpload() {
    if (this.state.wordGame && this.state.gameLevel && this.state.aboutGame) {
      let formData = new FormData();
      formData.append("gameName", this.state.wordGame);
      formData.append("gameLevel", this.state.gameLevel);
      formData.append("aboutGame", this.state.aboutGame);
      formData.append("gameType", "01");
      axios
        .post(this.state.api + "/game_info/" + this.props.userId, formData)
        .then((res) => this.setState({ response: res.data }));
    } else {
      document.getElementById("gameName").className =
        "form-control border-warning";
    }
  }

  render() {
    console.log(this.state.rows)
    return (
      <div>
        <NavBar activeCreate="text-success" />
        {!this.props.userId && <Redirect to="/login" />}
        <div
          class="section-title justify-content-center mb-4 mb-md-8 wow fadeInUp"
          style={{
            visibility: "visible",
            animationName: "fadeInUp",
            marginTop: 60,
          }}
        >
          <span class="shape shape-left bg-success"></span>
          <h2 class="text-danger">Create Word Game</h2>
          <span class="shape shape-right bg-success"></span>
        </div>

        {!this.state.response ? (
          <form
            class="col-sm-6 col-xs-12"
            style={{ maxWidth: "500px", margin: "20px auto" }}
          >
            <div class="form-group form-group-icon">
              <input
                type="text"
                id="gameName"
                name="wordGame"
                maxLength="10"
                value={this.state.wordGame}
                onChange={this.handlechangea.bind(this)}
                class="form-control border-success"
                placeholder="Game name"
                required
              />
            </div>
            <div class="form-group form-group-icon">
              <input
                type="email"
                name="gameLevel"
                maxLength="5"
                value={this.state.gameLevel}
                onChange={this.handlechangea.bind(this)}
                class="form-control border-success"
                placeholder="Game level"
                required
              />
            </div>
            <div class="form-group form-group-icon">
              <i class="fa fa-comments "></i>
              <textarea
                name="aboutGame"
                maxLength="50"
                value={this.state.aboutGame}
                onChange={this.handlechangea.bind(this)}
                class="form-control border-success"
                placeholder="About game"
                rows="3"
              ></textarea>
            </div>
            <button
              type="button"
              onClick={this.wordGameUpload.bind(this)}
              class="btn btn-danger float-right text-uppercase"
            >
              Next<i class="fa fa-arrow-right"></i>
            </button>
          </form>
        ) : (
          this.state.response && (
            <div
              class="col-sm-6 col-xs-12"
              style={{ maxWidth: "500px", margin: "20px auto" }}
            >
              <a class="incr-btn incr-up">
                <i
                  class="fa fa-caret-up"
                  style={{ fontSize: 200, cursor: "pointer" }}
                  onClick={this.increaseRow.bind(this)}
                ></i>
              </a>
              <p style={{ margin: 20, fontSize: 30 }}>
                {this.state.rows.length}
              </p>

              <div>
                <table>
                  {this.state.rows.map((itm, id) => (
                    <tr key={id}>
                      <th>
                        <textarea
                          type="text"
                          name='question'
                          value={itm.question}
                          onChange={this.handlechange.bind(this,id)}
                          style={{ height: 100, width: 230 }}
                          class="form-control border-info"
                          placeholder="Question ?"
                        />
                      </th>
                      <th>
                        <textarea
                          type="text"
                          name="answer"
                          value={itm.answer}
                          onChange={this.handlechange.bind(this,id)}
                          style={{ height: 100, width: 230 }}
                          class="form-control border-info"
                          placeholder="Answer "
                        />
                      </th>
                    </tr>
                  ))}
                </table>
                <button
              type="button"
              onClick={this.uploadData.bind(this)}
              class="btn btn-danger float-right text-uppercase"
            >
              Next<i class="fa fa-arrow-right"></i>
            </button>
              </div>
            </div>
          )
        )}
      </div>
    );
  }
}

import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import NavBar from "../../components/Navigation";

export default class Ww01_uploader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      api: this.props.api,
      numOfRow: 0,
      rows: [],
    };
    this.handlechange = this.handlechange.bind(this);
  }

  handlechange(id, e) {
    const { name, value } = e.target;
    let rows = [...this.state.rows];
    rows[id][name] = value;
    this.setState({ rows });
  }

  uploadData() {
    let formData = new FormData();

    for (let index = 0; index < this.state.rows.length; index++) {
      formData.append(
        this.state.rows[index].question,
        this.state.rows[index].answer
      );
    }

    axios
      .post(this.state.api + "/ww01_q_a/" + this.props.game_id, formData)
      .then((res) => {
        if (res.data) {
          this.setState({
            numOfRow: 0,
            rows: [],
          });
        }
      });
  }

  handlechangea(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  increaseRow() {
    this.setState(
      (this.state.rows[this.state.rows.length] = { question: "", answer: "" })
    );
  }

  render() {
    return (
      <div>
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
          <p style={{ margin: 20, fontSize: 30 }}>{this.state.rows.length}</p>

          <div>
            <table>
              {this.state.rows.map((itm, id) => (
                <tr key={id}>
                  <th>
                    <textarea
                      type="text"
                      name="question"
                      value={itm.question}
                      onChange={this.handlechange.bind(this, id)}
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
                      onChange={this.handlechange.bind(this, id)}
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
      </div>
    );
  }
}

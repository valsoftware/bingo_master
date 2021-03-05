import React, { Component, Fragment } from "react";
import axios from "axios";
import { Upload } from "@progress/kendo-react-upload";
import "@progress/kendo-theme-material/dist/all.css";

export default class Wp02_uploader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      api: this.props.api,
      game_id: "", 
      setQuestion: false,
      answerArray: [],
      done: "",
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

  async uploadQuestion() {
    let formData = new FormData();

    for (let index = 0; index < this.state.answerArray.length; index++) {
      formData.append(
        this.state.answerArray[index].question,
        this.state.answerArray[index].q_a_id
      );
    }

    axios
      .post(this.props.api + "/wp02_q/" + this.props.game_id, formData)
      .then((res) => {
        if (res.data) {
          this.setState({
            game_id: "",
            setQuestion: false,
            answerArray: [],
            done: "",
          });
        }
      });
  }

  async setQuestion() {
    try {
      let response = await fetch(
        this.props.api + "/wp02_middleware/" + this.props.game_id
      );
      let jsonData = await response.json();
      this.setState({ answerArray: jsonData });
    } catch (err) {
      console.error(err.message);
    }

    this.setState({ setQuestion: true });
  }

  render() {
    return (
      <Fragment>

          {this.props.game_id &&
            !this.state.setQuestion &&
            !this.state.done ? (
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
                saveUrl={this.props.api + "/wp02_a/" + this.props.game_id}
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
          ) : (
            this.props.game_id &&
            this.state.setQuestion && (
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
          )}
      </Fragment>
    );
  }
}

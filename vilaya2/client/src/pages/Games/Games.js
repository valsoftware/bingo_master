import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Invitations from "./Invitations";
import ImageUploader from "../../components/Uploader/ImageUploader";
import Preloader from "../../components/Preloader";
import NavBar from "../../components/Navigation";
import Wp02_uploader from '../createGames/Wp02_uploader'
import Ww01_uploader from '../createGames/Ww01_uploader'

export default class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pictureGameCode: "p",
      wordGameCode: "w",
      api: this.props.api,
      user: [],
      pictureGameArray: [],
      wordGameArray: [],
      CurrentPicId: null,
      CurrentId: null,
      showPictureGame: false,
      showWordGame: false,
      showPictureClues: false,
      showWordClues: false,
      attendeeMailId: "",
      notBingoUser: "",
      success: "",
      preloader: true,
    };
  }

  handlechange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  showPictureGame(id) {
    this.setState({ showPictureGame: true, CurrentPicId: id });
  }

  showWordGame(id) {
    this.setState({ showWordGame: true, CurrentId: id });
  }

  showPictureClues(id) {
    this.setState({ showPictureClues: true, CurrentPicId: id });
  }

  showWordClues(id) {
    this.setState({ showWordClues: true, CurrentId: id });
  }

  deletePictureGame(id,game_type) {
    axios.delete(this.props.api + "/delete_game/" + game_type+'/'+ id).then((res) => {
      let temp = this.state.pictureGameArray.filter((item) => item.game_id !== id);
      this.setState({ pictureGameArray: temp });
    });
  }

  deleteWordGame(id,game_type) {
    axios.delete(this.props.api + "/delete_game/" + game_type+'/'+ id).then((res) => {
      let temp = this.state.wordGameArray.filter((item) => item.game_id !== id);
      this.setState({ wordGameArray: temp });
    });
  }

  componentDidMount = async () => {
    // for picture Games
    try {
      let response = await fetch(
        this.state.api + "/wp02_game_info/" + this.props.userId
      );
      let jsonData = await response.json();
      if (jsonData) {
        this.setState({ preloader: false });
      }
      this.setState({ pictureGameArray: jsonData });
    } catch (err) {
      console.error(err.message);
    }

    //for word Games

    try {
      let response = await fetch(
        this.state.api + "/ww01_game_info/" + this.props.userId
      );
      
      let jsonData = await response.json();

      this.setState({ wordGameArray: jsonData });
    } catch (err) {
      console.error(err.message);
    }

    try {
      let response = await fetch(
        this.props.api + "/register/" + this.props.userId
      );
      let jsonData = await response.json();
      this.setState({ user: jsonData });
    } catch (err) {
      console.error(err.message);
    }
  };

invite = (game_id, game_type,game_code) =>{
    let formData = new FormData();

    formData.append("userId", this.props.userId);
    formData.append("attendeeMailId", this.state.attendeeMailId);
    formData.append("gameId", game_id);
    formData.append("gameCode", game_code);
    formData.append("roomId",this.props.userId +"/" +game_type +"/"+game_id);
    if (this.state.attendeeMailId) {
    axios.post(this.props.api +'/invite', formData).then((res)=>{
      console.log(res.data)
      this.setState({success:res.data})
    })
  } else {
    document.getElementById("myInput").className =
      "form-control border-warning";
  }
}

  render() {
    return (
      <Fragment>
        {this.state.preloader && <Preloader />}

        {!this.props.userId && <Redirect to="/login" />}
        <NavBar activeGames="text-danger" />

        <div>
          {this.state.showPictureGame == false &&
          this.state.showWordGame == false &&
          this.state.showPictureClues == false &&
          this.state.showWordClues == false ? (
            <div>
              <div>
                <div>
                  <Invitations
                    api={this.props.api}
                    userId={this.props.userId}
                    pictureGameCode={this.state.pictureGameCode}
                    wordGameCode={this.state.wordGameCode}
                  />
                </div>
                <div
                  class="section-title justify-content-center mb-4 mb-md-8 wow fadeInUp"
                  style={{
                    visibility: "visible",
                    animationName: "fadeInUp",
                    margin: 50,
                  }}
                >
                  <span class="shape shape-left bg-info"></span>
                  <h2 class="text-danger">Games</h2>
                  <span class="shape shape-right bg-info"></span>
                </div>

                <div class="row wow fadeInUp animated owl-carousel container-fluid">
                  {this.state.pictureGameArray.map((itm, id) => (
                    <div class="col-sm-6 col-lg-3 col-xs-12" key={id}>
                      <div class="card card-border border-danger card-hover bg-white">
                        <a
                          class="position-relative"
                          data-toggle="modal"
                          data-target="#modal-products"
                        >
                          <img
                            class="card-img-top mx-auto d-block py-6 w-50"
                            style={{ width: 80, height: 200 }}
                            src={`data:image/png;base64,${itm.logo}`}
                            alt="Card image"
                          />
                          <button
                            class="btn btn-quickview shadow-none"
                            data-toggle="modal"
                            data-target="#modal-products"
                          >
                            <i
                              type="button"
                              class="text-hover-warning fa fa-user-plus mr-2 mr-2"
                              data-toggle="modal"
                              data-target={"#" + "p" + id}
                              aria-hidden="true"
                              style={{
                                fontSize: 25,
                                marginLeft: 8,
                                marginRight: 8,
                              }}
                            ></i>
                            <i
                              type="button"
                              class="text-hover-warning fa fa-plus-circle mr-2 mr-2"
                              data-toggle="modal"
                              data-target={"#" + "pAdd" + id}
                              aria-hidden="true"
                              style={{
                                fontSize: 25,
                                marginLeft: 8,
                                marginRight: 8,
                              }}
                            ></i>
                            <i
                              type="button"
                              class="text-hover-warning fa fa-play-circle mr-2 mr-2"
                              onClick={this.showPictureGame.bind(
                                this,
                                itm.game_id
                              )}
                              aria-hidden="true"
                              style={{
                                fontSize: 25,
                                marginLeft: 8,
                                marginRight: 8,
                              }}
                            ></i>
                            <i
                              type="button"
                              class="text-hover-warning fa fa-trash mr-2 mr-2"
                              data-toggle="modal"
                              data-target={"#" + "pDel" + id}
                              aria-hidden="true"
                              style={{
                                fontSize: 25,
                                marginLeft: 8,
                                marginRight: 8,
                              }}
                            ></i>
                          </button>
                        </a>
                        <div class="card-body-pic bg-danger px-5 py-6">
                          <h5 class="mb-1">
                            <a class="text-success  font-size-20">
                              <h4 style={{ textTransform: "capitalize" }}>
                                {" "}
                                {itm.game_name}
                              </h4>
                            </a>
                          </h5>

                          <li class="d-flex text-warning align-items-baseline mb-3">
                            <i
                              class="fa fa-database mr-2 text-warning"
                              aria-hidden="true"
                            ></i>
                            {itm.game_level}
                          </li>

                          <p class="text-white mb-0">{itm.about_game}</p>
                          {!itm.about_game && <p style={{ padding: 25 }}></p>}

                          <a
                            class="btn btn-sm btn-white text-hover-warning text-uppercase d-inline-block"
                            onClick={this.showPictureClues.bind(
                              this,
                              itm.game_id
                            )}
                          >
                            <i
                              class="fa fa-play-circle mr-2"
                              aria-hidden="true"
                            ></i>
                            Start
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div
                  class="row wow fadeInUp animated container-fluid"
                  style={{ marginTop: 70 }}
                >
                  {this.state.wordGameArray.map((itm, id) => (
                    <div class="col-xl-6" key={id} style={{ marginTop: 30 }}>
                      <div class="media pricing-list bg-light mb-6">
                        <div class="pricing-plan card-body-pic px-5 py-6 bg-danger">
                          <div class="card-icon-border-large border-danger mtn-80">
                            <i
                              class="fa fa-wordpress text-danger"
                              aria-hidden="true"
                            ></i>
                          </div>
                          <h5 class="mb-1">
                            <a class="text-success  font-size-20">
                              <h4 style={{ textTransform: "capitalize" }}>
                                {" "}
                                {itm.game_name}
                              </h4>
                            </a>
                          </h5>
                          <p class="text-white">{itm.about_game}</p>
                          {!itm.about_game && <p style={{ padding: 20 }}></p>}
                          <ul class="list-unstyled mb-0">
                            <li class="d-flex justify-content-between align-items-baseline p-0 border-0">
                              <li class="d-flex text-warning align-items-baseline mb-3">
                                <i
                                  class="fa fa-database mr-2 text-warning"
                                  aria-hidden="true"
                                ></i>
                                {itm.game_level}
                              </li>
                              <a
                                class="btn btn-sm btn-white text-hover-warning text-uppercase d-inline-block"
                                onClick={this.showWordClues.bind(
                                  this,
                                  itm.game_id
                                )}
                              >
                                <i
                                  class="fa fa-play-circle mr-2"
                                  aria-hidden="true"
                                ></i>
                                Start
                              </a>
                            </li>
                          </ul>
                        </div>

                        <div class="media-body">
                          <div class="">
                            <ul class="list-unstyled list-item-lg mb-0">
                              <li>
                                <i
                                  type="button"
                                  class="text-hover-warning fa fa-user-plus mr-2 mr-2"
                                  data-toggle="modal"
                                  data-target={"#" + "w" + id}
                                  aria-hidden="true"
                                  style={{
                                    fontSize: 25,
                                    marginLeft: 8,
                                    marginRight: 8,
                                  }}
                                ></i>
                                <br />
                                <i
                                  type="button"
                                  class="text-hover-warning fa fa-plus-circle mr-2 mr-2"
                                  aria-hidden="true"
                                  data-toggle="modal"
                                  data-target={"#" + "wAdd" + id}
                                  style={{
                                    fontSize: 25,
                                    marginLeft: 8,
                                    marginRight: 8,
                                  }}
                                ></i>
                                <br />
                                <i
                                  type="button"
                                  class="text-hover-warning fa fa-play-circle mr-2 mr-2"
                                  onClick={this.showWordGame.bind(
                                    this,
                                    itm.game_id
                                  )}
                                  aria-hidden="true"
                                  style={{
                                    fontSize: 25,
                                    marginLeft: 8,
                                    marginRight: 8,
                                  }}
                                ></i>
                                <br />
                                <i
                                  type="button"
                                  class="text-hover-warning fa fa-trash mr-2 mr-2"
                                  aria-hidden="true"
                                  data-toggle="modal"
                                  data-target={"#" + "wDel" + id}
                                  style={{
                                    fontSize: 25,
                                    marginLeft: 8,
                                    marginRight: 8,
                                  }}
                                ></i>
                                <br />
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : this.state.showPictureGame == true ? (
            <Redirect
              to={{
                pathname: "/pictureSinglePlayGame",
                state: { game_id: this.state.CurrentPicId },
              }}
            />
          ) : this.state.showWordGame == true ? (
            <Redirect
              to={{
                pathname: "/wordSinglePlayGame",
                state: { game_id: this.state.CurrentId },
              }}
            />
          ) : this.state.showPictureClues == true ? (
            <Redirect
              to={{
                pathname: "/pClueBoard",
                state: {
                  userId: this.props.userId,
                  game_id: this.state.CurrentPicId,
                  roomId:
                    this.props.userId +
                    "/" +
                    this.state.pictureGameCode +
                    "/" +
                    this.state.CurrentPicId,
                },
              }}
            />
          ) : (
            this.state.showWordClues == true && (
              <Redirect
                to={{
                  pathname: "/wClueBoard",
                  state: {
                    userId: this.props.userId,
                    game_id: this.state.CurrentId,
                    roomId:
                      this.props.userId +
                      "/" +
                      this.state.wordGameCode +
                      "/" +
                      this.state.CurrentId,
                  },
                }}
              />
            )
          )}
        </div>
        {/* Invite model from pictureGame*/}
        {this.state.pictureGameArray.map((itm, id) => (
          <div
            class="modal fade show"
            id="modal-products"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-modal="true"
            key={id}
            id={"p" + id}
          >
            <div class="modal-dialog modal-lg" role="document">
              <div class="modal-content">
                <div class="modal-header border-0">
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="row">
                    <div class="product-single text-danger">
                      <h1>{itm.game_name}</h1>
                      <div class="form-group form-group-icon">
                        <input
                          type="text"
                          id="myInput"
                          class="form-control border-success"
                          placeholder="Type a Email Address"
                          name="attendeeMailId"
                          onChange={this.handlechange.bind(this)}
                          required
                        />
                      </div>
                      <p style={{ color: "green" }}>{this.state.success}</p>
                      <div>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={this.invite.bind(
                            this,
                            itm.game_id,
                            "p",
                            2
                          )}
                        >
                          Invite +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* Invite model from wordGame*/}
        {this.state.wordGameArray.map((itm, id) => (
          <div
            class="modal fade show"
            id="modal-products"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-modal="true"
            key={id}
            id={"w" + id}
          >
            <div class="modal-dialog modal-lg" role="document">
              <div class="modal-content">
                <div class="modal-header border-0">
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="row">
                    <div class="product-single text-danger">
                      <h1>{itm.game_name}</h1>
                      <div class="form-group form-group-icon">
                        <input
                          type="text"
                          class="form-control border-success"
                          placeholder="Type a Email Address"
                          name="attendeeMailId"
                          onChange={this.handlechange.bind(this)}
                          required
                        />
                      </div>
                      <p style={{ color: "green" }}>{this.state.success}</p>
                      <div>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={this.invite.bind(
                            this,
                            itm.game_id,
                            "w",
                            1
                          )}
                        >
                          Invite +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Add data model for pictureGame*/}
        {this.state.pictureGameArray.map((itm, id) => (
          <div
            class="modal fade show"
            id="modal-products"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-modal="true"
            key={id}
            id={"pAdd" + id}
          >
            <div class="modal-dialog modal-lg" role="document">
              <div class="modal-content">
                <div class="modal-header border-0">
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="row">
                    <div class="product-single">
                      <h1 class="text-danger">{itm.game_name}</h1>
                      <Wp02_uploader api= {this.props.api} game_id ={itm.game_id}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Add data model for wordGame*/}
        {this.state.wordGameArray.map((itm, id) => (
          <div
            class="modal fade show"
            id="modal-products"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-modal="true"
            key={id}
            id={"wAdd" + id}
          >
            <div class="modal-dialog modal-lg" role="document">
              <div class="modal-content">
                <div class="modal-header border-0">
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="row">
                    <div class="product-single">
                      <h1 class="text-danger">{itm.game_name}</h1>
                      <Ww01_uploader api={this.props.api} game_id={itm.game_id} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Delete picture game model */}
        {this.state.pictureGameArray.map((itm, id) => (
          <div
            class="modal fade show"
            id="modal-products"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-modal="true"
            key={id}
            id={"pDel" + id}
          >
            <div class="modal-dialog modal-lg" role="document">
              <div class="modal-content">
                <div class="modal-header border-0">
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="row">
                    <div class="product-single">
                      <h1 class="text-danger">{itm.game_name}</h1>
                      <h3 class="text-info">
                        Are you sure you want to delete this game ?
                      </h3>
                      <button
                        style={{ marginTop: 20 }}
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                        className="btn btn-success submit"
                        onClick={this.deletePictureGame.bind(this, itm.game_id, itm.game_type)}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                        className="btn btn-danger submit"
                        style={{ marginTop: 20, marginLeft: 20 }}
                      >
                        <span aria-hidden="true">No</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Delete word game model */}
        {this.state.wordGameArray.map((itm, id) => (
          <div
            class="modal fade show"
            id="modal-products"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-modal="true"
            key={id}
            id={"wDel" + id}
          >
            <div class="modal-dialog modal-lg" role="document">
              <div class="modal-content">
                <div class="modal-header border-0">
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="row">
                    <div class="product-single">
                      <h1 class="text-danger">{itm.game_name}</h1>
                      <h3 class="text-info">
                        Are you sure you want to delete this game ?
                      </h3>
                      <button
                        style={{ marginTop: 20 }}
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                        className="btn btn-success submit"
                        onClick={this.deleteWordGame.bind(this, itm.game_id,itm.game_type)}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                        className="btn btn-danger submit"
                        style={{ marginTop: 20, marginLeft: 20 }}
                      >
                        <span aria-hidden="true">No</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Fragment>
    );
  }
}

import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default class Join extends Component {
  constructor(props) {
    super(props);

    this.state = {
      invitationsForPictureGame: [],
      invitationsForWordGame: [],
      CurrentPicId: "",
      CurrentId: "",
      showPictureGame: false,
      showWordGame: false,
      pitureRoomId:'',
      wordRoomId:''
    };
  }

  showPictureGame(id,roomId,name) {
    this.setState({ showPictureGame: true, CurrentPicId: id,pitureRoomId:roomId });
  }

  showWordGame(id,roomId,name) {
    this.setState({ showWordGame: true, CurrentId: id,wordRoomId:roomId});
  }

  componentDidMount = async () => {
    try {
      
        let response = await fetch(
          this.props.api + "/wp02_invitation/" + this.props.userId
        );
        let jsonData = await response.json();
        this.setState({
          invitationsForPictureGame: jsonData,
        });
    } catch (err) {
      console.log(err.message);
    }
    try {
      
      let response = await fetch(
        this.props.api + "/ww01_invitation/" + this.props.userId
      );
      let jsonData = await response.json();
      this.setState({
        invitationsForWordGame: jsonData,
      });
  } catch (err) {
    console.log(err.message);
  }


  };


  render() {
    return (
      <div>
        {!this.props.userId && <Redirect to="/login" />}
        {this.state.showPictureGame == false &&
        this.state.showWordGame == false ? (
          <div>
            <div>
              <div
                class="section-title justify-content-center mb-4 mb-md-8 wow fadeInUp"
                style={{
                  visibility: "visible",
                  animationName: "fadeInUp",
                  margin: 50,
                }}
              >
                <span class="shape shape-left bg-info"></span>
                <h2 class="text-danger">Invitations</h2>
                <span class="shape shape-right bg-info"></span>
              </div>
              <div class="row wow fadeInUp container-fluid">
                {this.state.invitationsForPictureGame.map((itm, id) => (
                  <div class="col-sm-6 col-xs-12" key={id}>
                    <div class="media media-events-list bg-info flex-column flex-lg-row shadow-sm">
                      <a class="media-img position-relative">
                        <img
                          class=""
                          data-src="assets/img/events/events-img1.jpg"
                          src={`data:image/png;base64,${itm.logo}`}
                          alt="events-image"
                        />
                      </a>

                      <div class="media-body position-relatsive px-4 py-5 p-lg-2 p-xl-5">
                        <h5 class="mb-1">
                          <a class="text-success  font-size-20">
                            <h4 style={{ textTransform: "capitalize" }}>
                              {" "}
                              {itm.game_name}
                            </h4>
                          </a>
                        </h5>

                        <ul class="list-unstyled mb-2">
                          <li class="text-white mb-1">
                            <i class="fa fa-user mr-2" aria-hidden="true"></i>
                            {itm.user_name}
                          </li>
                          <li class="text-white">
                            <i
                              class="fa fa-envelope mr-2"
                              aria-hidden="true"
                            ></i>
                            {itm.email_id}
                          </li>
                        </ul>

                        <a
                          class="btn btn-white btn-sm text-uppercase mt-3 text-hover-warning"
                          onClick={this.showPictureGame.bind(this, itm.game_id,itm.room_id)}
                        >
                          <i
                            class="fa fa-play-circle mr-2"
                            aria-hidden="true"
                          ></i>
                          Play
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div
                class="row wow fadeInUp container-fluid"
                style={{ marginTop: 70 }}
              >
                {this.state.invitationsForWordGame.map((itm, id) => (
                  <div class="col-md-6 col-lg-4" key={id}>
                    <div class="card bg-info card-hover mb-9">
                      <div class="card-body text-center px-md-5 px-lg-6 my-2">
                        <div class="card-icon-border-large border-info mtn-80">
                          <i
                            class="fa fa-wordpress text-info"
                            aria-hidden="true"
                          ></i>
                        </div>
                        <div class="card-body bg-info px-5 py-6">
                          <h5 class="mb-1">
                            <a class="text-success  font-size-20">
                              <h4 style={{ textTransform: "capitalize" }}>
                                {" "}
                                {itm.game_name}
                              </h4>
                            </a>
                          </h5>
                          <ul class="list-unstyled mb-2">
                            <li class="text-white mb-1">
                              <i class="fa fa-user mr-2" aria-hidden="true"></i>
                              {itm.user_name}
                            </li>
                            <li class="text-white">
                              <i
                                class="fa fa-envelope mr-2"
                                aria-hidden="true"
                              ></i>
                              {itm.email_id}
                            </li>
                          </ul>

                          <a
                            class="btn btn-sm btn-white text-hover-warning text-uppercase d-inline-block"
                            onClick={this.showWordGame.bind(this, itm.game_id,itm.room_id)}
                          >
                            <i
                              class="fa fa-play-circle mr-2"
                              aria-hidden="true"
                            ></i>
                            Play
                          </a>
                        </div>

                        <div>{itm.game_level}</div>
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
              pathname: "/pictureBoard",
              state: { game_id: this.state.CurrentPicId,roomId:this.state.pitureRoomId,userId:this.props.userId },
            }}
          />   
        ) : (
          this.state.showWordGame == true && (
            <Redirect
              to={{
                pathname: "/wordBoard",
                state: { game_id: this.state.CurrentId, roomId:this.state.wordRoomId,userId:this.props.userId },
              }}
            />
          )
        )}
      </div>
    );
  }
}

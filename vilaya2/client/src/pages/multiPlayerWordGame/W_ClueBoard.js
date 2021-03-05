import React, { Component, Fragment } from "react";
import Dice from "../../components/gameComponents/Dice";
import ActivePlayers from '../../components/gameComponents/ActivePlayers'
import "../Stylesheets/invite.css";
import NavBar from '../../components/Navigation'
import io from "socket.io-client";

const socket = io.connect("/");


export default class ClueBoard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      joinRoom: true,
      players: [],
      userName: ''

    }
  }

  componentDidMount = async () => {
    try {
      let response = await fetch(this.props.api + '/user_info/' + this.props.location.state.userId)

      let jsonData = await response.json()

      if (this.state.joinRoom) {
        this.state.joinRoom = false
        socket.emit('join', { roomId: this.props.location.state.roomId, userName: jsonData.user_name,emailId:jsonData.email_id });
      }

      setInterval(() => {
        socket.on('roomData', async (data) => {
          this.setState({ players: data.users })
        })
      }, 1000);

      this.setState({ userName: jsonData.username })

    } catch (err) {
      console.error(err.message)
    }

  }  
  render() {
    return (
      <Fragment>
        <NavBar activeGames='text-danger'/>
        <div class="container table-bordered border-danger" id='main'  >
          <div id='clueBoard'>
            <Dice
              userId={this.props.location.state.userId}
              roomId={this.props.location.state.roomId}
              api={this.props.api}
              id={"/ww01_game/" + this.props.location.state.game_id}
            />
          </div>

          <div id='pictureBoard'>

            <ActivePlayers activePlayers={this.state.players} />

          </div>
        </div>
      </Fragment>
    );
  }
  componentWillUnmount(){
    socket.emit('end')
  }
}


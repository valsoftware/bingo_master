import React, { Component } from "react";
import "./Dice.css";
import io from 'socket.io-client'
import {API} from '../../modules/constants'
const socket = io.connect("/");

export default class Clues extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clue:''
    };

  }

  componentDidMount= async()=>{ 
    
    let response = await fetch(API+'/user_info/'+this.props.userId)

    let jsonData = await response.json()

    console.log(jsonData)

    socket.emit('join', { roomId: this.props.roomId,userName:jsonData.user_name,emailId:jsonData.email_id });
  
    setInterval(async () => { 
        
      socket.on('message',async(data)=>{
        this.setState({clue:data.text})
       })
       
 
    }, 1000);
 
  }

  render() {
    return (
      <div>
        <div>
          <p style={{ textAlign: "center" }}>{this.state.time}</p>
          <div className="col">
            <button class="btn btn-squar-default btn-warning">
                {this.state.clue}
            </button>
          </div>
        </div>
      </div>
    );
  }

  componentWillUnmount(){
    socket.emit('end')
  }

}   
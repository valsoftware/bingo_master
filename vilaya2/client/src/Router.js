import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";

import Login from "./components/Login/Login";

import Home from "../src/pages/Home";

import Games from "./pages/Games/Games";

import PictureBoard from "./pages/multiPlayerPictureGame/PictureBoard";
import PClueBoard from "./pages/multiPlayerPictureGame/P_ClueBoard";

import WordBoard from "./pages/multiPlayerWordGame/WordBoard";
import WClueBoard from "./pages/multiPlayerWordGame/W_ClueBoard";

import PictureSinglePlayGame from "./pages/singlePlayer/PictureSinglePlayGame";
import WordSinglePlayGame from "./pages/singlePlayer/WordSinglePlayGame";


import CreatePictureGame from "./pages/createGames/CreatePictureGame";
import CreateWordGame from "./pages/createGames/CreateWordGame";

import {API} from './modules/constants'

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      api: API,
      user: "",
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout = () => {
    this.setState({
      user: "",
    });
  };

  handleLogin = (data) => {
    this.setState({
      user: data,
    });
  };

  render() {
    console.log(this.state.user)
    return (
      <React.Fragment>
        <BrowserRouter>
        {/*Login*/}
          <Route
            path="/"
            exact
            render={(props) => (
              <Login
                handleLogin={this.handleLogin}
                handleLogout={this.handleLogout}
                api={this.state.api}
                {...props}
              />
            )}
          />
          {/*Login*/}
          <Route
            path="/login"
            render={(props) => (
              <Login
                handleLogin={this.handleLogin}
                handleLogout={this.handleLogout}
                api={this.state.api}
                {...props}
              />
            )}
          />
          {/*Home page*/}
          <Route
            path="/home"
            render={(props) => (
              <Home
                api={this.state.api}
                userId={this.state.user}
                {...props}
              />
            )}
          />
          {/*Game page*/}
          <Route
            path="/games"
            render={(props) => (
              <Games
                api={this.state.api}
                userId={this.state.user}
                {...props}
              />
            )}
          />
          {/*Create picture game page*/}
          <Route
            path="/createPictureGame"
            render={(props) => (
              <CreatePictureGame
                api={this.state.api}
                userId={this.state.user}
                {...props}
              />
            )}
          />
          {/*Create word game page*/}
          <Route
            path="/createWordGame"
            render={(props) => (
              <CreateWordGame
                api={this.state.api}
                userId={this.state.user}
                {...props}
              />
            )}
          />
          {/*Picture game single player*/}
          <Route
            path="/pictureSinglePlayGame"
            render={(props) => (
              <PictureSinglePlayGame api={this.state.api} {...props} />
            )}
          />
          {/*Word game single player*/}
          <Route
            path="/wordSinglePlayGame"
            render={(props) => (
              <WordSinglePlayGame api={this.state.api} {...props} />
            )}
          />
          {/*Picture game bord for multiplayer*/}
          <Route
            path="/pictureBoard"
            render={(props) => <PictureBoard api={this.state.api} {...props} />}
          />
          {/*Word game board for multiplayer*/}
          <Route
            path="/wordBoard"
            render={(props) => <WordBoard api={this.state.api} {...props} />}
          />
          {/*Dice board for teacher in picture game*/}
          <Route
            path="/pClueBoard"
            render={(props) => <PClueBoard api={this.state.api} {...props} />}
          />
          {/*Dice board for teacher in word game*/}
          <Route
            path="/wClueBoard"
            render={(props) => <WClueBoard api={this.state.api} {...props} />}
          />
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

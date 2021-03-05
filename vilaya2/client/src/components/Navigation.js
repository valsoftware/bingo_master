import React from "react";
import {Link} from "react-router-dom";
import ColorBar from './decorationComponents/ColorBar'

export default function Navigation(props) {

    return (
        <div>
            <div>
                <div class="header main-wrapper" id="pageTop">
                    <ColorBar/>

                    <nav class="navbar navbar-expand-md navbar-scrollUp  navbar-white">
                        <div class="container-fluid">
                            <a class="navbar-brand">
                                <img class="d-inline-block" src="assets/img/logo-bingo.png" alt="Kidz School"
                                    style={
                                        {
                                            height: 55,
                                            width: 180
                                        }
                                    }/>
                            </a>

                            <button class="navbar-toggler py-2" type="button" data-toggle="collapse" data-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                                <i class="fa fa-bars"></i>
                            </button>

                            <div class="collapse navbar-collapse " id="navbarContent">
                                <ul class="navbar-nav ml-lg-auto ">
                                    <li class="nav-item dropdown bg-warning ">
                                        {/*Home*/}
                                        <Link to="home" type="button" class="nav-link ">
                                            <i class="fa fa-home nav-icon" aria-hidden="true"></i>
                                            <span className={
                                                props.activeHome
                                            }>Home</span>
                                        </Link>
                                    </li>

                                    {/*Game */}

                                    <li class="nav-item dropdown bg-danger">
                                        <Link to="games" type="button" class="nav-link ">
                                            <i class="fa fa-play-circle nav-icon" aria-hidden="true"></i>
                                            <span className={props.activeGames} >Games</span>
                                        </Link>
                                    </li>

                                    {/*create Games*/}

                                    <li class="nav-item dropdown mega-dropdown bg-success">
                                        <a class="nav-link dropdown-toggle " href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i class="fa fa-plus nav-icon" aria-hidden="true"></i>
                                            <span className={props.activeCreate}>Create</span>
                                        </a>
                                        <div class="dropdown-menu row">
                                            <div class="col-12 col-md-3">
                                                <ul class="list-unstyled">
                                                    <li>Create Games</li>
                                                    <li> {/*Create picture games*/}

                                                        <Link class="" to="/createPictureGame">
                                                            Create Picture Game
                                                        </Link>
                                                    </li>
                                                    <li> {/*Create word games*/}

                                                        <Link class="" to="/createWordGame">
                                                            Create Word Game
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>

                                    <li class="nav-item dropdown bg-pink">
                                        <Link class="nav-link" type="button" to="/">
                                            <i class="fa fa-arrow-right nav-icon" aria-hidden="true"></i>
                                            <span>Log out</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                    <ColorBar/>
                </div>
                <div></div>
            </div>
        </div>
    );
}

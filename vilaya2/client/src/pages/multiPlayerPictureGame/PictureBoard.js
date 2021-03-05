import React, {Component, Fragment} from "react";
import PictureBoard from "../../components/gameComponents/PictureBoard";
import Clues from "../../components/gameComponents/Clues";
import NavBar from '../../components/Navigation'
import '../Stylesheets/boardGrid.css'


export default class PictureBoardGame extends Component {
    render() {
        return (
            <Fragment>
                <NavBar activeGames='text-danger'/>
                    <div class="container table-bordered border-danger" id='main'  >
                            <div id='clueBoard'>
                                <Clues roomId={this.props.location.state.roomId} userId={this.props.location.state.userId}/>
                            </div>

                            <div id='pictureBoard'>
                                <PictureBoard api={this.props.api} id={this.props.location.state.game_id}/>
                            </div>
                        </div>
            </Fragment>
        );
    }
}

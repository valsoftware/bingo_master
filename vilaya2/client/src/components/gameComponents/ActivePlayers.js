import React, { Component, Fragment } from 'react'

export default class ActivePlayers extends Component {
    
    render() {  
        return (
            <Fragment>
                
            <div>
                {this.props.activePlayers.map((itm, id) =>
                    <div key={id}>
                        <ul>
                            <li>{itm.name}</li>
                        </ul>
                    </div>)}

            </div>
            </Fragment>
        )
    }
}

import React, { Component } from 'react'

export default class ColorBar extends Component {
    render() {
        return (
            <div>
                <div class="color-bars">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col color-bar bg-warning d-none d-md-block"></div>
                            <div class="col color-bar bg-success d-none d-md-block"></div>
                            <div class="col color-bar bg-danger d-none d-md-block"></div>
                            <div class="col color-bar bg-info d-none d-md-block"></div>
                            <div class="col color-bar bg-purple d-none d-md-block"></div>
                            <div class="col color-bar bg-pink d-none d-md-block"></div>
                            <div class="col color-bar bg-warning"></div>
                            <div class="col color-bar bg-success"></div>
                            <div class="col color-bar bg-danger"></div>
                            <div class="col color-bar bg-info"></div>
                            <div class="col color-bar bg-purple"></div>
                            <div class="col color-bar bg-pink"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

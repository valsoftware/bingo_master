import React, { Component, Fragment } from "react";

export default class Preloader extends Component {
  render() {
    return (
      <Fragment>
        <div id="preloader" class="smooth-loader-wrapper">
          <div class="smooth-loader">
            <div class="loader">
              <span class="dot dot-1"></span>
              <span class="dot dot-2"></span>
              <span class="dot dot-3"></span>
              <span class="dot dot-4"></span>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

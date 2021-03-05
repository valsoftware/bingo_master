import React, {Component, Fragment} from "react";
import Preloader from '../components/Preloader'
import NavBar from '../components/Navigation'
import './Stylesheets/home.css'


export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            preloader: true
        };
    }

    componentDidMount = () => {
        setInterval(() => {
            this.setState({preloader: false})
        }, 1000);
    }


    render() {
        const HomePageMargin = {
            marginLeft: 20,
            marginRight: 20
        };
        return (
            <Fragment> {
                this.state.preloader && <Preloader/>
            }
                <NavBar activeHome='text-warning'/>
                <div>

                    <img src="assets/img/banner/slider-1/img-2.jpg" class="bannerWidth"  alt="Sky" />

                    <section class="pt-9 pb-6 py-md-7"
                        style={HomePageMargin}>
                        <div class="fluid-container">
                            <div class="section-title justify-content-center mb-4 mb-md-8 wow fadeInUp"
                                style={
                                    {
                                        visibility: 'visible',
                                        animationName: 'fadeInUp'
                                    }
                            }>
                                <span class="shape shape-left bg-info"></span>
                                <h2 class="text-danger">Our Features</h2>
                                <span class="shape shape-right bg-info"></span>
                            </div>

                            <div class="row wow fadeInUp"
                                style={
                                    {
                                        visibility: 'visible',
                                        animationName: 'fadeInUp'
                                    }
                            }>

                                <div class="col-sm-6 col-xl-4 col-xs-12">
                                    <div class="media mb-6">
                                        <div class="media-icon-large bg-warning mr-xl-4">
                                            <i class="fa fa-plus" aria-hidden="true"></i>
                                        </div>

                                        <div class="media-body">
                                            <h3 class="text-warning">Create Game</h3>
                                            <p>User can create a game with their own idea</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-sm-6 col-xl-4 col-xs-12">
                                    <div class="media mb-6">
                                        <div class="media-icon-large bg-success mr-xl-4">
                                            <i class="fa fa-user-plus" aria-hidden="true"></i>
                                        </div>

                                        <div class="media-body">
                                            <h3 class="text-success">Invite Friends</h3>
                                            <p>Created games are shareable</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-sm-6 col-xl-4 col-xs-12">
                                    <div class="media mb-6">
                                        <div class="media-icon-large bg-danger mr-xl-4">
                                            <i class="fa fa-play-circle" aria-hidden="true"></i>
                                        </div>
                                        <div class="media-body">
                                            <h3 class="text-danger">Single Player Game</h3>
                                            <p>Player can play with bingo master robot</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-sm-6 col-lg-4 col-xs-12">
                                    <div class="media mb-6">
                                        <div class="media-icon-large bg-info mr-xl-4">
                                            <i class='fa fa-users' aria-hidden="true"></i>
                                        </div>
                                        <div class="media-body">
                                            <h3 class="text-info">Multi Player Game</h3>
                                            <p>Share and play with multiple player</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-sm-6 col-xl-4 col-xs-12">
                                    <div class="media mb-6">
                                        <div class="media-icon-large bg-purple mr-xl-4">
                                            <i class="fa fa-heart" aria-hidden="true"></i>
                                        </div>
                                        <div class="media-body">
                                            <h3 class="text-purple">Best animation</h3>
                                            <p>Eye-catching animations</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-sm-6 col-xl-4 col-xs-12">
                                    <div class="media mb-7">
                                        <div class="media-icon-large bg-pink mr-xl-4">
                                            <i class="fa fa-shield" aria-hidden="true"></i>
                                        </div>
                                        <div class="media-body">
                                            <h3 class="text-pink">Easy to use</h3>
                                            <p>No prior knowledge is required to use Bingo Master</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/*
                    <section class="py-9 pb-8 bg-parallax"
                        style={
                            {backgroundImage: 'URL(assets/img/banner/slider-1/img-3.jpg)'}
                    }>
                        <div class="fluid-container">
                            <div class="sectionTitleSmall text-center mb-7 wow fadeInUp"
                                style={
                                    {
                                        visibility: 'visible',
                                        animationName: 'fadeInUp'
                                    }
                            }>
                                <h2 class="font-weight-bold text-white">Activities</h2>
                                <p class="text-white font-size-15">Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod</p>
                            </div>

                            <div class="row wow fadeInUp" id="counter"
                                style={
                                    {
                                        visibility: 'visible',
                                        animationName: 'fadeInUp'
                                    }
                            }>
                                <div class="col-sm-3 col-xs-12">
                                    <div class="text-center text-white mb-5">
                                        <div class="counter-value" data-count="179">179</div>
                                        <span class="d-inline-block bg-warning text-uppercase font-weight-medium rounded-sm shadow-sm mt-1 py-2 px-3">Games Created</span>
                                    </div>
                                </div>

                                <div class="col-sm-3 col-xs-12">
                                    <div class="text-center text-white mb-5">
                                        <div class="counter-value" data-count="548">548</div>
                                        <span class="d-inline-block bg-success text-uppercase font-weight-medium rounded-sm shadow-sm mt-1 py-2 px-3">Wins</span>
                                    </div>
                                </div>

                                <div class="col-sm-3 col-xs-12">
                                    <div class="text-center text-white mb-5">
                                        <div class="counter-value" data-count="305">305</div>
                                        <span class="d-inline-block bg-danger text-uppercase font-weight-medium rounded-sm shadow-sm mt-1 py-2 px-3">Fails</span>
                                    </div>
                                </div>

                                <div class="col-sm-3 col-xs-12">
                                    <div class="text-center text-white mb-5">
                                        <div class="counter-value" data-count="1000">1000</div>
                                        <span class="d-inline-block bg-info text-uppercase font-weight-medium rounded-sm shadow-sm mt-1 py-2 px-3">Likes</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                        */}
                    <section class="bg-light py-7 py-md-10"
                        style={HomePageMargin}>
                        <div class="container-fluid">
                            <div class="row wow fadeInUp"
                                style={
                                    {
                                        visibility: "visible",
                                        animationName: "fadeInUp"
                                    }
                            }>
                                <div class="col-sm-6 col-xs-12">
                                    <div class="section-title align-items-baseline mb-4">
                                        <h2 class="text-danger px-0 mb-0">Our Address</h2>
                                    </div>
                                    <ul class="list-unstyled">
                                        <li class="media align-items-center mb-3">
                                            <div class="icon-rounded-circle-small bg-warning mr-2">
                                                <i class="fa fa-map-marker text-white"></i>
                                            </div>
                                            <div class="media-body">
                                                <p class="mb-0">
                                                    3654 Cody Ct, Santa Clara, CA 95051
                                                </p>
                                            </div>
                                        </li>
                                        <li class="media align-items-center mb-3">
                                            <div class="icon-rounded-circle-small bg-success mr-2">
                                                <i class="fa fa-envelope text-white"></i>
                                            </div>
                                            <div class="media-body">
                                                <p class="mb-0">
                                                    <a class="text-color" href="mailto:hello@example.com">
                                                        vilaya2u@gmail.com
                                                    </a>
                                                </p>
                                            </div>
                                        </li>
                                        <li class="media align-items-center mb-3">
                                            <div class="icon-rounded-circle-small bg-info mr-2">
                                                <i class="fa fa-phone text-white"></i>
                                            </div>
                                            <div class="media-body">
                                                <p class="mb-0">
                                                    <a class="text-color" href="tel:[00] 333 555 888">
                                                        +1 (904) 878-7898
                                                    </a>
                                                </p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div class="col-sm-6 col-xs-12">
                                    <form>
                                        <div class="form-group form-group-icon">
                                            <i class="fa fa-user "></i>
                                            <input type="text" class="form-control border-warning" placeholder="First name" required=""/>
                                        </div>
                                        <div class="form-group form-group-icon">
                                            <i class="fa fa-envelope "></i>
                                            <input type="email" class="form-control border-success" placeholder="Email address" required=""/>
                                        </div>
                                        <div class="form-group form-group-icon">
                                            <i class="fa fa-comments "></i>
                                            <textarea class="form-control border-info" placeholder="Write message" rows="6"></textarea>
                                        </div>
                                        <button type="button" class="btn btn-danger float-right text-uppercase">
                                            Send Message
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>
                    <footer class="footer-bg-img">
                        <div class="copyright">
                            <div class="container-fluid">
                                <div class="row py-4 align-items-center">
                                    
                                <div class="col-sm-7 col-xs-12 order-1 order-md-0">
          <p class="copyright-text"> © 2018 Copyright Kidz School Bootstrap Template by <a href="http://www.iamabdus.com/" target="_blank">Abdus.</a></p>
        </div>

                                    <div class="col-sm-5 col-xs-12">
                                        <ul class="list-inline d-flex align-items-center justify-content-md-end justify-content-center mb-md-0">
                                            <li class="mr-3">
                                                <a class="icon-rounded-circle-small bg-warning" href="javascript:void(0)">
                                                    <i class="fa fa-facebook text-white" aria-hidden="true"></i>
                                                </a>
                                            </li>
                                            <li class="mr-3">
                                                <a class="icon-rounded-circle-small bg-success" href="javascript:void(0)">
                                                    <i class="fa fa-twitter text-white" aria-hidden="true"></i>
                                                </a>
                                            </li>
                                            <li class="mr-3">
                                                <a class="icon-rounded-circle-small bg-danger" href="javascript:void(0)">
                                                    <i class="fa fa-google-plus text-white" aria-hidden="true"></i>
                                                </a>
                                            </li>
                                            <li class="mr-3">
                                                <a class="icon-rounded-circle-small bg-info" href="javascript:void(0)">
                                                    <i class="fa fa-pinterest-p text-white" aria-hidden="true"></i>
                                                </a>
                                            </li>
                                            <li class="">
                                                <a class="icon-rounded-circle-small bg-purple" href="javascript:void(0)">
                                                    <i class="fa fa-vimeo text-white" aria-hidden="true"></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </Fragment>
        );
    }
}

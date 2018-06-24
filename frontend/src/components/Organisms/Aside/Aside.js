import React, {Component} from "react";
import styles from "./Aside.scss";
import classNames from "classnames/bind";
import Logo from "../../Parts/Logo/Logo.js";
import { showLoginModal } from "../../actions/showLogin";
import { tokenCheckRequest, logoutRequest } from "../../actions/account";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const cx = classNames.bind(styles);

class Aside extends Component{

    constructor(props){
        super(props);
        this.state = {
            show : false
        };

        this._showmenu = this._showmenu.bind(this);
        this._hidemenu = this._hidemenu.bind(this);
        this._showlogin = this._showlogin.bind(this);
        this._logout = this._logout.bind(this);
    };

    componentDidMount(){
        this.props.tokencheck(document.cookie);
    };

    _showmenu(){
        this.setState({
            show : true
        });
    };
    _hidemenu(){
        this.setState({
            show : false
        });
    };

    _showlogin(){
        this.props.showloginmodal();
    };

    _logout(){
        this.props.logoutrequest().then( () => {
            window.location.reload();
        });
    };

    render(){

        const notlogin = (
            <div className = {cx("login-btn")} onClick = {this._showlogin}>
                로그인
            </div>
        );

        const dologin = (
            <div>
                <div className = {cx("profile-image")}>
                    <img src = {this.props.user.admin ? "/raptor.png" : "/user.png"} alt = "raptor-logo"/>
                </div>
                <div>
                    {this.props.user.nickname}님
                </div>
                <div className = {cx("logout-wrapper")}>
                    <div className = {cx("logout-btn")} onClick = {this._logout}>
                        로그아웃
                    </div>
                </div>
            </div>
        )

        const moremenu = (
            <div className = {cx("more-wrapper")}>
                <div>
                    <div className = {cx("more")}>
                        <i className = "fas fa-times" onClick = {this._hidemenu}/>
                    </div>
                    <div className = {cx("section-wrapper")}>
                        <div className = {cx("section")}>
                            <h4>Tech</h4>
                            <ul>
                                <Link to = "/category/react" className = {cx("link")}><li>- React</li></Link>
                                <Link to = "/category/nodejs" className = {cx("link")}><li>- Node.js</li></Link>
                                <Link to = "/category/javascript" className = {cx("link")}><li>- JavaScript</li></Link>
                                <Link to = "/category/jQuery" className = {cx("link")}><li>- jQuery</li></Link>
                            </ul>
                        </div>
                        <div className = {cx("section")}>
                            <h4>Dev</h4>
                            <ul>
                                <Link to = "/category/diary" className = {cx("link")}><li>- diary</li></Link>
                            </ul>
                        </div>
                        <div className = {cx("section")}>
                            <h4>Life</h4>
                            <ul>
                                <Link to = "/category/chat" className = {cx("link")}><li>- chat</li></Link>
                            </ul>
                        </div>
                    </div>
                    <div className = {cx("board")}>
                        <span>
                            게시판
                        </span>
                    </div>
                </div>
                <div className = {cx("footer")}>
                    <Link to = "/write" className = {cx("link-edit")} >
                        <div>
                            <i className = "fas fa-edit"/>
                        </div>
                    </Link>
                </div>
            </div>
        );

        const basic = (
            <div>
                <div className = {cx("menu")}>
                    <i className = "fas fa-bars" onClick = {this._showmenu} />
                    <i className = "fas fa-search" />
                </div>
                <div>
                    <Logo>
                        Bigraptor
                    </Logo>
                </div>
                <div className = {cx("subtitle")}>
                    My DevelopStory
                </div>
                <div className = {cx("profile")}>
                    {this.props.token.isLoggedin ? dologin : notlogin}
                </div>
            </div>
        );

        return(
            <div className = {cx("wrapper", {
                responsive : this.state.show
            })}>
                {this.state.show ? moremenu : basic}
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        showlogin : state.showlogin.show,
        token : state.account.token,
        user : state.account.login
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        showloginmodal : () => {
            return dispatch(showLoginModal());
        },
        tokencheck : (cookie) => {
            return dispatch(tokenCheckRequest(cookie));
        },
        logoutrequest : () => {
            return dispatch(logoutRequest());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Aside);
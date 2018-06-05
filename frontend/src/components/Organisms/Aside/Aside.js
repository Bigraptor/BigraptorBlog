import React, {Component} from "react";
import styles from "./Aside.scss";
import classNames from "classnames/bind";
import Logo from "../../Parts/Logo/Logo.js";
import { showLoginModal } from "../../actions/showLogin";
import { tokenCheckRequest } from "../../actions/account";
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
    };

    componentDidMount(){
        this.props.tokencheck();
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

    render(){

        const notlogin = (
            <div className = {cx("login-btn")} onClick = {this._showlogin}>
                로그인
            </div>
        );

        const dologin = (
            <div>
                환영합니다
            </div>
        )

        const moremenu = (
            <div className = {cx("more-wrapper")}>
                <div className = {cx("more")}>
                    <i className = "fas fa-times" onClick = {this._hidemenu}/>
                </div>
                <div className = {cx("section-wrapper")}>
                    <div className = {cx("section")}>
                        <h4>Tech</h4>
                        <ul>
                            <li>- React</li>
                            <li>- Node.js</li>
                            <li>- JavaScript</li>
                            <li>- jQuery</li>
                        </ul>
                    </div>
                    <div className = {cx("section")}>
                        <h4>Dev</h4>
                        <ul>
                            <li>- diary</li>
                        </ul>
                    </div>
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
        token : state.account.token
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        showloginmodal : () => {
            return dispatch(showLoginModal());
        },
        tokencheck : () => {
            return dispatch(tokenCheckRequest());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Aside);
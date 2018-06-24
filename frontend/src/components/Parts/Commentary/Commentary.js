import React, {Component} from "react";
import styles from "./Commentary.scss";
import classNames from "classnames/bind";
import moment from "moment";
import { connect } from "react-redux";

const cx = classNames.bind(styles);

class Commentary extends Component{
    render(){

        const comment = this.props.content.split('\n').map( (line, i) => {
            return (<span key = {i}>{line}<br/></span>); //////////////// textarea에서 db로 값을 저장하게 된다면, 엔터는 공백으로 저장이됩니다. 이것을 <br />로 치환하는식입니다.
        });

        const dateFormat = "YYYY-MM-DD hh:mm";
        const date = moment(this.props.created).format(dateFormat);

        return(
            <div className = {cx("wrapper")}>
                <div className = {cx("image")}>
                    <div>
                        <img src = {this.props.author === "Bigraptor" ? "/raptor.png" : "/user.png"} alter = "프로필 이미지"/>
                    </div>
                </div>
                <div className = {cx("section")}>
                    <div className = {cx("section-header")}>
                        <div className = {cx("id")}>
                            {this.props.author}
                        </div>
                        <span>{date}</span>
                    </div>
                    <div className = {cx("section-content")}>
                        {comment}
                    </div>
                </div>
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        loginstatus : state.account.login
    };
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Commentary);
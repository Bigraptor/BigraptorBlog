import React, {Component} from "react";
import styles from "./Article.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

class Article extends Component{
    static defaultProps = {
        article: '기본값'
      };

    render(){

        const admin = (
            <div>
                <Link to = {"/"+this.props.params.no+"/modify"} className = {cx("link")}>
                    <span>수정</span>
                </Link>
                <span onClick = {() => {this.props.delete(this.props.params.no)}}>삭제</span>
            </div>
        )

        return (
            <div>
                <div className = {cx("wrapper")} 
                dangerouslySetInnerHTML={{__html: this.props.article}}
                >
                </div>
                <div className = {cx("submenu")}>
                    {this.props.admin ? admin : ""}
                </div>
            </div>
        );
    }
};

export default Article;
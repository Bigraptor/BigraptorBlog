import React, {Component} from "react";
import styles from "./Article.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

class Article extends Component{

    render(){

        const article = this.props.article.split('\n').map( (line, i) => {
            return (<span key = {i}>{line}<br/></span>); //////////////// textarea에서 db로 값을 저장하게 된다면, 엔터는 공백으로 저장이됩니다. 이것을 <br />로 치환하는식입니다.
        });

        return (
            <div className = {cx("wrapper")}>
                {article}
            </div>
        );
    }
};

export default Article;
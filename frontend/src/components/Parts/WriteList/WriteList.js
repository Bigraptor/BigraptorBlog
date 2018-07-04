import React, { Component } from "react";
import styles from "./WriteList.scss";
import classNames from "classnames/bind";
import moment from "moment";
import ShowMore from "react-show-more";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

class WriteList extends Component{

    constructor(props){
        super(props);
        this.strip_tags = this.strip_tags.bind(this);
    };

    strip_tags (input = this.props.content, allowed) {    
        allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('');   
        var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
        var result = input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {        
                return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';    
            });
        return (
            
            <Link to = {"/"+this.props.no} className = {cx("link")}>
                <ShowMore
                lines={3}
                more=''
                >
                    {result}
                </ShowMore>
            </Link>
        )};

    render(){

        const dateFormat = "YYYY-MM-DD hh:mm";
        const date = moment(this.props.created).format(dateFormat);

        return(
            <div className = {cx("wrapper")}>
                <div>
                    <div className = {cx("title")}>
                        <Link to = {"/"+this.props.no} className = {cx("link")}>
                            {this.props.title}
                        </Link>
                    </div>
                    <div className = {cx("content")}>
                            {this.strip_tags()}
                        
                    </div>
                    <div className = {cx("footer")}>
                        <span className = {cx("category")}>{this.props.category}</span>
                        <span className = {cx("date")}>{date}</span>
                    </div>
                </div>
                <div className = {cx("thumbnail", {
                    disable : typeof this.props.thumbnail === "undefined"
                })}>
                    <img src = {"/thumbnail/" + this.props.id + "." + this.props.thumbnail} alt = "thumbnail" />
                </div>
            </div>
        );
    };
};

export default WriteList;
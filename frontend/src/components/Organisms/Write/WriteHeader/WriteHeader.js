import React, { Component } from "react";
import styles from "./WriteHeader.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

class WriteHeader extends Component{

    constructor(props){
        super(props);
        this.state= {
            title : "",
            category : "React"
        };

        this._change = this._change.bind(this);
    };

    _change(e){
        const a = {};
        a[e.target.name] = e.target.value;
        this.setState(a);
    }

    render(){
        return (
            <div className = {cx("wrapper")}>
                <div className = {cx("category-wrapper")}>
                    <select name="category" onChange = {this._change}>
                        <optgroup label="Tech">
                            <option value="react">React</option>
                            <option value="nodejs">Node.js</option>
                            <option value="javascript">JavaScript</option>
                            <option value="jQuery">jQuery</option>
                        </optgroup>
                        <optgroup label="Dev">
                            <option value="Diary">diary</option>
                        </optgroup>
                        <optgroup label="Life">
                            <option value="Chat">chat</option>
                        </optgroup>
                    </select>
                </div>
                <div className = {cx("input-wrapper")}>
                    <input type = "text" name = "title" placeholder = "제목을 입력하세요" value = {this.state.title} onChange = {this._change}/>
                </div>
                <div className = {cx("btn-wrapper")}>
                    <span onClick = {()=>{this.props.create(this.state.title, this.state.category)}}>
                        작성하기
                    </span>
                </div>
            </div>
        );
    }
};

export default WriteHeader;
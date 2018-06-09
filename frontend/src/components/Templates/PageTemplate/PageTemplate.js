import React, {Component} from "react";
import styles from "./PageTemplate.scss";
import classNames from "classnames/bind";
import { connect } from "react-redux";

const cx = classNames.bind(styles);

class PageTemplate extends Component{
    render(){
        return (
            <div>
                <div className = {cx("screen-mask", {
                    responsive : this.props.showloginmodal
                })}>
                    {this.props.showloginmodal ? this.props.screenmask : ""}
                </div>
                <div className = {cx("wrapper")}>
                    <header className = {cx("header")}>
                        {this.props.header}
                    </header>
                    <main className = {cx("main")}>
                        {this.props.children}
                    </main>
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
      showloginmodal : state.showlogin.show
    };
  };

export default connect(mapStateToProps)(PageTemplate);
import React, {Component} from "react";
import WriteTemplate from "../../Templates/WriteTemplate/WriteTemplate.js";
import Aside from "../../Organisms/Aside/Aside.js";
import WriteForm from "../../Organisms/Write/WriteForm/WriteForm.js";
import { tokenCheckRequest } from "../../actions/account";
import { connect } from "react-redux";

class WritePage extends Component{

    componentDidMount(){
        this.props.tokencheckrequest().then(() => {
            if(!this.props.loginstatus.admin){
                alert("권한이 없습니다.");
                window.location.href = "/";
            };
        });
    };

    render(){
        return (
            <div>
                <WriteTemplate header = {<Aside />} >
                    <WriteForm />
                </WriteTemplate>
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
        tokencheckrequest : () => {
            return dispatch(tokenCheckRequest());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WritePage);
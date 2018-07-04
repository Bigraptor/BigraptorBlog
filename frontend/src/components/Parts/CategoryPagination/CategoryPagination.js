import React, {Component} from "react";
import styles from "./CategoryPagination.scss";
import classNames from "classnames/bind";
import { postCategoryPaginationRequest, postCurrentPage, postNextPage, postPrevious } from "../../actions/post";
import { connect } from "react-redux";

const cx = classNames.bind(styles);
 
class Pagination extends Component {

    constructor(props){
        super(props);
        this.state = {
            firstpage : Math.floor((window.location.href.split("/")[6]*1 - 1) / 10) * 10 + 1,
            lastpage : 1,
            pagelist : []
        };

        this.getpage = this.getpage.bind(this);
        this.conditionmap = this.conditionmap.bind(this);
    };
    
    componentDidMount(){
        this.props.postcategorypaginationrequest(window.location.href.split("/")[4]).then(
            () => {
                if(typeof window.location.href.split("/")[6] === "undefined"){
                    this.setState({
                        firstpage : 1
                    });
                }

                this.setState({
                    lastpage : this.state.firstpage+10-1
                });
                if(this.state.lastpage>this.props.paginationstatus.totalpage){
                    this.setState({
                        lastpage : this.props.paginationstatus.totalpage
                    });
                };

                for(let i = this.state.firstpage; i <= this.state.lastpage; i++){
                    this.getpage(i);
                };

                if(typeof window.location.href.split("/")[6]==="undefined"){
                    this.props.postCurrentPage(1);
                }else{
                    this.props.postCurrentPage(window.location.href.split("/")[6]*1);
                };
                    
            }
        );
    };

    getpage(i){
            this.setState({
                pagelist : this.state.pagelist.concat(i)
            });
    };

    conditionmap(a){
            if(a===1){
                return <a href = {"/category/"+this.props.params.category}>{a}</a>
            }else{
                return <a href = {window.location.href + "/page/"+a}>{a}</a>
            }
    }; //////////// 1페이지를 눌렀을 때는 메인화면으로 돌아오는 방식을 구현하기 위한 함수이다.


    render() {

        return (
            <div>
                <ul className= {cx("pagination")}>
                    <li className={cx("first", {
                        disablefirst : this.state.firstpage === this.props.paginationstatus.currentpage
                    })}>
                        <a href = {"/category/"+this.props.params.category+"/page/"+this.props.paginationstatus.currentpage} onClick = {() => {this.props.postPrevious()}}>이전</a>
                    </li>
                    {this.state.pagelist.map( (a, i) => {
                        return <li key = {i} className = {cx("page", {respons : this.props.paginationstatus.currentpage === a})}>
                        {this.conditionmap(a)}
                        </li>
                    })}
                    <li className={cx("last", {
                            disablelast : this.state.lastpage === this.props.paginationstatus.currentpage
                        })}>
                        <a href = {window.location.href + "/page/"+ this.props.paginationstatus.currentpage} onClick = {()=>{this.props.postNextPage()}}
                        className = {cx("next")}>다음</a>
                    </li>
                </ul>
            </div>
        );
    }
}

export const mapStateToProps = (state) => {
    return {
        paginationstatus : state.post.page
    };
};

export const mapDispatchToProps = (dispatch) => {
    return {
        postcategorypaginationrequest : (category) => {
            return dispatch(postCategoryPaginationRequest(category));
        },
        postCurrentPage : (page) => {
            return dispatch(postCurrentPage(page));
        },
        postNextPage : () => {
            return dispatch(postNextPage());
        },
        postPrevious : () => {
            return dispatch(postPrevious());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
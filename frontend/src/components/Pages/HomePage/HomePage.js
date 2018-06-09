import React from "react";
import styles from "./HomePage.scss";
import classNames from "classnames/bind";
import PageTemplate from "../../Templates/PageTemplate/PageTemplate.js";
import Aside from "../../Organisms/Aside/Aside.js";
import Content from "../../Organisms/Content/Content.js";
import ScreenMask from "../../Parts/ScreenMask/ScreenMask.js";

const cx = classNames.bind(styles);

const HomePage = ({match}) => {
    return (
        <div>
            <PageTemplate header = {<Aside />} screenmask = {<ScreenMask />}>
                <Content params = {match.params} />
            </PageTemplate>
        </div>
    );
};

export default HomePage;

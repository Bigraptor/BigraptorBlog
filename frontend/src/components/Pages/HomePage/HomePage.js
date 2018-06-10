import React from "react";
import PageTemplate from "../../Templates/PageTemplate/PageTemplate.js";
import Aside from "../../Organisms/Aside/Aside.js";
import Content from "../../Organisms/Content/Content.js";
import ScreenMask from "../../Parts/ScreenMask/ScreenMask.js";

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

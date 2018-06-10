import React from "react";
import WriteViewTemplate from "../../Templates/WriteViewTemplate/WriteViewTemplate.js";
import Aside from "../../Organisms/Aside/Aside.js";
import Content from "../../Organisms/WriteView/Content/Content.js";
import ScreenMask from "../../Parts/ScreenMask/ScreenMask.js";

const WriteViewPage = () => {
    return (
        <div>
            <WriteViewTemplate header = {<Aside />} screenmask = {<ScreenMask />}>
                <Content />
            </WriteViewTemplate>
        </div>
    );
};

export default WriteViewPage;
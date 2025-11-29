import React from "react";
import TabBottomNavigator from "./TabBottomNavigator";
function LayoutPage(props) {
  return (
    <div className="">
      {/* <Header /> */}
      <div className="children__content">{props.children}</div>
      <TabBottomNavigator />
    </div>
  );
}

export default LayoutPage;

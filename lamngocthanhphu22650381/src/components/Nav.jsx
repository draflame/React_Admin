import React from "react";
import "../css/Nav.css";

export default function Nav() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const handleItemClick = (index) => {
    setActiveIndex(index);
  };
  const menuName = [
    "Dashboard",
    "Projects",
    "Teams",
    "Analytics",
    "Messages",
    "Integrations",
  ];
  const menuIcon = [
    "../../img/dashboard.png",
    "../../img/Folder.png",
    "../../img/Groups.png",
    "../../img/Pie chart.png",
    "../../img/Chat.png",
    "../../img/Code.png",
  ];
  const menuLink = [
    "/",
    "/projects",
    "/teams",
    "/analytics",
    "/messages",
    "/integrations",
  ];
  return (
    <div className="container-nav justify-content-start">
      <img src="../../img/Image 1858.png" alt="" />
      <ul className="menu mt-3">
        {menuName.map((item, index) => {
          return (
            <li
              key={index}
              className={`item ${activeIndex === index ? "active" : ""}`}
              onClick={() => handleItemClick(index)}
            >
              <a href="/" className="link">
                <img src={menuIcon[index]} alt="" />
                {item}
              </a>
            </li>
          );
        })}
      </ul>
      <div className="ad">
        <img src="../../img/Group.png" alt="" />
        <h3>V2 is available</h3>
        <button>Try now</button>
      </div>
    </div>
  );
}

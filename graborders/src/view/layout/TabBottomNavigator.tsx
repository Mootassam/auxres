
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { i18n } from "../../i18n";

interface TabItem {
  icon: string;
  path: string;
  name: string;
}

function TabBottomNavigator() {
  const location = useLocation();

  const isActive = (pathname: string) => location.pathname === pathname;

  const tabs: TabItem[] = [
    {
      icon: "./icons/home.png",
      path: "/",
      name: i18n("components.bottomNav.home"),
    },
    {
      icon: "./icons/quotes.png",
      path: "/market",
      name: i18n("components.bottomNav.market"),
    },
    {
      icon: "./icons/trade.png",
      path: "/trade",
      name: i18n("components.bottomNav.trade"),
    },
    {
      icon: "./icons/finance.png",
      path: "/futures",
      name: i18n("components.bottomNav.futures"),
    },
    {
      icon: "./icons/assets.png",
      path: "/wallets",
      name: i18n("components.bottomNav.wallets"),
    },
  ];

  return (
    <div className="bottom-nav">
      {tabs.map((item, index) => (
        <Link key={index} to={item.path} className={`nav-item remove_blue ${isActive(item.path) ? 'active' : ''}`}>
          <img src={item.icon} style={
            {height: 23}
          } />
          <span>{item.name}</span>
        </Link>
      ))}
    </div>
  );
}

export default TabBottomNavigator;
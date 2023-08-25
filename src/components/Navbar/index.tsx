import React, { useState } from "react";
import { Layout, Menu, Button } from "antd";
import type { MenuProps } from "antd";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import logo from "./pokemon_logo.png";

const { Header } = Layout;
const items: MenuProps["items"] = [
  {
    label: (
      <NavLink to="/" className={({ isActive, isPending }) => (isPending ? "pending" : isActive ? "active" : "")}>
        Home
      </NavLink>
    ),
    key: "home",
  },
  {
    label: (
      <NavLink
        to="/details/1"
        className={({ isActive, isPending }) => (isPending ? "pending" : isActive ? "active" : "")}
      >
        Pokemon Profile
      </NavLink>
    ),
    key: "profile",
  },
  {
    label: "About",
    key: "about",
    disabled: true,
  },
  {
    label: "Contact",
    key: "contact",
    disabled: true,
  },
];

const Navbar = () => {
  const [current, setCurrent] = useState("home");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    // <Layout className="navbar-color">
    //   <Header className="navbar-color">
    //     <Menu
    //       theme="dark"
    //       className="navbar-color"
    //       onClick={onClick}
    //       selectedKeys={[current]}
    //       mode="horizontal"
    //       items={items}
    //     />
    //   </Header>
    // </Layout>
    <>
      <nav className="navbar shadow-sm">
        <div className="container">
          <NavLink to="/" className="navbar-brand"><img src={logo} width={140} alt="logo" /></NavLink>
          {/* <a href="" className="navbar-brand"><img src={logo} width={140} alt="logo" /></a> */}
          <ul className="navbar-nav">
            <li>
              <NavLink to="/" className="nav-link">Home</NavLink>
            </li>
            <li>
              <NavLink to="/details/1" className="nav-link">Pokemon Profile</NavLink>
            </li>
            <li>
              <NavLink to="/about" className="nav-link">About</NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="nav-link disabled">Contact</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

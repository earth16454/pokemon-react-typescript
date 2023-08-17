import React, { useState } from "react";
import { Layout, Menu, Button } from "antd";
import type { MenuProps } from "antd";
import { NavLink } from "react-router-dom";

const { Header } = Layout;
const items: MenuProps["items"] = [
  {
    label: (
      <NavLink
        to="/"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        }
      >Home</NavLink>
    ),
    key: "home",
  },
  {
    label: (
      <NavLink
        to="/details/1"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        }
      >Pokemon Profile</NavLink>
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
    <Layout>
      <Header>
        <Menu
          theme="dark"
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
        />
      </Header>
    </Layout>
  );
};

export default Navbar;

import React, { useState } from "react";
import { Layout, Menu, Button } from "antd";
import type { MenuProps } from "antd";
import { NavLink } from "react-router-dom";

const { Header } = Layout;

// interface 


const Navbar = () => {
  const [current, setCurrent] = useState("home");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <Layout>
      <Header>
      </Header>
    </Layout>
  );
};

export default Navbar;

import { Container } from "@mui/material";
import Navbar from "components/Navbar";
import React, { Fragment } from "react";

const Layout = (props) => {
  return (
    <Fragment>
      <Navbar />
      <Container component="main" maxWidth="xs">
        {props.children}
      </Container>
    </Fragment>
  );
};

export default Layout;

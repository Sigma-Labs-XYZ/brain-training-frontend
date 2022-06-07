import React from "react";
import { Container, Box, Avatar } from "@mui/material";

export default function UserCurrentAvatar(props) {
  return (
    <Container align="center">
      <Box align="center" sx={{ justifyContent: "space-between" }}></Box>
      <Avatar src={props.selectedAvatar} />
      <Box align="center"></Box>
    </Container>
  );
}

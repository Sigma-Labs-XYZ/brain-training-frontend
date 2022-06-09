import React from "react";
import { Container, Box, Avatar } from "@mui/material";

export default function UserCurrentAvatar(props) {
  // async function fetchUserProfilePicture() {
  //   const user = await getProfile();
  //   const user = user.user.win_message;
  //   return userWinMessage;
  // }
  return (
    <Container align="center">
      <Box align="center" sx={{ justifyContent: "space-between" }}></Box>
      <Avatar
        sx={{ height: "300px", width: "300px" }}
        src={props.selectedAvatar}
      />
      <Box align="center"></Box>
    </Container>
  );
}

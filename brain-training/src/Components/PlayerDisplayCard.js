import { getProfile } from "./Networking";
import { Box, Container } from "@mui/system";

export default function PlayerDisplayCard() {
  async function fetchProfile() {
    const playerAvatar = await getProfile(2);
    return playerAvatar;
  }
  console.log(fetchProfile());
  return <div> {}</div>;
}

/*

  <Container>
      <Box sx={{ justifyContent: "space-between", width: 300, height: 300 }}>
        {fetchProfile()}
      </Box>
    </Container>
*/

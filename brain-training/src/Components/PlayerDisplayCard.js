import { getProfile } from "./Networking";

export default function PlayerDisplayCard(props) {
  async function fetchProfile() {
    const playerAvatar = await getProfile({ userID: 2 });
    return playerAvatar;
  }

  return <div>{fetchProfile()}</div>;
}

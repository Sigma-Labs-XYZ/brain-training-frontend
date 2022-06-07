import QuestionsAndAnswers from "../QuestionsAndAnswers";
import ScoreDisplay from "../ScoreDisplay";
import { Container } from "@mui/system";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/material";
import useSound from "use-sound";
import fromTheStart from "../../../Sounds/fromTheStart.mp3";
import { useState, useEffect } from "react";
import io from "socket.io-client";
const socket = io.connect("https://brain-training-multiplayer.sigmalabs.co.uk");
const room = 5678;
//const username = "tibooooo";

export default function MultiplayerGame() {
  const [isMusic, setIsMusic] = useState(false);
  const [score, setScore] = useState(0);
  const [sneakySecondsLeft, setSneakySecondsLeft] = useState(0);
  const [play, { stop }] = useSound(fromTheStart, { volume: 0.1 });
  const [scoreList, setScoreList] = useState([]);
  const [username, setUsername] = useState("");
  const [showUser, setShowUser] = useState(true);

  socket.emit("join_room", { username, room });

  function loadQuestion() {
    return (
      <QuestionsAndAnswers
        addToScore={addToScore}
        resetSneakySeconds={resetSneakySeconds}
      />
    );
  }

  function resetSneakySeconds() {
    setSneakySecondsLeft(20);
    setTimeout(newNewQuestion, 500);
  }

  function newNewQuestion() {
    setSneakySecondsLeft(0);
  }

  function handlePlayClick() {
    play();
    setIsMusic(true);
  }
  function handleStopClick() {
    stop();
    setIsMusic(false);
  }

  function submitUsername() {
    setShowUser(false);
  }

  function addToScore(points) {
    const currentScore = score;
    setScore(currentScore + points);
  }

  const sendScore = async () => {
    const scoreData = {
      username: username,
      score: score,
      time: new Date(Date.now()).getUTCDate(),
    };

    await socket.emit("send_score", scoreData);
    console.log("sending score is happening");
    setScoreList([...scoreList, scoreData]);
  };

  useEffect(() => {
    console.log("use effect running");
    displayUserScores();
    socket.on("receive_score", (data) => {
      setScoreList([...scoreList, data]);
    });
  }, [scoreList]);

  useEffect(() => {
    sendScore();
  }, [score]);

  function displayUserScores() {
    return scoreList.map((user) => (
      <Typography gutterBottom variant="h5" component="h2" align="center">
        {`name: ${user.username}, score: ${user.score}`}
      </Typography>
    ));
  }

  return (
    <Container align="center">
      {!isMusic ? (
        <Button onClick={handlePlayClick}>Play Music!</Button>
      ) : (
        <Button onClick={handleStopClick}>Stop Music!</Button>
      )}
      <Box align="center" sx={{ justifyContent: "space-between" }}>
        <ScoreDisplay score={score} />
        {displayUserScores()}
      </Box>
      <Box align="center">
        {sneakySecondsLeft === 0 ? loadQuestion() : null}
      </Box>
      <Box align="center">
        {showUser ? (
          <input
            type="text"
            value={username}
            placeholder="Name"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            onKeyPress={(event) => {
              event.key === "Enter" && submitUsername();
            }}
          />
        ) : null}
        {showUser ? <button onClick={submitUsername}>&#9658;</button> : null}
      </Box>
    </Container>
  );
}

//  -Display QuestionAndAnswers component
//     -Display Question first, then after some seconds
//      display options to answer with
//     -Start timer component when answer options display
//     -Display users current score
//     -Quicker you answer = more points
//     -at end of round take you to EndOfRound screen
//     -At end of game display MultiplayerResults
//     -Uses websockets
//     -Game sound?

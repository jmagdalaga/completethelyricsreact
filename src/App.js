import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const singerlist = [
  { id: 1, name: "first singer", color: "#AE92EB"},
  { id: 2, name: "second singer", color: "#9FD36B"},
  { id: 3, name: "third singer", color: "#48CDAE"},
  { id: 4, name: "fourth singer", color: "#ED87C1"},
];

function App() {
  const [selectedSinger, setSelectedSinger] = useState(null);
  const [lyrics, setLyrics] = useState([]);
  const [lyricInput, setLyricInput] = useState(null);

  const [prevSingerColor, setPrevSingerColor] = useState(singerlist[0]);

  const handleChange = (event) => {
    setLyricInput(event.target.value);
  };

  const handleSubmit = (event) => {
    if (event.key === "Enter" && event.target.value !== "" && selectedSinger) {
      if (!lyrics) {
        setLyrics([{ lyric: lyricInput, color: selectedSinger.color }]);
      } else {
        setLyrics([
          ...lyrics,
          { lyric: lyricInput, color: selectedSinger.color },
        ]);
      }
      setLyricInput("");
    }
  };

  useEffect(() => {
    if (!selectedSinger || !lyricInput) {
      setLyricInput("");
      return;
    }
    setLyrics((prevLyrics) => [
      ...prevLyrics,
      {
        lyric: lyricInput,
        color: prevSingerColor.color,
      },
    ]);
    setLyricInput("");
    console.log("Yours", lyrics);
  }, [selectedSinger]);

  return (
    <Grid
      container
      spacing={0}
      justifyContent={"center"}
      alignItems={"center"}
      direction={"column"}
      aria-label={"main container"}
      sx={{
        flex: 1,
        minWidth: "100vh",
        minHeight: "100vh",
      }}
    >
      <div
        className={
          " flex-row w-[1000px] justify-center items-center p-5 text-center"
        }
      >
        <h1 className={"font-bold text-3xl mb-10"}>Complete the Lyrics</h1>
        <div
          className={"flex-row flex text-white justify-center"}
          style={{ display: 'flex', justifyContent: 'center', gap: '0px' }}
        >
          {singerlist.map((singer, id) => (
            <Link key={id} to={`/singer/${singer.name}`} style={{ textDecoration: 'none' }}>
              <Button
                onClick={() => {
                  if (selectedSinger) {
                    setPrevSingerColor(selectedSinger);
                  }
                  setSelectedSinger(singer);
                }}
                sx={{
                  paddingY: "18px",
                  paddingX: "50px",
                  backgroundColor: singer.color,
                  color: "white",
                  borderRadius: 0,
                  ":hover": {
                    backgroundColor: singer.color,
                  },
                }}
              >
                {singer.name}
              </Button>
            </Link>
          ))}
        </div>

        {selectedSinger && (
          <Box
            sx={{
              width: 1000,
              maxWidth: "100%",
              marginTop: "15px",
            }}
          >
            <TextField
              fullWidth
              id="fullWidth"
              value={lyricInput}
              onChange={handleChange}
              onKeyPress={handleSubmit}
              variant="outlined"
              sx={{
                width: '80%',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '15px',
                  '& fieldset': {
                    borderColor: lyricInput ? 'blue' : 'rgba(0, 0, 0, 0.8)',
                    borderWidth: 2,
                  },
                  '&:hover fieldset': {
                    borderColor: lyricInput ? 'blue' : 'rgba(0, 0, 0, 1)',
                    borderWidth: 2,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'blue',
                    borderWidth: 2,
                  },
                },
              }}
            />
          </Box>
        )}
        <div className={"mt-5"}>
          <Paper
            sx={{
              padding: 2,
              minWidth: 300,
              minHeight: 400,
              width: '90%',
              maxWidth: 1500,
              maxHeight: 550,
              overflowY: "auto",
              margin: '0 auto',
              display: 'block',
              borderRadius: 5,
              border: 3,
              borderColor: '#E9E8EA',
              padding: '35px', 
              fontSize: '16px',
            }}
          >
            {lyrics?.map((lyric, index) => (
              <div
                key={index}
                className={`mb-3 rounded overflow-auto p-2 text-left text-black`}
                style={{
                  backgroundColor: lyric.color,
                  borderRadius: '10px',
                  padding: '10px',
                }}
              >
                <span className={"text-xl text-white"}>{lyric.lyric}</span>
              </div>
            ))}
            {lyricInput && (
              <div
                className={`rounded overflow-auto p-2 text-left`}
                style={{
                  backgroundColor: selectedSinger.color,
                  borderRadius: '10px',
                  padding: '10px', 
                }}
              >
                <span className={"text-xl text-white items-start"}>
                  {lyricInput}
                </span>
              </div>
            )}
          </Paper>
        </div>
      </div>
    </Grid>
  );
}

export default App;
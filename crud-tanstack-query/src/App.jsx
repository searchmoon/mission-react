import { Route, Routes } from "react-router-dom";
import SongList from "./pages/SongList";

function App() {
  return (
    <>
      <h1>The Taylor Swift Apocalypse</h1>
      <Routes>
        <Route path="/" element={<SongList />} />
      </Routes>
    </>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Popular from "./Routes/Popular";
import ComingSoon from "./Routes/ComingSoon";
import NowPlaying from "./Routes/NowPlaying";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Popular />}></Route>
        <Route path="/movies/:movieId" element={<Popular />} />
        <Route path="/coming-soon" element={<ComingSoon />}></Route>
        <Route path="/coming-soon/movies/:movieId" element={<ComingSoon />} />
        <Route path="/now-playing" element={<NowPlaying />}></Route>
        <Route path="/now-playing/movies/:movieId" element={<NowPlaying />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

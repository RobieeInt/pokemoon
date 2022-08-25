
import "./App.css";
import "./Components/style.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Main from "./Pages/Main";
import DetailPokemon from "./Pages/DetailPokemon";
import MyPokemon from "./Pages/MyPokemon";
import Arena from "./Pages/Arena";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/detail/:id" element={<DetailPokemon />} />
        <Route path="/mypokemon" element={<MyPokemon />} />
        <Route path="/arena" element={<Arena />} />
      </Routes>
    </Router>
  );
}

export default App;

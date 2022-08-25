
import "./App.css";
import "./Components/style.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Main from "./Pages/Main";
import DetailPokemon from "./Pages/DetailPokemon";
import MyPokemon from "./Pages/MyPokemon";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/detail/:id" element={<DetailPokemon />} />
        <Route path="/mypokemon" element={<MyPokemon />} />
      </Routes>
    </Router>
  );
}

export default App;

import React from "react";
import "./App.css";
import PokemonTable from "./components/PokemonTable3";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <h1 className="text-center">Pokemons API</h1>
      <PokemonTable />
    </>
  );
}

export default App;

import React from "react";
import PokemonTable from "../components/PokemonTable";
import Navbar from "../components/Navbar";
// import "../components/detail.css";

const Home = () => {
  return (
    <>
      <Navbar />
      <h1 className="pokemon-brand text-center">Pokemons API</h1>
      <PokemonTable />
    </>
  );
};

export default Home;

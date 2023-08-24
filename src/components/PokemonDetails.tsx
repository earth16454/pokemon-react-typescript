import React, { useState, useEffect } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import axios from "axios";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Navbar from "./Navbar";
import { Spin, Image, Tag, Card, Divider, Button } from "antd";
import {
  Pokemon,
  Ability,
  Types,
  Species,
  Sprites,
  Dream_world,
  typeColorInterface,
} from "./interface";
import "./detail.css";

const PokemonDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [pokemon, setPokemon] = React.useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // const location = useLocation();
  // const { state } = useLocation();

  // setPokemon(state);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => {
        const data = response.data;
        const abilities = data.abilities.map((ability: Ability) => ({
          ability: { name: ability.ability.name },
        }));

        const types = data.types.map((type: Types) => ({
          type: { name: type.type.name },
        }));

        const pokemonDetails: Pokemon = {
          id: data.id,
          name: data.name,
          types: types,
          abilities: abilities,
          sprites: data.sprites.other.home,
        };
        setPokemon(pokemonDetails);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Pokemon details:", error);
      });
  }, [id]);

  if (!pokemon) {
    return (
      <div className="loading">
        <Spin spinning={loading} className="spin-loading" size="large"></Spin>
      </div>
    );
  }

  return loading ? (
    <>
      <Navbar />
      <div className="loading">
        <Spin spinning={loading} className="spin-loading" size="large"></Spin>
      </div>
    </>
  ) : (
    <>
      <Navbar />
      <div className="container">
        <div className="back-link">
          <Link to={"/"}>
            <Button icon={<ArrowLeftOutlined />} className="btn-back">
              Back
            </Button>
          </Link>
        </div>
        <div className="content">
          <Card style={cardStyle}>
            <div className="pokemon-img">
              <Image width={200} src={pokemon.sprites.front_default}></Image>
            </div>
            <Divider />
            <h2>{pokemon.name}</h2>
            <div className="pokemon-detail">
              <p>ID: {pokemon.id}</p>
              <p>
                Type:{" "}
                {pokemon.types.map((types, index) => {
                  let color: string = types.type.name;
                  return <Tag color={type_color[color]} key={index}>{types.type.name}</Tag>;
                })}
              </p>
              <p>
                Abilities:{" "}
                {pokemon.abilities
                  .map((ability) => ability.ability.name)
                  .join(", ")}
              </p>
            </div>
          </Card>
        </div>

      </div>
    </>
  );
};

const type_color: typeColorInterface = {
  normal: "#8a8a59",
  fire: "#f09030",
  water: "#6890f0",
  electric: "#f8d030",
  grass: "#78c050",
  ice: "#98d8d8",
  fighting: "#c03028",
  poison: "#a040a0",
  ground: "#e9c968",
  flying: "#a890f0",
  bug: "#a8b820",
  rock: "#b8a038",
  ghost: "#705898",
  dragon: "#7038f8",
  dark: "#705848",
  steel: "#b8b8d0",
  fairy: "#e989e8",
};

const cardStyle = {
  width: "360px",
  borderRadius: "12px",
  boxShadow: "0 0.5rem 1rem rgba(0, 21, 41, 0.3",
};

export default PokemonDetails;

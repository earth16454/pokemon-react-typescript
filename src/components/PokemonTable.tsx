import React, { useEffect, useState } from "react";
import { Table, Button, Image, Tag, Input } from "antd";
import axios from "axios";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Pokemon, Species, Types, Ability, Dream_world } from "./interface";
import "./detail.css";
const PokemonTable: React.FC = () => {
  const [data, setData] = useState<Pokemon[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/")
      .then((response) => {
        const pokemonList: Pokemon[] = response.data.results.map(
          (pokemon: any) => {
            return {
              id: parseInt(pokemon.url.split("/")[6]),
              name: pokemon.name,
              types: [],
              abilities: [],
              sprites: { other: { front_default: "" }, front_female: null },
            };
          }
        );

        const promises: Promise<void>[] = pokemonList.map(
          (pokemon: Pokemon) => {
            return axios
              .get(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}/`)
              .then((response) => {
                pokemon.types = response.data.types;
                pokemon.abilities = response.data.abilities;
                pokemon.sprites = response.data.sprites.other.dream_world;
              });
          }
        );

        const filteredData = pokemonList.filter((pokemon: Pokemon) => {
          return pokemon.name.toLowerCase().includes(searchValue.toLowerCase());
        });

        Promise.all(promises).then(() => {
          // setData(pokemonList);
          setData(filteredData);
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [searchValue]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Image",
      dataIndex: "sprites",
      key: "sprites",
      render: (sprites: Dream_world) => (
        <Image src={sprites.front_default} alt="Pokemon" width={50}></Image>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "types",
      key: "types",
      render: (types: Types[]) =>
        types.map((type) => {
          return <Tag>{type.type.name}</Tag>;
        }),
    },
    {
      title: "Abilities",
      dataIndex: "abilities",
      key: "abilities",
      render: (abilities: { ability: { name: string } }[]) =>
        abilities.map((ability) => ability.ability.name).join(", "),
    },
    {
      title: "View",
      key: "view",
      render: (text: string, record: Pokemon) => (
        <Link to={`details/${record.id}`} key={record.id}>
          <Button icon={<SearchOutlined />}>View Details</Button>
        </Link>
      ),
    },
  ];

  return (
    <div className="container">
      <div className="search-container">
        <Input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)}></Input>
        <p>{searchValue}</p>
      </div>
      <Table dataSource={data} columns={columns} />
    </div>
  );
};

export default PokemonTable;

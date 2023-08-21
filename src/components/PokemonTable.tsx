import React, { useEffect, useState } from "react";
import { Table, Button, Image, Tag, Input, Spin, Space, Typography, Layout } from "antd";
import axios from "axios";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Results, Pokemon, Species, Types, Ability, Dream_world, typeColorInterface } from "./interface";
import "./detail.css";
import Search from "antd/es/input/Search";

const { Text } = Typography;

const PokemonTable: React.FC = () => {
  const [pokeData, setPokeData] = useState<Pokemon[]>([]);
  const [pokeShow, setPokeShow] = useState<Pokemon[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [loading, setLoading] = useState<boolean>(true);
  const [nextUrl, setNextUrl] = useState<string | undefined>();
  const [prevUrl, setPrevUrl] = useState<string | undefined>();

  const pokeFun = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      setNextUrl(res.data.next);
      setPrevUrl(res.data.previous);
      getPokemon(res.data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  // const getPokemon = async (response: any) => {
  //   const pokemonList: Pokemon[] = response.map(async (pokemon: any) => {
  //     // const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}/`);
  //     const response = await axios.get(pokemon.url);
  //     const data = response.data;
  //     return {
  //       id: data.id,
  //       name: data.name,
  //       types: data.types,
  //       abilities: data.abilities,
  //       sprites: data.sprites.other.dream_world,
  //     }
  //   });
  //   setPokeData(pokemonList);
  //   setPokeShow(pokemonList);
  // };


  const getPokemon = async (response: any) => {
    const pokemonList: Pokemon[] = response.map((pokemon: any) => {
      return {
        id: parseInt(pokemon.url.split("/")[6]),
        name: pokemon.name,
        types: [],
        abilities: [],
        sprites: { other: { front_default: "" }, front_female: null },
      };
    });

    const promises: Promise<void>[] = pokemonList.map((pokemon: Pokemon) => {
      return axios
        .get(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}/`)
        .then((response) => {
          pokemon.types = response.data.types;
          pokemon.abilities = response.data.abilities;
          pokemon.sprites = response.data.sprites.other.dream_world;
        });
    });

    Promise.all(promises).then(() => {
      setPokeData(pokemonList);
    });
  };

  useEffect(() => {
    pokeFun();
  }, []);

  useEffect(() => {
    setPokeShow(pokeData);
  }, [pokeData]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);

    const filtered = pokeData.filter((pokemon: Pokemon) => {
      return pokemon.name.toLowerCase().includes(event.target.value.toLowerCase());
    });

    setPokeShow(filtered);
  };

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
          return <Tag color={type_color[type.type.name]}>{type.type.name}</Tag>;
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

  return loading ? (
    <>
      <div className="loading">
        <Spin spinning={loading} className="spin-loading" size="large"></Spin>
      </div>
    </>
  ) : (
    <div className="container">
      <div className="search-container">
        <Space direction="horizontal" style={{width: 350}}>
          <Text>Search:</Text>
          <Search placeholder="Search..." onChange={handleInputChange}></Search>
        </Space>
        {/* <Input
          type="text"
          onChange={handleInputChange}
        ></Input> */}
        <p>{searchValue}</p>
      </div>
      <Table dataSource={pokeShow} columns={columns} />
    </div>
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

export default PokemonTable;

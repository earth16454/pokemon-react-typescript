import React, { useEffect, useState } from "react";
import { Table, Button, Image, Tag, Input, Space, Typography, Select } from "antd";
import type { PaginationProps } from "antd";
import axios from "axios";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Results, Pokemon, Types, Dream_world, typeColorInterface } from "./interface";
import "./detail.css";

const { Text } = Typography;
const { Search } = Input;
const { Option } = Select;

interface TypesAPI {
  name: string;
  pokemon: { pokemon: Results; slot: number }[];
}

const PokemonTable: React.FC = () => {
  const [pokeDataAll, setPokeDataAll] = useState<Pokemon[]>([]);
  const [pokeData, setPokeData] = useState<Pokemon[]>([]);
  const [filteredData, setFilteredData] = useState<Pokemon[]>([]);
  const [url, setUrl] = useState<string>(`https://pokeapi.co/api/v2/pokemon/`);
  const [countPokemon, setCountPokemon] = useState<number>(0);

  const [pokeTypes, setPokeTypes] = useState<TypesAPI[]>([]);
  const [TypesUrl, setTypesUrl] = useState<string>(`https://pokeapi.co/api/v2/type/`);
  const [countTypes, setCountTypes] = useState<number>(0);

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchPokemonData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      setCountPokemon(res.data.count);
      getPokemon(res.data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  const getPokemon = async (response: Results[]) => {
    const pokemonResponses = await Promise.all(response.map((result: Results) => axios.get(result.url)));

    const pokemonList: Pokemon[] = pokemonResponses.map((response: any) => {
      const data = response.data;
      return {
        id: data.id,
        name: data.name,
        types: data.types,
        abilities: data.abilities,
        sprites: data.sprites.other.home,
      };
    });

    const newPokemonList: Pokemon[] = pokemonList.filter((newPokemon) => {
      return !pokeDataAll.some((existingPokemon) => existingPokemon.id === newPokemon.id);
    });

    const updatedPokemonSet = new Set([...pokeDataAll, ...newPokemonList]);
    const updatedPokemonArray = Array.from(updatedPokemonSet);

    setPokeDataAll(updatedPokemonArray);
    setFilteredData(pokemonList);
  };

  const getTypes = async (response: Results[]) => {
    const typesResponses = await Promise.all(response.map((result: Results) => axios.get(result.url)));

    const pokemonTypeList: TypesAPI[] = typesResponses.map((response: any) => {
      const data = response.data;
      return {
        name: data.name,
        pokemon: data.pokemon,
      };
    });

    setPokeTypes(pokemonTypeList);
  };

  const fetchPokemonTpyes = async () => {
    setLoading(true);
    try {
      const resTypes = await axios.get(TypesUrl);
      setCountTypes(resTypes.data.count);
      getTypes(resTypes.data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPokemonData();
  }, [url]);

  useEffect(() => {
    fetchPokemonTpyes();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target.value.toLowerCase();

    let filtered = pokeDataAll.filter((pokemon: Pokemon) => {
      const nameMatch = pokemon.name.toLowerCase().includes(searchText);

      if (nameMatch && selectedTypes.length > 0) {
        const typeMatch = pokemon.types.some((type) => selectedTypes.includes(type.type.name));
        return typeMatch;
      }

      return nameMatch;
    });

    setFilteredData(filtered);
  };

  const handleSelectType = (values: string[]) => {
    setSelectedTypes(values);
    let filtered = pokeDataAll.filter((pokemon: Pokemon) => {
      if (values.length === 0) {
        return true;
      }
      const resultSelectType = pokemon.types.some((type: Types) => values.includes(type.type.name));
      return resultSelectType;
    });
    setFilteredData(filtered);
  };

  const selectPageNumber = (page: number, pageSize: number) => {
    let totalRecordOnPage: number = page * pageSize; // limit
    let limitPage: number = pageSize;
    let offsetPage: number = totalRecordOnPage - pageSize; // offset
    setCurrentPage(page);

    let checkIdUrl: boolean = false;
    pokeDataAll.map((pokemon) => {
      if (!(pokemon.id > offsetPage && pokemon.id <= limitPage)) {
        checkIdUrl = true;
      }
      // console.log(`id: ${pokemon.id}, name: ${pokemon.name}`);
    });
    checkIdUrl && setUrl(`https://pokeapi.co/api/v2/pokemon/?offset=${offsetPage}&limit=${limitPage}`);
  };

  const selectPageSize = (current: number, size: number) => {
    setPokeDataAll([]);
    setFilteredData([]);
    let totalRecordOnPage: number = current * size; // last record in page
    let offsetPage: number = totalRecordOnPage - size; // offset
    setUrl(`https://pokeapi.co/api/v2/pokemon/?offset=${offsetPage}&limit=${size}`);
    setCurrentPage(1);
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
      render: (sprites: Dream_world) => <Image src={sprites.front_default} alt="Pokemon" width={50}></Image>,
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
        types.map((type, index) => {
          return (
            <Tag key={index} color={type_color[type.type.name]}>
              {type.type.name}
            </Tag>
          );
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
        <Link to={`details/${record.id}`} state={{ pokemon: record }} key={record.id}>
          <Button icon={<SearchOutlined />}>View Details</Button>
        </Link>
      ),
    },
  ];

  return (
    <div className="container" style={{ marginBottom: 50 }}>
      <div className="search-container">
        <Space direction="horizontal" style={{ width: 400 }}>
          <Text>Search:</Text>
          <Search placeholder="Search..." onChange={handleSearch}></Search>
          <Text>ข้อมูลปัจจุบัน : {pokeDataAll.length}</Text>
        </Space>
        <Space style={{ marginLeft: 16 }}>
          <Text>Type: </Text>
          <Select mode="multiple" style={{ width: 400 }} placeholder="Select type" onChange={handleSelectType}>
            {pokeTypes.map((type, index) => {
              return (
                <Option value={type.name} key={index}>
                  <Tag key={index} color={type_color[type.name]}>
                    {type.name}
                  </Tag>
                </Option>
              );
            })}
          </Select>
          <Text>{filteredData.length}</Text>
        </Space>
      </div>
      <Table
        dataSource={filteredData}
        columns={columns}
        loading={loading}
        rowKey={(record) => record.id.toString()}
        pagination={{
          current: currentPage,
          total: countPokemon,
          pageSizeOptions: ["10", "20", "30", "50", "80", "100"],
          defaultPageSize: 10,
          position: ["topRight"],
          onChange: selectPageNumber,
          onShowSizeChange: selectPageSize,
        }}
      />
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
  psychic: "#ff227a",
  shadow: "#c5c5c5",
};

export default PokemonTable;

import React, { useState, useEffect } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import axios from "axios";
import { ArrowLeftOutlined, LeftOutlined } from "@ant-design/icons";
import Navbar from "./Navbar";
import { Spin, Image, Tag, Card, Divider, Button, Typography, Row, Col, Progress, Space } from "antd";
import {
  Pokemon,
  Ability,
  Types,
  Species,
  Sprites,
  Dream_world,
  typeColorInterface,
  Stats,
  Hp,
  Attack,
  Defense,
  SpecialAttack,
  SpecialDefense,
  Speed,
  LogoTypes,
} from "./interface";
import "./detail.css";
import bug from "./assets/icons/bug.svg";
import dark from "./assets/icons/dark.svg";
import dragon from "./assets/icons/dragon.svg";
import electric from "./assets/icons/electric.svg";
import fairy from "./assets/icons/fairy.svg";
import fighting from "./assets/icons/fighting.svg";
import fire from "./assets/icons/fire.svg";
import flying from "./assets/icons/flying.svg";
import ghost from "./assets/icons/ghost.svg";
import grass from "./assets/icons/grass.svg";
import ground from "./assets/icons/ground.svg";
import ice from "./assets/icons/ice.svg";
import normal from "./assets/icons/normal.svg";
import poison from "./assets/icons/poison.svg";
import psychic from "./assets/icons/psychic.svg";
import rock from "./assets/icons/rock.svg";
import steel from "./assets/icons/steel.svg";
import water from "./assets/icons/water.svg";

const logo_types: LogoTypes = {
  bug: bug,
  dark: dark,
  dragon: dragon,
  electric: electric,
  fairy: fairy,
  fighting: fighting,
  fire: fire,
  flying: flying,
  ghost: ghost,
  grass: grass,
  ground: ground,
  ice: ice,
  normal: normal,
  poison: poison,
  psychic: psychic,
  rock: rock,
  steel: steel,
  water: water,
};

const { Text, Title } = Typography;
const { Meta } = Card;

const PokemonDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [pokemon, setPokemon] = React.useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
          stats: data.stats,
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
            <button className="btn-back">
              <LeftOutlined />
              <span className="btn-text">Back</span>
            </button>
          </Link>
        </div>

        <Row gutter={[24, 0]} align="middle">
          <Col span={12}>
            <Card style={cardStyle} loading={loading} className="card-pokemon">
              <Title style={{ margin: 0 }}>
                #{pokemon.id} {pokemon.name}
              </Title>
              <Title level={3}>Base Stats</Title>
              <Row gutter={[16, { sm: 4, md: 6, xl: 10 }]}>
                {pokemon.stats.map((stats: Stats) => {
                  return (
                    <>
                      <Col span={8}>
                        <Text style={{ margin: 0, fontSize: 16 }}>{stats.stat.name.toUpperCase()}</Text>
                      </Col>
                      <Col span={1}>:</Col>
                      <Col span={15}>
                        <Row gutter={[24, 0]}>
                          <Col span={20}>
                            <Progress percent={stats.base_stat / 2} size={["100%", 16]} showInfo={false} />
                          </Col>
                          <Col span={4}>
                            <Text className="stat-base">{stats.base_stat}</Text>
                          </Col>
                        </Row>
                      </Col>
                    </>
                  );
                })}
              </Row>
              <div className="container-type">
                {pokemon.types.map((types: Types) => {
                  return (
                    <>
                      <Card
                        className="card-type"
                        style={{
                          backgroundColor: type_color[types.type.name],
                          borderColor: type_color[types.type.name],
                        }}
                        bodyStyle={{ padding: "12px 18px" }}
                      >
                        <span>
                          <img
                            src={logo_types[`${types.type.name}`]}
                            width={28}
                            alt={`Type logo: ${logo_types[`${types.type.name}`]}`}
                          />
                        </span>
                        <span style={{ marginLeft: 3 }}>{pokemon.types[0].type.name}</span>
                      </Card>
                    </>
                  );
                })}
              </div>
              <div className="container-station">
                <button className="btn-previous">Previous</button>
                <button className="btn-next">Next</button>
              </div>
            </Card>
          </Col>

          <Col span={12} style={{ textAlign: "center" }}>
            <Image src={pokemon.sprites.front_default} className="img-pokemon"></Image>
            <div className="img-shadow"></div>
          </Col>
        </Row>
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

const cardStyle: React.CSSProperties = {
  padding: "1rem",
  width: "100%",
  maxWidth: "40vw",
  borderRadius: "12px",
  boxShadow: "0 0.5rem 1rem rgba(0, 21, 41, 0.2",
};

export default PokemonDetails;

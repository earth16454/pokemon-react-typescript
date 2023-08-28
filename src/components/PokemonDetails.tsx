import React, { useState, useEffect } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import axios from "axios";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Navbar from "./Navbar";
import { Spin, Image, Tag, Card, Divider, Button, Typography, Row, Col, Progress, Space } from "antd";
import {
  Pokemon,
  Ability,
  Types,
  Dream_world,
  typeColorInterface,
  Stats,
  LogoTypes,
  StatsColorInterface,
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

        <Row gutter={[{ sm: 12, lg: 24 }, {xs: 24, sm: 24, md: 24, lg: 0}]} align="middle" className="pokemon-detail">
          <Col xs={24} lg={0} xl={0} className="col-img-xs img-mode-m">
            <div className="img-container">
              <Image src={pokemon.sprites.front_default} className="img-pokemon"></Image>
              <div className="img-shadow"></div>
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12}>
            <Card loading={loading} className="card-pokemon">
              <Title className="pokemon-title">
                #{pokemon.id} {pokemon.name}
              </Title>
              <Title level={3}>Base Stats</Title>
              <Row
                gutter={[
                  { xs: 0, md: 8, lg: 16 },
                  { xs: 0, md: 6, lg: 8, xl: 10 },
                ]}
              >
                {pokemon.stats.map((stats: Stats) => {
                  return (
                    <>
                      <Col xs={6}>
                        <Text>{stats.stat.name.toUpperCase()}</Text>
                      </Col>
                      <Col span={1}>:</Col>
                      <Col xs={17}>
                        <Row gutter={[24, 0]}>
                          <Col xs={18}>
                            <Progress
                              percent={stats.base_stat / 1.5}
                              size={["100%", 16]}
                              showInfo={false}
                              strokeColor={stats_color[stats.stat.name]}
                            />
                          </Col>
                          <Col span={6}>
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
                            className="type-logo"
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

          <Col xs={0} lg={12} className="img-mode-c">
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

const stats_color: StatsColorInterface = {
  hp: "#ED2E49",
  attack: "#FEA726",
  defense: "#0091EA",
  "special-attack": "#CB6CE6",
  "special-defense": "#8C52FF",
  speed: "#00BF63",
};

const cardStyle: React.CSSProperties = {
  padding: "1rem",
  width: "100%",
  maxWidth: "40vw",
  borderRadius: "12px",
  boxShadow: "0 0.5rem 1rem rgba(0, 21, 41, 0.2)",
};

export default PokemonDetails;

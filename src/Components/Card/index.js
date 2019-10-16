import React, { useState, useEffect } from "react";
import { useSpring, animated, interpolate } from "react-spring";
import { add, scale } from "vec-la";
import { useGesture } from "react-use-gesture";
import PokemonResolver from "../../helpers/PokemonResolver";
import {
  Footer,
  Spacing,
  Hp,
  Action,
  ActionSection,
  ImgDescSection,
  Img,
  CardContainer,
  NameSection,
  Name
} from "./styles";

const trans = (x, y, r, s) => {
  return `translate3d(${x}px,${y}px,0) perspective(1500px) rotateX(30deg) rotateY(${r /
    10}deg) rotateZ(${r}deg) scale(${s})`;
};

const NUM_POKEMON = 5;
const Card = props => {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    new PokemonResolver()
      .getPokemon()
      .then(pokemon => setPokemon(pokemon));
  }, []);

  if (!pokemon) return <p>Loading...</p>;
  return (
    <CardContainer {...props.bind()} style={props.style}>
      <NameSection>
        <Name>
          <p>{pokemon.name}</p>
        </Name>
        <Hp>10 HP</Hp>
      </NameSection>
      <Img />
      <ImgDescSection>
        <p>NO .25 Mouse Pokemon HT 1:04'</p>
      </ImgDescSection>
      <Spacing />
      <ActionSection>
        {pokemon.abilities.map(ability => {
          return (
            <Action>
              <p style={{ textAlign: "left", paddingRight:"10px" }}>{ability.name}</p>
              <p style={{ textAlign: "left" }}>{ability.desc}</p>
              <p>-10</p>
            </Action>
          );
        })}
       
      </ActionSection>
      <Footer>
        <div className="left">Follow me on twiiter here :)</div>
        <div className="right">Rare</div>
      </Footer>
    </CardContainer>
  );
};

export default Card;

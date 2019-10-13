import React, { useState } from "react";
import { useSpring, animated, interpolate } from "react-spring";
import { add, scale } from "vec-la";
import { useGesture } from "react-use-gesture";
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

const NUM_PROJECTS = 5;
const r = Math.floor(Math.random() * NUM_PROJECTS);
const to = {
  x: 0,
  y: r * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: r * 100
};
const from = { x: 0, rot: 0, scale: 1.5, y: -1000 };
const Card = (props) => {
  
  return (
    <CardContainer {...props.bind()} style={props.style}>
      <NameSection>
        <Name>
          <p>Developer</p>
          <p>Jeremy</p>
        </Name>
        <Hp>10 HP</Hp>
      </NameSection>
      <Img />
      <ImgDescSection>
        <p>NO .25 Mouse Pokemon HT 1:04'</p>
      </ImgDescSection>
      <Spacing />
      <ActionSection>
        <Action>
          <p style={{ textAlign: "left" }}>Farb bomb</p>
          <p>Flip a coin if heads your opponent's Pokemon is now dead</p>
          <p>-10</p>
        </Action>
        <Action>
          <p>Sleep</p>
          <p>Sleep and restore 100HP</p>
          <p>+100</p>
        </Action>
      </ActionSection>
      <Footer>
        <div className="left">Follow me on twiiter here :)</div>
        <div className="right">Rare</div>
      </Footer>
    </CardContainer>
  );
};

export default Card;

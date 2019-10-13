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


const Card = () => {
  const [cardCanMove, setCardCanMove] = useState(false);
  const [{ x, y }, setPosition] = useSpring(() => ({
    x: 0,
    y: 0,
    config: { mass: 10, tension: 350, friction: 40 }
  }));

  const bind = useGesture({
    // this will override the onMouseDown
    onDrag: ({
      down,
      delta,
      velocity,
      direction,
      temp = [x.getValue(), y.getValue()]
    }) => {
      setCardCanMove(true);
    
      const limitedVel =
        scale(direction, velocity) > 2 ? 2 : scale(direction, velocity);
      setPosition({
        x: temp[0] + delta[0],
        y: temp[1] + delta[1],
        immediate: down,
        config: { velocity: limitedVel, decay: true }
      });
      return temp;
    },
    onDragEnd: () => {
      setCardCanMove(false);
    }
  });

  return (
    <CardContainer
      {...bind()}
      style={{
        transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`)
      }}
    >
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
          <p style={{ textAlign: "left" }}>Lighting bolt</p>
          <p>Flip a coin if heads your opponent's Pokemon is now paralyzed`</p>
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

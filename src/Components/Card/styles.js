import styled from "styled-components";
import { animated } from "react-spring";

const CardContainer = styled(animated.div)`
  display: flex;
  position: relative;
  flex-direction: column;
  background: white;
  width: 52vh;
  max-width: 300px;
  max-height: 500px;
  padding: 2rem;
  height: 85vh;
  border-radius: 10px;
  box-shadow: 0 12.5px 100px -10px rgba(50, 50, 73, 0.4),
    0 10px 10px -10px rgba(50, 50, 73, 0.3);
  transform: perspective(1500px) rotateX(30deg) rotateY(0deg) rotateZ(0deg)
    scale(1);
`;

const NameSection = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  text-align: left;
  border-radius: inherit;
`;

const Name = styled.div`
  display: flex;
  flex-direction: column;
`;

const Img = styled.div`
  width: 100%;
  height: 50%;
  /* border-radius:inherit; */
  background: wheat;
  border: 2px #b2aea0 solid;
`;

const ImgDescSection = styled.div`
  width: 100%;
  font-size: 10px;
  background: #c9c9b7;
  border: 2px #797264 solid;
`;

const ActionSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  div {
    margin-bottom: 1rem;
  }
`;

const Action = styled.div`
  display: flex;
  text-align: center;
  justify-content: space-between;
  font-size: 12px;
`;

const Hp = styled.div``;

const Spacing = styled.div`
  margin: 1rem 0;
`;

const Footer = styled.footer`
  position: absolute;
  display: flex;
  justify-content: space-between;
  width: 100%;
  bottom: 0;
  left: 0;
  border-radius: inherit;
  font-size: 11px;
  .right {
    margin: 1rem;
  }

  .left {
    margin: 1rem;
  }
`;

export {
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
};

import { render } from "react-dom";
import React, { useState } from "react";
import { useSprings, animated, interpolate } from "react-spring";
import { useGesture } from "react-use-gesture";
import Card from "../Card";

const cards = ["", "", "", ""];

// HELPERS
const to = i => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100
});
const from = i => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });
const trans = (x, y, r, s) => {
  return `translate3d(${x}px,${y}px,0) perspective(1500px) rotateX(30deg) rotateY(${r /
    10}deg) rotateZ(${r}deg) scale(${s})`;
};


function Projects() {
  const [gone] = useState(() => new Set());
  const [props, set] = useSprings(cards.length, i => ({
    ...to(i),
    from: from(i)
  }));
  const bind = useGesture({
    onDrag: ({
      args: [index],
      down,
      delta: [xDelta],
      distance,
      direction: [xDir],
      velocity
    }) => {
      const trigger = velocity > 0.2; // tigger to flick card away
      const dir = xDir < 0 ? -1 : 1; // restrict movement to left and right
      // if use is hold card and has triggered it (flicked) -> fling it away
      if (!down && trigger) gone.add(index);

      set(i => {
        if (index !== i) return; // We're only interested in changing spring-data for the current spring
        const isGone = gone.has(index);
        const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0; // When a card is gone it flys out left or right, otherwise goes back to zero
        const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0); // Calculates how much card tilts, flicking it harder makes it rotate faster
        const scale = down ? 1.1 : 1;
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 }
        };
      });
      if (!down && gone.size === cards.length)
        setTimeout(() => gone.clear() || set(i => to(i)), 600);
    }
  });

  return props.map(({ x, y, rot, scale }, i) => (
    <Card
      key={i}
      bind={() => bind(i)}
      style={{ transform: interpolate([x, y, rot, scale], trans) }}
    />
  ));
}

export default Projects;

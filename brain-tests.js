import brain from "brain.js";
import _ from "lodash";

import { mean } from "mathjs";

const range = _.range;

function getRandomSpeed(speed) {
  const maxSpeed = 200;
  return Math.random() * (speed || maxSpeed);
}

function getScore(speeds) {
  const scores = speeds.map((speed) => {
    let score = 0;

    if (speed > 150) {
      score = 2;
    } else if (speed > 115) {
      score = 1;
    }

    return score;
  });

  return mean(scores);
}

const trainMatter = range(100).map((i) => {
  const speeds = range(50)
    .map(() => getRandomSpeed(i < 25 ? 200 : 100))
    .sort();

  return {
    input: speeds,
    output: [getScore(speeds)],
  };
});

const net = new brain.NeuralNetwork();
net.train(trainMatter);

const speeds = range(50).map(() => getRandomSpeed(100));

console.log(net.run(speeds));

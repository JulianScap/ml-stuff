import { randomBool } from './tools/random.js';
import { max, diff, mean, randomEntry } from './tools/array.js';
import { writeObject } from './tools/files.js';

const TRAIN_SAMPLES = 100000;
const TEST_SAMPLES = TRAIN_SAMPLES;
const SPEEDS_PER_SAMPLES = 50;
const PASS_ALL_SPEEDS = true;
const MAX_SPEED_DIVISOR = 300;

function* makeSpeeds(length, startSpeed, ratio, step, harshEventRatio) {
  let speed = startSpeed;

  for (let i = 0; i < length; i++) {
    const speedingUp = !randomBool(ratio);
    const harshEventMultiplier = randomBool(harshEventRatio) ? 1 : 20;

    speed += step * harshEventMultiplier * (speedingUp ? 1 : -1);
    if (speed < 0) {
      speed = 0;
    }

    yield speed;
  }
}

function* build(samples) {
  for (let index = 0; index < samples; index++) {
    const speedUpRatio = randomEntry([3 / 4, 2 / 4, 1 / 4]);
    const step = randomEntry([1, 2, 3]);
    const initialSpeed = randomEntry([50, 80, 80, 90, 90]);
    const speeds = [
      ...makeSpeeds(
        SPEEDS_PER_SAMPLES,
        initialSpeed,
        speedUpRatio,
        step,
        1 / 1000
      ),
    ];

    const maxSpeed = max(speeds);
    const meanSpeed = mean(speeds);
    let largestDiff = max(diff(speeds));

    const score =
      (largestDiff > 5 ? 1 : 0) +
      (meanSpeed > 100 ? 1 : 0) +
      (maxSpeed > 105 ? 1 : 0);

    if (PASS_ALL_SPEEDS) {
      const trainRecord = {
        input: speeds.map((x) => x / MAX_SPEED_DIVISOR),
        output: [score / 3],
      };

      yield trainRecord;
    } else {
      const trainRecord = {
        input: [
          maxSpeed / MAX_SPEED_DIVISOR,
          meanSpeed / MAX_SPEED_DIVISOR,
          largestDiff / MAX_SPEED_DIVISOR,
        ],
        output: [score / 3],
      };

      yield trainRecord;
    }
  }
}

const trainData = [...build(TRAIN_SAMPLES)];
const testData = [...build(TEST_SAMPLES)];

await writeObject(trainData, 'speeds.json');
await writeObject(testData, 'test.json');

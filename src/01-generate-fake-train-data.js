import { randomBool } from "../tools/random.js";
import { max, diff, mean, randomEntry } from "../tools/array.js";
import { writeObject } from "../tools/files.js";

const TRAIN_SAMPLES = 10;
const TEST_SAMPLES = 10;
const SPEEDS_PER_SAMPLES = 50;

function* makeSpeeds(
    length,
    startSpeed,
    ratio,
    step,
    harshEventRatio = 1 / 1000
) {
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
        const speedUpRatio = randomEntry([3 / 4, 1 / 2, 1 / 4]);
        const step = randomEntry([1, 2, 3]);
        const initialSpeed = randomEntry([50, 80, 80, 90, 90]);
        const speeds = [
            ...makeSpeeds(SPEEDS_PER_SAMPLES, initialSpeed, speedUpRatio, step),
        ];

        const maxSpeed = max(speeds);
        const meanSpeed = mean(speeds);
        const largestDiff = max(diff(speeds));

        const score =
            (largestDiff > 5 ? 1 : 0) +
            (meanSpeed > 100 ? 1 : 0) +
            (maxSpeed > 105 ? 1 : 0);

        // const maxSpeed = max(speeds);
        // const score = maxSpeed > 105 ? 1 : 0;

        const output = {};
        switch (score) {
            case 1:
                output.medium = 1;
                break;
            case 2:
                output.dangerous = 1;
                break;
            case 3:
                output.aggressive = 1;
                break;
            default:
                output.safe = 1;
                break;
        }

        const trainRecord = {
            //raw: speeds.join(","),
            input: { maxSpeed, meanSpeed, largestDiff },
            //input: [maxSpeed],
            output,
        };

        yield trainRecord;
    }
}

const trainData = [...build(TRAIN_SAMPLES)];
const testData = [...build(TEST_SAMPLES)];

await writeObject(trainData);
await writeObject(testData, "test.json");

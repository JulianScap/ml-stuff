import brain from 'brain.js';

const net = new brain.FeedForward({
  inputLayer: () => input({ height: 3 }),
  hiddenLayers: [2, 2].map(
    (height) => (inputLayer) => brain.layer.feedForward({ height }, inputLayer)
  ),
  outputLayer: (inputLayer) => target({ height: 1 }, inputLayer),
});

// TODO

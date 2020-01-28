import React from 'react';
import ColorSquareGrid from './components/squareGrid';
import randomRGB from './lib/randomRGB';
import useSharedState from 'use-simple-shared-state';
import store from './store';

const { changeColors, changeGridSize } = store.actions;
const selectors = [
  s => s.gridSize,
  s => s.squareColors,
];

const App = () => {
  const [gridSize, currentColors] = useSharedState(store, selectors);

  const handleClick = () => {
    const t1 = performance.now();
    for(let i=0; i < 50000; i++) {
      var newColors = currentColors;
      newColors[i] = randomRGB();
      changeColors(newColors);
    }
    const t2 = performance.now();
    console.log(t2-t1);
  }

  const handleChange = (e) => {
    stopColors();
    changeGridSize(e.target.value);
  }

  const stopColors = () => {
    for (let i=0; i < 9999; i++) {
      clearInterval(i);
    }
  }

  return (
  <div className="App">
    <div>
      <ColorSquareGrid gridSize={gridSize} />
    </div>
    <br />

    <button onClick={handleClick}>
    Change Color
    </button>
    <br/>

    <button onClick={stopColors}>
      Stop
    </button>
    <br/>

    <input
    type="range"
      min="1"
      max="11"
      step="1"
      defaultValue={gridSize}
      onChange={handleChange}
    />
  </div>
  )
}

export default App;
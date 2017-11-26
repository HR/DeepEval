import React from 'react';
import {AreaChart} from 'react-easy-chart';

function AChart(props) {
  return(
    <AreaChart
    width={700}
    height={250}
    interpolate={'cardinal'}
    data={[
      [
        { x: 1, y: 20 },
        { x: 2, y: 10 },
        { x: 3, y: 25 }
      ], [
        { x: 1, y: 10 },
        { x: 2, y: 12 },
        { x: 3, y: 4 }
      ]
    ]}
  />
  )
}

export default AChart

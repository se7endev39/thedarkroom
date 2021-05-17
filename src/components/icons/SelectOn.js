import * as React from 'react';
import Svg, {G, Circle, Path} from 'react-native-svg';

function SvgSelectOn(props) {
  return (
    <Svg width={22} height={22} {...props}>
      <G
        transform="translate(1 1)"
        stroke="#FFF"
        fill="none"
        fillRule="evenodd">
        <Circle fill="#42AEA8" cx={10} cy={10} r={10} />
        <Path strokeWidth={2} d="M4.706 10.588l4.706 3.53 5.294-8.236" />
      </G>
    </Svg>
  );
}

export default SvgSelectOn;

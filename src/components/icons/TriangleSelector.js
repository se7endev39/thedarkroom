import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function SvgTriangleSelector(props) {
  return (
    <Svg width={26} height={12} {...props}>
      <Path d="M0 11L12.5 0L25 11L0 11Z" transform="translate(0.5 0.5)" id="Path-8" fill="#5D5D5D" fill-rule="evenodd" stroke="none" />
    </Svg>
  );
}

export default SvgTriangleSelector;

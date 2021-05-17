import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function SvgDelete(props) {
  return (
    <Svg width={25} height={28} {...props}>
      <G stroke={props.fill || '#fff'} strokeWidth={2} fill="none" fillRule="evenodd">
        <Path strokeLinejoin="round" d="M8.138 5.103V1h7.931v4.103" />
        <Path strokeLinecap="round" d="M1 6.032h23" />
        <Path d="M3.494 7l2 20h14l2-20" />
      </G>
    </Svg>
  );
}

export default SvgDelete;

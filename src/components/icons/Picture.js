import * as React from 'react';
import Svg, {G, Path, Circle} from 'react-native-svg';

function SvgPicture(props) {
  return (
    <Svg width={22} height={16} {...props}>
      <G
        transform="translate(1 1)"
        stroke={props.fill}
        fill="none"
        fillRule="evenodd">
        <Path d="M-.5-.5h21v15h-21z" />
        <Path d="M1 7.72L5.729 3l8.055 7.7 2.908-2.31 1.705 1.66" />
        <Circle cx={14.1} cy={3.1} r={2.1} />
      </G>
    </Svg>
  );
}

export default SvgPicture;

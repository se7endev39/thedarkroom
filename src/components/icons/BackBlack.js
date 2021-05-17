import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgBackBlack(props) {
  return (
    <Svg width={12} height={15} {...props}>
      <Path
        d="M10.105 15l1.886-2.356L5.05 7.65 12 2.296 10.033 0 0 7.729z"
        fill="#979797"
        fillRule="nonzero"
      />
    </Svg>
  );
}

export default SvgBackBlack;
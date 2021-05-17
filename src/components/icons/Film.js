import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function SvgFilm(props) {
  return (
    <Svg width={19} height={16} {...props}>
      <G stroke={props.fill} fill="none" fillRule="evenodd">
        <Path d="M.104 15.5h11.753M0 1.5h11.753M1.5 1.5v14M10.5 1.5v14M10 3.5h8.5v4.215l-1.738.617V12.5H10M3 .5h5" />
      </G>
    </Svg>
  );
}

export default SvgFilm;

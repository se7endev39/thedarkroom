import * as React from 'react';
import Svg, {G, Path, Ellipse} from 'react-native-svg';

function SvgDownload(props) {
  return (
    <Svg width={37} height={36} {...props}>
      <G stroke={props.fill || '#fff'} strokeWidth={2} fill="none" fillRule="evenodd">
        <Path d="M1 1h35v24H1z" />
        <Path d="M4.187 13.691L11.124 6.2l13.995 13.2 5.053-3.96 3.151 2.663" />
        <Ellipse cx={25.649} cy={8.6} rx={3.649} ry={3.6} />
        <Path d="M25 30l-5.866 4L14 30" />
      </G>
    </Svg>
  );
}

export default SvgDownload;

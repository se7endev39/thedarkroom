import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgLikeOffTool(props) {
  return (
    <Svg width={29} height={28} {...props}>
      <Path
        d="M14.534 26c-3.995-3.025-6.972-5.458-8.93-7.301C1.16 14.52-1.41 6.366 4.246 2.59 8.005.083 11.423.54 14.5 3.962 17.577.54 20.995.083 24.753 2.591c5.657 3.775 3.086 11.93-1.356 16.108-2.94 2.764-5.893 5.198-8.863 7.301z"
        stroke={props.fill}
        strokeWidth={2}
        fill="none"
        fillRule="evenodd"
      />
    </Svg>
  );
}

export default SvgLikeOffTool;

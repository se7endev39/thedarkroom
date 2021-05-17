import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgNotifications(props) {
  return (
    <Svg width={34} height={36} {...props}>
      <Path
        d="M1 1h32v32l-6.657-5.46H1z"
        stroke="#FFF"
        strokeWidth={2}
        fill="none"
        fillRule="evenodd"
      />
    </Svg>
  );
}

export default SvgNotifications;

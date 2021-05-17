import * as React from 'react';
import Svg, {G, Rect, Path, Circle} from 'react-native-svg';

function ToggleThemeLight(props) {
  return (
    <Svg width={73} height={34} {...props}>
      <G
        transform="translate(1 1)"
        stroke="#FFF"
        fill="none"
        fillRule="evenodd">
        <G transform="translate(9 7)">
          <Path
            d="M9 14.999V18m9-9h-3.063m.427 6.364l-2.177-2.177m-8.426.052l-2.125 2.125M9 0v2.97M3.073 9H0m4.787-4.213L2.636 2.636m12.728 0L13.27 4.73"
            strokeWidth={1.5}
            strokeLinecap="round"
          />
          <Circle strokeWidth={1.25} cx={9} cy={9} r={3.375} />
        </G>
      </G>
    </Svg>
  );
}

export default ToggleThemeLight;

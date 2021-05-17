import * as React from 'react';
import Svg, {G, Rect, Path, Circle} from 'react-native-svg';

function ToggleThemeDark(props) {
  return (
    <Svg width={73} height={34} {...props}>
      <G
        transform="translate(1 1)"
        stroke="#FFF"
        fill="none"
        fillRule="evenodd">
        <Path
          d="M54.293 6.954a8.795 8.795 0 014.371 2.33A8.67 8.67 0 0161.25 15.5a8.803 8.803 0 01-2.521 6.192 8.49 8.49 0 01-6.071 2.558c-2.241 0-4.28-.873-5.809-2.302 2.733.002 5.025-1.04 6.683-2.726a9.344 9.344 0 002.678-6.572 9.354 9.354 0 00-1.917-5.696z"
          strokeWidth={1.5}
        />
      </G>
    </Svg>
  );
}

export default ToggleThemeDark;

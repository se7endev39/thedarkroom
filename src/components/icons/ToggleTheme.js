import * as React from 'react';
import Svg, {G, Rect, Path, Circle} from 'react-native-svg';

function SvgToggleTheme(props) {
  return (
    <Svg width={73} height={34} {...props}>
      <G
        transform="translate(1 1)"
        stroke="#FFF"
        fill="none"
        fillRule="evenodd">
        <Rect strokeWidth={1.5} width={71} height={32} rx={14.5} />
        <Path
          d="M54.293 6.954a8.795 8.795 0 014.371 2.33A8.67 8.67 0 0161.25 15.5a8.803 8.803 0 01-2.521 6.192 8.49 8.49 0 01-6.071 2.558c-2.241 0-4.28-.873-5.809-2.302 2.733.002 5.025-1.04 6.683-2.726a9.344 9.344 0 002.678-6.572 9.354 9.354 0 00-1.917-5.696z"
          strokeWidth={1.5}
        />
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

export default SvgToggleTheme;

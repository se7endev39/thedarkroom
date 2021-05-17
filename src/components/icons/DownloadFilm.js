import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function SvgDownloadFilm(props) {
  return (
    <Svg width={32} height={37} {...props}>
      <G stroke="#FFF" fill="none" fillRule="evenodd">
        <Path
          strokeWidth={2}
          d="M.169 26.188h19.099M0 3.813h19.099M2.438 3.438v22.75M17.063 3.438v22.75M16.25 6.688h13.813v6.849l-2.824 1.002v6.774H16.25"
        />
        <Path strokeWidth={3} d="M5 1.813h8.125" />
        <Path strokeWidth={2} d="M21 31l-5.866 4L10 31" />
      </G>
    </Svg>
  );
}

export default SvgDownloadFilm;

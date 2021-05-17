import * as React from 'react';
import Svg, {G, Path, Ellipse} from 'react-native-svg';

function SvgRefreshIcon(props) {
  return (
    <Svg width={27} height={33} {...props}>
        <G id="Rotate-icon" transform="matrix(-1 0 0 1 26 1)">
            <Path d="M-6.91399e-14 6.25636L5.20741 -1.73649e-16L11.486 5.60996" transform="matrix(-0.20791167 0.9781476 0.9781476 0.20791167 12.673116 0.37156296)" id="Path-11-Copy" fill="none" fill-rule="evenodd" stroke="#000000" stroke-width="2" />
            <Path d="M12.5 25C19.4036 25 25 19.4036 25 12.5C25 5.59644 19.4036 -4.89192e-14 12.5 -4.89192e-14C5.59644 -4.89192e-14 0 5.59644 -1.73472e-16 12.5" transform="matrix(-4.371139E-08 1 -1 -4.371139E-08 25 6.0000005)" id="Oval" fill="none" fill-rule="evenodd" stroke="#000000" stroke-width="2" />
        </G>
    </Svg>
  );
}

export default SvgRefreshIcon;
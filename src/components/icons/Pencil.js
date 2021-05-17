import * as React from 'react';
import Svg, {G, Path, Circle} from 'react-native-svg';

function SvgPicture(props) {
  return (
    <Svg width={18} height={23} {...props}>
        <G id="Group" transform="matrix(0.8660254 0.5 -0.5 0.8660254 10.854004 0.85375977)">
            <Path d="M0 14.3518L2.78336 19.1667L5.83333 14.3518C5.83333 14.3518 5.83333 2.10524 5.83333 2.10524C5.83333 1.12014 5.3197 0 2.91667 0C0.51363 0 0 1.09088 5.05961e-18 2.10524C5.05961e-18 2.10524 0 14.3518 0 14.3518Z" transform="translate(0.7509437 0.08954823)" id="Path-18" fill="none" fill-rule="evenodd" stroke="#000000" stroke-width="1.25" />
            <Path d="M0 0.108902L5.83333 0.108902" transform="translate(0.46088025 14.061575)" id="Path-27" fill="none" fill-rule="evenodd" stroke="#000000" stroke-width="1.25" />
            <Path d="M0 0.108902L5.83333 0.108902" transform="translate(0.92936176 3.2063425)" id="Path-27-Copy" fill="none" fill-rule="evenodd" stroke="#000000" stroke-width="1.25" />
        </G>
    </Svg>
  );
}

export default SvgPicture;
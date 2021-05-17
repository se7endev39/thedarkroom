import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function SvgPhotoMenu(props) {
  return (
    <Svg width={22} height={18} {...props}>
        <G id="Photo-Storage-Icon" transform="translate(0.75 0.75)">
            <Path d="M0 0L20 0L20 15L0 15L0 0Z" id="Path-13-Copy-2" fill="none" fill-rule="evenodd" stroke="#000000" stroke-width="1.5" />
            <Path d="M2 4C3.10457 4 4 3.10457 4 2C4 0.895431 3.10457 0 2 0C0.895431 0 0 0.895431 0 2C0 3.10457 0.895431 4 2 4Z" transform="translate(12 3)" id="Oval" fill="none" fill-rule="evenodd" stroke="#000000" stroke-width="1.5" />
            <Path d="M0 5.00062L4.62646 0L9.70232 7.15332L13.75 5.00575L17.8071 10.0115" transform="translate(0.25 5.0874023)" id="Path-21" fill="none" fill-rule="evenodd" stroke="#000000" stroke-width="1.5" stroke-linejoin="round" />
        </G>
    </Svg>
  );
}

export default SvgPhotoMenu;
import * as React from 'react';
import Svg, {G, Path, Ellipse} from 'react-native-svg';

function SvgDownloadMenu(props) {
  return (
    <Svg width={26} height={28} {...props}>
        <G id="tool-download-roll-icon-copy" transform="translate(0.75 0.75)">
            <G id="Download-Roll">
                <Path d="M0 0.625L14.7866 0.625" transform="translate(0.13084362 18.75)" id="Path-4-Copy" fill="none" fill-rule="evenodd" stroke="#000000" stroke-width="1.5" />
                <Path d="M0 0.625L14.7866 0.625" transform="translate(0 1.5384616)" id="Path-4" fill="none" fill-rule="evenodd" stroke="#000000" stroke-width="1.5" />
                <Path d="M0.629032 0L0.629032 17.5" transform="translate(1.2580645 1.875)" id="Path-4-Copy-3" fill="none" fill-rule="evenodd" stroke="#000000" stroke-width="1.5" />
                <Path d="M0.629032 0L0.629032 17.5" transform="translate(12.580646 1.875)" id="Path-4-Copy-5" fill="none" fill-rule="evenodd" stroke="#000000" stroke-width="1.5" />
                <Path d="M0 -2.2855e-15L10.6935 -6.245e-16L10.6935 5.26879L8.50725 6.03962L8.50725 11.25L0 11.25" transform="translate(12.580646 5.144231)" id="Path-15" fill="none" fill-rule="evenodd" stroke="#000000" stroke-width="1.5" />
                <Path d="M0 0.625L6.29032 0.625" transform="translate(3.8709676 0)" id="Path-4-Copy-2" fill="none" fill-rule="evenodd" stroke="#000000" stroke-width="1.5" />
            </G>
            <Path d="M0 3L4.7993 0L9 3" transform="matrix(-1 -8.742278E-08 8.742278E-08 -1 16 26)" id="Path-11-Copy-3" fill="none" fill-rule="evenodd" stroke="#000000" stroke-width="1.5" />
        </G>
    </Svg>
  );
}

export default SvgDownloadMenu;
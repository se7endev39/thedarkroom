import * as React from 'react';
import Svg, {G, Path, Circle} from 'react-native-svg';

function SvgPrintCustom(props) {
    return (
        <Svg width={15} height={15} {...props}>
            <G id="Group-7" transform="translate(0.5 0.5)">
                <Path d="M0 0L11 0L11 10L0 10L0 0Z" id="Rectangle" fill="#FFFFFF" fill-rule="evenodd" stroke="#000000" stroke-width="1" />
                <Path d="M0 0L11 0L11 10L0 10L0 0Z" transform="translate(3 3)" id="Rectangle-Copy-6" fill="#FFFFFF" fill-rule="evenodd" stroke="#000000" stroke-width="1" />
                <G id="Group-6" transform="translate(5.5 4.5)">
                    <Path d="M0 0L6 0L6 1L0 1L0 0Z" transform="translate(0 3)" id="Rectangle-Copy" fill="#000000" fill-rule="evenodd" stroke="none" />
                    <Path d="M0 0L6 0L6 1L0 1L0 0Z" transform="matrix(-4.371139E-08 -1 1 -4.371139E-08 2.5 6.5)" id="Rectangle-Copy-2" fill="#000000" fill-rule="evenodd" stroke="none" />
                </G>
            </G>
        </Svg>
    );
}

export default SvgPrintCustom;

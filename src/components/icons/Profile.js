import * as React from 'react';
import Svg, {G, Path, Circle} from 'react-native-svg';

function SvgProfile(props) {
    return (
        <Svg width={31} height={34} {...props}>
            <G id="TDR-App-Design" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <G id="1-Home" transform="translate(-196.000000, -832.000000)" stroke="#FFFFFF" strokeWidth="2">
                    <G id="Profile-icon" transform="translate(197.000000, 833.000000)">
                        <Circle id="Oval" cx="14.5" cy="9.5" r="9.5"></Circle>
                        <Path d="M5.46459982,19 L2.32670255,20.9852927 C0.87811784,21.901787 -1.098103e-15,23.4964664 0,25.2106307 L0,32 L0,32 L29,32 L29,25.1321817 C29,23.4610183 28.1650925,21.9003415 26.7749159,20.9728739 L23.8177849,19 L23.8177849,19" id="Path-7"></Path>
                    </G>
                </G>
            </G>
        </Svg>
    );
}

export default SvgProfile;

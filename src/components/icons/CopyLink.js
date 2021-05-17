import * as React from 'react';
import Svg, {G, Path, Polygon, Polyline} from 'react-native-svg';

function CopyLink(props) {
    return (
        <Svg width="14px" height="18px" viewBox="0 0 14 18" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <G id="TDR-App-Design" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <G id="3-Roll" transform="translate(-357.000000, -750.000000)" stroke="#000000">
                    <G id="Group" transform="translate(0.000000, 640.000000)">
                        <G id="copy-icon" transform="translate(358.000000, 111.000000)">
                            <Polygon id="Rectangle-Copy-17" points="2 2 8.21679688 2 12 6 12 16 2 16"></Polygon>
                            <Polyline id="Path" points="2 14 0 14 0 0 10 0 10 4"></Polyline>
                            <Polyline id="Path" points="8 2.5 8 6 12 6"></Polyline>
                        </G>
                    </G>
                </G>
            </G>
        </Svg>
    );
}

export default CopyLink;

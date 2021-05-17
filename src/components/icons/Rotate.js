import * as React from 'react';
import Svg, {G, Path, Polyline} from 'react-native-svg';

function SvgRotate(props) {
  return (
      <Svg width={27} height={33} {...props} viewBox="0 0 27 33" version="1.1">
          <G id="TDR-App-Design" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <G id="4-Image" transform="translate(-28.000000, -445.000000)" stroke={props.fill || '#fff'} strokeWidth="2">
                  <G id="Rotate-icon" transform="translate(41.500000, 461.500000) scale(-1, 1) translate(-41.500000, -461.500000) translate(29.000000, 446.000000)">
                      <Polyline id="Path-11-Copy" transform="translate(14.538899, 6.639455) scale(-1, 1) rotate(-282.000000) translate(-14.538899, -6.639455) " points="8.79589496 9.76763496 14.0033024 3.51127548 20.2819036 9.1212323"></Polyline>
                      <Path d="M12.5,31 C19.4035594,31 25,25.4035594 25,18.5 C25,11.5964406 19.4035594,6 12.5,6 C5.59644063,6 0,11.5964406 0,18.5" id="Oval" transform="translate(12.500000, 18.500000) rotate(-270.000000) translate(-12.500000, -18.500000) "></Path>
                  </G>
              </G>
          </G>
      </Svg>
  );
}

export default SvgRotate;

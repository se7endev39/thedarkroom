import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function SvgShare(props) {
  return (
    <Svg width={33} height={32} {...props}>
      <G stroke={props.fill || '#fff'} strokeWidth={2} fill="none" fillRule="evenodd">
        <Path d="M31 15.232V30.25H1v-23h9.8" />
        <Path d="M23.5 1.75l7 5.866-7 5.634M29 7.25c-14.454 0-18 4.702-18 18" />
      </G>
    </Svg>
  );
}

export default SvgShare;

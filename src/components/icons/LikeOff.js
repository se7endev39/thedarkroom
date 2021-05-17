import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgLikeOff(props) {
  return (
    <Svg width={23} height={22} {...props}>
      <Path
        d="M3.253 1.79C4.833.76 6.343.357 7.776.544c1.296.17 2.541.824 3.724 1.988C12.683 1.368 13.928.714 15.224.544c1.433-.187 2.943.216 4.523 1.246 1.039.677 1.748 1.526 2.187 2.472.48 1.033.638 2.185.537 3.366-.226 2.617-1.739 5.377-3.713 7.191-2.304 2.117-4.62 3.981-6.947 5.592-3.707-2.322-6.036-4.183-7.57-5.592C2.269 13.005.756 10.245.53 7.63c-.101-1.182.057-2.334.537-3.367.44-.946 1.148-1.795 2.187-2.472z"
        fill="#FFF"
        stroke={props.fill || '#fff'}
        fillRule="evenodd"
        fillOpacity={0.5}
      />
    </Svg>
  );
}

export default SvgLikeOff;

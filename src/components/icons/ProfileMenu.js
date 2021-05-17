import * as React from 'react';
import Svg, {G, Path, Ellipse} from 'react-native-svg';

function SvgProfileMenu(props) {
  return (
    <Svg width={18} height={19} {...props}>
        <G id="Profile-icon" transform="translate(0.75 0.75)">
            <Path d="M5 10C7.76142 10 10 7.76142 10 5C10 2.23858 7.76142 0 5 0C2.23858 0 0 2.23858 0 5C0 7.76142 2.23858 10 5 10Z" transform="translate(3 0)" id="Oval" fill="none" fill-rule="evenodd" stroke="#000000" stroke-width="1.5" />
            <Path d="M3.01495 0L2.37259 0.396639Q2.1017 0.563908 1.85422 0.764192Q1.60673 0.964476 1.38665 1.19454Q1.16658 1.4246 0.977465 1.68072Q0.788352 1.93684 0.633258 2.21489Q0.478165 2.49293 0.359597 2.7884Q0.24103 3.08387 0.160904 3.392Q0.0807784 3.70013 0.0403892 4.01593Q0 4.33173 0 4.65011L0 7L16 7L16 4.57199Q16 4.26115 15.9615 3.95269Q15.923 3.64424 15.8466 3.34293Q15.7701 3.04163 15.657 2.75211Q15.5438 2.46259 15.3956 2.18932Q15.2475 1.91605 15.0666 1.66325Q14.8857 1.41044 14.6749 1.18199Q14.4641 0.953532 14.2267 0.752953Q13.9892 0.552375 13.7287 0.382761L13.1408 0" transform="translate(0 10)" id="Path-7" fill="none" fill-rule="evenodd" stroke="#000000" stroke-width="1.5" />
        </G>
    </Svg>
  );
}

export default SvgProfileMenu;
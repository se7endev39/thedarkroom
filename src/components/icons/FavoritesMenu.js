import * as React from 'react';
import Svg, {G, Path, Ellipse} from 'react-native-svg';

function FavoritesMenu(props) {
  return (
    <Svg width={57} height={51} {...props}>
        <G id="Group-5" transform="translate(1 1)">
            <Path d="M16.2717 30C16.2717 30 9.06791 24.5556 5.53438 21.2384C0.193821 16.2248 -2.89808 6.43921 3.90411 1.90886C8.42233 -1.10034 12.5313 -0.551674 16.231 3.55486C19.9308 -0.551674 24.0397 -1.10034 28.558 1.90886C35.3601 6.43921 32.2682 16.2248 26.9277 21.2384C23.3941 24.5556 19.8422 27.4761 16.2717 30Z" transform="translate(11.5 0)" id="Select-icon" fill="none" fill-rule="evenodd" stroke="#FFFFFF" stroke-width="2" />
            <G id="FAVORITES" fill="#FFFFFF" transform="translate(0 36.75)">
            <Path d="M27.48 6Q27.48 6.795 27.215 7.4725Q26.95 8.15 26.47 8.645Q25.99 9.14 25.315 9.4175Q24.64 9.695 23.82 9.695Q23 9.695 22.3225 9.4175Q21.645 9.14 21.1625 8.645Q20.68 8.15 20.415 7.4725Q20.15 6.795 20.15 6Q20.15 5.205 20.415 4.5275Q20.68 3.85 21.1625 3.355Q21.645 2.86 22.3225 2.5825Q23 2.305 23.82 2.305Q24.64 2.305 25.315 2.585Q25.99 2.865 26.47 3.3575Q26.95 3.85 27.215 4.5275Q27.48 5.205 27.48 6ZM53.6525 3.855Q53.725 3.81 53.78 3.7L54.11 3.065Q53.73 2.705 53.19 2.505Q52.65 2.305 52.01 2.305Q51.445 2.305 51.005 2.48Q50.565 2.655 50.2625 2.945Q49.96 3.235 49.8025 3.61Q49.645 3.985 49.645 4.38Q49.645 4.875 49.7875 5.2125Q49.93 5.55 50.165 5.775Q50.4 6 50.7 6.14Q51 6.28 51.31 6.38Q51.62 6.48 51.92 6.565Q52.22 6.65 52.455 6.7725Q52.69 6.895 52.8325 7.075Q52.975 7.255 52.975 7.54Q52.975 8.05 52.66 8.3225Q52.345 8.595 51.77 8.595Q51.395 8.595 51.1275 8.4925Q50.86 8.39 50.6625 8.265Q50.465 8.14 50.32 8.0375Q50.175 7.935 50.05 7.935Q49.955 7.935 49.8775 7.9825Q49.8 8.03 49.745 8.1L49.355 8.745Q49.565 8.96 49.8325 9.135Q50.1 9.31 50.4075 9.435Q50.715 9.56 51.05 9.6275Q51.385 9.695 51.73 9.695Q52.33 9.695 52.795 9.5125Q53.26 9.33 53.5825 9.0125Q53.905 8.695 54.0725 8.2675Q54.24 7.84 54.24 7.35Q54.24 6.9 54.0975 6.585Q53.955 6.27 53.72 6.0525Q53.485 5.835 53.185 5.6925Q52.885 5.55 52.5725 5.4425Q52.26 5.335 51.96 5.24Q51.66 5.145 51.425 5.025Q51.19 4.905 51.0475 4.735Q50.905 4.565 50.905 4.31Q50.905 4.11 50.975 3.9425Q51.045 3.775 51.1875 3.655Q51.33 3.535 51.5375 3.4675Q51.745 3.4 52.025 3.4Q52.335 3.4 52.5625 3.4775Q52.79 3.555 52.96 3.65Q53.13 3.745 53.255 3.8225Q53.38 3.9 53.48 3.9Q53.58 3.9 53.6525 3.855ZM5.29 2.385L5.29 3.455L2.085 3.455L2.085 5.595L4.79 5.595L4.79 6.67L2.085 6.67L2.085 9.615L0.73 9.615L0.73 2.385L5.29 2.385ZM12.7 9.615L11.66 9.615Q11.485 9.615 11.3725 9.5275Q11.26 9.44 11.21 9.31L10.67 7.835L7.675 7.835L7.135 9.31Q7.095 9.425 6.9775 9.52Q6.86 9.615 6.69 9.615L5.645 9.615L8.485 2.385L9.86 2.385L12.7 9.615ZM13.82 2.385L12.735 2.385L15.655 9.615L16.87 9.615L19.79 2.385L18.705 2.385Q18.535 2.385 18.42 2.48Q18.305 2.575 18.26 2.69L16.565 7.1Q16.395 7.54 16.28 8.115Q16.21 7.83 16.1325 7.5725Q16.055 7.315 15.97 7.1L14.27 2.69Q14.215 2.555 14.105 2.47Q13.995 2.385 13.82 2.385ZM29.93 9.615L29.93 6.79L30.505 6.79Q30.705 6.79 30.8075 6.845Q30.91 6.9 30.995 7.03L32.515 9.345Q32.6 9.475 32.7225 9.545C32.8042 9.59167 32.9033 9.615 33.02 9.615L34.23 9.615L32.42 6.945Q32.235 6.675 31.98 6.53Q32.36 6.41 32.6575 6.21Q32.955 6.01 33.1575 5.745Q33.36 5.48 33.4675 5.155Q33.575 4.83 33.575 4.465Q33.575 4.005 33.4175 3.6225Q33.26 3.24 32.9225 2.965Q32.585 2.69 32.0575 2.5375Q31.53 2.385 30.79 2.385L28.585 2.385L28.585 9.615L29.93 9.615ZM36.605 9.615L35.255 9.615L35.255 2.385L36.605 2.385L36.605 9.615ZM43.325 3.49L43.325 2.385L37.62 2.385L37.62 3.49L39.805 3.49L39.805 9.615L41.15 9.615L41.15 3.49L43.325 3.49ZM48.74 2.385L48.74 3.455L45.535 3.455L45.535 5.46L48.06 5.46L48.06 6.495L45.535 6.495L45.535 8.54L48.74 8.54L48.74 9.615L44.18 9.615L44.18 2.385L48.74 2.385ZM30.77 5.825L29.93 5.825L29.93 3.425L30.79 3.425Q31.535 3.425 31.8975 3.72Q32.26 4.015 32.26 4.565Q32.26 4.84 32.17 5.07Q32.08 5.3 31.8975 5.4675Q31.715 5.635 31.4325 5.73Q31.15 5.825 30.77 5.825ZM26.1 6Q26.1 5.405 25.9425 4.9325Q25.785 4.46 25.49 4.13Q25.195 3.8 24.7725 3.625Q24.35 3.45 23.82 3.45Q23.29 3.45 22.865 3.625Q22.44 3.8 22.1425 4.13Q21.845 4.46 21.685 4.9325Q21.525 5.405 21.525 6Q21.525 6.595 21.685 7.0675Q21.845 7.54 22.1425 7.8675Q22.44 8.195 22.865 8.37Q23.29 8.545 23.82 8.545Q24.35 8.545 24.7725 8.37Q25.195 8.195 25.49 7.8675Q25.785 7.54 25.9425 7.0675Q26.1 6.595 26.1 6ZM8.02 6.885L10.325 6.885L9.445 4.48Q9.385 4.32 9.3125 4.1025Q9.24 3.885 9.17 3.63Q9.1 3.885 9.0325 4.105Q8.965 4.325 8.9 4.49L8.02 6.885Z" />
            </G>
        </G>
    </Svg>
  );
}

export default FavoritesMenu;
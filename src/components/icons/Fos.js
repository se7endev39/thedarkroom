import * as React from 'react';
import Svg, {Defs, Path, G, Use} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function SvgFos(props) {
  return (
    <Svg width={83} height={26} {...props}>
      <Defs>
        <Path
          d="M91.257 307c.76 0 1.749 1.038 1.74 1.538-.007.501.009 5.522 0 6.154-.007.632-.914 1.731-1.934 1.731s-6.45-.056-7.85-.056c-1.4 0-3.818 1.52-3.818 3.291 0 1.772.06 4.467.06 5.227 0 .76-.723 2.115-1.74 2.115L16 326.925v-19.886L91.257 307zm-13.35 14.615H75.2v3.847h2.709v-3.847zm-42.914-11.981H20.451v14.29h3.343v-5.429h6.045v-2.603h-6.045v-3.766h11.2v-2.492zm14.863 0H39.27c-1.375 0-2.313.23-2.814.692-.502.462-.752 1.357-.752 2.686v7.533c0 1.329.25 2.224.752 2.686.501.461 1.44.692 2.814.692h10.586c1.374 0 2.312-.23 2.813-.692.502-.462.753-1.357.753-2.686v-7.533c0-1.329-.251-2.224-.753-2.686-.501-.461-1.439-.692-2.813-.692zm17.23 0h-8.162c-1.375 0-2.313.23-2.814.692-.501.462-.752 1.357-.752 2.686v1.579c0 1.329.25 2.224.752 2.686.501.461 1.44.692 2.814.692h8.97v3.268H57.726v-1.69l-2.953.61v.388c0 1.329.255 2.224.766 2.686.51.461 1.453.692 2.828.692h8.886c1.375 0 2.317-.23 2.828-.692.51-.462.766-1.357.766-2.686v-1.967c0-1.329-.255-2.224-.766-2.686-.51-.461-1.453-.692-2.828-.692h-8.97v-3.074h9.416v1.634l2.953-.692v-.305c0-1.2-.265-2.021-.794-2.465-.53-.443-1.453-.664-2.772-.664zm-17.007 2.548v9.055H39.047v-9.055h11.032zm41.371-3.259h-2.708v3.846h2.708v-3.846zm-4.256 0h-2.709v3.846h2.709v-3.846zm-4.643 0h-2.709v3.846h2.709v-3.846zm-4.643 0h-2.709v3.846h2.709v-3.846z"
          id="fos_svg__b"
        />
      </Defs>
      <G transform="translate(-15 -306)" fill="none" fillRule="evenodd">
        <Use fill="#000" filter="url(#fos_svg__a)" xlinkHref="#fos_svg__b" />
        <Use fill={props.fill || '#fff'} xlinkHref="#fos_svg__b" />
      </G>
    </Svg>
  );
}

export default SvgFos;

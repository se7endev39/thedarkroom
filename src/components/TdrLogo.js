import React from 'react';
import {Image, Dimensions} from 'react-native';
import {shallowEqual, useSelector} from 'react-redux';

export function TdrLogo ()
{
    const orientation = useSelector(state => state.main.orientation, shallowEqual);

    let windowWidth = Dimensions.get('window').width,
        imageOriginalWidth = 332,
        imageWidth = Math.round(windowWidth * (orientation === 'LANDSCAPE' ? 0.15 : 0.3)),
        imageOriginalHeight = 70,
        imageHeight = imageWidth / imageOriginalWidth * imageOriginalHeight;

    return (
        <Image resizeMode="contain" style={{width: imageWidth, height: imageHeight}} source={require('../assets/tdr_logo.png')}/>
    )
}

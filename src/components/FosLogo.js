import React from 'react';
import {View, Platform} from 'react-native';
import Fos from './icons/Fos';

export function FosLogo ()
{
    return <View style={{paddingTop : Platform.OS === 'ios' ? 10 : 0}}>
        <Fos/>
    </View>
}

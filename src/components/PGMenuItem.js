import React from 'react';
import {Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useTheme} from '../theme-manager';
import {shallowEqual, useSelector} from "react-redux";
import TriangleSelector from './icons/TriangleSelector';

export function PGMenuItem ({pgItem, onPress})
{
    const { theme } = useTheme();
    const aPrint = useSelector(state => state.main.activedPrints, shallowEqual);
    return (
        <TouchableOpacity onPress={onPress} style={styles.wrapper}>
            <Image resizeMode='contain' style={styles.image} source={pgItem.imageUrl} />
            <Text style={styles.title}>{pgItem.title}</Text>
            { aPrint == pgItem.title && <TriangleSelector/>}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 10,
        marginRight: 15,
        marginLeft: 15,
        // marginBottom: 30,
        flexDirection:'column',
        alignItems: 'center'
    },
    image: {
        height: 58
    },
    title: {
        fontFamily: 'Roboto-Regular',
        fontSize: 10,
        fontWeight: '400',
        lineHeight: 12,
    }
});

import React from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import {useTheme} from '../theme-manager';

export function CardInfo ({card, isInsideAlbumBlock = true, showTitle = true})
{
    const { theme } = useTheme();

    return (
        <View style={[styles.infoWrapper, isInsideAlbumBlock ? {position : 'absolute', backgroundColor: '#00000070'} : {}]}>
            <Text style={[styles.name, isInsideAlbumBlock ? {} : {fontSize: 20, color: theme.primaryText}]}>{showTitle ? card.title : ''}</Text>
            <View style={styles.secondaryInfo}>
                <Text style={[styles.text, styles.price, {color: !isInsideAlbumBlock ? theme.primaryText : '#fff'}]}>From ${card.price}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    infoWrapper : {
        bottom: 0,
        left: 0,
        zIndex: 1,
        width : '100%',
        flexDirection : 'row',
        justifyContent : 'space-between',
        paddingVertical : 5,
        paddingHorizontal : 10,
        borderBottomStartRadius: 7,
        borderBottomEndRadius: 7      
    },
    name : {
        fontSize: 14,
        color: '#fff',
        fontFamily : 'Roboto-Regular',
        maxWidth : Dimensions.get('window').width - 200
    },
    secondaryInfo : {
        flexDirection : 'row'
    },
    text : {
        color: 'white',
        fontFamily : 'Roboto-Regular',
    },
    price : {
        marginTop: 2
    }
});

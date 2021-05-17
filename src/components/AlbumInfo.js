import React from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import Film from './icons/Film';
import Picture from './icons/Picture';
import {useTheme} from '../theme-manager';

export function AlbumInfo ({album, isInsideAlbumBlock = true, showName = true})
{
    const { theme } = useTheme();

    return (
        <View style={[styles.infoWrapper, isInsideAlbumBlock ? {position : 'absolute', backgroundColor: '#00000070'} : {}]}>
            <Text style={[styles.name, isInsideAlbumBlock ? {} : {fontSize: 20, color: theme.primaryText}]}>{showName ? album.name : ''}</Text>
            <View style={styles.secondaryInfo}>
                <View style={styles.infoBlock}>
                    <Film fill={!isInsideAlbumBlock ? theme.primaryText : '#fff'} style={[styles.icon, {transform : [{scale : 1}]}]}/>
                    <Text style={[styles.text, {color: !isInsideAlbumBlock ? theme.primaryText : '#fff'}]}>{album.filmsCount}</Text>
                </View>
                <View style={styles.infoBlock}>
                    <Picture fill={!isInsideAlbumBlock ? theme.primaryText : '#fff'} style={[styles.icon, {transform : [{scale : 0.9}]}]}/>
                    <Text style={[styles.text, {color: !isInsideAlbumBlock ? theme.primaryText : '#fff'}]}>{album.imagesCount}</Text>
                </View>
                <Text style={[styles.text, styles.date, {color: !isInsideAlbumBlock ? theme.primaryText : '#fff'}]}>{album.date}</Text>
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
    infoBlock : {
        flexDirection : 'row',
        marginRight: 15,
        marginTop: 2
    },
    icon : {
        marginRight: 5,
        marginTop: 2
    },
    text : {
        color: 'white',
        fontFamily : 'Roboto-Regular',
    },
    date : {
        marginTop: 2
    }
});

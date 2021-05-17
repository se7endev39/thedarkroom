import React from 'react';
import {Image, View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {AlbumInfo} from './AlbumInfo';
import {useTheme} from '../theme-manager';

export function Album ({album, onPress})
{
    const { theme } = useTheme();

    return (
        <TouchableOpacity onPress={onPress} style={styles.wrapper}>
            {
                album.imageUrl !== "" &&
                <Image resizeMode="cover" style={styles.image} source={{uri : album.imageUrl}}></Image>
            }
            {
                !album.imageUrl &&
                <View style={[styles.noImages, {borderColor: theme.primaryBackground}]}>
                    <Text style={[styles.noImagesText, {color: theme.primaryText}]}>No photos</Text>
                </View>
            }
            <AlbumInfo album={album}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    wrapper : {
        marginTop: 15,
        marginBottom: 5,
        position: 'relative'
    },
    image : {
        width: '100%',
        height: 300
    },
    noImages : {
        marginBottom: 3,
        height: 300,
        borderTopWidth: 0.5,
        alignItems: 'center',
        justifyContent : 'center'
    },
    noImagesText : {
        fontSize: 24
    }
});
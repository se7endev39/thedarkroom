import React from 'react';
import {Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {shallowEqual, useSelector} from "react-redux";
import TriangleSelector from './icons/TriangleSelector';

export function FilmMenuItem ({filmItem, onPress})
{
    const aFilm = useSelector(state => state.main.activedFilmTab, shallowEqual);
    return (
        <TouchableOpacity onPress={onPress} style={styles.wrapper}>
            <Image resizeMode='contain' style={styles.image} source={filmItem.imageUrl}></Image>
            <Text style={styles.title}>{filmItem.title}</Text>
            { aFilm == filmItem.title && <TriangleSelector/>}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        marginHorizontal: 28,
        // marginBottom: 30,
        flexDirection:'column',
        alignItems: 'center'
    },
    image: {
        marginTop: 10,
        height: 50,
    },
    title: {
        fontFamily: 'Roboto-Regular',
        fontSize: 10,
        fontWeight: '400',
        lineHeight: 12,
    }
});

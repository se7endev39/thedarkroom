import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import DropShadow from "react-native-drop-shadow";
import {CardInfo} from './CardInfo';
import {useTheme} from '../theme-manager';

export function Card ({card, onPress})
{
    const { theme } = useTheme();
    return (
        <TouchableOpacity onPress={onPress} style={styles.wrapper}>
            <DropShadow
                style={{
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 2,
                        height: 2,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 5,
                }}>
                <Image resizeMode="cover" style={styles.image} source={card.imageUrl}></Image>
                <CardInfo card={card}/>
            </DropShadow>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    wrapper : {
        margin: 12,
        position: 'relative',

    },
    image : {
        width: '100%',
        height: 230,
        borderRadius: 7
    }
});

import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

export default function MinusButton ({navigation, onPress})
{
    return (
        <TouchableOpacity onPress={onPress} style={styles.minusButton}>
            <Text style={styles.minusButtonIcon}>&#8212;</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    minusButton : {
        margin:5,
        flexDirection: 'row',
        width: 21,
        height: 21,
        justifyContent: 'center',
    },
    minusButtonIcon : {
        width: '100%',
        borderRadius: 23,
        borderWidth: 1,
        borderColor: '#5d5d5d',
        textAlign: 'center',
        color:'#5d5d5d'
    },
});

import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

export default function PlusButton ({onPress, style})
{
    return (
        <TouchableOpacity onPress={onPress} style={[style,styles.plusButton]}>
            <Text style={styles.plusButtonIcon}>&#43;</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    plusButton : {
        margin:5,
        flexDirection: 'row',
        width: 21,
        height: 21,
        alignItems: 'center',
    },

    plusButtonIcon: {
        width: '100%',
        borderWidth: 1,
        borderRadius: 23,
        borderColor: '#5d5d5d',
        textAlign: 'center',
        color:'#5d5d5d'
    },

    disabledIcon: {
        width: '100%',
        borderWidth: 1,
        borderRadius: 23,
        borderColor: '#979797',
        textAlign: 'center',
        color:'#979797'
    }
});

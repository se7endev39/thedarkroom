import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

export default function HeaderButton ({text, onPress})
{
    return (
        <TouchableOpacity style={styles.wrapper} onPress={onPress}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    wrapper : {
        marginRight: 10,
        marginBottom: 3
    },
    text : {
        color: '#40908c',
        fontSize : 18
    }
});

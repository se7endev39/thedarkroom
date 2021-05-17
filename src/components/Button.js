import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';
import LinearGradient from "react-native-linear-gradient";

export function Button ({onPress, text, style, disabled = false})
{
    return (
        <LinearGradient colors={['#fa8e01', '#fcc801']} style={style}>
            <TouchableOpacity onPress={onPress} style={styles.button} disabled={disabled}>
                <Text style={styles.buttonText}>{text}</Text>
            </TouchableOpacity>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    button : {
        flexDirection : 'row',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal : 25,
    },
    buttonText : {
        color: '#000',
        fontSize: 21,
        fontWeight : "600"
    },
    arrowIcon : {
        transform: [{ rotate: '180deg'}],
        width : 12,
        aspectRatio : 0.764,
        marginTop: 5
    }
});

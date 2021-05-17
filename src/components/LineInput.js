import React from 'react';
import {
    Dimensions,
    Platform,
    StyleSheet,
    Text, TextInput, View,
} from 'react-native';
import {useTheme} from '../theme-manager';

export function LineInput ({style, title, value, onChange, labelWidth = null, forceMode = null, disabled = false, textMode = false})
{
    const { mode } = useTheme();

    return (
        <View style={[styles.wrapper, style]}>
            <Text allowFontScaling={false} style={[styles.title, {color: (forceMode || mode) === 'light' ? '#777' : '#bcb9b9'}, labelWidth ? {width : labelWidth} : {}]}>{title}</Text>
            {
                !textMode &&
                <TextInput allowFontScaling={false} editable={!disabled} style={styles.input} value={value} onChangeText={onChange}/>
            }
            {
                textMode &&
                <Text allowFontScaling={false} style={[styles.input, styles.text]}>{value}</Text>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper : {
        flexDirection : 'row',
        borderTopWidth : 1,
        borderBottomWidth : 1,
        borderColor: '#686363',
        paddingHorizontal : 15,
    },
    title : {
        marginTop: 13,
        fontSize: 16,
        marginRight : 30
    },
    input : {
        width: Dimensions.get('window').width - 150,
        color: '#827c7d',
        fontSize: 16,
        marginTop: Platform.OS === 'ios' ? 13 : 0,
        marginBottom: Platform.OS === 'ios' ? 13 : 0
    },
    text : {
        paddingVertical : Platform.OS === 'ios' ? 0 : 13,
    }
});

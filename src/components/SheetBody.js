import React from 'react';
import {View, StyleSheet} from 'react-native';

export function SheetBody ({children, style = {}})
{
    return (
        <View style={[styles.wrapper, style]}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper : {
        width : '100%',
        paddingVertical : 10,
        paddingHorizontal : 20,
        backgroundColor: '#eef0ee',
        height: 500
    },
});

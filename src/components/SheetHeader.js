import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Close from './icons/Close';
import DownloadFilm from './icons/DownloadFilm';

export function SheetHeader ({title, additionalText, onPress, rollDownloadIcon = false})
{
    return (
        <View style={styles.wrapper}>
            <View style={styles.mainContentWrapper}>
                {
                    rollDownloadIcon &&
                    <View style={styles.rollDownloadIconWrapper}>
                        <DownloadFilm style={styles.rollDownloadIcon}/>
                    </View>
                }
                <View>
                    <Text style={styles.title}>{title}</Text>
                    {
                        additionalText &&
                        <Text style={styles.additionalText}>{additionalText}</Text>
                    }
                </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Close style={styles.buttonIcon} fill="#7d7e81" onPress={onPress}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper : {
        width : '100%',
        flexDirection : 'row',
        justifyContent : 'space-between',
        paddingVertical : 15,
        paddingHorizontal : 20,
        backgroundColor: '#eef0ee',
        borderWidth: 1,
        borderColor: '#ced0ce'
    },
    title : {
        fontSize: 20,
        fontWeight: 'bold'
    },
    button : {
        backgroundColor: '#d8d8d8',
        borderRadius : 50000,
        borderBottomLeftRadius: 50000,
        borderBottomRightRadius: 50000,
        borderTopLeftRadius: 50000,
        borderTopRightRadius: 50000,
        padding: 3,
        position : 'absolute',
        right: 10,
        top: 13
    },
    buttonIcon : {
        transform : [{scale : 0.9}]
    },
    mainContentWrapper : {
        flexDirection : 'row'
    },
    rollDownloadIconWrapper : {
        backgroundColor: '#423c3d',
        borderRadius : 50000,
        borderBottomLeftRadius: 50000,
        borderBottomRightRadius: 50000,
        borderTopLeftRadius: 50000,
        borderTopRightRadius: 50000,
        paddingHorizontal: 8,
        paddingVertical: 2,
        marginRight: 10
    },
    rollDownloadIcon : {
        transform : [{scale : 0.75}],
        marginTop: 5
    }
});

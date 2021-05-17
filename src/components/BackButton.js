import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Back } from './icons';
import BackBlack from './icons/BackBlack';

export default function BackButton ({navigation, title, forceTitle = false, mode})
{
    return (
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            { mode=="white" && <Back style={styles.backButtonIcon}/> }
            { mode=="black" && <BackBlack style={styles.backButtonIcon}/> }
            {
                (forceTitle || Platform.OS !== 'ios') && <Text style={styles.title}>{title}</Text>
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    backButton : {
        marginRight: 5,
        marginTop: 5,
        marginLeft: 10,
        flexDirection: 'row'
    },
    backButtonIcon : {
        width : 17,
        height: 23,
        marginRight: 5,
        transform : [{scale : 1}]
    },
    title : {
        fontSize: 16,
        marginTop: -4,
        marginLeft: 3,
        color: '#fff'
    }
});

export const customBackButtonHeaderProps = (title, navigation, mode="white") =>
{
    return {
        headerBackImage: () => <BackButton title={title} navigation={navigation} mode={mode}/>,
        headerLeftStyle : styles.backButton,
        headerBackTitleStyle : {color: '#fff', marginTop: 4},
        headerBackTitle : title
    };
};

import React from 'react';
import {Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';

export default function CloseButton ({navigation, title, forceTitle = false})
{
    return (
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
            <Text style={styles.closeButtonIcon}>&#10006;</Text>
            {
                (forceTitle || Platform.OS !== 'ios') && <Text style={styles.title}>{title}</Text>
            }
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    closeButton : {
        marginRight: 5,
        marginTop: 5,
        marginLeft: 10,
        flexDirection: 'row',
    },
    closeButtonIcon : {
        // width : 17,
        // height: 23,
        // marginRight: 5,
        width: 24,
        
        borderRadius: 24,
        // paddingHorizontal: 8,
        // paddingVertical: 2,
        borderWidth: 2,
        borderColor: '#5d5d5d',
        textAlign: 'center',
        color:'#5d5d5d'
        // transform : [{scale : 1}]
    },
    title : {
        fontSize: 16,
        marginTop: -4,
        marginLeft: 3,
        color: '#fff'
    }
});

export const customCloseButtonHeaderProps = (title, navigation) =>
{
    return {
        headerBackImage: () => <CloseButton title={title} navigation={navigation}/>,
        headerLeftStyle : styles.closeButton,
        headerBackTitleStyle : {color: '#fff', marginTop: 4},
        headerBackTitle : title
    };
};

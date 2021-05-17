import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Dimensions} from 'react-native';
import {useTheme} from '../theme-manager';
import Modal from 'react-native-modal';
import {Download} from './icons';

export function ImageDownloadModal ({isVisible = true, close})
{
    const { theme } = useTheme();

    return (
        <Modal isVisible={isVisible} animationIn={'fadeIn'} animationOut={'fadeOut'} hasBackdrop={false}>
            <View style={styles.wrapper}>
                <View style={styles.header}>
                    <View style={styles.imageDownloadIconWrapper}>
                        <Download style={styles.imageDownloadIcon}/>
                    </View>
                    <Text style={styles.headerText}>Image(s) Successfully Downloaded</Text>
                </View>
                <Text style={styles.mainText}>Image resolution is sized for social sharing and mobile devices.</Text>
                <Text style={styles.mainText}>Use the download roll feature to get a link to the full resolution images.</Text>

                <View style={styles.buttonWrapper}>
                    <TouchableOpacity style={styles.button} onPress={close}>
                        <Text style={styles.buttonText}>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    wrapper : {
        backgroundColor : '#fff',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#000'
    },
    header : {
        flexDirection : 'row'
    },
    headerText : {
        fontSize: 24,
        marginLeft: 5,
        width: Dimensions.get('window').width - 100
    },
    imageDownloadIconWrapper : {
        backgroundColor: '#423c3d',
        borderRadius : 50000,
        borderBottomLeftRadius: 50000,
        borderBottomRightRadius: 50000,
        borderTopLeftRadius: 50000,
        borderTopRightRadius: 50000,
        paddingHorizontal: 8,
        paddingVertical: 5,
        marginRight: 10,
        height: 53
    },
    imageDownloadIcon : {
        transform : [{scale : 0.75}],
        marginTop: 5
    },
    mainText : {
        marginTop: 10
    },
    buttonWrapper : {
        marginTop: 20,
        marginBottom : 10,
        alignItems : 'center'
    },
    button: {
        borderRadius : 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderWidth : 1,
        borderColor : '#42ada8',
        paddingVertical : 7,
        width: '50%',
        alignItems : 'center'
    },
    buttonText : {
        color: '#42ada8',
        fontSize: 16
    }
});

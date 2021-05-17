import React from 'react';

import {Image,View, StyleSheet, Text, TouchableOpacity, ImageBackground, ActivityIndicator} from 'react-native';
import {useTheme} from '../theme-manager';
import Fos from './icons/Fos';
import CardView from 'react-native-cardview'

export function Order ({card, rand1, rand2, rand3, onPress})
{
    const { theme } = useTheme();

    return (
        <TouchableOpacity onPress={onPress} style={styles.wrapper}>
            <CardView cornerRadius={7} containerStyle={{padding: 0, margin: 0, borderWidth: 0}}>
                <ImageBackground source={card.imageUrl} style={styles.imageBackground} imageStyle={{borderRadius: 7}}>
                    <View style={styles.header}>
                        <Text style={[styles.headerText, {color : theme.primaryText}]}>Your Albums</Text>
                        <Fos style={styles.icon} fill={theme.primaryText}/>
                    </View>
                    <View style={styles.imageContainer}>
                        { 
                            rand1 !== "" && <Image resizeMode="cover" style={[styles.image1, {zIndex: 97}]} source={{uri: rand1}}></Image>
                        }
                        {
                            <View style={[styles.image1, {zIndex:7, backgroundColor: '#00000070'}]}></View>
                        }
                        { 
                            rand2 !== "" && <Image resizeMode="cover" style={[styles.image2, {zIndex: 98}]} source={{uri: rand2}}></Image> 
                        }
                        {
                            <View style={[styles.image2, {zIndex:8, backgroundColor: '#00000070'}]}></View>
                        }
                        { 
                            rand3 !== "" && <Image resizeMode="cover" style={[styles.image3, {zIndex: 99}]} source={{uri: rand3}}></Image> 
                        }
                        {
                            <View style={[styles.image3, {zIndex:9, backgroundColor: '#00000070'}]}></View>
                        }
                    </View> 
                    <View style={styles.notification}>
                        <View style={styles.notificationContainer}>
                            <Text>New</Text>
                            <Text>Order uploaded 12/30/2020</Text>
                        </View>
                    </View>
                </ImageBackground>
            </CardView>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    wrapper : {
        marginTop: 15,
        margin: 10,
        position: 'relative'
    },
    header : {
        width: '100%',
        justifyContent : 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 15,
        marginBottom : 15
    },
    headerText : {
        fontWeight: "bold",
        fontSize: 24,
        color: '#fff',
        fontFamily : 'Montserrat-SemiBold'
    },
    icon : {
        marginTop: 8
    },
    imageBackground : {
        flexDirection:'column',
        alignItems:'center',
        width: '100%',
        height: 380,
        position: 'relative'
    },
    imageContainer:{
        width: '85%',
        height: 230,
        position: 'relative'
    },
    image1 : {
        position: 'absolute',
        top:0,
        left:0,
        width: '100%',
        borderWidth: 5,
        transform: [{ rotate: '8deg' }],
        borderColor: '#ffffff',
        height: 220
    },
    image2 : {
        position: 'absolute',
        top:0,
        left:0,
        width: '100%',
        borderWidth: 5,
        transform: [{ rotate: '-7deg' }],
        borderColor: '#ffffff',
        height: 220,
        zIndex: 98
    },
    image3 : {
        position: 'absolute',
        top:0,
        left:0,
        width: '100%',
        borderWidth: 5,
        borderColor: '#ffffff',
        height: 220,
        zIndex: 99
    },
    notification: {
        position:'absolute',
        bottom: 0,
        left: 0,
        zIndex: 1,
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center'
    },
    notificationContainer: {
        width: '85%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical : 10,
        paddingHorizontal : 20,
        marginBottom: 10,
        borderRadius: 7,
        backgroundColor: '#fcd000'
    },
    noImagesText : {
        fontSize: 24
    }
});

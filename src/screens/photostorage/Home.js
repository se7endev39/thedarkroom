import React, {useLayoutEffect} from 'react';
import { Text, View, StyleSheet, FlatList, TouchableWithoutFeedback, Image,ImageBackground } from 'react-native';
import { Button } from '../../components/Button';
import {customBackButtonHeaderProps} from '../../components/BackButton';

export default function PhotoStorageHome ({navigation}){
    /**
     * Add header actions
     */
     useLayoutEffect(() => {
        navigation.setOptions({
            ...customBackButtonHeaderProps('', navigation)
        });
    }, [navigation]);

    return (
        <View style={{flexDirection:'column', height:'100%'}}>
            <ImageBackground resizeMode='cover' source={require("../../assets/photo_storage_background.png")} style={{flex:1, height:'100%', zIndex:1,position:'relative'}}>
                <View style={styles.layer}>
                    <Image resizeMode='contain' source={require("../../assets/photo_storage_img.png")} style={styles.image} />
                </View>
            </ImageBackground>
            <View style={{flex:1}}>
                <View>
                    <Text style={styles.topText}>
                        Keep your photo albums stored with The Darkroom for just $1.50 a month.
                    </Text>
                    <Text style={styles.middleText}>
                        The Darkroom Film Ordering System (FOS) will store each album for 60 days after the order has been uploaded no charge, but a subscription is required to store each album beyond that. Subscriptions apply to all active albums on the FOS.
                    </Text>
                    <Text style={styles.topText}>
                        Subscribing annually at $18 for the year will cover all your albums in the FOS.
                    </Text>
                    <Text style={styles.priceText}>
                        $18.00
                    </Text>
                </View>
                <Button text={"Add To Cart"} style={{alignSelf: 'center', borderRadius:7}}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    layer:{
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height:'100%', 
        paddingVertical:10,
        zIndex:2,
    },

    image:{
        height: '100%',
        zIndex: 5,
        alignSelf:'center'
    },
    topText: {
        fontFamily: 'Lato-Bold, Lato',
        fontSize: 15,
        fontWeight: '400',
        lineHeight: 18,
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 5,
        marginHorizontal: 10,
    },
    middleText:{
        fontFamily: 'Lato-Bold, Lato',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 18,
        textAlign: 'center',
        marginBottom: 5,
        marginHorizontal: 10,
    },
    bottomText:{
        fontFamily: 'Lato-Bold, Lato',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 18,
        textAlign: 'center',
        marginBottom: 10,
        marginHorizontal: 10,
    },
    priceText: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 22,
        fontWeight: '500',
        lineHeight: 27,
        textAlign: 'center',
        marginBottom: 15,
    }
});
import React, {useEffect, useLayoutEffect} from 'react';
import { View, Text, Image,TouchableOpacity, StyleSheet } from 'react-native';
import FilmHeader from './Header';
import {customBackButtonHeaderProps} from '../../components/BackButton';
import { setActivedFilmTab } from '../../ducks/main';

export default function FilmScanTab ({navigation}){

    /**
     * Add header actions
     */
     useLayoutEffect(() => {
        navigation.setOptions({
            ...customBackButtonHeaderProps('', navigation)
        });
    }, [navigation]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', e => {
          e.preventDefault(); // Prevent default action
          unsubscribe() // Unsubscribe the event on first call to prevent infinite loop
          setActivedFilmTab('Film');
          navigation.navigate('FilmTab') // Navigate to your desired screen
        });
     }, [])
    
    return (
        <View style={{flexDirection:'column', width:'100%'}}>
            <FilmHeader navigation={navigation} />
            <Text style={styles.middleTitle}>Scans</Text>
            <TouchableOpacity onPress={()=>{navigation.navigate('FilmPrintTab'); setActivedFilmTab('Prints');}} style={[styles.container, {borderTopWidth:1, marginTop: 8}]}>
                <Image resizeMode='contain' style={[styles.image]} source={require('../../assets/film_scan_icon1.png')}></Image>
                <View style={{flex:2, alignSelf: 'center'}}>
                    <Text style={styles.normalText}>Standard Scans</Text>
                    <Text style={styles.priceText}>From small prints</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.container}>
                <Image resizeMode='contain' style={styles.image} source={require('../../assets/film_scan_icon2.png')}></Image>
                <View style={{flex:2, alignSelf: 'center'}}>
                    <Text style={styles.normalText}>Enhanced Scans +$3</Text>
                    <Text style={styles.priceText}>For prints up 11x14</Text>
                </View>
            </View>
            <View style={styles.container}>
                <Image resizeMode='contain' style={styles.image} source={require('../../assets/film_scan_icon3.png')}></Image>
                <View style={{flex:2, alignSelf: 'center'}}>
                    <Text style={styles.normalText}>New! Super Scans +$5</Text>
                    <Text style={styles.priceText}>For large prints</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    middleTitle: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 22,
        fontWeight: '500',
        lineHeight: 27,
        textAlign: 'center',
        marginTop: 40
    },
    container: {
        flexDirection: 'row', 
        marginHorizontal: 40, 
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#979797',
    },
    image: {
        flex: 1,
    },
    normalText: {
        fontFamily: 'Lato-Bold, Lato',
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 19,
    },
    priceText: {
        fontFamily: 'Lato-Bold, Lato',
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 18,
    }
});
import React, {useEffect, useLayoutEffect} from 'react';
import { View, Text, Image,TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import RadioButtonRN from 'radio-buttons-react-native';
import FilmHeader from './Header';
import {customBackButtonHeaderProps} from '../../components/BackButton';
import MinusButton from '../../components/MinusButton';
import PlusButton from '../../components/PlusButton';
import { setActivedFilmTab } from '../../ducks/main';

export default function FilmPrintOption ({navigation}){
    const finishOptions = [{ label: 'Glossy'},{ label: 'Matte'}];
    const borderOptions = [{ label: 'Borderless'},{ label: 'White Border'}];

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
          setActivedFilmTab('Prints');
          navigation.navigate('FilmPrintTab') // Navigate to your desired screen
        });
     }, []);

    return (
        <View style={{flexDirection:'column', width:'100%'}}>
            <FilmHeader navigation={navigation} />
            <Text style={styles.middleTitle}>Prints Options</Text>
            <View style={styles.container}>
                <Text style={styles.normalText}>Quantities per set per roll</Text>
                <Text style={styles.priceText}>1 set is 1 print for every frame on roll</Text>
                <View style={{flexDirection:'row', marginVertical:10, alignItems:'center'}}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <MinusButton />
                        <Text style={[styles.textItems,{paddingHorizontal:5}]}>1</Text>
                        <PlusButton />
                    </View>
                    <Text style={{flex:2, marginLeft:10}}>Large 4” Prints +$6 Per Set</Text>
                </View>
                <View style={{flexDirection:'row', marginBottom:10, alignItems:'center'}}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <MinusButton />
                        <Text style={[styles.textItems,{paddingHorizontal:5}]}>0</Text>
                        <PlusButton />
                    </View>
                    <Text style={{flex:2, marginLeft:10}}>Large 5” Prints  +$15 Per Set</Text>
                </View>
            </View>
            <View style={styles.container}>
                <Text style={{alignSelf:'center'}}>Finish</Text>
                <View>
                    <RadioButtonRN
                        style={{flexDirection:'row', paddingHorizontal:40}}
                        boxStyle={{flex:1, borderWidth:0, paddingHorizontal:10, paddingVertical:0}}
                        textStyle={{marginStart:5}}
                        data={finishOptions}
                        activeColor="#fa8a02"
                        deactiveColor="#5d5d5d"
                        boxActiveBgColor="#ffffff00"
                        boxDeactiveBgColor="#ffffff00"
                        selectedBtn={(e) => console.log(e)}/>
                </View>
            </View>
            <View style={styles.container}>
                <Text style={{alignSelf:'center'}}>Border Options</Text>
                <View>
                    <RadioButtonRN
                        style={{flexDirection:'row', paddingHorizontal:10}}
                        boxStyle={{flex:1, borderWidth:0, paddingHorizontal:10, paddingVertical:0}}
                        textStyle={{marginStart:5}}
                        data={borderOptions}
                        activeColor="#fa8a02"
                        deactiveColor="#5d5d5d"
                        boxActiveBgColor="#ffffff00"
                        boxDeactiveBgColor="#ffffff00"
                        selectedBtn={(e) => console.log(e)}/>
                </View>
            </View>
            <TouchableOpacity onPress={()=>{navigation.navigate('FilmOptionTab'); setActivedFilmTab('Options');}}>
                <Text style={styles.nextBtn}>Next</Text>
            </TouchableOpacity>
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
        marginHorizontal: 40, 
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#979797',
        paddingTop:30
    },
    container: {
        flexDirection: 'column', 
        marginHorizontal: 40, 
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#979797',
    },
    normalText: {
        fontFamily: 'Lato-Bold, Lato',
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 19,
        alignSelf:'center'
    },
    priceText: {
        fontFamily: 'Lato-Bold, Lato',
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 18,
        alignSelf:'center'
    },
    nextBtn: {
        marginTop: 40,
        color: '#fa8a02',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 18,
        fontWeight: '500',
        lineHeight: 22,
        textAlign: 'center',

        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#fa8a02',
        alignSelf:'center',
        minWidth: 194,
    },
    textItems:{
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 20,
    },
});
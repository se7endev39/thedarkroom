import React, {useEffect, useLayoutEffect} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FilmHeader from './Header';
import { CheckBox } from 'react-native-elements'
import { Button } from '../../components/Button';
import {customBackButtonHeaderProps} from '../../components/BackButton';
import { setActivedFilmTab } from '../../ducks/main';

export default function FilmOptionTab ({navigation}){

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
          unsubscribe(); // Unsubscribe the event on first call to prevent infinite loop
          setActivedFilmTab('Prints');
          navigation.navigate('FilmPrintOption'); // Navigate to your desired screen
        });
     }, []);

    return (
        <View style={{flexDirection:'column', width:'100%'}}>
            <FilmHeader navigation={navigation} />
            <Text style={styles.middleTitle}>Options & Custom Processing</Text>
            <CheckBox
                containerStyle={styles.checkboxStyle}
                title='Slide Film Processing (E-6) +$3'
                checkedColor={'#fa8a02'}
                checked={true}/>
            <CheckBox
                containerStyle={styles.checkboxStyle}
                title='35mm Slide Film Mounting + $3'
                checkedColor={'#fa8a02'}
                checked={true}/>
            <CheckBox
                containerStyle={styles.checkboxStyle}
                title='Cross Processing +$2'
                checkedColor={'#fa8a02'}
                checked={true}/>
            <CheckBox
                containerStyle={styles.checkboxStyle}
                title='Do Not Cut Negatives +$1'
                checkedColor={'#fa8a02'}
                checked={true}/>
            <CheckBox
                containerStyle={styles.checkboxStyle}
                title='Panoramic or Half Frame +$10'
                checkedColor={'#fa8a02'}
                checked={true}/>
            <CheckBox
                containerStyle={styles.checkboxStyle}
                title='Add Proof Sheet +$10'
                checkedColor={'#fa8a02'}
                checked={true}/>
            <CheckBox
                containerStyle={styles.checkboxStyle}
                title='Push/Pull +$2'
                checkedColor={'#fa8a02'}
                checked={true}/>
            <Button text={"Add To Cart"} style={{alignSelf: 'center', borderRadius:7, marginTop:20}}/>
            {/* <Text style={styles.completeBtn}>Done</Text> */}
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
    checkboxStyle: {
        margin:0,
        backgroundColor: "#ffffff00",
        paddingHorizontal: 40, 
        elevation:0,
    },
    completeBtn: {
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
    }
});
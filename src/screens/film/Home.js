import React, {useLayoutEffect} from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, ImageBackground, FlatList } from 'react-native';
import {customBackButtonHeaderProps} from '../../components/BackButton';
import { setActivedFilmTab } from '../../ducks/main';


export default function FilmHome ({navigation}){
    const dataList = [
        {id: 1, title: '35mm', price:12, uri:require('../../assets/film_home_icon1.png')},
        {id: 2, title: '120/620', price:12, uri:require('../../assets/film_home_icon2.png')},
        {id: 3, title: 'Single Use Camera', price:12, uri:require('../../assets/film_home_icon3.png')},
        {id: 4, title: '110/126/Advantix', price:12, uri:require('../../assets/film_home_icon4.png')},
    ];

    /**
     * Add header actions
     */
     useLayoutEffect(() => {
        navigation.setOptions({
            ...customBackButtonHeaderProps('', navigation)
        });
    }, [navigation]);

    function onItemPress( filmItem ){
        setActivedFilmTab('Film');
        navigation.navigate('FilmDeveloping', { filmItem }); 
    }

    const FilmHomeItem = ( item ) => {
        const filmItem = item.item;
        const fStyle = filmItem.id == 1 ? [styles.container, {borderTopWidth:1, marginTop: 10}] : styles.container;
        return (
            <TouchableOpacity onPress={() => onItemPress(filmItem)} style={fStyle}>
                <Image resizeMode='contain' style={[styles.image]} source={filmItem.uri}></Image>
                <View style={{flex:1, alignSelf: 'center'}}>
                    <Text style={styles.normalText}>{filmItem.title}</Text>
                    <Text style={styles.priceText}>From ${filmItem.price}</Text>
                </View>
            </TouchableOpacity>
        )
    };
    
    return (
        <View style={{flexDirection:'column', width:'100%'}}>
            <ImageBackground source={require('../../assets/filmdeveloping.png')} resizeMode="cover" style={{height:200, width:'100%'}}>
                <Text style={styles.topTitle}>
                    Order Film Developing
                </Text>
            </ImageBackground>
            <Text style={styles.middleText}>
                Mail your film to us using our postage paid mailer, and we’ll process your film, scan your negatives, upload your images for immediate download or sharing on Facebook, Instagram etc. We’ll also mail your negatives and CD to you with your digital images.
            </Text>
            <Text style={styles.middleTitle}>What film type do you have?</Text>
            <FlatList 
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator = {false}
                    style={styles.listWrapper} 
                    data={dataList} 
                    keyExtractor={item => item.id.toString()} 
                    renderItem={({item}) => <FilmHomeItem item={item} />} />
        </View>
    )
}

const styles = StyleSheet.create({
    topTitle: {
        color: '#ffffff',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 24,
        fontWeight: '600',
        lineHeight: 29,
        textAlign: 'center',
        alignSelf: 'center',
        marginTop: 10,
    },
    middleText: {
        fontFamily: 'Lato-Bold, Lato',
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 18,
        textAlign: 'center',
        textAlign:'center', 
        padding:10,
    },
    middleTitle: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 20,
        fontWeight: '500',
        lineHeight: 27,
        textAlign: 'center',
    },
    container: {
        flexDirection: 'row', 
        marginHorizontal: 50, 
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
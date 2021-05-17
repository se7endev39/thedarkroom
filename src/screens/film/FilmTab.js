import React, {useEffect, useLayoutEffect} from 'react';
import { View, Text, Image,TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import FilmHeader from './Header';
import {customBackButtonHeaderProps} from '../../components/BackButton';
import { setActivedFilmTab } from '../../ducks/main';

export default function FilmTab ({navigation}){
    const dataList = [
        {id: 1, title: 'Prints & Enlargements'},
        {id: 2, title: 'Canvas Prints'},
        {id: 3, title: 'Bamboo Block '},
        {id: 4, title: 'HD Aluminum Art'},
        {id: 5, title: 'HD Aluminum Art'},
        {id: 6, title: 'HD Aluminum Art'},
        {id: 7, title: 'HD Aluminum Art'},
        {id: 8, title: 'HD Aluminum Art'},
        {id: 9, title: 'HD Aluminum Art'},
        {id: 10, title: 'HD Aluminum Art'},
        {id: 11, title: 'HD Aluminum Art'},
        {id: 12, title: 'HD Aluminum Art'},
    ];

    /**
     * Add header actions
     */
     useLayoutEffect(() => {
        navigation.setOptions({
            ...customBackButtonHeaderProps('', navigation)
        });
    }, [navigation]);

    return (
        <View style={{flexDirection:'column', width:'100%', height:'100%'}}>
            <FilmHeader navigation={navigation} />
            <Text style={styles.tabTitle}>How many rolls do you have?</Text>
            <View style={styles.container}>
                <Image resizeMode='contain' style={[styles.image]} source={require('../../assets/film_home_icon1.png')}></Image>
                <View style={{flex:1, alignSelf: 'center'}}>
                    <Text style={styles.normalText}>35mm</Text>
                    <Text style={styles.priceText}>From $12</Text>
                </View>
            </View>
            <FlatList 
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator = {false}
                style={styles.listWrapper} 
                data={dataList} 
                keyExtractor={item => item.id.toString()} 
                renderItem={({item}) => <TouchableOpacity onPress={()=>{navigation.navigate('FilmScanTab'); setActivedFilmTab('Scans');}} style={{textAlign:'center', padding: 20, borderBottomWidth: 1, borderColor: '#979797'}}><Text style = {{alignSelf:'center'}}>{item.id}</Text></TouchableOpacity>} />
        </View>
    )
}

const styles = StyleSheet.create({
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
    tabTitle: {
        color: '#000000',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 22,
        fontWeight: '600',
        lineHeight: 27,
        textAlign: 'center',
        alignSelf: 'center',
        marginTop: 30,
        marginBottom: 15,
    },
    listWrapper : {
        marginHorizontal: 50,
    },
});
import React from 'react';
import { Text, View, StyleSheet, FlatList, TouchableWithoutFeedback, ImageBackground } from 'react-native';
import { FilmMenuItem } from '../../components/FilmMenuItem';
import { setActivedFilmTab } from '../../ducks/main';

export default function FilmHeader ({navigation}){
    const menuList = [
        {id: 1, title: 'Film', price: 0, imageUrl: require('../../assets/film_home_icon1.png')},
        {id: 2, title: 'Scans', price: 12, imageUrl: require('../../assets/film_scan_icon2.png')},
        {id: 3, title: 'Prints', price: 0.25, imageUrl: require('../../assets/film_prints_menu_icon.png')},
        {id: 4, title: 'Options', price: 18, imageUrl: require('../../assets/film_options_menu_icon.png')}
    ];

    // function toScreen(value){
    //     navigation.navigate(value);
    // }

    // function toNavigate(item){
    //     setActivedFilmTab(item.title);
        // switch(item.id){
        //     case 1:
        //         toScreen('FilmTab');
        //         break;
        //     case 2:
        //         toScreen('FilmScanTab');
        //         break;
        //     case 3:
        //         toScreen('FilmPrintTab');
        //         break;
        //     case 4:
        //         toScreen('FilmOptionTab');
        //         break;
        // }
    // }

    return (
        <View style={styles.headerMenu}>
            <FlatList 
                horizontal={true} 
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator = {false}
                style={styles.listWrapper} 
                data={menuList} 
                keyExtractor={item => item.id.toString()} 
                renderItem={({item}) => <FilmMenuItem filmItem={item} />} />
        </View>
    )
}

const styles = StyleSheet.create({
    headerMenu: {
        width: '100%',
        paddingBottom:2,
    },
    listWrapper : {
        width: '100%',
        backgroundColor: '#d1d1d1',
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity:  0.75,
        shadowRadius: 2,
        elevation: 2,
    },
});
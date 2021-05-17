import React, {useLayoutEffect} from 'react';
import { Text, View, StyleSheet, FlatList, TouchableWithoutFeedback, ImageBackground } from 'react-native';
import {Card} from '../../components/Card';
import {useTheme} from '../../theme-manager';
import {customBackButtonHeaderProps} from '../../components/BackButton';

export default function ShopHome ({navigation}){
    const cardList = [
        {id: 1, title: 'Tote Bags', description:'The original The Darkroom  Tote Bag!', price: 18, imageUrl: require('../../assets/bag.png'), isSize:true},
        {id: 2, title: 'The Darkroom Shirt', description:'The original The Darkroom  t-shirt!', price: 15, imageUrl: require('../../assets/thedarkroom_shirt.png'), isSize:true},
        {id: 3, title: '2021 Calendar', description:'Be inspired and motivated in 2021 with The Darkroom’s desktop calendar, featuring illustrations of our favorite film cameras.The calendar is 6″x6″ has a wire coil binding with a quality heavy-stock uncoated paper. The calendar is freestanding and can be set on any surface with a pop-up base.', price: 6, imageUrl: require('../../assets/thedarkroom_calendar.png'), isSize:false},
        {id: 4, title: 'Hat', description:'The original The Darkroom  Hat!', price: 20, imageUrl: require('../../assets/thedarkroom_hat.png'), isSize:true},
        {id: 5, title: 'Neck Gaiter', description:'The Darkroom Neck Gaiter and Bandana', price: 10, imageUrl: require('../../assets/thedarkroom_neck_gaiter.jpg'), isSize:false},
    ];

    const { mode, theme } = useTheme();

    /**
     * Add header actions
     */
     useLayoutEffect(() => {
        navigation.setOptions({
            ...customBackButtonHeaderProps('', navigation)
        });
    }, [navigation]);

    return (
        <View style={[styles.wrapper, {backgroundColor : theme.backgroundColor}]}>
            <FlatList  showsVerticalScrollIndicator={false} 
                    style={styles.listWrapper} 
                    data={cardList} 
                    keyExtractor={item => item.id.toString()} 
                    renderItem={({item}) => <Card card={item} onPress={()=>navigation.navigate("ShopDetails",{item})}/>}/>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper : {
        flex: 1,
        width: '100%',
    },
    listWrapper : {
        width: '100%'
    },
});
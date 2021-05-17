import React, {useLayoutEffect} from 'react';
import { Text, View, StyleSheet, FlatList, TouchableWithoutFeedback, ImageBackground } from 'react-native';
import {useTheme} from '../../theme-manager';
import {customBackButtonHeaderProps} from '../../components/BackButton';
import { Button } from '../../components/Button';
import MinusButton from '../../components/MinusButton';
import PlusButton from '../../components/PlusButton';

function SizeComponent ({size, price}){
    return(
        <View style = {{flexDirection:'column', margin:6, paddingHorizontal:26, paddingVertical:8, borderWidth:1, borderColor:'#979797', alignItems:'center', borderRadius:10}}>
            <Text>
                {size}
            </Text>
            <Text>
                ${price}
            </Text>
        </View>
    )
}

export default function ShopDetails ({route, navigation}){
    const { mode, theme } = useTheme();
    const {item} = route.params;

    /**
     * Add header actions
     */
     useLayoutEffect(() => {
        navigation.setOptions({
            ...customBackButtonHeaderProps('', navigation)
        });
    }, [navigation]);

    return (
        <View style={styles.wrapper}>
            <ImageBackground source={item.imageUrl} style={styles.imgbackground} resizeMode='cover'></ImageBackground>
            <View style={{flex:1, alignItems:'center'}}>
                <Text style={{marginVertical:15, paddingHorizontal:25, textAlign:'center'}}>{item.description}</Text>
                {item.isSize&&
                <View style={{flexDirection:'row'}}>
                    <SizeComponent size='S' price={item.price}/>
                    <SizeComponent size='M' price={item.price}/>
                    <SizeComponent size='L' price={item.price}/>
                    <SizeComponent size='XL' price={item.price}/>
                </View>}
                <View style={{flexDirection:'row', alignItems:'center', marginVertical:8}}>
                    <PlusButton />
                    <Text>1</Text>
                    <MinusButton />
                </View>
                <Text>${item.price}</Text>
                <Button text={"Add To Cart"} style={{alignSelf: 'center', borderRadius:7, marginTop:20}}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper : {
        flex: 1,
        width: '100%',
    },
    imgbackground: {
        flex: 1,
    }
});
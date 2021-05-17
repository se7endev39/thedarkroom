import React, { useState, useEffect } from 'react';
import {Image, Text, StyleSheet, TouchableOpacity, View, Animated} from 'react-native';
import { shallowEqual, useSelector } from "react-redux";
import CardView from 'react-native-cardview'
import MinusButton from './MinusButton';
import PlusButton from './PlusButton';
import PrintCustomIcon from './icons/PrintCustom';
import Swipeable from 'react-native-gesture-handler/Swipeable';


export function PGItem ({ pgIndex, pgItem, deleteItem, onPress, updateCounter,
        addPhotoFromLibrary, addPhotoFromAlbums, addPrintOptionCrops, duplicateItem, useForAllPhotos })
{
    const urls = pgItem.image_urls;
    const isLastItem = urls === "LastItem" ? true: false;

    //console.log(urls);

    const activePrint = useSelector(state => state.main.activedPrints, shallowEqual);

    function setCounterPlus(itemPrint, itemMode, value){
        if(value < 100){
            updateCounter(itemPrint, itemMode, pgItem, pgIndex, value+1);
        }
    }
    function setCounterMinus(itemPrint, itemMode, value){
        if(value > 0){
            updateCounter(itemPrint, itemMode, pgItem, pgIndex, value-1);
        }
    }
    
    function SelectPhotos() {
        return (
            <View style={{flex:1, flexDirection:'row'}}>
                <View style={{flex:1, flexDirection:'column', marginStart:60, alignSelf:'center', }}>
                    <PlusButton onPress={addPhotoFromLibrary} style={{transform: [{ scale: 2 }]}} />
                    <Text style={{marginTop:5}}>Photo</Text>
                </View>
            </View>
        );
    }
    function SelectOptions() {
        return (
            <View style={{flex:1, flexDirection:'row'}}>
                <View style={{flexDirection:'column', marginStart:80, alignSelf:'center'}}>
                    { 
                        isLastItem && 
                        <View onPress={onPress} style={styles.plusButton}>
                            <Text style={styles.disabledIcon}>&#43;</Text>
                        </View>
                    }
                    {
                        !isLastItem && <PlusButton onPress={ addPrintOptionCrops } style={{ transform: [{ scale: 2 }] }}/>
                    }
                    { isLastItem && <Text style={{ marginTop:5, color:'#979797' }}>Select</Text> }
                    { !isLastItem && <Text style={{ marginTop:5 }}>Select</Text> }
                </View>
            </View>
        );
    }
    function PrintOptions( elePrint ){
        const itemPrint = elePrint.elePrint;
        const itemMode = elePrint.elePrint.modePrint;
        const itemQty = elePrint.elePrint.qty ? elePrint.elePrint.qty : 0;
        return (
            <View style={{flex:1}}>
                <TouchableOpacity style={{flex:1,borderBottomWidth:1, alignItems:'center'}} onPress={addPrintOptionCrops}>
                    <Text>{itemPrint.sizeVert}x{itemPrint.sizeHoriz} { itemMode }</Text>
                </TouchableOpacity>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <MinusButton onPress={()=>setCounterMinus(itemPrint, itemMode, itemQty)}/>
                        <Text style={[styles.textItems,{paddingHorizontal:5}]}>{ itemQty }</Text>
                        <PlusButton onPress={()=>setCounterPlus(itemPrint, itemMode, itemQty)} />
                    </View>
                    <View style={{flexDirection:'row', alignItems:'center', marginEnd:5}}>
                        <Text>${itemPrint.price}</Text>
                    </View>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-between'}}>
                    <TouchableOpacity style={{borderRadius:10, borderWidth:1, alignSelf:'center'}}>
                        <Text style={{paddingHorizontal:8, paddingVertical:2}} onPress={() => useForAllPhotos(itemPrint, itemMode)}>Use for all photos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{alignSelf:'center', marginEnd:5}} onPress={duplicateItem} >
                        <PrintCustomIcon />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    const leftSwipe = (progress, dragX) => {
        const scale = dragX.interpolate({
          inputRange: [0, 100],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        });
        return (
          <TouchableOpacity onPress={deleteItem} activeOpacity={0.6} style={{ flexDirection:'row' }}>
            <View style={styles.deleteBox}>
              <Animated.Text style={{transform: [{scale: scale}]}}> Delete </Animated.Text>
            </View>
          </TouchableOpacity>
        );
    };

    const ActivedOption = ( pgItem ) => {
        let elePrint = null;
        if(pgItem.pgItem){
            switch (activePrint) {
                case "Prints & Enlargements":
                    elePrint = pgItem.pgItem.colorprint;
                    break;
                case "Canvas Prints":
                    elePrint = pgItem.pgItem.canvasprint;
                    break;
                case "Bamboo Block":
                    elePrint = pgItem.pgItem.bambooprint;
                    break;
                case "HD Aluminum Art":
                    elePrint = pgItem.pgItem.aluminumprint;
                    break;
                default:
                    break;
            }
        }

        return (
            <View style={{flex:1}}>
                { elePrint && <PrintOptions elePrint={elePrint} /> }
                { !elePrint && <SelectOptions /> }
            </View>
        )
    };
    const ListItem = () => {
        return ( <Swipeable renderLeftActions={ leftSwipe }>
                    <CardView cornerRadius={7} style={styles.wrapper} containerStyle={styles.cardContainer}>
                        <View style={{flex:3}}>
                            <TouchableOpacity onPress={ onPress }>
                                <Image resizeMode='contain' style={styles.image} source={{ uri: urls.sq.replace('\\/', '/') }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{flex:4}}>
                            <ActivedOption pgItem={pgItem} />
                        </View>
                    </CardView>
                </Swipeable> )
    };
    const LastItem = () => {
        return ( <CardView cornerRadius={7} style={styles.wrapper} containerStyle={styles.cardContainer}>
                    <View style={{flex:3}}>
                        <SelectPhotos />
                    </View>
                    <View style={{flex:4}}>
                        <SelectOptions />
                    </View>
                </CardView> )
    };
    const ArrItem = isLastItem? LastItem: ListItem;

    return (
        <ArrItem  />
    )
}

const styles = StyleSheet.create({
    wrapper: {
        marginVertical: 5,
        marginHorizontal:15,
        flexDirection:'row',
        minHeight:120,
        padding: 5,
    },
    image: {
        width: '100%',
        height:100,
    },
    textItems:{
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 20,
    },
    title: {
        fontFamily: 'Roboto-Regular',
        fontSize: 10,
        fontWeight: '400',
        lineHeight: 12,
    },
    deleteBox: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: 100,
        height: 80,
    },
    cardContainer: {
        padding: 0, 
        margin: 0, 
        borderWidth: 0,
    },

    plusButton : {
        margin:5,
        flexDirection: 'row',
        width: 21,
        height: 21,
        alignItems: 'center',
        transform: [{ scale: 2 }]
    },
    disabledIcon: {   
        width:'100%',     
        borderWidth: 1,
        borderRadius: 23,
        borderColor: '#979797',
        textAlign: 'center',
        color:'#979797',
    }
});

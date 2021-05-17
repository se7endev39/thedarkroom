import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { shallowEqual, useSelector } from "react-redux";
import { SwitchFull } from 'react-native-switch-full-custom';
import { PGMenuItem } from '../../components/PGMenuItem';
import { PGItem } from '../../components/PGItem';
import { setActivedPrints, setPGData, setPhotoMode } from '../../ducks/main';
import { Button } from '../../components/Button';
import { customBackButtonHeaderProps } from '../../components/BackButton';
import { SharedUtils } from '../../shared';


export default function PrintGift ({route, navigation})
{
    const storeData = route.params.pgData;  
    const lastItem = {"id": 0, "image_urls": "LastItem"};

    const [mainList, setMainList] = useState([]);
    const [printToggle, setPrintToggle] = useState(true);
    const [borderToggle, setBorderToggle] = useState(true);
    const activePrint = useSelector(state => state.main.activedPrints, shallowEqual);

    const menuList = [
        {id: 1, title: 'Prints & Enlargements', price: 0, imageUrl: require('../../assets/prints_gifts_icon1.png')},
        {id: 2, title: 'Canvas Prints', price: 12, imageUrl: require('../../assets/prints_gifts_icon2.png')},
        {id: 3, title: 'Bamboo Block', price: 0.25, imageUrl: require('../../assets/prints_gifts_icon3.png')},
        {id: 4, title: 'HD Aluminum Art', price: 18, imageUrl: require('../../assets/prints_gifts_icon4.png')}
    ];

    useEffect(() => {
        setMainList(storeData);
    }, [storeData]);
    
    /**
     * Add header actions
     */
    useLayoutEffect(() => {
        navigation.setOptions({
            ...customBackButtonHeaderProps('', navigation)
        });
    }, [navigation]);

    const deleteItem = (index) => {
        try{
            const arr = [...mainList]; arr.splice(index, 1);
            setPGData(arr); setMainList(arr);
        }catch(e){ }
    };

    const addPhotoFromAlbums = () => {
        setPhotoMode(true); navigation.navigate("Albums");
    };

    const addPhotoFromLibrary = () => {
        setPhotoMode(true);
        navigation.navigate("PrintSelectPhoto");
    };

    const useForAllPhotos = ( itemPrint, itemMode ) => {
        SharedUtils.Alert.alert('The Darkroom Lab', 'Do you really want to use this option for all photos?',
        [
            {
                text: 'No',
                onPress : () => false
            },
            {
                text: 'Yes',
                onPress: () => {
                    let arrList = [...mainList];
                    let arr = [...mainList]
                    arrList.map((arrItem, index) => {
                        switch (itemMode) {
                            case "Color Print":
                            case "B&W Print":
                                if(arrItem.colorprint){
                                    let qtyValue = arrItem.colorprint.qty ? arrItem.colorprint.qty : 0;
                                    arrItem = {...arrItem, colorprint:{...itemPrint, "qty":qtyValue}};
                                    arr[index] = arrItem;
                                }else{
                                    arrItem = {...arrItem, colorprint:{...itemPrint, "qty":0}};
                                    arr[index] = arrItem;
                                }
                                break;
                            case "Canvas Print":
                                if(arrItem.canvasprint){
                                    let qtyValue = arrItem.canvasprint.qty ? arrItem.canvasprint.qty : 0;
                                    arrItem = {...arrItem, canvasprint:{...itemPrint, "qty":qtyValue}};
                                    arr[index] = arrItem;
                                }else{
                                    arrItem = {...arrItem, canvasprint:{...itemPrint, "qty":0}};
                                    arr[index] = arrItem;
                                }
                                break;
                            case "Bamboo Print":
                                if(arrItem.bambooprint){
                                    let qtyValue = arrItem.bambooprint.qty ? arrItem.bambooprint.qty : 0;
                                    arrItem = {...arrItem, bambooprint:{...itemPrint, "qty":qtyValue}};
                                    arr[index] = arrItem;
                                }else{
                                    arrItem = {...arrItem, bambooprint:{...itemPrint, "qty":0}};
                                    arr[index] = arrItem;
                                }
                                break;
                            case "Aluminum Print":
                                if(arrItem.aluminumprint){
                                    let qtyValue = arrItem.aluminumprint.qty ? arrItem.aluminumprint.qty : 0;
                                    arrItem = {...arrItem, aluminumprint:{...itemPrint, "qty":qtyValue}};
                                    arr[index] = arrItem;
                                }else{
                                    arrItem = {...arrItem, aluminumprint:{...itemPrint, "qty":0}};
                                    arr[index] = arrItem;
                                }
                                break;
                            default:
                                break;
                        }
                    });
                    setPGData(arr); setMainList(arr);
                }
            }
        ], {cancelable: false});
    };

    const duplicateItem = ( item, index ) => {
        SharedUtils.Alert.alert('The Darkroom Lab', 'Do you really want to duplicate item?',
        [
            {
                text: 'No',
                onPress : () => false
            },
            {
                text: 'Yes',
                onPress: () => {
                    const arr = [...mainList]; 
                    arr.splice(index + 1, 0, item);
                    setPGData(arr); setMainList(arr);
                }
            }
        ], {cancelable: false});
    };

    function updateCounter(itemPrint, itemMode, pgItem, pgIndex, value){
        let arr = [...mainList];
        switch (itemMode) {
            case "Color Print":
            case "B&W Print":
                arr[pgIndex] = {...pgItem, colorprint:{...itemPrint, "qty":value}};
                break;
            case "Canvas Print":
                arr[pgIndex] = {...pgItem, canvasprint:{...itemPrint, "qty":value}};
                break;
            case "Bamboo Print":
                arr[pgIndex] = {...pgItem, bambooprint:{...itemPrint, "qty":value}};
                break;
            case "Aluminum Print":
                arr[pgIndex] = {...pgItem, aluminumprint:{...itemPrint, "qty":value}};
                break;
            default:
                break;
        }
        setPGData(arr); setMainList(arr);
    }

    
    return (
        <View style={styles.wrapper}>
            <View style={styles.headerMenu}>
                <FlatList 
                    horizontal={true} 
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator = {false}
                    style={styles.listWrapper} 
                    data={menuList}
                    keyExtractor={item => item.id.toString()} 
                    renderItem={({item}) => <PGMenuItem pgItem={item} onPress={()=>setActivedPrints(item.title)}/>} />
            </View>
            { 
                activePrint == 'Prints & Enlargements' &&
                <View style={{flexDirection:'row', paddingHorizontal:25, paddingVertical:20}}>
                    <View style={{flex:1, flexDirection:'column'}}>
                        <Text>Print Finish</Text>
                        <View style={printToggle?styles.activeStyle:styles.disableStyle}>
                            <SwitchFull
                                value={printToggle}
                                onValueChange={(val) => setPrintToggle(val)}
                                disabled={false}
                                activeText={'Glossy'}
                                activeTextStyle = {styles.btnOuterText}
                                inActiveText={'Matte'}
                                inactiveTextStyle= {styles.btnOuterText}
                                circleSize={80}
                                barHeight={22}
                                circleBorderWidth={0}
                                backgroundActive={'#ffffff'}
                                backgroundInactive={'#ffffff'}
                                circleActiveColor={'#5d5d5d'}
                                circleInActiveColor={'#5d5d5d'}
                                changeValueImmediately={true}
                                renderInsideCircle={() => printToggle?<Text style={styles.btnCircleText}>Matte</Text>:<Text style={styles.btnCircleText}>Glossy</Text>} // custom component to render inside the Switch circle (Text, Image, etc.)
                                changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
                                innerCircleStyle={{ alignItems: "center", justifyContent: "center", borderRadius:8, maxHeight:22}} // style for inner animated circle for what you (may) be rendering inside the circle
                                outerCircleStyle={{ }} // style for outer animated circle
                                renderActiveText={true}
                                renderInActiveText={true}
                                switchWidthMultiplier={1} // multipled by the `circleSize` prop to calculate total width of the Switch
                                switchBorderRadius={8} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
                            />
                        </View>
                    </View>
                    <View style={{flex:1, flexDirection:'column'}}>
                        <Text>Border Options</Text>
                        <View style={borderToggle?styles.activeBorderStyle:styles.disableBorderStyle}>
                            <SwitchFull
                                value={borderToggle}
                                onValueChange={(val) => setBorderToggle(val)}
                                disabled={false}
                                activeText={'Borderless'}
                                activeTextStyle = {styles.btnOuterText}
                                inActiveText={'White Borders'}
                                inactiveTextStyle= {styles.btnOuterText}
                                circleSize={80}
                                barHeight={22}
                                circleBorderWidth={0}
                                backgroundActive={'#ffffff'}
                                backgroundInactive={'#ffffff'}
                                circleActiveColor={'#5d5d5d'}
                                circleInActiveColor={'#5d5d5d'}
                                changeValueImmediately={true}
                                renderInsideCircle={() => borderToggle?<Text style={styles.btnCircleText}>White Borders</Text>:<Text style={styles.btnCircleText}>Borderless</Text>} // custom component to render inside the Switch circle (Text, Image, etc.)
                                changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
                                innerCircleStyle={{ alignItems: "center", justifyContent: "center", borderRadius:8, maxHeight:22}} // style for inner animated circle for what you (may) be rendering inside the circle
                                outerCircleStyle={{ }} // style for outer animated circle
                                renderActiveText={true}
                                renderInActiveText={true}
                                switchWidthMultiplier={1} // multipled by the `circleSize` prop to calculate total width of the Switch
                                switchBorderRadius={8} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
                            />
                        </View>
                    </View>
                </View>
            }
            <FlatList 
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator = {false}
                style={styles.itemWrapper} 
                data={[...mainList, lastItem]} 
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item,index}) => 
                <PGItem 
                    pgIndex = {index} pgItem = {item} 
                    deleteItem = {() => deleteItem(index)} 
                    duplicateItem = {() => duplicateItem(item, index)}
                    useForAllPhotos = { useForAllPhotos }
                    addPrintOptionCrops = {() => activePrint == 'Prints & Enlargements'? navigation.navigate("PrintOptionSelect", { item, index }) : navigation.navigate("GiftOption", { item, index })} 
                    updateCounter = { updateCounter }
                    addPhotoFromAlbums = { addPhotoFromAlbums } 
                    addPhotoFromLibrary = { addPhotoFromLibrary }
                    onPress={() => activePrint == 'Prints & Enlargements'? navigation.navigate("PrintPhotoHandling", {item,index}) : navigation.navigate("GiftOption", { item, index })} />
                } />
            <View style={styles.footer}>
                <Button onPress={() => navigation.navigate("CheckoutReviewOrder")} text={"Add To Cart"} style={styles.cartButton} disabled={false}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'column',
        flex:1
    },
    itemWrapper: {
        width: '100%',
        backgroundColor: '#ffffff',
    },
    listWrapper: {
        width: '100%',
        backgroundColor: '#d1d1d1',
    },
    headerMenu: {
        paddingBottom: 2,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity:  0.75,
        shadowRadius: 2,
        elevation: 2,
    },

    cartButton: {
        alignSelf: 'center', 
        borderRadius: 5,
    },
    footer: {
        justifyContent : 'center',
        flexDirection: 'row',
        alignItems:'flex-end',
        paddingTop: 15,
        paddingBottom: 20,
        paddingLeft: 15,
        paddingRight: 30,
    },

    btnCircleText: {
        color: '#ffffff',
        fontFamily: "Lato-Bold, Lato",
        fontSize: 10,
        fontWeight: '400',
        lineHeight: 12,
        textAlign: 'center',
    },

    btnOuterText: {
        color: '#000000',
        fontFamily: "Lato-Bold, Lato",
        fontSize: 10,
        fontWeight: '400',
        lineHeight: 12,
        textAlign: 'center',
    },

    activeStyle: {
        marginStart:0,
    },
    disableStyle: {
        marginStart:60,
    },

    activeBorderStyle: {
        marginStart:0,
    },
    disableBorderStyle: {
        marginStart:80,
    },
});
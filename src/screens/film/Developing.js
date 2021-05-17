import React, {useState, useEffect, useLayoutEffect} from 'react';
import { View, Text, Image,TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import RadioButtonRN from 'radio-buttons-react-native';
import { CheckBox } from 'react-native-elements'
import FilmHeader from './Header';
import { FilmMenuItem } from '../../components/FilmMenuItem';
import {customBackButtonHeaderProps} from '../../components/BackButton';
import { setActivedFilmTab } from '../../ducks/main';
import { Button } from '../../components/Button';
import MinusButton from '../../components/MinusButton';
import PlusButton from '../../components/PlusButton';


export default function FilmDeveloping ({route, navigation}){
    const filmItem = route.params.filmItem;
    const filmTabList = [
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

    const scanTabList = [
        {id: 1, title: 'Standard Scans', subTitle:'From small prints', uri:require('../../assets/film_scan_icon1.png')},
        {id: 2, title: 'Enhanced Scans +$3', subTitle:'For prints up 11x14', uri:require('../../assets/film_scan_icon2.png')},
        {id: 3, title: 'New! Super Scans +$5', subTitle:'For large prints', uri:require('../../assets/film_scan_icon3.png')},
    ];

    const printTabList = [
        {id: 1, title: 'Standard Scans',  uri:require('../../assets/film_prints_icon1.png')},
        {id: 2, title: 'B&W Silver Halide Prints', uri:require('../../assets/film_prints_icon2.png')},
        {id: 3, title: 'No Prints', uri:require('../../assets/film_prints_icon3.png')},
    ];

    const menuList = [
        {id: 1, title: 'Film', price: 0, imageUrl: require('../../assets/film_home_icon1.png')},
        {id: 2, title: 'Scans', price: 12, imageUrl: require('../../assets/film_scan_icon2.png')},
        {id: 3, title: 'Prints', price: 0.25, imageUrl: require('../../assets/film_prints_menu_icon.png')},
        {id: 4, title: 'Options', price: 18, imageUrl: require('../../assets/film_options_menu_icon.png')}
    ];

    const finishOptions = [{ label: 'Glossy'},{ label: 'Matte'}];
    const borderOptions = [{ label: 'Borderless'},{ label: 'White Border'}];

    const [ page, setPage] = useState('Film');

    /**
     * Add header actions
     */
     useLayoutEffect(() => {
        navigation.setOptions({
            ...customBackButtonHeaderProps('', navigation)
        });
    }, [navigation]);

    // Film Tab Page
    function filmTabPressed(){
        setActivedFilmTab('Scans');
        setPage('Scans');
    }

    const FilmTabItem = ( item ) =>{
        const filmTabItem = item.item;
        return(
            <TouchableOpacity onPress={filmTabPressed} style={styles.filmTab}>
                <Text style = {{alignSelf:'center'}}>{filmTabItem.id}</Text>
            </TouchableOpacity>
        )
    };
    
    const FilmTab = () => {
        return (
            <View style={{flex:1}}>
                <Text style={styles.topTitle}>How many rolls do you have?</Text>
                <View style={styles.tabContainer}>
                    <Image resizeMode='contain' style={styles.image} source={filmItem.uri}></Image>
                    <View style={{flex:1, alignSelf: 'center'}}>
                        <Text style={styles.normalText}>{filmItem.title}</Text>
                        <Text style={styles.priceText}>From ${filmItem.price}</Text>
                    </View>
                </View>
                <FlatList 
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator = {false}
                    style={styles.listWrapper} 
                    data={filmTabList} 
                    keyExtractor={item => item.id.toString()} 
                    renderItem={({item}) => <FilmTabItem item={item} />} />

            </View>
        )
    };

    //Scan page
    function scanTabPressed(){
        setActivedFilmTab('Prints');
        setPage('Prints');
    }

    const ScanTab = () => {
        const fStyle = [styles.spContainer, {borderTopWidth:1, marginTop: 8}];
        return (
            <View style={{flex:1}}>
                <Text style={styles.topTitle}>Scans</Text>
                {
                    scanTabList.map((item, index) =>
                        <TouchableOpacity key={index.toString()} onPress={scanTabPressed} style={item.id == 1 ? fStyle: styles.spContainer}>
                            <Image resizeMode='contain' style={styles.image} source={item.uri}></Image>
                            <View style={{flex:2, alignSelf: 'center'}}>
                                <Text style={styles.titleText}>{item.title}</Text>
                                <Text style={styles.subTitleText}>{item.subTitle}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }
            </View>
        )
    };

    //Prints page
    function printsTabPressed(){
        setActivedFilmTab('Prints');
        setPage('PrintOptions');
    }

    const PrintTab = () => {
        const fStyle = [styles.spContainer, {borderTopWidth:1, marginTop: 8}];
        return (
            <View style={{flex:1}}>
                <Text style={styles.topTitle}>Prints</Text>
                {
                    printTabList.map((item, index) =>
                        <TouchableOpacity key={index.toString()} onPress={printsTabPressed} style={item.id == 1 ? fStyle: styles.spContainer}>
                            <Image resizeMode='contain' style={styles.image} source={item.uri}></Image>
                            <View style={{flex:2, alignSelf: 'center'}}>
                                <Text style={styles.titleText}>{item.title}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }
            </View>
        )
    };

    //PrintOptions page
    function printOptionsTabPressed(){
        setActivedFilmTab('Options');
        setPage('FilmOptions');
    }

    const PrintOptionTab = () => {
        return (
            <View style = {{flex:1, flexDirection:'column'}}>
                <View style = {{ borderBottomWidth: 1, borderColor: '#979797', marginHorizontal:40}}>
                    <Text style={styles.topTitle}>Prints Options</Text>
                </View>
                <View style={[styles.poContainer,{alignItems:'center', flexDirection:'column'}]}>
                    <Text style={styles.titleText}>Quantities per set per roll</Text>
                    <Text style={styles.subTitleText}>1 set is 1 print for every frame on roll</Text>
                    <View style={{flexDirection:'row', marginStart:30, marginVertical:10, alignItems:'center'}}>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <MinusButton />
                            <Text style={[styles.textItems,{paddingHorizontal:5}]}>1</Text>
                            <PlusButton />
                        </View>
                        <Text style={{flex:2, marginLeft:10}}>Large 4” Prints +$6 Per Set</Text>
                    </View>
                    <View style={{flexDirection:'row', marginStart:30, marginBottom:10, alignItems:'center'}}>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <MinusButton />
                            <Text style={[styles.textItems,{paddingHorizontal:5}]}>0</Text>
                            <PlusButton />
                        </View>
                        <Text style={{flex:2, marginLeft:10}}>Large 5” Prints  +$15 Per Set</Text>
                    </View>
                </View>
                <View style={styles.poContainer}>
                    <Text style={{alignSelf:'center'}}>Finish</Text>
                    <View style={{marginStart:30}}>
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
                <View style={styles.poContainer}>
                    <Text style={{alignSelf:'center'}}>Border Options</Text>
                    <View style={{marginStart:30}}>
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
                <TouchableOpacity onPress={printOptionsTabPressed}>
                    <Text style={styles.nextBtn}>Next</Text>
                </TouchableOpacity>
            </View>
        )
    };

    const FilmOptionTab = () => {
        return (
            <View style={{flex:1}}>
                <View style = {{ borderBottomWidth: 1, borderColor: '#979797', marginHorizontal:40}}>
                    <Text style={styles.topTitle}>Options &#38; Custom Processing</Text>
                </View>
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
            </View>
        )
    };

    const onMenuPressed = ( item ) => {
        setActivedFilmTab(item.title);
        switch(item.id){
            case 1:
                setPage('Film');
                break;
            case 2:
                setPage('Scans');
                break;
            case 3:
                setPage('Prints');
                break;
            case 4:
                setPage('FilmOptions');
                break;
        }
    }

    return (
        <View style={{flexDirection:'column', width:'100%', height:'100%'}}>
            <View style={styles.headerMenu}>
                <FlatList 
                    horizontal={true} 
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator = {false}
                    style={styles.headWrapper} 
                    data={menuList} 
                    keyExtractor={item => item.id.toString()} 
                    renderItem={({item}) => <FilmMenuItem filmItem={item} onPress={()=>onMenuPressed(item)}/>} />
            </View>
            { page == 'Film' && <FilmTab /> }
            { page == 'Scans' && <ScanTab /> }
            { page == 'Prints' && <PrintTab /> }
            { page == 'PrintOptions' &&  <PrintOptionTab /> }
            { page == 'FilmOptions' && <FilmOptionTab /> }
        </View>
    )
}

const styles = StyleSheet.create({ 
    // Header layout styles
    headerMenu: {
        width: '100%',
        paddingBottom:2,
    },
    headWrapper : {
        width: '100%',
        backgroundColor: '#d1d1d1',
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity:  0.75,
        shadowRadius: 2,
        elevation: 2,
    },
    // Film page styles
    tabContainer: {
        flexDirection: 'row', 
        marginHorizontal: 50, 
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#979797',
    },
    listWrapper : {
        marginHorizontal: 50,
    },
    filmTab: {
        textAlign:'center', 
        padding: 20, 
        borderBottomWidth: 1, 
        borderColor: '#979797'
    },

    // Scan and Prints page styles
    spContainer: {
        flexDirection: 'row', 
        marginHorizontal: 40, 
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#979797',
    },

    // Print Options page styles
    poContainer: {
        flexDirection: 'column', 
        marginHorizontal: 40, 
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#979797',
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

    // Film Options page styles
    checkboxStyle: {
        margin:0,
        backgroundColor: "#ffffff00",
        paddingHorizontal: 40, 
        elevation:0,
    },

    // Shared styles
    image: {
        flex: 1,
    },
    topTitle: {
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
    titleText: {
        fontFamily: 'Lato-Bold, Lato',
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 19,
    },
    subTitleText: {
        fontFamily: 'Lato-Bold, Lato',
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 18,
    }
});
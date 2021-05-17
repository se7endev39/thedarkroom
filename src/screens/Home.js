import React, {useState, useEffect, useLayoutEffect} from 'react';
import {shallowEqual, useSelector} from "react-redux";
import {
    StyleSheet,
    View,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import SplashScreen from "react-native-splash-screen";
import useAppState from 'react-native-appstate-hook';
import IOSIcon from "react-native-vector-icons/Ionicons";
import { hitSlop } from '../theme';
import { useTheme } from '../theme-manager';
import { processError, useRequest, calcDiffDate } from '../helper';
import { setActivedPrints, setAlbums, setFcmToken, setUncheckedNotificationsCount } from '../ducks/main';
import { Card } from '../components/Card';
import { Order } from '../components/Order';
import PGMenuIcon from '../components/icons/PGMenu';
import FavoritesMenuIcon from '../components/icons/FavoritesMenu';
import FilmIndexMenuIcon from '../components/icons/FilmIndexMenu';
import LightMeterMenuIcon from '../components/icons/LightMeterMenu';


export default function Home ({navigation})
{
    const albums = useSelector(state => state.main.albums, shallowEqual);
    const pgData = useSelector(state => state.main.pgData, shallowEqual);
    const fcmToken = useSelector(state => state.main.fcmToken, shallowEqual);
    const forceAlbumId = useSelector(state => state.main.forceAlbumId, shallowEqual);

    const {request, loading} = useRequest();
    const { mode, theme } = useTheme();
    const { appState } = useAppState({});

    const [randImage1, setRandImage1] = useState('');
    const [randImage2, setRandImage2] = useState('');
    const [randImage3, setRandImage3] = useState('');

    const menuList = [
        {id: 1, title: 'YourAlbums', price: 0, imageUrl: require('../assets/album.png')},
        {id: 2, title: 'Film Developing', price: 12, imageUrl: require('../assets/filmdeveloping.png')},
        {id: 3, title: 'Premium Prints & Enlargements', price: 0.25, imageUrl: require('../assets/ppe1.png')},
        {id: 4, title: 'Tote Bags', price: 18, imageUrl: require('../assets/bag.png')},
        {id: 5, title: 'HD Aluminum Art', price: 29, imageUrl: require('../assets/aluminum.png')},
        {id: 6, title: 'Premium Prints & Enlargements', price: 12, imageUrl: require('../assets/ppe2.png')}
    ];

    /**
     * Set header actions
     */
    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <IOSIcon name="ios-menu" size={30} style={{marginLeft:10,color:"#fff"}}/>
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    /**
     * Hide SplashScreen in case when Albums screen is the first screen user see (when he already signed in)
     */
    useEffect(() => {
        setTimeout(() => SplashScreen.hide(), 50);
    }, []);

    /**
     * Initial albums fetch request
     */
    useEffect(() => {
        getAlbums();
        getShopDetails();
    }, []);

    /**
     * Fetch ans save Firebase Cloud Messaging Token
     */
    useEffect(() => {
        messaging().getToken().then(newFcmToken =>
        {
            setFcmToken(newFcmToken);
            if (true || newFcmToken !== fcmToken)
            {
                saveFcmTokenToProfile(newFcmToken);
            }
        }).catch(e =>
        {
            processError(e, 'Error fetching fcm token');
        });
    }, []);

    /**
     * Save firebase Cloud Messaging Token to FOS profile (to send push notifications)
     */
    async function saveFcmTokenToProfile (newFcmToken)
    {
        try{
            await request('/profile', {method : "PUT", body : JSON.stringify({notificationsToken : newFcmToken})});
        }catch (e){
            processError(e, 'Error saving fcm token to profile');
        }
    }

    /**
     * Open forced album (when user tapped on notification)
     */
    useEffect(() =>
    {
        if (!forceAlbumId){
            return () => false;
        }

        if (albums.length !== 0){
            findAndSelectForceAlbum();
        }else{
            getAlbums();
        }
    }, [forceAlbumId]);

    /**
     * Find forced album and open it
     */
    function findAndSelectForceAlbum ()
    {
        const existingAlbum = albums.find(album => album.id === forceAlbumId);
        if (existingAlbum !== undefined)
        {
            selectAlbum(existingAlbum);
            setForceAlbumId(null);
        }
    }

    /**
     * Fetch unseen alerts count on app reopen
     */
    useEffect(() =>
    {
        if (appState === 'active')
        {
            getNewAlertsCount();
        }
    }, [appState]);

    /**
     * Fetch albums from the API
    */
    async function getShopDetails(){
        try{
            const responses = await request('/shop/products',{method:"GET"});
            responses.map(resp => {
                switch (resp.product_id) {
                    case 3813868:
                    // DVD Option
                        break;
                    case 3690029:
                    // Neck Gaiter
                        break;
                    case 3644722:
                    // The Darkroom Hat
                        break;
                    case 3629361:
                    // 2021 Calendar
                        break;
                    case 3621124:
                    // The Darkroom Tote Bag
                        break;
                    case 3118146:
                    // Film Developing
                        break;
                    case 3083548:
                    // HD Aluminum
                        break;
                    case 3083421:
                    // Canvas Prints
                        break;
                    case 3082996:
                    // Bamboo Blocks
                        break;
                    case 711682:
                    // Prints/Enlargements
                        break;
                    case 633133:
                    // Film Devleoping Only
                        break;
                    case 469172:
                    // FOS Photo Storage Subscription
                        break;
                    case 111934:
                    // Gift Card
                        break;
                    case 7149:
                    // The Darkroom T-Shirt
                        break;
                    case 13:
                    // Sheet Film
                        break;
                    case 12:
                    // Film Scanning, Prints from Negatives and Photo Enlargements
                        break;
                    default:
                        break;
                }
            });
            //console.log(responses);
        }catch(e){
            processError(e, 'Error fetching shop details');
        }
    }

    /**
     * Fetch albums from the API
     */
    async function getAlbums ()
    {
        try
        {
            const responses = await request('/albums');
            const notEmptyAlbums = responses.filter(album => (album.filmsCount + album.imagesCount > 0) && (calcDiffDate(album.date) < 60)); 
            setAlbums(notEmptyAlbums); getRolls(notEmptyAlbums[0]);
            if (forceAlbumId){
                findAndSelectForceAlbum();
            }
        } catch (e){
            processError(e, 'Error fetching albums');
        }
    }

    async function getRolls (itemData)
    {
        try{
            const rolls = await request(`/albums/${itemData.id}/rolls`);
            var fRand1 = albums.length > 0 ? Math.floor(Math.random() * (itemData.filmsCount-1)) + 1 : 0;
            var fRand2 = albums.length > 0 ? Math.floor(Math.random() * (itemData.filmsCount-1)) + 1 : 0;
            var fRand3 = albums.length > 0 ? Math.floor(Math.random() * (itemData.filmsCount-1)) + 1 : 0;    
            var len1 = rolls[fRand1].images.length;
            var len2 = rolls[fRand2].images.length;
            var len3 = rolls[fRand3].images.length;

            var rRand1 = Math.floor(Math.random() * (len1-1)) + 1;
            var rRand2 = Math.floor(Math.random() * (len2-1)) + 1;
            var rRand3 = Math.floor(Math.random() * (len3-1)) + 1;

            setRandImage1(rolls[fRand1].images[rRand1].image_urls.sq);
            setRandImage2(rolls[fRand2].images[rRand2].image_urls.sq);
            setRandImage3(rolls[fRand3].images[rRand3].image_urls.sq);
        }
        catch (e)
        {
            processError(e, `Error fetching album ${itemData.id} rolls`); 
        }
    }

    /**
     * Fetch unseen alerts count (to show it on Notifications badge)
     */
    async function getNewAlertsCount ()
    {
        try
        {
            const uncheckedNotificationCount = await request('/notifications/unseen');
            setUncheckedNotificationsCount(uncheckedNotificationCount);
        }
        catch (e)
        {
            processError(e, 'Error fetching unseen alerts count');
        }
    }
    
    /**
     * Open screens (when user taps on it)
    */
    function toNavigate(item){
        switch(item.id){
            case 2:
                navigation.navigate('FilmHome');
                break;
            case 3:
            case 6:
                setActivedPrints('Prints & Enlargements');
                navigation.navigate('PrintGift', { pgData });
                break;
            case 4:
                navigation.navigate('ShopHome');
                break;
            case 5:
                setActivedPrints('HD Aluminum Art');
                navigation.navigate('PrintGift', { pgData });
                break;
        }
    }

    return (
        <View style={[styles.wrapper, {backgroundColor : theme.backgroundColor}]}>
            {
                loading && <ActivityIndicator style={styles.loader} size="large" color={theme.primaryText} />
            }
            {
                !loading &&
                <FlatList  showsVerticalScrollIndicator={false} 
                        style={styles.listWrapper} 
                        data={menuList} 
                        keyExtractor={item => item.id.toString()} 
                        renderItem={({item}) => item.id == 1?<Order card={item} rand1={randImage1} rand2={randImage2} rand3={randImage3} onPress={() => navigation.navigate("Albums")} />:<Card card={item} onPress={() => toNavigate(item)}/>}/>
            }
            { 
                !loading &&
                <View style={[styles.footer, {backgroundColor : mode === 'light' ? '#5e5e5e' : '#000000'}]}>
                    <TouchableOpacity hitSlop={hitSlop}>
                        <FavoritesMenuIcon />
                    </TouchableOpacity>
                    <TouchableOpacity hitSlop={hitSlop}>
                        <FilmIndexMenuIcon />
                    </TouchableOpacity>
                    <TouchableOpacity hitSlop={hitSlop}>
                        <LightMeterMenuIcon />
                    </TouchableOpacity>
                    <TouchableOpacity hitSlop={hitSlop} onPress={()=>navigation.navigate('PrintGift', { pgData })}>
                        <PGMenuIcon />
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper : {
        flex: 1,
        width: '100%'
    },
    listWrapper : {
        width: '100%'
    },
    footer : {
        justifyContent : 'space-between',
        flexDirection: 'row',
        alignItems:'flex-end',
        paddingTop: 20,
        paddingBottom: 30,
        paddingLeft: 15,
        paddingRight: 30,
    },
    loader : {
        position : 'absolute',
        top: '50%',
        left: '50%',
        marginLeft: -20,
        marginTop: -20
    }
});
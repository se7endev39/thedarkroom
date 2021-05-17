import React, { useEffect, useState } from 'react';
import Orientation from 'react-native-orientation';
import * as PushNotification from 'react-native-push-notification';
import {shallowEqual, useSelector} from 'react-redux';
import { ImageBackground, View, Text, StyleSheet } from "react-native";

import analytics from '@react-native-firebase/analytics';
import messaging from '@react-native-firebase/messaging';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import {
    setToken,
    setFcmToken,
    setForceAlbumId,
    setForceRollId,
    setOrientation,
} from './ducks/main';

import {processError, useRequest} from './helper';

import {setBadge} from './notifictions';

import Home from './screens/Home';
import SignIn from './screens/SignIn';
import Albums from './screens/Albums';
import Profile from './screens/Profile';
import EditAlbum from './screens/EditAlbum';
import AlbumRolls from './screens/AlbumRolls';
import RollImages from './screens/RollImages';
import ImageDetail from './screens/ImageDetail';
import Notifications from './screens/Notifications';

import ShopHome from './screens/shop/Home';
import ShopDetails from './screens/shop/Details';

import GiftOption from './screens/print/Option'
import PrintGift from './screens/print/PrintGift';
import PrintSelectPhoto from './screens/print/SelectPhoto';
import PrintOptionSelect from './screens/print/OptionSelect';
import PrintPhotoHandling from './screens/print/PhotoHandling';

import FilmHome from './screens/film/Home';
import FilmDeveloping from './screens/film/Developing';

import PhotoStorageHome from './screens/photostorage/Home';

import CheckoutAddPayment from './screens/checkout/AddPayment';
import CheckoutReviewOrder from './screens/checkout/ReviewOrder';
import CheckoutCompleteOrder from './screens/checkout/CompleteOrder';
import CheckoutOrderComplete from './screens/checkout/OrderComplete';
import CheckoutShippingAddress from './screens/checkout/ShippingAddress';

import {TdrLogo} from './components/TdrLogo';
import {FosLogo} from './components/FosLogo';
import {ImageHeader} from './components/ImageHeader';
import {ToggleThemeButton} from './components/ToggleThemeButton';

import PhotoMenuIcon from './components/icons/PhotoMenu';
import AlertMenuIcon from './components/icons/AlertMenu';
import ProfileMenuIcon from './components/icons/ProfileMenu';
import DownloadMenuIcon from './components/icons/DownloadMenu';
import NotificationMenuIcon from './components/icons/NotificationMenu';

const orderStyle = {
    headerStyle : {
        backgroundColor: 'transparent'
    },
    headerTitleStyle: {
        color: '#fff',
        alignSelf: 'center',
        marginRight: 40
    },
    headerBackTitleStyle : {color: '#fff'},
    header: (props) => <ImageHeader {...props} />,
};

const printStyle = {
    headerStyle : {
        backgroundColor: '#fff',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
    },
    headerTitleStyle: {
        color: '#000',
        alignSelf: 'center',
        marginRight: 40,
    },
    headerBackTitleStyle : {color: '#000'},
};

const headerStyle = {
    headerStyle : {
        backgroundColor: 'transparent'
    },
    headerTitleStyle: {
        color: '#fff',
        alignSelf: 'center'
    },
    headerBackTitleStyle : {color: '#fff'},
    header: (props) => <ImageHeader {...props} />,
};

function CustomDrawerContent({ navigation }) {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const {request} = useRequest();
    /**
     * Fetch profile data on screen open
     */
    useEffect(() => {
        getProfile();
    }, []);

    /**
     * Fetch profile data from the API
     */
    async function getProfile ()
    {
        try
        {
            const profile = await request('/profile');
            setPhoneNumber(profile.phoneNumber);
            setEmail(profile.email);
        }
        catch (e)
        {
            processError(e, 'Error fetching profile data');
        }
    }

    return (
        <ImageBackground source={require('./assets/menu_background.png')} style={{ width: '100%', height: '100%'}}>
            <View style={styles.containerMenu}>
                <View style={styles.innerMenu}>
                    <View style={{flexDirection:'column', width:'100%'}}>
                        <View style={styles.menuIcon}>
                            <View style={{flex:1}}><ProfileMenuIcon/></View>
                            <View style={{flex:6}}>
                                <Text>{email}</Text>
                                <Text>{phoneNumber}</Text>
                            </View>
                        </View>
                        <View style={styles.menuIcon} onStartShouldSetResponder={() => navigation.navigate("Notifications")}>
                            <View style={{flex:1}}><NotificationMenuIcon/></View>
                            <Text style={{flex:5}}>Notification Settings</Text>
                            <View style={{flex:1}}><Text style={{width:21, height:21,borderRadius:12,lineHeight:21, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.8, shadowRadius: 2, elevation:5, backgroundColor:'#f6ae4e', textAlign:'center', textAlignVertical:'center'}}>&#8212;</Text></View>
                        </View>
                        <View style={styles.menuIcon}>
                            <View style={{flex:1}}><DownloadMenuIcon/></View>
                            <Text style={{flex:5}}>Downloads</Text>
                            <View style={{flex:1}}><Text style={{width:21, height:21,lineHeight:21,borderRadius:12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.8, shadowRadius: 2, elevation:5, backgroundColor:'#fcd000', textAlign:'center', textAlignVertical:'center'}}>5</Text></View>
                        </View>
                        <View style={styles.menuIcon}>
                            <View style={{flex:1}}><AlertMenuIcon/></View>
                            <Text style={{flex:5}}>Alerts</Text>
                            <View style={{flex:1}}><Text style={{width:21, height:21,borderRadius:12,lineHeight:21, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.8, shadowRadius: 2, elevation:5, backgroundColor:'#fcd000', textAlign:'center', textAlignVertical:'center'}}>3</Text></View>
                        </View>
                        <View style={styles.menuIcon} onStartShouldSetResponder={() => navigation.navigate("PhotoStorageHome")}>
                            <View style={{flex:1}}><PhotoMenuIcon/></View>
                            <Text style={{flex:5}}>Photo Storage</Text>
                            <View style={{flex:1}}><Text style={{width:21, height:21,borderRadius:12,lineHeight:21, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.8, shadowRadius: 2, elevation:5, backgroundColor:'#6dff6a', textAlign:'center', textAlignVertical:'center'}}>&#10003;</Text></View>
                        </View>
                        <View style={{flexDirection:'column', width:'100%', paddingStart:'15%', paddingEnd:'12%',paddingTop:10}}>
                            <Text style={{textAlign:'center',color: '#ff0000'}}>
                                Dev Note - Subscriptions link to website
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{flexDirection:'column', width:'100%', alignItems:'center'}}>
                    <ToggleThemeButton/>
                    <Text
                        onPress={() => {
                            navigation.navigate('Main');
                            navigation.replace('SignIn');
                            setToken(null);
                            setFcmToken(null);
                        }}
                        style={{fontSize: 16, color: "#000", paddingTop:20}}>
                        Logout
                    </Text>
                    <Text
                        onPress={() => {}}
                        style={{fontSize: 16, color: "#000", paddingTop:20}}>
                        Contact
                    </Text>
                    <Text
                        onPress={() => {}}
                        style={{fontSize: 16, color: "#000", paddingTop:20}}>
                        Terms of Service
                    </Text>
                </View>
            </View>
        </ImageBackground>
    );
}

const HomeStack = createStackNavigator();
const MainStack = createStackNavigator();
const RootStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator initialRouteName='Home' headerMode="screen" >
            <HomeStack.Screen name="Home" component={Home} options={{...headerStyle, headerTitleStyle:{ color: '#fff', alignSelf: 'center', marginRight:40 }, headerTitle : <TdrLogo/>}}/>
        </HomeStack.Navigator>
    )
};
const DrawerScreen = () => {
    return (
        <Drawer.Navigator drawerStyle={{backgroundColor: '#ffffff00'}} drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="AlbumScreen" component={HomeStackScreen} />
        </Drawer.Navigator>
    )
};
const MainStackScreen = () => {
    const token = useSelector(state => state.main.token, shallowEqual);
    return (
        <MainStack.Navigator initialRouteName={token ? 'DrawerScreen' : 'SignIn'} headerMode="screen" >
            <MainStack.Screen name="DrawerScreen" component={DrawerScreen} options={{ headerShown: false }}/>
            <MainStack.Screen name="SignIn" component={SignIn} options={{...headerStyle, headerTitle : <TdrLogo/>}}/>
            <MainStack.Screen name="Albums" component={Albums} options={{...orderStyle, headerTitle : <FosLogo/>}}/>
            <MainStack.Screen name="AlbumRolls" component={AlbumRolls} options={{...headerStyle, headerTitle : <FosLogo/>}}/>
            <MainStack.Screen name="EditAlbum" component={EditAlbum} options={{...headerStyle, headerTitle : 'Edit'}}/>
            <MainStack.Screen name="ShopHome" component={ShopHome} options={{...orderStyle, headerTitle : 'Shop'}}/>
            <MainStack.Screen name="ShopDetails" component={ShopDetails} options={{...orderStyle, headerTitle : 'Shop Details'}}/>
            <MainStack.Screen name="FilmHome" component={FilmHome} options={{...orderStyle, headerTitle : 'Film Developing'}}/>
            <MainStack.Screen name="FilmDeveloping" component={FilmDeveloping} options={{...orderStyle, headerTitle : 'Film Developing'}}/>
            <MainStack.Screen name="CheckoutReviewOrder" component={CheckoutReviewOrder} options={{...printStyle, headerTitle : 'Review Order'}}/>
            <MainStack.Screen name="CheckoutAddPayment" component={CheckoutAddPayment} options={{...printStyle, headerTitle : 'Add Payment'}}/>
            <MainStack.Screen name="CheckoutCompleteOrder" component={CheckoutCompleteOrder} options={{...printStyle, headerTitle : 'Complete Order'}}/>
            <MainStack.Screen name="CheckoutOrderComplete" component={CheckoutOrderComplete} options={{ headerShown: false }}/>
            <MainStack.Screen name="CheckoutShippingAddress" component={CheckoutShippingAddress} options={{...printStyle, headerTitle : 'Shipping Address'}}/>
            <MainStack.Screen name="PhotoStorageHome" component={PhotoStorageHome} options={{...orderStyle, headerTitle : 'Photo Storage'}}/>
            <MainStack.Screen name="GiftOption" component={GiftOption} options={{...orderStyle, headerTitle : 'Prints and Gifts'}}/>
            <MainStack.Screen name="PrintGift" component={PrintGift} options={{...orderStyle, headerTitle : 'Prints and Gifts'}}/>
            <MainStack.Screen name="PrintSelectPhoto" component={PrintSelectPhoto} options={{...orderStyle, headerTitle : 'Select Photos'}}/>
            <MainStack.Screen name="PrintOptionSelect" component={PrintOptionSelect} options={{...printStyle, headerTitle : ''}}/>
            <MainStack.Screen name="PrintPhotoHandling" component={PrintPhotoHandling} options={{...printStyle, headerTitle : ''}}/> 
            <MainStack.Screen name="RollImages" component={RollImages} options={{...headerStyle, headerTitle : <FosLogo/>}}/>
            <MainStack.Screen name="ImageDetail" component={ImageDetail} options={{...headerStyle, headerTitle : <FosLogo/>}}/>
        </MainStack.Navigator>
    )
};

export default ({}) => {
    const routeNameRef = React.useRef();
    const navigationRef = React.useRef();

    /**
     * Screen reporting for firebase analytics
     */
    function onStateChange (state)
    {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;

        if (previousRouteName !== currentRouteName)
        {
            analytics().logScreenView({
                   screen_class: currentRouteName,
                   screen_name: currentRouteName,
                 });
        }

        // Save the current route name for later comparision
        routeNameRef.current = currentRouteName;
    }

    /**
     * Set initial orientation
     */
    useEffect(() =>
    {
        setOrientation(Orientation.getInitialOrientation());
    }, []);

    /**
     * Listener for orientation change
     */
    useEffect(() =>
    {
        Orientation.addOrientationListener(_orientationDidChange);

        return () =>
        {
            Orientation.removeOrientationListener(_orientationDidChange);
        };
    }, []);

    function _orientationDidChange (orientation)
    {
        setOrientation(orientation);
    }

    /**
     * Display foreground notification
     */
    useEffect(() => {

        const unsubscribe = messaging().onMessage(async foregroundNotification => {

            console.log('==================================== FOREGROUND onMessage ==================================== ', JSON.stringify(foregroundNotification));

            let data = {...(foregroundNotification.data || {}), ...foregroundNotification, ...foregroundNotification.notification};

            PushNotification.localNotification({
                title: foregroundNotification.notification.title,
                message: foregroundNotification.notification.body,
                data : foregroundNotification
            });

            if (data.badge)
            {
                setBadge(data.badge);
            }
        });

        return unsubscribe;
    }, []);

    /**
     * Display background notification
     */
    useEffect(() => {

        const unsubscribe = messaging().setBackgroundMessageHandler(async backgroundNotification => {

            console.log('==================================== BACKGROUND onMessage ==================================== ' + JSON.stringify(backgroundNotification));

            const data = {...(backgroundNotification.data || {}), ...backgroundNotification};

            if (data.badge)
            {
                setBadge(data.badge);
            }
        });

        return unsubscribe;
    }, []);

    /**
     * Called when user tap on FOREGROUND notification
     */
    useEffect(() => {

        const unsubscribe = messaging().onNotificationOpenedApp(backgroundNotification => {

            let data = {...(backgroundNotification.data || {}), ...backgroundNotification},
                albumId = data.albumId,
                rollId = data.rollId;

            if (albumId === undefined || rollId === undefined)
            {
                return;
            }

            setForceAlbumId(+albumId);
            setForceRollId(+rollId);

            console.log('==================================== BACKGROUND onMessageOpen ==================================== ' + JSON.stringify(backgroundNotification));
        });

        return unsubscribe;
    }, []);

    return (
        <React.Fragment>
            <NavigationContainer ref={navigationRef} onReady={() => routeNameRef.current = navigationRef.current.getCurrentRoute().name} onStateChange={onStateChange}>
                <RootStack.Navigator initialRouteName="Main" mode="modal">
                    <RootStack.Screen name="Main" component={MainStackScreen} options={{ headerShown: false }}/>
                    <RootStack.Screen name="Notifications" component={Notifications} options={({ navigation, route }) => ({...headerStyle, headerLeft : null})}/>
                    <RootStack.Screen name="Profile" component={Profile} options={({ navigation, route }) => ({...headerStyle, headerLeft : null})}/>
                </RootStack.Navigator>
            </NavigationContainer>
        </React.Fragment>
    )
};

const styles = StyleSheet.create({
    containerMenu: {
        flexDirection:'column', 
        alignItems: 'flex-start', 
        justifyContent:'space-between',
        width:'100%', 
        height:'100%',
        paddingTop: 50,
        paddingBottom: 40
    },
    innerMenu: {
        flexDirection:'column', 
        width:'100%', 
        paddingStart: 20
    },
    menuIcon: {
        flexDirection:'row', 
        width:'100%',
        paddingTop:15,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
    },
  });
  
import React, {useEffect, useRef, useState} from 'react';
import {
    ImageBackground,
    Text,
    StyleSheet,
    View,
    Platform,
    KeyboardAvoidingView,
    TouchableOpacity, TextInput,
} from 'react-native';
import SplashScreen from "react-native-splash-screen";
import LinearGradient from 'react-native-linear-gradient';

import {processError, useRequest} from '../helper';
import {setToken} from '../ducks/main';
import {BestLabSeal, OrderPromo, YearsOfQuality} from '../components/icons';
import {openUrl, SharedUtils} from '../shared';
import BottomSheet from 'reanimated-bottom-sheet'
import {SheetHeader} from '../components/SheetHeader';
import {SheetBody} from '../components/SheetBody';
import analytics from '@react-native-firebase/analytics';
import * as DeviceInfo from 'react-native-device-info';

export default function SignIn ({navigation})
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const passwordInput = useRef();
    const bottomSheetEl = useRef();
    const {request, loading} = useRequest();

    /**
     * Hide SplashScreen in case when SignIn screen is the first screen user see
     */
    useEffect(() =>
    {
        setTimeout(() => SplashScreen.hide(), 50);
    }, []);

    /**
     * Sign in user
     */
    async function submit ()
    {
        if (email === '' || password === '')
        {
            return ;
        }

        try
        {
            const deviceId = Platform.OS + ' ' + DeviceInfo.getUniqueId();
            const token = await request(`/auth/signIn`, {withAuth : false, method : "POST", body : JSON.stringify({email, password, device_name : deviceId})});
            setToken(token);
            navigation.replace('DrawerScreen');
            analytics().logEvent('signIn', {email});
        }
        catch (e)
        {
            processError(e, 'Auth error');
            SharedUtils.Alert.alert('The Darkroom Lab', 'Incorrect username or password',
                [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                {cancelable: false});
        }
    }

    function openForgotPasswordPage ()
    {
        openUrl('https://thedarkroom.com/shop/my-account/lost-password/');
    }

    function openRegistrationSheet ()
    {
        bottomSheetEl.current.snapTo(1);
    }

    function renderBottomSheetHeader()
    {
        return <SheetHeader title="Register" onPress={() => bottomSheetEl.current.snapTo(0)}/>;
    }

    function renderBottomSheetContent ()
    {
        return (
            <SheetBody>
                <Text style={[styles.firstLine, styles.text]}>This application is a gallery for customers that have placed and order.</Text>
                <Text style={styles.text}>
                    If you don't have an account, you can register at <Text onPress={() => openUrl('https://thedarkroom.com')} style={styles.linkInText}>thedarkroom.com</Text>
                </Text>
                <View style={styles.registerIconWrapper}>
                    <OrderPromo/>
                </View>
            </SheetBody>
        );
    }

    function renderBullet (text1, text2)
    {
        return (
            <View style={styles.bullet}>
                {
                    text1 === '40+ Years of Quality' ? <YearsOfQuality style={styles.bulletIcon}/> : <BestLabSeal style={styles.bulletIcon}/>
                }
                <Text style={styles.bulletText}>{text1}</Text>
                <Text style={styles.bulletText}>{text2}</Text>
            </View>
        );
    }

    return (
        <React.Fragment>
            <LinearGradient colors={['#474042', '#000']} style={styles.gradient}>
                <ImageBackground source={require('../assets/textured_background.png')} style={styles.image}>
                    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={styles.wrapper}>
                        <View></View>
                        <View style={styles.buttonsWrapper}>
                            <Text style={styles.header}>Login</Text>

                            <TextInput style={styles.input}
                                       onSubmitEditing={() => { passwordInput.current.focus(); }}
                                       blurOnSubmit={false}
                                       placeholderTextColor="#fff"
                                       textContentType="emailAddress"
                                       keyboardType="email-address"
                                       returnKeyType="next"
                                       onChangeText={setEmail}
                                       autoCapitalize='none'
                                       textAlign={'center'}
                                       placeholder={"Username or email address"}/>

                            <TextInput style={styles.input}
                                       onSubmitEditing={submit}
                                       ref={passwordInput}
                                       placeholderTextColor="#fff"
                                       textContentType="password"
                                       returnKeyType="done"
                                       onChangeText={setPassword}
                                       secureTextEntry={true}
                                       autoCapitalize = 'none'
                                       textAlign={'center'}
                                       placeholder={"Password"}/>


                                <LinearGradient colors={['#fa8e01', '#fcc801']} style={[styles.buttonWrapper, {opacity : loading ? 0.7 : 1}]}>
                                    <TouchableOpacity onPress={submit} style={styles.button}>
                                        <Text style={styles.buttonText}>{loading ? 'Wait...' : 'Submit'}</Text>
                                    </TouchableOpacity>
                                </LinearGradient>

                               <TouchableOpacity onPress={openForgotPasswordPage} style={styles.link}>
                                   <Text style={styles.linkText}>Forgot Password</Text>
                               </TouchableOpacity>

                                <TouchableOpacity onPress={openRegistrationSheet} style={styles.link}>
                                    <Text style={styles.linkText}>Don't have an account?</Text>
                                </TouchableOpacity>
                        </View>

                        <View style={styles.bulletsWrapper}>
                            {renderBullet('40+ Years of Quality', 'Photo Developing')}
                            {renderBullet('Voted Best Photo Lab', 'In an Independent User Poll')}
                        </View>
                    </KeyboardAvoidingView>
                </ImageBackground>
            </LinearGradient>
            <BottomSheet
                ref={bottomSheetEl}
                initialSnap={0}
                snapPoints={[0, 400]}
                renderContent={renderBottomSheetContent}
                renderHeader={renderBottomSheetHeader}
            />
        </React.Fragment>
    )
}


const styles = StyleSheet.create({
    wrapper : {
        flex: 1,
        resizeMode: "cover",
        justifyContent: 'space-between'
    },
    gradient : {
        flex: 1
    },
    image: {
        flex: 1,
    },
    buttonsWrapper : {
        alignItems : 'center',
        marginTop: 50,
        width: '100%',
        paddingHorizontal: 20
    },
    header : {
        color: 'white',
        fontSize: 24,
        marginBottom: 20
    },
    bulletsWrapper : {
        flexDirection : 'row',
        justifyContent: 'space-between',
        paddingHorizontal : 20
    },
    bullet : {
        alignItems : 'center',
        marginBottom: 30
    },
    bulletText : {
        color: '#999',
        fontSize: 12
    },
    bulletIcon : {
        marginBottom : 15,
        transform: [{ scale: 1.2 }]
    },
    input : {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 20,
        fontSize: 18,
        backgroundColor : '#00000050',
        borderWidth: 1,
        borderColor: '#999',
        marginBottom: 10,
        color: '#fff'
    },
    link : {
        marginTop: 25
    },
    linkText : {
        color: '#3e9d99',
        fontSize: 16
    },
    firstLine : {
        marginBottom: 15
    },
    text : {
        fontSize: 16,
        color: '#97989a'
    },
    linkInText : {
        color: '#3e9d99',
    },
    registerIconWrapper : {
        alignItems : 'center',
        marginTop: 30
    },
    buttonWrapper : {
        marginTop: 15
    },
    button : {
        flexDirection : 'row',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal : 35,
    },
    buttonText : {
        color: '#000',
        fontSize: 24,
        fontWeight : "600"
    },
    arrowIcon : {
        transform: [{ rotate: '180deg'}],
        width : 12,
        aspectRatio : 0.764,
        marginTop: 5
    }
});

import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
    Text,
    StyleSheet,
    FlatList,
    View,
    TouchableOpacity,
    Switch,
    Platform, KeyboardAvoidingView, Keyboard,
} from 'react-native';
import {processError, useRequest} from '../helper';
import HeaderButton from '../components/HeaderButton';
import Separator from '../components/Separator';
import BottomSheet from 'reanimated-bottom-sheet';
import {SheetHeader} from '../components/SheetHeader';
import {SheetBody} from '../components/SheetBody';
import {useTheme} from '../theme-manager';
import Back from '../components/icons/Back';
import {setFcmToken, setToken} from '../ducks/main';
import { TextInputMask } from 'react-native-masked-text'
import {LineInput} from '../components/LineInput';
import {openUrl, SharedUtils} from '../shared';
import {shallowEqual, useSelector} from 'react-redux';

export default function Profile ({navigation})
{
    const fcmToken = useSelector(state => state.main.fcmToken, shallowEqual);

    const [phoneNumberChanged, setPhoneNumberChanged] = useState(false);

    const [smsEnabled, setSmsEnabled] = useState(false);
    const [initialSmsEnabled, setInitialSmsEnabled] = useState(false);

    const [phoneNumber, setPhoneNumber] = useState('');
    const [initialPhoneNumber, setInitialPhoneNumber] = useState('');

    const [email, setEmail] = useState('');

    const {request} = useRequest();
    const bottomSheetEl = useRef();
    const [bottomSheetMode, setBottomSheetMode] = useState('SETTINGS');

    const { theme } = useTheme();

    /**
     * Set header actions
     */
    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft : () => <View></View>,
            headerRight: () => (
                <HeaderButton text="Done" onPress={() => navigation.goBack()}/>
            ),
        });
    }, [navigation]);

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
            setSmsEnabled(profile.smsEnabled);
            setInitialSmsEnabled(profile.smsEnabled);
            setPhoneNumber(profile.phoneNumber);
            setInitialPhoneNumber(profile.phoneNumber);
            setEmail(profile.email);
        }
        catch (e)
        {
            processError(e, 'Error fetching profile data');
        }
    }

    /**
     * Update profile on Save button press (save smsEnabled & phoneNumber & Firebase cloud messaging token)
     */
    async function updateProfile ()
    {
        try
        {
            let updates = {smsEnabled, phoneNumber};
            if (fcmToken)
            {
                updates.notificationsToken = fcmToken;
            }

            await request('/profile', {method : "PUT", body : JSON.stringify(updates)});
        }
        catch (e)
        {
            processError(e, 'Error saving profile data');
        }
    }

    function renderItem ({item})
    {
        return (
            <React.Fragment>
                <TouchableOpacity onPress={item.action} style={styles.item}>
                    <Text style={[styles.text, {color: theme.primaryText}]}>{item.text}</Text>
                    <Back style={styles.arrow}/>
                </TouchableOpacity>
                <Separator/>
            </React.Fragment>
        );
    }

    function openSettingsSheet ()
    {
        setPhoneNumberChanged(false);
        setBottomSheetMode('SETTINGS');
        bottomSheetEl.current.snapTo(1);
    }

    function openAccountSheet ()
    {
        setBottomSheetMode('ACCOUNT');
        bottomSheetEl.current.snapTo(1);
    }

    function logout ()
    {
        navigation.navigate('Main');
        navigation.replace('SignIn');
        setToken(null);
        setFcmToken(null);
    }

    function closeBottomSheet ()
    {
        bottomSheetEl.current.snapTo(0);
        Keyboard.dismiss();
        if (bottomSheetMode !== 'SETTINGS' || initialSmsEnabled === smsEnabled && initialPhoneNumber === phoneNumber)
        {
            return;
        }

        console.log(initialSmsEnabled, smsEnabled, initialPhoneNumber, phoneNumber);
        updateProfile();
    }

    function renderHeader()
    {
        return <SheetHeader title={bottomSheetMode === 'SETTINGS' ? 'Settings' : 'Account Details'} onPress={closeBottomSheet}/>;
    }

    function checkPhoneNumber (phoneNumber) {
        setPhoneNumberChanged(!phoneNumber.match(/\d{3}-\d{3}-\d{4}/));
    }

    function onPhoneNumberChange (newPhoneNumber)
    {
        setPhoneNumber(newPhoneNumber);
        if (phoneNumberChanged)
        {
            checkPhoneNumber(newPhoneNumber);
        }
    }

    function renderSettingsContent ()
    {
        return (
            <SheetBody>
                <TouchableOpacity onPress={() => setSmsEnabled(!smsEnabled)} style={styles.switchWrapper}>
                    <Switch
                        style={styles.switch}
                        trackColor={{ false: "#999", true: "rgba(33,183,153,0.32)" }}
                        thumbColor={smsEnabled ? "#42ada8" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={setSmsEnabled}
                        value={smsEnabled}
                    />
                    <Text style={styles.switchLabel}>SMS Notification</Text>
                </TouchableOpacity>

                <View style={styles.inputWrapper}>
                    <Text style={styles.inputLabel}>
                        Phone number
                    </Text>
                    <TextInputMask
                        style={[styles.input, phoneNumberChanged ? {borderColor: 'red'} : {}]}
                        type={'custom'}
                        onBlur={() => checkPhoneNumber(phoneNumber)}
                        returnKeyType="done"
                        autoCapitalize='none'
                        placeholder="555-555-5555"
                        options={{mask: '999-999-9999'}}
                        value={phoneNumber}
                        onChangeText={onPhoneNumberChange}
                    />
                    {
                        phoneNumberChanged &&
                        <Text style={styles.phoneError}>
                            Format should be 555-555-5555. Phone will not be saved.
                        </Text>
                    }
                </View>

            </SheetBody>
        );
    }

    function renderAccountContent ()
    {
        return (
            <SheetBody style={{paddingHorizontal: 0}}>
                <LineInput labelWidth={120}
                           disabled={true}
                           forceMode="light"
                           textMode={true}
                           style={styles.accountInput}
                           title="Email address"
                           value={email}
                           onChange={() => false}/>
                <LineInput labelWidth={120}
                           disabled={true}
                           forceMode="light"
                           style={styles.accountInput}
                           title="Phone number"
                           value={phoneNumber}
                           onChange={() => false}/>
            </SheetBody>
        );
    }

    function askBeforeOpenTerms ()
    {
        SharedUtils.Alert.alert(
            'The Darkroom Lab',
            'You will be redirected to TheDarkroom.com website.',
            [{
                text: 'Cancel',
                onPress : () => false
            }, {text: 'OK', onPress: () => openUrl('https://thedarkroom.com/terms/')}],
            {cancelable: false},
        );
    }
    const items = [
        {
            text : 'Notifications',
            action : openSettingsSheet,
        },
        {
            text : 'Account details',
            action : openAccountSheet,
        },
        {
            text : 'Terms of Service',
            action : askBeforeOpenTerms,
        },
        {
            text : 'Logout',
            action : logout,
        }
    ];

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={{ flex: 1 }}>
            <View style={[styles.wrapper, {backgroundColor: theme.backgroundColor}]}>
                <FlatList data={items} keyExtractor={item => item.text} renderItem={renderItem}></FlatList>
            </View>
            <BottomSheet
                ref={bottomSheetEl}
                initialSnap={0}
                snapPoints={[0, 400]}
                renderContent={bottomSheetMode === 'SETTINGS' ? renderSettingsContent : renderAccountContent}
                renderHeader={renderHeader}
            />
        </KeyboardAvoidingView>
    )
}


const styles = StyleSheet.create({
    wrapper : {
        backgroundColor : '#403a3b',
        flex: 1,
        width: '100%',
        paddingTop: 15
    },
    item : {
        flexDirection : 'row',
        justifyContent: 'space-between',
        paddingVertical : 5,
        paddingHorizontal: 15
    },
    text : {
        color: '#fff',
        fontSize: 18
    },
    arrow : {
        transform: [{rotate : "180deg"}],
        marginTop: 4
    },
    switchWrapper : {
        flexDirection: 'row',
        marginTop: 20
    },
    switch : {
        transform : [{scale : Platform.OS === 'ios' ? 1 : 1.5}],
        marginRight: 15,
        marginLeft: 10
    },
    switchLabel : {
        fontSize: 18
    },
    inputWrapper : {
        marginTop: 30
    },
    inputLabel : {
        fontSize: 16,
        marginBottom: 5
    },
    input : {
        width: '100%',
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 18,
        borderWidth: 2,
        borderColor: '#4893fb',
        marginBottom: 10,
        color: '#000'
    },
    accountInput : {
        marginTop: 25
    },
    phoneError : {
        fontSize: 12,
        color: 'red'
    }
});

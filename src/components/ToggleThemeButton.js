import React from 'react';
import {StyleSheet} from 'react-native';
import {useTheme} from '../theme-manager';
import Toggle from 'react-native-toggle-element';
import ToggleThemeLight from './icons/ToggleThemeLight';
import ToggleThemeDark from './icons/ToggleThemeDark';

export function ToggleThemeButton ()
{
    const { mode, toggle } = useTheme();

    return (
        <Toggle
            style={styles.wrapperStyle}
            trackBar={{
                activeBackgroundColor: mode === 'light' ? '#5e5e5e' : '#000',
                inActiveBackgroundColor: mode === 'light' ? '#5e5e5e' : '#000',
                borderActiveColor: '#fff',
                borderInActiveColor: '#fff',
                borderWidth: 2,
                width: 70,
                height: 35,
            }}
            thumbButton={{
                height: 30,
                width: 30,
                activeBackgroundColor: mode === 'light' ? '#333' : '#999',
                inActiveBackgroundColor: mode === 'light' ? '#333' : '#999',
            }}
            value={mode === 'dark'}
            onToggle={(e) => alert(e)}
            onPress={toggle}
            leftComponent={
                <ToggleThemeLight style={styles.iconLight}/>
            }
            rightComponent={
                <ToggleThemeDark style={styles.iconDark}/>
            }
        />
    )
}

const styles = StyleSheet.create({
    infoWrapper : {
        bottom: 0,
        left: 0,
        zIndex: 1,
        width : '100%',
        flexDirection : 'row',
        justifyContent : 'space-between',
        paddingVertical : 5,
        paddingHorizontal : 10,
    },
    name : {
        fontSize: 16,
        color: '#fff',
        fontFamily : 'Roboto-Regular'
    },
    secondaryInfo : {
        flexDirection : 'row'
    },
    infoBlock : {
        flexDirection : 'row',
        marginRight: 15,
        marginTop: 2
    },
    icon : {
        marginRight: 5,
        marginTop: 2
    },
    text : {
        color: 'white',
        fontFamily : 'Roboto-Regular',
    },
    date : {
        marginTop: 2
    },
    switchWrapper : {
        width: 100
    },
    iconLight : {
        marginLeft: 30,
        transform : [{scale : 0.8}]
    },
    iconDark : {
        marginRight: 30,
        transform : [{scale : 0.8}]
    },
    wrapperStyle : {

    }
});

import React, { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useTheme} from '../theme-manager';
import DropShadow from "react-native-drop-shadow";
import {shallowEqual, useSelector} from "react-redux";

export function ToggleTextButton ({onText, offText})
{
    const [toogleOn, setToogleOn] = useState(false);
    const onStyle = styles.btnActiveOnText;
    const offStyle = styles.btnActiveOffText;
    function toogleOption(){
        if(toogleOn)
            toogleOn = false;
        else
            toogleOn = true;
    }

    return (
        <DropShadow style={styles.wrapper}>
            <TouchableOpacity onPress={()=>setToogleOn(true)}>
                {/* <Text style={toogleOn?styles.btnActiveOnText:styles.btnDisableOnText} onPress={()=>setToggleOn(true)}> */}
                <Text style={toogleOn?styles.btnDisableOnText:styles.btnActiveOnText}>
                    {onText}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setToogleOn(false)}>
                {/* <Text style={toogleOn?styles.btnActiveOffText:styles.btnDisableOffText} onPress={()=>setToggleOn(false)}> */}
                <Text style={toogleOn?styles.btnDisableOffText:styles.btnActiveOffText}> 
                    {offText}
                </Text>
            </TouchableOpacity>
        </DropShadow>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection:'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        position:'relative',
    },
    btnActiveOnText: {
        minWidth: 80,
        paddingHorizontal: 20,
        paddingVertical: 6,
        backgroundColor: '#ffffff',
        color: '#000000',
        borderRadius: 8,
        fontFamily: "Lato-Bold, Lato",
        fontSize: 10,
        fontWeight: '400',
        lineHeight: 12,
        textAlign: 'center',
        // zIndex: 8,
    },

    btnDisableOnText: {
        minWidth: 80,
        paddingHorizontal: 20,
        paddingVertical: 6,
        backgroundColor: '#5d5d5d',
        color: '#ffffff',
        borderRadius: 8,
        fontFamily: "Lato-Bold, Lato",
        fontSize: 10,
        fontWeight: '400',
        lineHeight: 12,
        textAlign: 'center',
        // zIndex: 90,
        marginEnd:-16,
    },

    btnActiveOffText: {
        minWidth: 80,
        paddingHorizontal: 20,
        paddingVertical: 6,
        backgroundColor: '#5d5d5d',
        borderRadius: 8,
        color: '#ffffff',
        fontFamily: "Lato-Bold, Lato",
        fontSize: 10,
        fontWeight: '400',
        lineHeight: 12,
        textAlign: 'center',
        marginStart: -16,
        // zIndex: 1
    },

    btnDisableOffText: {
        minWidth: 80,
        paddingHorizontal: 20,
        paddingVertical: 6,
        backgroundColor: '#ffffff',
        color: '#000000',
        borderRadius: 8,
        fontFamily: "Lato-Bold, Lato",
        fontSize: 10,
        fontWeight: '400',
        lineHeight: 12,
        textAlign: 'center',
        // marginStart: -16,
        // zIndex: 2
    }
});
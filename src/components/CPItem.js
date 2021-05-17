import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useTheme} from '../theme-manager';
import {shallowEqual, useSelector} from "react-redux";
import TriangleSelector from './icons/TriangleSelector';
import DropShadow from "react-native-drop-shadow";

export function CPItem ({cpItem, onPress, activedID})
{
    return (
        <View style={styles.wrapper}>
            <TouchableOpacity onPress={onPress} style={{ height:72, flexDirection:'row', alignItems:'flex-end'}}>
                <View style={{  }}>
                    <DropShadow
                        style={{
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 1,
                                height: 1,
                            },
                            shadowOpacity: 0.75,
                            shadowRadius: 2,
                            marginBottom: 2,
                        }}>
                        <View style={[styles.canvasView,{width:cpItem.width, height: cpItem.height}]}/>
                    </DropShadow>
                    <Text style={styles.fontItems}>{cpItem.title}</Text>
                    <Text style={styles.fontItems}>${cpItem.price}</Text>
                </View>
            </TouchableOpacity>
            { activedID == cpItem.id && <TriangleSelector style={{alignSelf:'center'}}/>}
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 8,
        marginHorizontal:12,
        textAlign:'center',
        flexDirection:'column',
    },
    canvasView: {
        backgroundColor: '#fff',
        alignSelf:'center'
    },
    fontItems: {
        fontFamily: 'Roboto-Regular',
        fontSize: 12,
        fontWeight: '700',
        lineHeight: 14,
        textAlign: 'center'
    }
});

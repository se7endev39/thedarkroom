import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {useTheme} from '../theme-manager';
import DownloadFilm from './icons/DownloadFilm';
import Close from './icons/Close';
import { ImageBackground } from "react-native";

export function RollDownload ({download, openSheet})
{
    const { theme } = useTheme();

    const [hide, setHide] = useState(false);


    if (hide)
    {
        return null;
    }

    function getDownloadDate ()
    {
        let date = download.date.split('T')[0],
            dateComponents = date.split('-'),
            months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        return months[+dateComponents[1] - 1] + ' ' + dateComponents[2];
    }

    function downloadFailed ()
    {
        return download.failed;
    }

    function downloadIsReady ()
    {
        return download.date !== undefined;
    }

    return (
        <ImageBackground source={require('../assets/menu_background.png')} resizeMode="stretch" style={{width:'100%', marginBottom:15}}>
            <View style={[styles.wrapper, downloadFailed() && {backgroundColor: '#ff000050', height: 50}]}>
                
                {/* <TouchableOpacity onPress={() => downloadFailed() || !downloadIsReady() ? false : openSheet()} style={styles.textWrapper}> */}
                <TouchableOpacity style={styles.textWrapper}>
                    {
                        downloadFailed() &&
                        <React.Fragment>
                            <Text style={[styles.text]}>Download failed</Text>
                        </React.Fragment>
                    }
                    {
                        !downloadFailed() && !downloadIsReady() &&
                        <React.Fragment>
                            <ActivityIndicator style={styles.loader} size="small" color={theme.primaryText}/>
                            <Text style={[styles.text, {marginTop: 0}]}>Download preparing</Text>
                        </React.Fragment>
                    }
                    {
                        !downloadFailed() && downloadIsReady() &&
                        <React.Fragment>
                            {/* <DownloadFilm style={styles.icon}/> */}
                            <Text style={styles.text}>{getDownloadDate()} - Download is Ready</Text>
                        </React.Fragment>
                    }
                </TouchableOpacity>

                {
                    downloadIsReady() &&
                    <TouchableOpacity style={styles.button} onPress={() => setHide(true)}>
                        <Close style={styles.icon} fill="#d8d8d8"/>
                    </TouchableOpacity>
                }
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    wrapper : {
        // backgroundColor: '#42ada8',
        flexDirection: 'row',
        justifyContent : 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 10,
        // marginBottom: 10
    },
    textWrapper : {
        flexDirection: 'row'
    },
    text : {
        color: '#fff',
        fontSize: 18,
        marginLeft: 10,
        // marginTop: 6
    },
    button : {
        backgroundColor: '#00000070',
        borderRadius : 50000,
        borderBottomLeftRadius: 50000,
        borderBottomRightRadius: 50000,
        borderTopLeftRadius: 50000,
        borderTopRightRadius: 50000,
        // padding: 3,
        // position : 'absolute',
        // right: 10,
        // top: 10
    },
    icon : {
        transform : [{scale: 0.6}]
    },
    loadingBlock : {
        flexDirection : 'row'
    }
});

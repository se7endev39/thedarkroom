import React, { useEffect, useLayoutEffect } from 'react';
import {
    Text,
    StyleSheet,
    View,
    FlatList,
} from 'react-native';
import { shallowEqual, useSelector } from "react-redux";
import ProgressCircle from 'react-native-progress-circle';
import { calcDiffDate } from '../helper';
import { useTheme } from '../theme-manager';
import { Album } from '../components/Album';
import { customBackButtonHeaderProps } from '../components/BackButton';
import { setPhotoMode } from '../ducks/main';


export default function Albums ({navigation})
{
    const { theme } = useTheme();
    const albums = useSelector(state => state.main.albums, shallowEqual);
    // const pgData = useSelector(state => state.main.pgData, shallowEqual);
    // const photoMode = useSelector(state => state.main.photoMode, shallowEqual);
    const Bold = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>
    
    /**
     * Add header actions
     */
    useLayoutEffect(() => {
        navigation.setOptions({
            ...customBackButtonHeaderProps('', navigation)
        });
    }, [navigation]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', e => {
        //   e.preventDefault(); // Prevent default action
          unsubscribe(); // Unsubscribe the event on first call to prevent infinite loop
          setPhotoMode(false);
        });
    }, []);

    // useEffect(() => {
    //     const unsubscribe = navigation.addListener('beforeRemove', e => {
    //       e.preventDefault(); // Prevent default action
    //       unsubscribe(); // Unsubscribe the event on first call to prevent infinite loop

    //       if(photoMode){
    //         setPhotoMode(false);
    //         navigation.navigate('PrintGift', { pgData });// Navigate to your desired screen
    //       }else{
    //         navigation.navigate('Home'); // Navigate to your desired screen
    //       }
    //     });
    // }, []);

    return (
        <View style={[styles.wrapper, {backgroundColor : theme.backgroundColor}]}>
            <View style={{flexDirection:'row', width:'100%', backgroundColor:'#fff',opacity:0.71044195,marginBottom:10}}>
                <View style={{flex:3, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                    <ProgressCircle
                        percent={(60-calcDiffDate(albums[0].date)) * 100 / 60 }
                        radius={25}
                        borderWidth={5}
                        color="#f00"
                        shadowColor="#999"
                        bgColor="#fff"
                    >
                        <Text style={{ fontSize: 14 }}>{(60-calcDiffDate(albums[0].date))+'d'}</Text>
                    </ProgressCircle>
                    <Text style={{width:'50%', marginLeft:3}}>Storage Expires</Text>
                </View>
                <View style={{flex:5, flexDirection:'column', marginHorizontal:15, marginVertical: 18}}>
                    <Text style={styles.albumText}>The Film Ordering System [FOS] will store each album for <Bold>60days</Bold> but a subscription is required after that at $1.50/month.</Text>
                    <Text style={styles.subscribeText}>Subscribe Now</Text>
                </View>
            </View>
            <FlatList data={albums}
                    style={styles.listWrapper} 
                    showsVerticalScrollIndicator={false} 
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => <Album album={item} onPress={() => navigation.navigate('AlbumRolls', {item})}/>}/>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper : {
        flex: 1,
        width: '100%'
    },
    albumText: {
        fontSize: 8,
        color: '#000',
        fontFamily : 'Montserrat-SemiBold'
    },
    subscribeText: {
        fontSize: 10,
        fontWeight:'bold',
        color: '#000',
        fontFamily : 'Montserrat-SemiBold'
    },
    listWrapper : {
        width: '100%'
    },
});

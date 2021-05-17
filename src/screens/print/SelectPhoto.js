import React, { useEffect, useLayoutEffect } from 'react';
import { Text, FlatList, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { shallowEqual, useSelector } from "react-redux";
import { launchImageLibrary } from 'react-native-image-picker';
import { PGMenuItem } from '../../components/PGMenuItem';
import { customBackButtonHeaderProps } from '../../components/BackButton';
import { Album } from '../../components/Album';
import { useTheme } from '../../theme-manager';
import { setPGData, setPhotoMode } from '../../ducks/main';


export default function PrintSelectPhoto ({ route, navigation }){ 
    const menuList = [
        {id: 1, title: 'My Albums', imageUrl: require('../../assets/iconfos.png')},
        {id: 2, title: 'My Phone', imageUrl: require('../../assets/iconphotos.png')},
        {id: 3, title: 'Instagram', imageUrl: require('../../assets/iconinstagram.png')},
        {id: 4, title: 'Facebook', imageUrl: require('../../assets/iconfacebook.png')},
        {id: 5, title: 'Dropbox', imageUrl: require('../../assets/icondropbox.png')},
    ];

    const albums = useSelector(state => state.main.albums, shallowEqual);
    const pgData = useSelector(state => state.main.pgData, shallowEqual);
    const { theme } = useTheme();
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

    function photoMenuSelected( index ) {
        console.log(index);
        if( index == 1){
            let options = {
                storageOptions: {
                skipBackup: true,
                path: 'images',
                },
            };
            launchImageLibrary(options, (response) => {
                if (response.didCancel) {
                //console.log('User cancelled image picker');
                } else if (response.error) {
                //console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                // console.log('User tapped custom button: ', response.customButton);// alert(response.customButton);
                } else {
                    const newItem = {"id": 0, "image_urls":{"sq":response.uri}};
                    const arr = [...pgData, newItem]; setPGData(arr);
                    navigation.navigate("PrintGift", {pgData:arr});
                }
            });
        }
    }

    return(
        <View style={[styles.wrapper, {backgroundColor : theme.backgroundColor}]}>
            <View style={styles.headerMenu}>
                <FlatList 
                        horizontal={true} 
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator = {false}
                        style={styles.listWrapper} 
                        data={menuList}
                        keyExtractor={item => item.id.toString()} 
                        renderItem={({item, index}) => <PGMenuItem pgItem={item} onPress={()=>photoMenuSelected(index)}/>} />
            </View>
            <FlatList data={albums}
                    style={styles.mainWrapper} 
                    showsVerticalScrollIndicator={false} 
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => <Album album={item} onPress={() => navigation.navigate('AlbumRolls', {item})}/>}/>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        width: '100%'
    },
    headerMenu: {
        
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity:  0.75,
        shadowRadius: 2,
        elevation: 2,
    },
    listWrapper: {
        width: '100%',
        backgroundColor: '#d1d1d1',
        paddingBottom: 20,
    },
    mainWrapper : {
        width: '100%'
    },
});
import React, {useLayoutEffect, useState} from 'react';
import {StyleSheet, View, Image, ScrollView, Platform, KeyboardAvoidingView, ActivityIndicator} from 'react-native';
import {processError, useRequest, useUpdater} from '../helper';
import {useTheme} from '../theme-manager';
import {AlbumInfo} from '../components/AlbumInfo';
import HeaderButton from '../components/HeaderButton';
import {customBackButtonHeaderProps} from '../components/BackButton';
import {LineInput} from '../components/LineInput';
import {shallowEqual, useSelector} from 'react-redux';
import {setRolls} from '../ducks/main';

export default function EditAlbum ({route, navigation})
{
    const { album } = route.params;
    const rolls = useSelector(state => state.main.rolls, shallowEqual);

    const {request, loading} = useRequest();
    const {updateAlbum} = useUpdater();

    const { theme } = useTheme();
    const [updatedAlbum, setUpdatedAlbum] = useState(JSON.parse(JSON.stringify(album)));
    const [updatedRolls, setUpdatedRolls] = useState(JSON.parse(JSON.stringify(rolls)));

    /**
     * Set header actions
     */
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <HeaderButton text="Done" onPress={submit}/>
            ),
            ...customBackButtonHeaderProps('Album', navigation)
        });
    }, [navigation, updatedAlbum, updatedRolls]);


    /**
     * Save changes
     */
    const submit = async () =>
    {
        if (loading)
        {
            return;
        }

        if (updatedAlbum.updated)
        {
            try
            {
                const response = await request(`/albums/${updatedAlbum.id}`, {method : "PUT", body : JSON.stringify({id : updatedAlbum.id, name : updatedAlbum.name})});
                if (response !== 'successful update')
                {
                    throw new Error();
                }

                updateAlbum(updatedAlbum.id, {name : updatedAlbum.name});
            }
            catch (e)
            {
                processError(e, `Error during album ${album.id} update`);
                return;
            }
        }

        for (const roll of updatedRolls.filter(roll => roll.updated))
        {
            try
            {
                const response = await request(`/albums/${album.id}/rolls/${roll.id}`, {method : "PUT", body : JSON.stringify({id : roll.id, name : roll.name})});
                if (response !== 'successful update')
                {
                    throw new Error();
                }

            }
            catch (e)
            {
                processError(e, `Error during roll ${roll.id} update`);
            }
        }

        setRolls(updatedRolls);
        navigation.goBack();
    };

    /**
     * Update local version of album (save will be fired only on Save action)
     */
    function updateAlbumLocally (text)
    {
        setUpdatedAlbum({...updatedAlbum, name : text, updated : true});
    }

    /**
     * Update local version of roll (save will be fired only on Save action)
     */
    function updateRolls (editableRoll, name)
    {
        let newUpdatedRolls = updatedRolls.map(roll => {
            if (editableRoll.id === roll.id)
            {
                roll.name = name;
                roll.updated = true;
            }
            return roll;
        });

        setUpdatedRolls(newUpdatedRolls);
    }

    if (loading)
    {
        return (
            <View style={[styles.wrapper, {backgroundColor : theme.backgroundColor}]}>
                <ActivityIndicator style={styles.loader} size="large" color={theme.primaryText}/>
            </View>
        );
    }

    let id = 1;
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={{ flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false} style={[styles.wrapper, {backgroundColor : theme.backgroundColor}]} contentContainerStyle={styles.containerStyle}>
                <AlbumInfo album={album} isInsideAlbumBlock={false} showName={false}/>
                <LineInput style={styles.albumInput} title="Album name" value={updatedAlbum.name} onChange={updateAlbumLocally}/>
                    {
                        updatedRolls.map(function(roll,index) {
                                return(
                                    <View key={index} style={styles.rollWrapper}>
                                        <View style={styles.imagesWrapper}>
                                            <View style={styles.images}>
                                                {
                                                    roll.images.slice(0, 2).map((image,id) =>
                                                        <View key={id} style={styles.imageWrapper}>
                                                            <Image style={styles.image} resizeMode="cover" source={{uri : image.image_urls.sq, width : 100, height: 100}}/>
                                                        </View>
                                                    )
                                                }
                                            </View>
                                        </View>
                                        <LineInput title="Roll name" value={roll.name} onChange={text => updateRolls(roll, text)}/>
                                    </View>
                                )
                            }
                        )
                    }
            </ScrollView>
        </KeyboardAvoidingView>
    )
}


const styles = StyleSheet.create({
    wrapper : {
        flex: 1,
        width: '100%',
    },
    containerStyle : {
        paddingTop: 15,
        paddingBottom: 150
    },
    imagesWrapper : {
        width: '100%',
        paddingHorizontal: 10,
        marginBottom: 10
    },
    images : {
        flexDirection: 'row',
        flexWrap : 'wrap',
        margin: -5
    },
    imageWrapper : {
        width : '50%',
        aspectRatio: 1,
        padding: 5
    },
    image : {
        width: '100%',
        height: '100%'
    },
    rollWrapper : {
        marginTop: 30
    },
    albumInput : {
        marginTop: 20
    },
    loader : {
        position : 'absolute',
        top: '50%',
        left: '50%',
        marginLeft: -20,
        marginTop: -20
    }
});

import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import { useTheme } from '../theme-manager';
import { processError, useRequest, useUpdater } from '../helper';
import { setForceRollId, setRolls } from '../ducks/main';
import HeaderButton from '../components/HeaderButton';
import { Roll } from '../components/Roll';
import { AlbumInfo } from '../components/AlbumInfo';
import { customBackButtonHeaderProps } from '../components/BackButton';


export default function AlbumRolls ({route, navigation})
{
    const { theme } = useTheme();

    const album = route.params.item;
    const rolls = useSelector(state => state.main.rolls, shallowEqual);
    const forceRollId = useSelector(state => state.main.forceRollId, shallowEqual);

    const {updateRoll} = useUpdater();
    const {request, loading} = useRequest();
    
    const [downloadCheckEnabled, setDownloadCheckEnabled] = useState(false);
    
    /**
     * Add header actions
     */
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <HeaderButton text="Edit Album" onPress={() => navigation.navigate('EditAlbum',{album})}/>
            ),
            ...customBackButtonHeaderProps('Orders', navigation)
        });
    }, [navigation, rolls]);

    /**
     * Initial rolls request
     */
    useEffect(() => {
        getRolls();
    }, []);

    /**
     * Fetch rolls from the API
     */
    async function getRolls ()
    {
        try
        {
            const response = await request(`/albums/${album.id}/rolls`);
            setRolls(response);
            if (forceRollId){
                findAndSelectForceRoll();
            }
        }
        catch (e)
        {
            processError(e, `Error fetching album ${album.id} rolls`);
        }
    }

    /**
     * Open forced roll (when user tapped on notification)
     */
    useEffect(() =>
    {
        if (!forceRollId)
        {
            return () => false;
        }

        if (rolls.length !== 0)
        {
            findAndSelectForceRoll();
        }
        else
        {
            getRolls();
        }

    }, [forceRollId]);

    /**
     * Find forced roll and open it
     */
    function findAndSelectForceRoll ()
    {
        const existingRoll = rolls.find(roll => roll.id === forceRollId);
        if (existingRoll !== undefined)
        {
            navigation.navigate('RollImages', {existingRoll}); setForceRollId(null);
        }
    }

    /**
     * Run status checker interval for roll download result
     */
    useEffect(() => {
        if (downloadCheckEnabled){
            const downloadCheckInterval = setInterval(() => checkRollDownload(), 3000);
            return () => clearInterval(downloadCheckInterval);
        }
    }, [downloadCheckEnabled]);

    /**
     * Update roll download info using API
     */
    const checkRollDownload = useCallback(async () =>
    {
        try
        {
            let downloads = await request(`/downloads`);
            let rollDownload = downloads.find(downloadItem => +downloadItem.rollId === roll.id && downloadItem.downloadURL !== null && downloadItem.failed === false);
            if (rollDownload !== undefined)
            {
                updateRoll(roll.id, {download : rollDownload});
                setDownloadCheckEnabled(false);
            }
        }catch (e){
            processError(e, 'Error during check roll download');
        }
    }, []);

    return (
        <View style={[styles.wrapper, {backgroundColor : theme.backgroundColor}]}>
            <AlbumInfo album={album} isInsideAlbumBlock={false}/>
            {
                loading && <ActivityIndicator style={styles.loader} size="large" color={theme.primaryText}/>
            }
            {
                !loading &&
                <FlatList showsVerticalScrollIndicator={false}
                          style={styles.listWrapper}
                          data={rolls}
                          keyExtractor={item => item.id.toString()}
                          renderItem={({item, index}) => <Roll key={index} roll={item} onPress={() => navigation.navigate('RollImages', {album, item})}/>}/>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper : {
        flex: 1,
        width: '100%',
        paddingTop: 15,
        paddingHorizontal: 10
    },
    listWrapper : {
        width: '100%',
        marginTop: 15
    },
    loader : {
        position : 'absolute',
        top: '50%',
        left: '50%',
        marginLeft: -20,
        marginTop: -20
    }
});

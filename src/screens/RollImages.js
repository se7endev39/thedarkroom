import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    Platform, ActivityIndicator,
    Image,
} from 'react-native';
import { shallowEqual, useSelector } from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';
import BottomSheet from 'reanimated-bottom-sheet';
import IconBadge from 'react-native-icon-badge';
import MasonryList from "react-native-masonry-list";
import analytics from '@react-native-firebase/analytics';
import Clipboard from "@react-native-community/clipboard";
import CameraRoll from '@react-native-community/cameraroll';
import {
    setImagesLikes,
    setPGData,
    setPhotoMode,
} from '../ducks/main';
import { hitSlop } from '../theme';
import { useTheme } from '../theme-manager';
import {processError, useRequest, useUpdater} from '../helper';
import {hasAndroidPermissionForCameraRoll, SharedUtils} from '../shared';
import HeaderButton from '../components/HeaderButton';
import PGMenuIcon from '../components/icons/PGMenu' 
import LikeOff from '../components/icons/LikeOff';
import CopyLink from '../components/icons/CopyLink';
import DownloadFilm from '../components/icons/DownloadFilm';
import { RollImage } from '../components/RollImage';
import { SheetBody } from '../components/SheetBody';
import { SheetHeader } from '../components/SheetHeader';
import {Close, Download, LikeOn, Share} from '../components/icons';
import { ImageDownloadModal } from '../components/ImageDownloadModal';
import BackButton, {customBackButtonHeaderProps} from '../components/BackButton';


export default function RollImages ({route, navigation})
{
    const album = route.params.album; 
    const roll = route.params.item;

    const { theme } = useTheme();
    const { request } = useRequest();
    const { updateRoll } = useUpdater();
    const bottomSheetEl = useRef();

    const storeData = useSelector(state => state.main.pgData, shallowEqual);
    const photoMode = useSelector(state => state.main.photoMode, shallowEqual);
    const imagesLikes = useSelector(state => state.main.imagesLikes, shallowEqual);

    const [images, setImages] = useState([]);
    const [saving, setSaving] = useState(false);
    const [tempImages, setTempImages] = useState([]);
    const [imagesData, setImagesData] = useState([]);
    const [masonryChanged, setMasonryChanged] = useState(0);
    const [selectionMode, setSelectionMode] = useState(false);
    const [favouritesFilter, setFavouritesFilter] = useState(false);
    const [selectedImagesCount, setSelectedImagesCount] = useState(0);
    const [downloadCheckEnabled, setDownloadCheckEnabled] = useState(false);
    const [rollDownloadProcessing, setRollDownloadProcessing] = useState(false);
    const [imageDownloadModalVisible, setImageDownloadModalVisible] = useState(false);

    /**
     * Set header actions
     */
    useLayoutEffect(() => {
        if(photoMode){
            navigation.setOptions({
                ...customBackButtonHeaderProps('Album', navigation)
            });
        }else{
            navigation.setOptions({
                headerRight: () => (
                    <HeaderButton text={'Select'} onPress={() => setSelectionMode(true)}/>
                ),
                ...customBackButtonHeaderProps('Album', navigation)
            });
        }
    }, [navigation]);

    /**
     * Update header actions on selection mode toggle
     */
    useEffect(() => {
        if(!photoMode){
            let options = {
                headerRight: () => (
                    <HeaderButton text={selectionMode ? 'Select All' : 'Select'} onPress={selectionMode ? () => toggleSelectAll(true) : () => setSelectionMode(true)}/>
                ),
                ...customBackButtonHeaderProps('Album', navigation)
            };

            if (selectionMode)
            {
                options.headerLeft = () =>
                    <TouchableOpacity style={styles.cancelButton} onPress={() => {setSelectionMode(false); toggleSelectAll(false);}}>
                        <Close style={styles.cancelButtonIcon} fill="#fff"/>
                    </TouchableOpacity>;
            }else{
                options.headerLeft = () => <BackButton title={'Album'} navigation={navigation} forceTitle={true} mode="white"/>;
            }

            navigation.setOptions(options);
        }
    }, [navigation, selectionMode, images]);


    function getImageSize(sourceImageUri, counter = 0) {
        return new Promise((resolve, reject) => {
            Image.getSize(sourceImageUri, (width, height) => {
                return resolve({width, height});
            }, async (error) => {
                if (counter < 30) {
                    setTimeout(async () => {
                        resolve(await getImageSize(sourceImageUri, ++counter));
                    }, 1000);
                } else {
                    reject(error);
                }
            });
        });
    }

    function getImageData (image) {
        const sourceImageUri = image.image_urls.sm;
        const existingData = imagesData.find(d => d.image.id == image.id);
        const imageData = {
            ...existingData,
            uri: sourceImageUri,
            image,
            selectionMode,
            onImageLikeToggle,
            onImageSelectToggle,
            onImageOpen,
        };

        return new Promise(async (resolve, reject) => {
            if (existingData && (existingData.image.updated_at === image.updated_at && existingData.dimensions)) {
                return resolve(imageData);
            }
            imageData.dimensions = await getImageSize(sourceImageUri);
            return resolve(imageData);
        });
    }

    /**
     * Set images for render (apply favourites filter && split images to 2 columns)
     */
    useEffect(() =>
    {
        const tempImgs = favouritesFilter ? roll.images.filter(image => imagesLikes[image.id] !== undefined ? imagesLikes[image.id] : image.liked) : roll.images;
        setImages(tempImgs);
        setTempImages(tempImgs);
    }, [roll, favouritesFilter]);

    useEffect(() => {
        (async () => {
            const cloneImagesData = imagesData.slice();
            const tempImagesData = await Promise.all(images.map(image => getImageData(image)));
            setImagesData(tempImagesData);

            if (cloneImagesData.some(prev => tempImages.find(temp => temp.id == prev.image.id).updated_at != prev.image.updated_at)) {
                setTimeout(() => {
                    setMasonryChanged(masonryChanged + 1);
                }, 100)
            }
        })();
    }, [images, selectionMode])

    /**
     * Enable status updater for roll
     */
    useEffect(() =>
    {
        if (roll && roll.download && roll.download.status === 'processing')
        {
            setDownloadCheckEnabled(true);
        }
    }, [roll]);

    /**
     * Run status checker interval for roll download result
     */
    useEffect(() => {

        if (downloadCheckEnabled)
        {
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
        }
        catch (e)
        {
            processError(e, 'Error during check roll download');
        }
    }, []);

    /**
     * Select/deselect all images
     */
    const toggleSelectAll = (flag) =>
    {
        setSelectedImagesCount(flag ? roll.images.length : 0);
        setImages(images.map(img => {
            return {...img, selected : flag};
        }));
    };

    /**
     * Like/dislike image
     */
    const onImageLikeToggle = (image) =>
    {
        setImages(images.map(img => {
            if (img.id === image.id)
            {
                return {...img, liked : !image.liked};
            }
            return img;
        }));

        updateImageLikeState({...image, liked : !image.liked});
    };

    /**
     * Save like/dislike image state to API
     */
    async function updateImageLikeState (image)
    {
        let updatedImagesLikes = {...imagesLikes, [image.id] : image.liked};
        setImagesLikes(updatedImagesLikes);

        try
        {
            await request(`/albums/${album.id}/rolls/${roll.id}/images/${image.id}`,
                {method : "PUT", body : JSON.stringify({id : image.id, liked : image.liked})});
        }
        catch (e)
        {
            processError(e, 'Error during image update');
        }
    }

    /**
     * Select/deselect image
     */
    const onImageSelectToggle = (image) =>
    {
        image.selected = image.selected !== undefined ? image.selected : false;
        setSelectedImagesCount(selectedImagesCount + (image.selected ? -1 : 1));
        setImages(images.map(img => {
            if (img.id === image.id)
            {
                return {...img, selected : !image.selected};
            }
            return img;
        }));
    };

    /**
     * Select Images for Prints and Gifts
     */
     function onPrintGift ()
     {
         SharedUtils.Alert.alert('The Darkroom Lab', 'Do you really want to add selected photo to prints and gifts?',
             [
                 {
                     text: 'Cancel',
                     onPress : () => false
                 },
                 {
                     text: 'ADD To PG',
                     onPress: addImagesToPG
                 }
             ], {cancelable: false});
 
     }
 
     /**
      * add selected images to Prints and Gifts
      */
     function addImagesToPG ()
     {
         try
         {
             const selectedImages = images.filter(image => image.selected);
             images.map(img=>{img.selected = false});
             setPGData([...storeData, ...selectedImages]);
             setSelectedImagesCount(0); setSelectionMode(false);
         }catch (e){
             processError(e, 'Error during add images to Prints and Gifts');
         }
     }

    /**
     * Share selected images urls
     */
    async function share ()
    {
        let urls = images.filter(image => image.selected).map(image => image.image_urls.sm.replace('\\/', '/'));

        if (urls.length === 0){
            return;
        }

        if (Platform.OS === 'ios')
        {
          //  urls = urls.map(async url => 'data:image/png;base64,' + await ImgToBase64.getBase64String(url));
        }

        const shareOptions = {
            title: 'Share darkroom image',
            failOnCancel: false,
            urls
        };

        try
        {
            await SharedUtils.Share.open(shareOptions);
        }
        catch (e)
        {
            processError(e, 'Error during selected images share');
        }
    }

    /**
     * Open image when user taps on it
     */
    function onImageOpen (image)
    {
        if(photoMode){
            const pgData = [...storeData, image]
            setPhotoMode(false); setPGData(pgData);
            navigation.navigate("PrintGift", { pgData });
        }else{
            navigation.navigate('ImageDetail',{ album, roll, image });
        }
    }

    /**
     * Toggle favourites filter
     */
    function toggleFavouritesFilter ()
    {
        setFavouritesFilter(!favouritesFilter);
    }

    /**
     * Download selected images to phone storage
     */
    const downloadSelectedImages = useCallback(async () =>
    {
        setSaving(true);
        analytics().logEvent('downloadSelectedImages', {imagesCount : selectedImagesCount});
        let urls = images.filter(image => image.selected).map(image => image.image_urls.social.replace('\\/', '/'));

        if (Platform.OS === 'android' && !(await hasAndroidPermissionForCameraRoll()))
        {
            SharedUtils.Alert.alert(
                'The Darkroom Lab',
                'No permission to save images',
                [{text: 'OK', onPress: () => false}],
                {cancelable: false},
            );
            return;
        }

        const onError = err =>
        {
            SharedUtils.Alert.alert(
                'The Darkroom Lab',
                'Failed to save Images: ' + err.message,
                [{text: 'OK', onPress: () => false}],
                {cancelable: false},
            );
        };

        const onEnd = () =>
        {
            setSaving(false);
            toggleSelectAll(false);
            setSelectionMode(false);
        };

        urls = urls.map(url => RNFetchBlob.config({fileCache: true, appendExt: 'png'}).fetch('GET', url));
        Promise.all(urls).then(images => {

            let fetches = images.map(imageData => CameraRoll.save(imageData.data, {type : 'photo'}));
            Promise.all(fetches).then(() =>
            {
                setImageDownloadModalVisible(true);
            })
            .catch(onError).finally(() => onEnd());
        }).catch(err => {onError(err); onEnd();});

    }, [selectedImagesCount]);

    /**
     * Request for entire roll download using API
     */
    async function downloadEntireRoll ()
    {
        setRollDownloadProcessing(true);
        analytics().logEvent('downloadEntireRoll', {idRoll : roll.id});

        try
        {
           let response = await request(`/albums/${album.id}/rolls/${roll.id}/download`, {method : "PUT" });
            if (response !== 'successful update')
            {
                throw new Error();
            }

            updateRoll(roll.id, {download : {status : 'processing'}});
            setDownloadCheckEnabled(true);
            toggleSelectAll(false);
            setSelectionMode(false);

            SharedUtils.Alert.alert(
                'The Darkroom Lab',
                'Your download is being prepared. After a few moments you will get notification.',
                [{text: 'OK', onPress: () => false}],
                {cancelable: false},
            );



        }
        catch (e)
        {
            processError(e, `Error during roll ${roll.id} download request`);
            SharedUtils.Alert.alert(
                'The Darkroom Lab', 'Error: ' + e.toString(),
                [{text: 'OK', onPress: () => false}],
                {cancelable: false},
            );
        }
        finally
        {
            setRollDownloadProcessing(false);
        }

    }

    function renderBottomSheetHeader ()
    {
        return <SheetHeader rollDownloadIcon={true}
                            title={'Roll Download'}
                            additionalText={'Copy link to share or download'}
                            onPress={() => bottomSheetEl.current.snapTo(0)}/>;
    }

    function renderBottomSheetContent ()
    {
        const downloadUrl = roll.download && roll.download.downloadURL || '';

        return (
            <SheetBody style={{height: 220}}>

                <View style={styles.inputWrapper}>
                    <View pointerEvents='none'>
                        <Text style={styles.linkBlock} numberOfLines={1}>
                            {downloadUrl}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => Clipboard.setString(downloadUrl)} style={styles.copyWrapper}>
                        <CopyLink style={styles.copyIcon}/>
                        <Text style={styles.copyText}>COPY LINK</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.copyAdditionalText}>
                    Download is a compressed ZIP file with full resolution images. Downloading to your phone is not recommended.
                </Text>
            </SheetBody>
        );
    }

    return (
        <React.Fragment>
            <View showsVerticalScrollIndicator={false} style={[styles.wrapper, {backgroundColor : theme.backgroundColor}]}>
                <View style={styles.header}>
                    <Text style={[styles.name, {color: theme.primaryText}]}>{roll.name}</Text>
                    <TouchableOpacity onPress={toggleFavouritesFilter} style={styles.filterIconWrapper}>
                        {favouritesFilter ? <LikeOn fill={theme.primaryText}/> : <LikeOff fill={theme.primaryText}/>}
                    </TouchableOpacity>
                </View>
                {
                    (images.length === 0) &&
                    <Text style={[{color: theme.primaryText}]}>No favourite images</Text>
                }
                <MasonryList
                    images={imagesData}
                    completeCustomComponent={RollImage}
                    backgroundColor={theme.backgroundColor}
                    rerender={true}
                    spacing={1}
                    listContainerStyle={styles.containerStyle}
                    key={masonryChanged}
                />
            </View>
            {
                selectedImagesCount !== 0 &&
                <View style={styles.footer}>
                    <TouchableOpacity hitSlop={hitSlop} onPress={share} style={styles.buttonWrapper}>
                        <Share style={styles.footerIcon}/>
                    </TouchableOpacity>
                    <View style={styles.buttonWrapper}>
                        {
                            saving && <ActivityIndicator style={{width: 24, marginLeft: 10}} size="large" color={theme.primaryText}/>
                        }
                        {
                            !saving &&
                            <IconBadge
                                MainElement={
                                    <TouchableOpacity hitSlop={hitSlop} onPress={downloadSelectedImages}>
                                        <Download style={styles.footerIcon}/>
                                    </TouchableOpacity>
                                }
                                BadgeElement={<Text onPress={downloadSelectedImages} style={styles.badgeText}>{selectedImagesCount}</Text>}
                                IconBadgeStyle={styles.badge}
                                Hidden={false}
                            />
                        }
                    </View>
                    <View style={styles.buttonWrapper}>
                        {
                            rollDownloadProcessing && <ActivityIndicator style={{width: 24, height: 37, marginLeft: 10}} size="large" color={theme.primaryText}/>
                        }
                        {
                            !rollDownloadProcessing &&
                            <IconBadge
                                MainElement={
                                    <TouchableOpacity hitSlop={hitSlop} onPress={downloadEntireRoll}>
                                        <DownloadFilm style={styles.footerIcon}/>
                                    </TouchableOpacity>
                                }
                                BadgeElement={<Text onPress={downloadEntireRoll} style={styles.badgeText}>{roll.images.length}</Text>}
                                IconBadgeStyle={styles.badge}
                                Hidden={false}
                            />
                        }
                    </View>
                    <TouchableOpacity hitSlop={hitSlop} onPress={onPrintGift} style={styles.buttonWrapper}>
                        <PGMenuIcon style={styles.footerIcon}/>
                    </TouchableOpacity>
                </View>
            }
            <ImageDownloadModal isVisible={imageDownloadModalVisible} close={() => setImageDownloadModalVisible(false)}/>
            <BottomSheet
                ref={bottomSheetEl}
                initialSnap={0}
                snapPoints={[0, 300]}
                renderContent={renderBottomSheetContent}
                renderHeader={renderBottomSheetHeader}
            />
        </React.Fragment>
    )
}


const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        width: '100%',
        paddingTop: 15,
        paddingHorizontal : 10
    },
    header: {
        flexDirection : 'row',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    name: {
        color: '#fff',
        fontSize: 20,
        fontFamily : 'Montserrat-SemiBold'
    },
    filterIconWrapper: {
        marginRight: 15,
        padding: 5,
    },
    cancelButton: {
        backgroundColor: '#40908c',
        borderRadius: 50000,
        borderBottomLeftRadius: 50000,
        borderBottomRightRadius: 50000,
        borderTopLeftRadius: 50000,
        borderTopRightRadius: 50000,
        padding: 3,
        marginLeft: 15
    },
    cancelButtonIcon: {
        transform: [{scale : 0.9}]
    },
    footer : {
        backgroundColor: '#00000080',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        paddingTop: 15,
        paddingBottom: 25,
    },
    buttonWrapper : {
        width: '25%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    footerIcon: {
        transform: [{scale: 0.8}]
    },
    badge : {
        paddingHorizontal: 3,
        paddingVertical: 3,
        right: -10,
        top: -10,
        width: 25,
        height: 'auto',
        backgroundColor: '#3e9d99'
    },
    badgeText: {
        color: '#fff'
    },
    containerStyle : {
        paddingBottom: 30,
    },
    inputWrapper: {
        backgroundColor: '#e1e1e1',
        flexDirection: 'row',
        width: '100%',
        paddingLeft: 10,
        marginTop: 10
    },
    linkBlock : {
        width: Dimensions.get('window').width - 50 - 60,
        paddingVertical: 15
    },
    copyWrapper: {
        backgroundColor: '#bfbcbc',
        width: 70,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    copyIcon: {
    },
    copyText: {
        fontSize: 8,
        marginTop: 3
    },
    copyAdditionalText: {
        color: '#999',
        marginTop: 20
    }
});

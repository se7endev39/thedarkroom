import React, {
    useCallback,
    useEffect,
    useLayoutEffect,
    useState
} from 'react';
import {
    StyleSheet,
    View,
    useWindowDimensions,
    TouchableOpacity, ActivityIndicator, Platform, SafeAreaView,
    Image
} from 'react-native';
import {processError, useRequest} from '../helper';
import {useTheme} from '../theme-manager';
import HeaderButton from '../components/HeaderButton';
import {customBackButtonHeaderProps} from '../components/BackButton';
import {hasAndroidPermissionForCameraRoll, SharedUtils} from '../shared';
import RNFetchBlob from 'rn-fetch-blob';
import CameraRoll from '@react-native-community/cameraroll';
import {Delete, Download, LikeOff, Rotate, Share} from '../components/icons';
import {shallowEqual, useSelector} from 'react-redux';
import {
    setImagesLikes,
    setImagesRotation,
    setImagesTooltipProcessed,
    setRolls,
    setSelectedRoll,
} from '../ducks/main';
import LikeOn from '../components/icons/LikeOn';
import analytics from '@react-native-firebase/analytics';
import {ImageDownloadModal} from '../components/ImageDownloadModal';
import ImgToBase64 from 'react-native-image-base64';
import {hitSlop} from '../theme';
import Carousel from 'react-native-snap-carousel';
import ImageZoom from 'react-native-image-pan-zoom';
import { NativeModules } from 'react-native';

const RNFS = require('react-native-fs');
// for iOS it is higher because of iPhone X safe zone.
const bottomBarHeightInPixes = Platform.OS === 'ios' ? 170 : 160;
const rotateEnabled = true;

function GalleryImage({item, rotation, saving, loadingColor}){
    const [counter, setCounter] = useState(false);
    const [loading, setLoading] = useState(true);

    function rotateStyle(angle){
        if(angle == 0){
            return styles.image;
        }else if (angle == 0.25){
            return styles.image1;
        }else if(angle == 0.5){
            return styles.image2;
        }else if(angle == 0.75){
            return styles.image3;
        }
    }

    return (
        <View>
            <Image
                resizeMode="contain"
                style={rotateStyle(rotation)}
                source={{
                    uri: item.image_urls.social,
                    cache: 'reload',
                }}
                key={counter}
                onLoad={() => {
                    setLoading(false)
                }}
                onError={() => {
                    if (counter >= 30) {
                        console.log('image load failed ---', counter, item.id, item.image_urls.social);
                    } else {
                        setTimeout(() => {
                            setCounter(counter+1)
                        }, 1000);
                    }
                }}
            />
            {
                (saving || loading) && (
                    <View style={styles.loading}>
                        <ActivityIndicator style={{width: 24}} size="large" color={loadingColor}/>
                    </View>
                )
            }
        </View>
    );
};

export default function ImageDetail ({route, navigation})
{
    const {album, roll, image} = route.params;

    const refs = {}; const { theme } = useTheme();
    
    const rolls = useSelector(state => state.main.rolls, shallowEqual);
    const imagesLikes = useSelector(state => state.main.imagesLikes, shallowEqual);
    const imagesTooltipProcessed = useSelector(state => state.main.imagesTooltipProcessed, shallowEqual);
    const orientation = useSelector(state => state.main.orientation, shallowEqual);

    const [fullSizeMode, setFullSizeMode] = useState(false);
    const [interfaceMode, setInterfaceMode] = useState(true);

    const {request} = useRequest();

    const [imageDownloadModalVisible, setImageDownloadModalVisible] = useState(false);
    const [saving, setSaving] = useState(false);
    const [sharing, setSharing] = useState(false);
    
    const [sortedImages, setSortedImages] = useState([]);
    const [rotationProps, setRotationProps] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [zoomStarted, setZoomStarted] = useState(false);
    const [editing, setEditing] = useState(false);
    const [rotationAngle, setRotationAngle] = useState(0);

    const SCREEN_WIDTH = useWindowDimensions().width;
    const SCREEN_HEIGHT = useWindowDimensions().height;

    useEffect(() => {
        const sortedImages = roll.images.slice();
        sortedImages.push(...sortedImages.splice(0, sortedImages.findIndex(img => img.id == image.id)));
        sortedImages.unshift(...sortedImages.splice(-6));
        setSortedImages(sortedImages); // to reorder image since loop is not working well as expected due limited clones per side (3 ~ 6)
        setSelectedIndex(sortedImages.findIndex(img => img.id == image.id));
    }, [roll, image])

    /**
     * Set header actions
     */
    useLayoutEffect(() => {
        setFullSizeMode(orientation === 'LANDSCAPE' || orientation === 'PORTRAITUPSIDEDOWN');
    }, [navigation, orientation]);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <HeaderButton text={'Edit'} onPress={() => startEditing()} />
            ),
            ...customBackButtonHeaderProps('Roll', navigation)
        });
    }, [fullSizeMode, selectedIndex, editing])


    async function startEditing() {
        const selectedImage = sortedImages[selectedIndex]; if (!selectedImage) return;

        if (Platform.OS === 'android'){
            const { PESDKModule } = NativeModules;

            PESDKModule.present(selectedImage.image_urls.social);
        }else if (Platform.OS === 'ios'){
            const imagePath = RNFS.LibraryDirectoryPath + '/image.jpeg';
            
            RNFS.downloadFile({ fromUrl: selectedImage.image_urls.social, toFile: imagePath }).promise.then(result => {
                NativeModules.PESDK.present(imagePath);
            });
        }
    }

    /**
     * Downoad image
     */
    async function download ()
    {
        const image = sortedImages[selectedIndex]; if (!image) return;

        analytics().logEvent('downloadImage', {idImage : image.id});

        if (Platform.OS === 'android' && !(await hasAndroidPermissionForCameraRoll()))
        {
            alert('No permission');
            return ;
        }

        const onError = err =>
        {
            processError(err, `Error during image ${image.id} download`);
            SharedUtils.Alert.alert(
                'Save Image',
                'Failed to save Image: ' + err.message,
                [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                {cancelable: false},
            );
        };

        RNFetchBlob.config({fileCache: true, appendExt: 'png'})
            .fetch('GET', image.image_urls.social)
            .then(res => {
                CameraRoll.save(res.data, {type : 'photo'})
                    .then(() => setImageDownloadModalVisible(true))
                    .catch(onError)
            })
            .catch(onError);
    }

    /**
     * Rotate image (only locally)
     */
    async function rotate ()
    {
        if (saving)
        {
            return;
        }

        if (!imagesTooltipProcessed)
        {
            SharedUtils.Alert.alert('The Darkroom Lab', 'It won’t be rotated in your online gallery. Coming soon!',
                [
                    {
                        text: 'OK',
                        onPress : () => false
                    }
                ], {cancelable: false});

            setImagesTooltipProcessed(true);
            return ;
        }

        const image = sortedImages[selectedIndex]; if (!image) return;
        if(rotationProps.length == 0){
            setRotationProps(sortedImages.map(()=>0));
        }
        let rotation = rotationProps[selectedIndex];
        let newRotation = rotation + 0.25;
        let angle = Math.round(360 * newRotation) % 360;
        let newRotations = rotationProps;
        newRotations[selectedIndex] = angle / 360;
        setImagesRotation(newRotations);

        let rotate = rotationAngle;
        let newRotate = rotate + 0.25;
        let ang = Math.round(360 * newRotate) % 360;
        let newAng = ang / 360;
        setRotationAngle(newAng);
    }

    /**
     * Share image (for iOS image transformed to base64 to deliver better share options)
     */
    async function share ()
    {
        const image = sortedImages[selectedIndex]; if (!image) return;

        setSharing(true);
        let url = image.image_urls.social.replace('\\/', '/');

        try
        {
            if (Platform.OS === 'ios')
            {
                url = 'data:image/png;base64,' + await ImgToBase64.getBase64String(url);
            }

            const ShareResponse = await SharedUtils.Share.open({
                title: 'Share darkroom image',
                failOnCancel: false,
                type : 'image/png',
                urls: [url]
            });
        }
        catch (e)
        {
            processError(e, `Error during image ${image.id} share`);
        }
        finally
        {
            setSharing(false);
        }
    }

    /**
     * Like/dislike image using API
     */
    async function like (liked)
    {
        const image = sortedImages[selectedIndex]; if (!image) return;

        let updatedImagesLikes = {...imagesLikes, [image.id] : liked};
        setImagesLikes(updatedImagesLikes);

        try
        {
            await request(`/albums/${album.id}/rolls/${roll.id}/images/${image.id}`,
                {method : "PUT", body : JSON.stringify({id : image.id, liked : liked})}, {});
        }
        catch (e)
        {
            processError(e, `Error during image ${image.id} like`);
        }
    }

    /**
     * Ask user for delete confirmation
     */
    function onDeleteRequest ()
    {
        SharedUtils.Alert.alert('The Darkroom Lab', 'Do you really want to delete selected photo?',
            [
                {
                    text: 'Cancel',
                    onPress : () => false
                },
                {
                    text: 'Delete',
                    onPress: deleteImage
                }
            ], {cancelable: false});
    }

    /**
     * Delete image using API
     */
    async function deleteImage ()
    {
        const image = sortedImages[selectedIndex]; if (!image) return;
        try
        {
            let updatedImages = roll.images.filter(existingImage => existingImage.id !== image.id),
                updatedRoll = {...roll, images : updatedImages},
                updatedRolls = rolls.map(roll => roll.id === updatedRoll.id ? updatedRoll : roll);

            navigation.goBack({album, updatedRoll});

            setTimeout(() => {
                setRolls(updatedRolls);
                request(`/albums/${album.id}/rolls/${roll.id}/images`, {method : "DELETE", body : JSON.stringify({imageIds : [image.id]})} );
            }, 0);
        }catch (e){
            processError(e, `Error during image ${image.id} delete`);
        }
    }

    /**
     * Check if image is liked
     */
    const imageIsLiked = useCallback(() =>
    {
        const image = sortedImages[selectedIndex]; if (!image) return;

        if (imagesLikes[image.id] !== undefined)
        {
            return imagesLikes[image.id];
        }

        return image.liked;
    }, [imagesLikes, selectedIndex]);

    function toggleInterface() {
        setInterfaceMode(!interfaceMode);
    }
    function returnToAlbum() {
        navigation.goBack();
    }

    function renderImageView (item)
    {
        if (!item) {
            item = sortedImages[selectedIndex];
        }
        if (!item) return null;
        const selectedIndex = sortedImages.findIndex(image => image.id == item.id);
        return (
            <ImageZoom key={item.image_urls.sq}
                ref={(c) => refs['image_' + item.id] = c}
                cropWidth={SCREEN_WIDTH}
                cropHeight={SCREEN_HEIGHT - (fullSizeMode ? 0 : bottomBarHeightInPixes)}
                imageWidth={SCREEN_WIDTH}
                imageHeight={SCREEN_HEIGHT - (fullSizeMode ? 0 : bottomBarHeightInPixes)}
                enableSwipeDown={true}
                onSwipeDown={() => returnToAlbum()}
                onClick={() => toggleInterface()}
                onDoubleClick={() => {
                    setTimeout(() => {
                        setZoomStarted(refs['image_' + sortedImages[selectedIndex].id].scale > 1);
                    });
                }}
                responderRelease={(vx, scale) => {
                    setZoomStarted(scale > 1);
                    if (refs['image_' + sortedImages[selectedIndex].id].swipeDownOffset < -60) {
                        share();
                    }
                }}
            >
                <GalleryImage
                    item={item}
                    saving={saving}
                    loadingColor={theme.primaryText}
                    rotation={rotationAngle}
                />
            </ImageZoom>
        )
    }

    function _renderItem({item}) {
        return renderImageView(item);
    }

    return (
        <React.Fragment>
            <SafeAreaView style={[styles.wrapper, {backgroundColor : interfaceMode ? theme.backgroundColor : theme.interfaceColor}]}>

                <View
                    style={{height: SCREEN_HEIGHT - bottomBarHeightInPixes}}
                >
                {
                    sortedImages.length > 0 && (
                        <Carousel
                            data={sortedImages}
                            renderItem={_renderItem}
                            sliderWidth={SCREEN_WIDTH}
                            sliderHeight={SCREEN_HEIGHT - bottomBarHeightInPixes}
                            itemWidth={SCREEN_WIDTH}
                            scrollEnabled={!zoomStarted && !saving}
                            loop={true}
                            firstItem={selectedIndex}
                            onSnapToItem={slideIndex => setSelectedIndex(slideIndex)}
                        />
                    )
                }
                </View>

                { interfaceMode && !editing && (
                <View style={[styles.actions, {backgroundColor : theme.backgroundColor}]}>
                    {
                        !saving && rotateEnabled &&
                        <TouchableOpacity hitSlop={hitSlop} style={{width: 24}} onPress={rotate}>
                            <Rotate fill={theme.primaryText}/>
                        </TouchableOpacity>
                    }
                    {
                        saving && <ActivityIndicator style={{width: 24}} size="large" color={theme.primaryText}/>
                    }
                    {
                        !sharing &&
                        <TouchableOpacity hitSlop={hitSlop} onPress={share}>
                            <Share fill={theme.primaryText}/>
                        </TouchableOpacity>
                    }
                    {
                        sharing && <ActivityIndicator style={{width: 33, marginTop: -80}} size="large" color={theme.primaryText}/>
                    }
                    <TouchableOpacity hitSlop={hitSlop} onPress={() => like(!imageIsLiked())}>
                        {
                            imageIsLiked() &&
                            <LikeOn fill={theme.primaryText} style={styles.likeIcon}/>
                        }
                        {
                            !imageIsLiked() &&
                            <LikeOff fill={theme.primaryText} style={styles.likeIcon}/>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity hitSlop={hitSlop} onPress={download}>
                        <Download fill={theme.primaryText} style={{marginTop: 3}}/>
                    </TouchableOpacity>
                    <TouchableOpacity hitSlop={hitSlop} onPress={onDeleteRequest}>
                        <Delete fill={theme.primaryText} style={{marginTop: 3}}/>
                    </TouchableOpacity>
                </View>
                ) }

                <ImageDownloadModal isVisible={imageDownloadModalVisible} close={() => setImageDownloadModalVisible(false)}/>
            </SafeAreaView>
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    wrapper : {
        flex: 1,
    },
    imageZone : {
        justifyContent: 'center',
        alignItems : 'center'
    },
    image : {
        height: '100%',
        width: null,
    },
    image1 : {
        height: '100%',
        width: null,
        transform: [{ 'rotate': '90deg' }]
    },
    image2 : {
        height: '100%',
        width: null,
        transform: [{ 'rotate': '180deg' }]
    },
    image3 : {
        height: '100%',
        width: null,
        transform: [{ 'rotate': '270deg' }]
    },
    actions : {
        minHeight : bottomBarHeightInPixes,
        paddingTop : 20,
        paddingBottom : Platform.OS === 'ios' ? 30 : 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent : 'space-around',
        marginTop: 0
    },
    likeIcon : {
        transform : [{scale: 1.5}],
        marginTop: 7
    },
    disabled : {
        opacity: 0.5
    },
    modalViewWrapper : {
        flex: 1,
        alignItems: 'center',
        justifyContent : 'center',
        backgroundColor: '#000',
        position: 'absolute',
        zIndex: 10,
        height: '100%',
        width: '100%',
        left: 0,
        top: 0,
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
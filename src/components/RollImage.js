import React, {useState, useEffect} from 'react';
import {
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Image,
    Dimensions,
    Text,
} from 'react-native';

import LikeOff from './icons/LikeOff';
import {LikeOn, SelectOn} from './icons';
import SelectOff from './icons/SelectOff';
import {shallowEqual, useSelector} from 'react-redux';

export class RollImage extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            counter: 0,
        };

        this.setLoaded = this.setLoaded.bind(this);
    }

    setLoaded(loaded) {
        this.setState({loaded});
    }

    render() {
        const {style, source, data} = this.props;
        const {uri, image, selectionMode, onImageLikeToggle, onImageSelectToggle, onImageOpen} = data;
        const {liked} = image;
        const {loaded, counter} = this.state;
        return (
            <TouchableWithoutFeedback onPress={() => selectionMode ? onImageSelectToggle(image) : onImageOpen(image)}>
                <View style={[styles.imageWrapper]}>
                    <React.Fragment>
                        {
                            loaded && liked &&
                            <LikeOn onPress={(e) => {e.stopPropagation(); onImageLikeToggle(image);}} style={styles.likeIcon}/>
                        }
                        {
                            loaded && !liked &&
                            <LikeOff onPress={(e) => {e.stopPropagation(); onImageLikeToggle(image);}} style={styles.likeIcon}/>
                        }

                        {
                            selectionMode && image.selected && <SelectOn style={styles.selectIcon}/>
                        }

                        {
                            selectionMode && !image.selected && <SelectOff style={styles.selectIcon}/>
                        }
                    </React.Fragment>

                    <Image
                        onLoad={() => {
                            this.setLoaded(true)
                        }}
                        onError={() => {
                            if (counter >= 30) {
                                console.log('image load failed ---', image.id, image.image_urls.sm)
                            } else {
                                setTimeout(() => {
                                    this.setState({
                                        counter: counter + 1,
                                    });
                                }, 1000);
                            }
                        }}
                        style={style}
                        source={{
                            uri,
                            cache: 'reload'
                        }}
                        key={counter}
                    />
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    wrapper : {
        width: '100%'
    },
    imageWrapper : {
        width: '100%',
        // padding: 5,
        minHeight : 122,
        position: 'relative',
        overflow: 'hidden'
    },
    image : {
        width: '100%',
    },
    likeIcon : {
        position: 'absolute',
        left: 15,
        top: 15,
        zIndex: 1
    },
    selectIcon : {
        position: 'absolute',
        right: 15,
        top: 15,
        zIndex: 1
    }
});

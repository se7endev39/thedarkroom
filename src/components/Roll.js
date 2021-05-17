import React,{useRef} from 'react';
import {Image, View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {shallowEqual, useSelector} from 'react-redux';
import {RollDownload} from './RollDownload';

class RollThumbnail extends React.PureComponent {
    state = {
        counter: 0,
        loading: true,
    };
    render() {
        const {image} = this.props;
        const {counter, loading} = this.state;
        return (
            <View style={styles.imageWrapper}>
                <Image
                    resizeMode="cover"
                    style={styles.image}
                    source={{
                        uri: image.image_urls.sq,
                        width: 100,
                        height: 100,
                        cache: 'reload',
                    }}
                    key={counter}
                    onLoad={() => {
                        this.setState({
                            loading: false,
                        });
                    }}
                    onError={() => {
                        if (counter >= 30) {
                            console.log('image load failed ---', counter, image.id, image.image_urls.sq);
                        } else {
                            setTimeout(() => {
                                this.setState({
                                    counter: counter + 1,
                                });
                            }, 1000);
                        }
                    }}
                />
            </View>
        );
    }
}


export function Roll ({roll, onPress})
{
    const bottomSheetEl = useRef();
    
    function openSheet ()
    {
        bottomSheetEl.current.snapTo(1);
    }

    return (
        <View style={{flexDirection:'column'}}>
            <TouchableOpacity onPress={onPress} style={styles.wrapper}>

                <View style={styles.images}>
                    {
                        roll.images.slice(0, 4).map(image =>
                            <RollThumbnail key={image.id} image={image} />
                        )
                    }
                </View>

                <View style={styles.infoWrapper}>
                    <Text style={styles.name}>{roll.name}</Text>
                </View>
            </TouchableOpacity>
            {
                roll.download !== null &&
                <RollDownload download={roll.download} openSheet={openSheet}/>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper : {
        marginTop: 15,
        // marginBottom: 25,
        width: '100%',
        position: 'relative',
    },
    infoWrapper : {
        position: 'absolute',
        backgroundColor: '#00000080',
        bottom: 0,
        left: 0,
        zIndex: 1,
        width : '100%',
        flexDirection : 'row',
        justifyContent : 'center',
        paddingVertical : 5
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
    name : {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
        fontFamily : 'Roboto-Regular'
    }
});

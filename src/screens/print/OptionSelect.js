import React, { useLayoutEffect } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { shallowEqual, useSelector } from "react-redux";
import ImageEditor from '@react-native-community/image-editor';
import { customCloseButtonHeaderProps } from '../../components/CloseButton';
import { setPGData } from '../../ducks/main';
// import ImageCropper from '../../ImageCropper';

// const window = Dimensions.get('window');
// const w = window.width;

export default function PrintOptionSelect ({ route, navigation }){
    const mainItem = route.params.item;
    const mainIndex = route.params.index;

    const pgData = useSelector(state => state.main.pgData, shallowEqual);
    const activePrint = useSelector(state => state.main.activedPrints, shallowEqual);
    
    const colorPrints = [
        {sizeVert:"4", sizeHoriz:"6", price:"12"},
        {sizeVert:"5", sizeHoriz:"7", price:"12"},
        {sizeVert:"6", sizeHoriz:"8", price:"12"},
        {sizeVert:"8", sizeHoriz:"10", price:"12"},
        {sizeVert:"11", sizeHoriz:"14", price:"12"},
        {sizeVert:"4", sizeHoriz:"4", price:"12"},
        {sizeVert:"5", sizeHoriz:"5", price:"12"},
        {sizeVert:"6", sizeHoriz:"6", price:"12"},
        {sizeVert:"8", sizeHoriz:"12", price:"12"},
    ];

    const bwPrints = [
        {sizeVert:"4", sizeHoriz:"6", price:"12"},
        {sizeVert:"4", sizeHoriz:"6", price:"12"},
        {sizeVert:"4", sizeHoriz:"6", price:"12"},
        {sizeVert:"4", sizeHoriz:"6", price:"12"},
        {sizeVert:"4", sizeHoriz:"6", price:"12"},
        {sizeVert:"4", sizeHoriz:"6", price:"12"},
        {sizeVert:"4", sizeHoriz:"6", price:"12"},
        {sizeVert:"4", sizeHoriz:"6", price:"12"},
        {sizeVert:"4", sizeHoriz:"6", price:"12"},
    ];

    const canvasPrints = [
        {sizeVert:"8", sizeHoriz:"10", price:"12"},
        {sizeVert:"8", sizeHoriz:"12", price:"12"},
        {sizeVert:"11", sizeHoriz:"14", price:"12"},
        {sizeVert:"12", sizeHoriz:"18", price:"12"},
        {sizeVert:"14", sizeHoriz:"14", price:"12"},
        {sizeVert:"16", sizeHoriz:"20", price:"12"},
        {sizeVert:"20", sizeHoriz:"20", price:"12"},
        {sizeVert:"20", sizeHoriz:"24", price:"12"},
        {sizeVert:"24", sizeHoriz:"36", price:"12"},
    ];

    const bambooPrints = [
        {sizeVert:"10", sizeHoriz:"11", price:"12"},
        {sizeVert:"8", sizeHoriz:"12", price:"12"},
        {sizeVert:"11", sizeHoriz:"14", price:"12"},
        {sizeVert:"12", sizeHoriz:"18", price:"12"},
        {sizeVert:"14", sizeHoriz:"14", price:"12"},
        {sizeVert:"16", sizeHoriz:"20", price:"12"},
        {sizeVert:"20", sizeHoriz:"20", price:"12"},
        {sizeVert:"20", sizeHoriz:"24", price:"12"},
        {sizeVert:"24", sizeHoriz:"36", price:"12"},
    ];

    const aluminumPrints = [
        {sizeVert:"20", sizeHoriz:"20", price:"12"},
        {sizeVert:"8", sizeHoriz:"12", price:"12"},
        {sizeVert:"11", sizeHoriz:"14", price:"12"},
        {sizeVert:"12", sizeHoriz:"18", price:"12"},
        {sizeVert:"14", sizeHoriz:"14", price:"12"},
        {sizeVert:"16", sizeHoriz:"20", price:"12"},
        {sizeVert:"20", sizeHoriz:"20", price:"12"},
        {sizeVert:"20", sizeHoriz:"24", price:"12"},
        {sizeVert:"24", sizeHoriz:"36", price:"12"},
    ];
    /**
     * Add header cancel actions
     */
    useLayoutEffect(() => {
        navigation.setOptions({
            ...customCloseButtonHeaderProps('', navigation)
        });
    }, [navigation]);

    async function handleCrop( imageUri, ratioX, ratioY ){
        try{
            let gas = 1;
            await Image.getSize(imageUri, (width, height) => {
                const maxRatio = ratioX > ratioY ? ratioX : ratioY;
                const minSize = width > height ? height : width;
                gas = minSize / maxRatio ;
            });

            const offset = {
                x: 0,
                y: 0,
            };
            const cropData = {
                offset,
                size: {
                    width: gas * ratioX,
                    height: gas * ratioX,
                },
                displaySize: { 
                    width: gas * ratioX, 
                    height: gas * ratioY,
                },
                resizeMode: 'contain',
            };

            return await ImageEditor.cropImage(
                imageUri, 
                cropData, 
                successURI => console.log(successURI), 
                error => console.log(error.message)
            );
        }catch(e){console.log(e)}
    };

    async function optionSelected(printItem, modePrint){
        let arr = [...pgData];
        switch (modePrint) {
            case "Color Print":
            case "B&W Print":
                arr[mainIndex] = {...mainItem, colorprint:{...printItem, modePrint}};
                break;
            case "Canvas Print":
                arr[mainIndex] = {...mainItem, canvasprint:{...printItem, modePrint}};
                break;
            case "Bamboo Print":
                arr[mainIndex] = {...mainItem, bambooprint:{...printItem, modePrint}};
                break;
            case "Aluminum Print":
                arr[mainIndex] = {...mainItem, aluminumprint:{...printItem, modePrint}};
                break;
            default:
                break;
        }
        
        const result = await handleCrop(arr[mainIndex].image_urls.sq, printItem.sizeHoriz, printItem.sizeVert);
        arr[mainIndex].image_urls.sq = result;
        setPGData(arr); navigation.navigate("PrintGift", { pgData: arr });
    }

    const PrintsElements = () => {
        return(
            <View style={{flex:1}}>
                <View style={{flex:1}}>
                    <View style={{flexDirection: 'row'}}>
                        <Image resizeMode='contain' style={styles.image} source={require('../../assets/color_fish_print.png')} />
                        <Text style={styles.printText}>Color Prints</Text>
                    </View>
                    <Text style={styles.printdotText}>Printed on traditional wet-process Kodak Royal silver halide color paper.</Text>
                    <View style={styles.box}>
                    {
                        colorPrints.map((colorPrint, index) => {
                            return(
                                <TouchableOpacity key={index.toString()} style={styles.boxContainer} onPress={ () => optionSelected(colorPrint, "Color Print") }>
                                    <Text>{colorPrint.sizeVert}x{colorPrint.sizeHoriz}</Text>
                                    <Text>${colorPrint.price}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                    </View>
                </View>
                <View style={{flex:1}}>
                    <View style={{flexDirection: 'row'}}>
                        <Image resizeMode='contain' style={styles.image} source={require('../../assets/black_white_prints.png')} />
                        <Text style={styles.printText}>B&#38;W Prints</Text>
                    </View>
                    <Text style={styles.printdotText}>Genuine ILFORD Black and White Silver Gelatin Photographic Paper</Text>
                    <View style={styles.box}>
                    {
                        bwPrints.map((bwPrint, index) => {
                            return(
                                <TouchableOpacity key={index.toString()} onPress={ () => optionSelected(bwPrint, "B&W Print") } style={styles.boxContainer}>
                                    <Text>{bwPrint.sizeVert}x{bwPrint.sizeHoriz}</Text>
                                    <Text>${bwPrint.price}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                    </View>
                </View>
            </View>
        );
    }

    const CanvasElements = () => {
        return(
            <View style={{flex:1}}>
                <View style={{flex:1}}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.printText}>Canvas Prints</Text>
                    </View>
                    <View style={styles.box}>
                    {
                        canvasPrints.map((canvasPrint, index) => {
                            return(
                                <TouchableOpacity key={index.toString()} style={styles.boxContainer} onPress={ () => optionSelected(canvasPrint, "Canvas Print") }>
                                    <Text>{canvasPrint.sizeVert}x{canvasPrint.sizeHoriz}</Text>
                                    <Text>${canvasPrint.price}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                    </View>
                </View>
            </View>
        );
    }

    const BambooElements = () => {
        return(
            <View style={{flex:1}}>
                <View style={{flex:1}}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.printText}>Bamboo Block</Text>
                    </View>
                    <View style={styles.box}>
                    {
                        bambooPrints.map((bambooPrint, index) => {
                            return(
                                <TouchableOpacity key={index.toString()} style={styles.boxContainer} onPress={ () => optionSelected(bambooPrint, "Bamboo Print") }>
                                    <Text>{bambooPrint.sizeVert}x{bambooPrint.sizeHoriz}</Text>
                                    <Text>${bambooPrint.price}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                    </View>
                </View>
            </View>
        );
    }

    const AluminumElements = () => {
        return(
            <View style={{flex:1}}>
                <View style={{flex:1}}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.printText}>HD Aluminum Art</Text>
                    </View>
                    <View style={styles.box}>
                    {
                        aluminumPrints.map((aluminumPrint, index) => {
                            return(
                                <TouchableOpacity key={index.toString()} style={styles.boxContainer} onPress={ () => optionSelected(aluminumPrint, "Aluminum Print") }>
                                    <Text>{aluminumPrint.sizeVert}x{aluminumPrint.sizeHoriz}</Text>
                                    <Text>${aluminumPrint.price}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                    </View>
                </View>
            </View>
        );
    }

    return (
        <View style={{flexDirection:'column', width:'100%', height:'100%', padding: 20, backgroundColor:'#fff'}}>
            { activePrint == 'Prints & Enlargements' && <PrintsElements /> }
            { activePrint == 'Canvas Prints' && <CanvasElements /> }
            { activePrint == 'Bamboo Block' && <BambooElements /> }
            { activePrint == 'HD Aluminum Art' && <AluminumElements /> }
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        height: 38,
    },
    printText: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 22,
        fontWeight: '500',
        lineHeight: 27,
        alignSelf: 'center',
        marginStart: 10,
    },
    printdotText: {
        fontFamily: 'Lato-Bold, Lato',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 17,
        marginTop: 5,
    },
    box:{
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    boxContainer: {
        width: '30%',
        margin: '1.5%',
        aspectRatio: 2,
        borderWidth: 1,
        borderRadius: 6,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 1,
        //     height: 1,
        // },
        // shadowOpacity: 1,
        // shadowRadius: 1,
        // elevation: 1,
    },
});
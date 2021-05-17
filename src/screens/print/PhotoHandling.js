import React, { useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { shallowEqual, useSelector } from "react-redux";
import { customCloseButtonHeaderProps } from '../../components/CloseButton';
import ImageCropper from '../../ImageCropper';
import RefreshIcon from '../../components/icons/Refresh';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { setPGData } from '../../ducks/main';


const window = Dimensions.get('window');
const w = window.width ? window.width : 400;

export default function PrintPhotoHandling ({route, navigation}){
  const mainItem = route.params.item;
  const mainIndex = route.params.index;

  //console.log(mainItem);

  const pgData = useSelector(state => state.main.pgData, shallowEqual);
  const activePrint = useSelector(state => state.main.activedPrints, shallowEqual);

  let eleItem = null;
  if (activePrint == 'Prints & Enlargements' )  eleItem= mainItem.colorprint;
  else if(activePrint == 'Canvas Prints') eleItem = mainItem.canvasprint;
  else if(activePrint == 'Bamboo Block') eleItem = mainItem.bambooprint;
  else if(activePrint == 'HD Aluminum Art') eleItem = mainItem.aluminumprint;

  const IMAGE = mainItem.image_urls.sq.replace('\\/', '/');
  const ratioX = eleItem == null ? 6 : eleItem.sizeHoriz;
  const ratioY = eleItem == null ? 4 : eleItem.sizeVert;

  const [cropperParams, setCropperParams] = useState({});
  const [cropWidth, setCropWidth] = useState(w - 30);
  const [cropHeight, setCropHeight] = useState((w - 30) * ratioY / ratioX);

  useLayoutEffect(() => {
    navigation.setOptions({
        ...customCloseButtonHeaderProps('', navigation),
        headerTitle:'crop ' + ratioY + ' x ' + ratioX + ' ' + activePrint
    });
  }, [navigation]);

  function rotateCrop () {
    if(cropWidth > cropHeight){
      const temp = cropWidth;
      setCropWidth(cropHeight);
      setCropHeight(temp);
    }else{
      const temp = cropHeight;
      setCropHeight(cropWidth);
      setCropWidth(temp);
    }
  }

  async function handlePress(){
    const cropSize = {
      width: cropWidth / 2,
      height: cropHeight / 2,
    };

    const cropAreaSize = {
      width: cropWidth,
      height: cropHeight,
    };

    try {
      const result = await ImageCropper.crop({
        ...cropperParams,
        imageUri: IMAGE,
        cropSize,
        cropAreaSize,
      });

      let arr = [...pgData];
      arr[mainIndex].image_urls.sq = result; 
      setPGData(arr); navigation.navigate("PrintGift", { arr });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{flex:5, flexDirection:'column', paddingTop:30}}>
        <View style={{height:cropHeight, flexDirection:'row', justifyContent:'center'}}>
          <ImageCropper
            imageUri={IMAGE}
            cropAreaWidth={cropWidth}
            cropAreaHeight={cropHeight}
            setCropperParams={setCropperParams}
          />
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center',paddingHorizontal:40, marginTop:15}}>
            <TouchableOpacity onPress={rotateCrop}>
              <RefreshIcon />
            </TouchableOpacity>
            <Text>Pinch and Zoom to Crop</Text>
        </View>
      </View>
      <View style={{flex:1}}>
          <TouchableOpacity onPress={handlePress}>
              <Text style={styles.doneBtn}>Done</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    flexDirection:'column', 
    backgroundColor:'#fff'
  },

  doneBtn: {
    color: '#fa8a02',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 22,
    textAlign: 'center',

    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fa8a02',
    alignSelf:'center',
    minWidth: 194,
  },
});
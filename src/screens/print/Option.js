import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import { shallowEqual, useSelector } from "react-redux";
import { customBackButtonHeaderProps } from '../../components/BackButton';
import ImageCropper from '../../ImageCropper';
import RefreshIcon from '../../components/icons/Refresh';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { setPGData } from '../../ducks/main';
import { CPItem } from '../../components/CPItem';


const window = Dimensions.get('window');
const w = window.width;

export default function GiftOption ({route, navigation}){
  const mainItem = route.params.item;
  const mainIndex = route.params.index;
  const cpList = [
    {id: 1, width: 20, height: 20, price: 34.95, title: '8x12', sizeVert:8, sizeHoriz:12},
    {id: 2, width: 27, height: 27, price: 45.95, title: '12x18', sizeVert:12, sizeHoriz:18},
    {id: 3, width: 27, height: 27, price: 89.95, title: '20x30', sizeVert:20, sizeHoriz:30},
    {id: 4, width: 39, height: 27, price: 139.99, title: '24x36', sizeVert:24, sizeHoriz:36},
  ];

  const pgData = useSelector(state => state.main.pgData, shallowEqual);
  const activePrint = useSelector(state => state.main.activedPrints, shallowEqual);

  let eleItem = null;
  if(activePrint == 'Canvas Prints') eleItem = mainItem.canvasprint;
  else if(activePrint == 'Bamboo Block') eleItem = mainItem.bambooprint;
  else if(activePrint == 'HD Aluminum Art') eleItem = mainItem.aluminumprint;

  const IMAGE = mainItem.image_urls.sq.replace('\\/', '/');
  const activedIndex = eleItem == null ? 4: eleItem.id;

  const [activedCanvasID, setActivedCanvasID] = useState(activedIndex);
  const [cropperParams, setCropperParams] = useState({});
  const [cropWidth, setCropWidth] = useState(w - 100);
  const [cropHeight, setCropHeight] = useState((w - 100) * cpList[activedCanvasID - 1].sizeVert / cpList[activedCanvasID - 1].sizeHoriz);

  useLayoutEffect(() => {
    navigation.setOptions({
        ...customBackButtonHeaderProps('', navigation),
        headerTitle: activePrint
    });
  }, [navigation]);

  useEffect(() => {
    setCropHeight((w - 100) * cpList[activedCanvasID -1].sizeVert / cpList[activedCanvasID - 1].sizeHoriz);
  }, [activedCanvasID]);

  // function optionSelected(printItem, modePrint){
  //   let arr = [...pgData];
  //   switch (modePrint) {
  //       case "Color Print":
  //       case "B&W Print":
  //           //console.log(printItem);
  //           //console.log(mainItem);
  //           // handleCrop(mainItem.image_urls.sq, printItem.sizeHoriz, printItem.sizeVert);
  //           arr[mainIndex] = {...mainItem, colorprint:{...printItem, modePrint}, mode:modePrint};
  //           break;
  //       case "Canvas Print":
  //           arr[mainIndex] = {...mainItem, canvasprint:{...printItem, modePrint}, mode:modePrint};
  //           break;
  //       case "Bamboo Print":
  //           arr[mainIndex] = {...mainItem, bambooprint:{...printItem, modePrint}, mode:modePrint};
  //           break;
  //       case "Aluminum Print":
  //           arr[mainIndex] = {...mainItem, aluminumprint:{...printItem, modePrint}, mode:modePrint};
  //           break;
  //       default:
  //           break;
  //   }
  //   setPGData(arr); navigation.navigate("PrintGift", { pgData: arr });
  // }

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

      let arr = [...pgData]; arr[mainIndex].image_urls.sq = result; 
      if(activePrint == 'Canvas Prints') {
        arr[mainIndex] = {...mainItem, canvasprint:{...cpList[activedCanvasID -1], modePrint:"Canvas Print"}};
      }else if(activePrint == 'Bamboo Block'){
        arr[mainIndex] = {...mainItem, bambooprint:{...cpList[activedCanvasID -1], modePrint:"Bamboo Print"}};
      }else if(activePrint == 'HD Aluminum Art'){
        arr[mainIndex] = {...mainItem, aluminumprint:{...cpList[activedCanvasID -1], modePrint:"Aluminum Print"}};
      }

      setPGData(arr); navigation.navigate("PrintGift", { pgData:arr });
    } catch (error) { console.log(error); }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cpMenu}>
          <FlatList 
                  horizontal={true} 
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator = {false}
                  style={styles.cpWrapper} 
                  data={cpList} 
                  keyExtractor={item => item.id.toString()} 
                  renderItem={({item}) => <CPItem cpItem={item} onPress={() => setActivedCanvasID(item.id)} activedID={activedCanvasID} />} />
      </View>
      <View style={{flex:6, flexDirection:'column', paddingTop:10}}>
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
    flexDirection:'column', 
    backgroundColor:'#fff'
  },
  cpWrapper: {
  },
  cpMenu: {
    borderBottomWidth: 1,
    borderBottomColor: '#979797',
    borderStyle: 'dashed',
    alignItems:'center',
    backgroundColor: '#eeeeee',
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
  cartButton: {
    alignSelf: 'center', 
    borderRadius: 5,
  },
});
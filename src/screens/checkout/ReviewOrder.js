import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Image, Text, FlatList, ScrollView, StyleSheet } from 'react-native';
import { shallowEqual, useSelector } from "react-redux";
import CardView from 'react-native-cardview'
import PlusButton from '../../components/PlusButton';
import { Button } from '../../components/Button';
import { customBackButtonHeaderProps } from '../../components/BackButton';
import { setActivedPrints } from '../../ducks/main';
import { TouchableOpacity } from 'react-native-gesture-handler';

export function ReviewItem ({ reviewItem, printItem }) {
  const urls = reviewItem.image_urls;
  
  return(
    <View style={styles.itemContainer}>
      <View style={{flex:3}}>
        <Image resizeMode='contain' style={{height:50}} source={{uri: urls.sq.replace('\\/', '/')}} />
      </View>
      <View style={{flex:7}}>
        <View style={{flex:1, flexDirection:'column'}}>
          <Text>{printItem.sizeVert}x{printItem.sizeHoriz} {printItem.modePrint}</Text>
          <Text>Qty: {printItem.qty}</Text>
        </View>
      </View>
      <View style={{flex:2}}>
        <Text>${printItem.price * printItem.qty}</Text>
      </View>
    </View>
  );
}

export default function CheckoutReviewOrder ({navigation}){
  let totalSum = 0;
  const printList = [];
  const canvasList = [];
  const bambooList = [];
  const aluminumList = [];
  
  const Bold = (props) => <Text style={{fontWeight: 'bold', fontSize:18}}>{props.children}</Text>

  const pgData = useSelector(state => state.main.pgData, shallowEqual);
  pgData.map(itemData => {
    //console.log(itemData);
    try{
      if(itemData.colorprint.qty > 0){
        totalSum += itemData.colorprint.qty * itemData.colorprint.price;
        printList.push(itemData);
      }
    }catch(e){}
    try{
      if(itemData.canvasprint.qty > 0){
        totalSum += itemData.canvasprint.qty * itemData.canvasprint.price;
        canvasList.push(itemData);
      }
    }catch(e){}
    try{
      if(itemData.bambooprint.qty > 0){
        totalSum += itemData.bambooprint.qty * itemData.bambooprint.price;
        bambooList.push(itemData);
      }
    }catch(e){}
    try{
      if(itemData.aluminumprint.qty > 0){
        totalSum += itemData.aluminumprint.qty * itemData.aluminumprint.price;
        aluminumList.push(itemData);
      }
    }catch(e){}
  });

  //console.log(totalSum);
  /**
   * Add header actions
   */
  useLayoutEffect(() => {
      navigation.setOptions({
          ...customBackButtonHeaderProps('', navigation, "black")
      });
  }, [navigation]);

  return (
    <View style={{flex:1, flexDirection:'column'}}>
      <View style={{flex:7}}>
        <ScrollView style={{flex:1}}>
          <CardView cornerRadius={7} style={styles.wrapper} containerStyle={{padding: 20, margin: 0, borderWidth: 0}}>
            <View style={{flexDirection:'row', justifyContent:'space-around', alignItems:'center'}}>
              <View style={{flex:3}}>
                <Image resizeMode='contain' style={styles.image} source={require('../../assets/prints_gifts_icon1.png')} />
              </View>
              <View style={{flex:7}}>
                <Text> Prints</Text>
              </View>
              <View style={{flex:2}}>
                <PlusButton style={{transform: [{ scale: 1.5 }]}} onPress={()=>{setActivedPrints('Prints & Enlargements'); navigation.goBack();}}/>
              </View>
            </View>
            {
              printList.map((item,index) => <ReviewItem key={index.toString()} reviewItem={item} printItem={item.colorprint} />)
            }
          </CardView>

          <CardView cornerRadius={7} style={styles.wrapper} containerStyle={{padding: 20, margin: 0, borderWidth: 0}}>
            <View style={{flexDirection:'row', justifyContent:'space-around', alignItems:'center'}}>
              <View style={{flex:3}}>
                <Image resizeMode='contain' style={styles.image} source={require('../../assets/prints_gifts_icon2.png')} />
              </View>
              <View style={{flex:7}}>
                <Text> Canvas Prints</Text>
              </View>
              <View style={{flex:2}}>
                <PlusButton style={{transform: [{ scale: 1.5 }]}} onPress={()=>{setActivedPrints('Canvas Prints'); navigation.goBack();}}/>
              </View>
            </View>
            {
              canvasList.map((item,index) => <ReviewItem key={index.toString()} reviewItem={item} printItem={item.canvasprint} />)
            }
          </CardView>
          
          <CardView cornerRadius={7} style={styles.wrapper} containerStyle={{padding: 20, margin: 0, borderWidth: 0}}>
            <View style={{flexDirection:'row', justifyContent:'space-around', alignItems:'center'}}>
              <View style={{flex:3}}>
                <Image resizeMode='contain' style={styles.image} source={require('../../assets/prints_gifts_icon3.png')} />
              </View>
              <View style={{flex:7}}>
                <Text> Bamboo Prints</Text>
              </View>
              <View style={{flex:2}}>
                <PlusButton style={{transform: [{ scale: 1.5 }]}} onPress={()=>{setActivedPrints('Bamboo Block'); navigation.goBack();}}/>
              </View>
            </View>
            {
              bambooList.map((item,index) => <ReviewItem key={index.toString()} reviewItem={item} printItem={item.bambooprint} />)
            }
          </CardView>

          <CardView cornerRadius={7} style={styles.wrapper} containerStyle={{padding: 20, margin: 0, borderWidth: 0}}>
            <View style={{flexDirection:'row', justifyContent:'space-around', alignItems:'center'}}>
              <View style={{flex:3}}>
                <Image resizeMode='contain' style={styles.image} source={require('../../assets/prints_gifts_icon4.png')} />
              </View>
              <View style={{flex:7}}>
                <Text> HD Aluminum Art</Text>
              </View>
              <View style={{flex:2}}>
                <PlusButton style={{transform: [{ scale: 1.5 }]}} onPress={()=>{setActivedPrints('HD Aluminum Art'); navigation.goBack();}}/>
              </View>
            </View>
            {
              aluminumList.map((item,index) => <ReviewItem key={index.toString()} reviewItem={item} printItem={item.aluminumprint} />)
            }
          </CardView>
        </ScrollView>
      </View>
      <View style={{flex:2, flexDirection:'column', alignItems:'center', justifyContent:'space-around'}}>
        <Text>Subtotal   <Bold>${totalSum}</Bold></Text>
        <Text style={{color:'#FBB400'}} onPress={()=>navigation.goBack()}>Add More Items</Text>
        {/* <TouchableOpacity onPress={navigation.goBack()}>
          
        </TouchableOpacity> */}
        <Button onPress={()=>navigation.navigate("CheckoutCompleteOrder",{totalSum})} disabled={false} text={"Next"} style={{ minWidth: 200, alignSelf: 'center', borderRadius:7}}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 5,
    marginHorizontal:10,
    flexDirection:'column',
    padding: 5,
  },

  image: {
    alignSelf:'center',
    transform: [{scale: 0.8}]
  },

  itemWrapper:{
    width: '100%',
    backgroundColor: '#ffffff',
  },

  itemContainer: {
    flexDirection:'row', 
    justifyContent:'space-around', 
    alignItems:'center', 
    borderTopColor:'#979797', 
    borderTopWidth:1, 
    margin:5,
    paddingVertical: 10,
  }
  // image: {
  //   width: '100%',
  //   height:100,
  // },
});
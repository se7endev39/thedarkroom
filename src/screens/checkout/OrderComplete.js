import React, { useState } from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import { Button } from '../../components/Button';
import { Table, Row, Rows } from 'react-native-table-component';

export default function CheckoutOrderComplete ({navigation}){

  const [tableHead, setTableHead] = useState(['Product', 'Total']);
  const [tableData, setTableData] = useState([
    ['Photo Prints x2', '6.38'],
    ['Subtotal', '$6.38'],
    ['Return shipping', '$5.95 via USPS First Class'],
    ['Tax:', '$0.49'],
    ['Payment method:', 'Pay with Credit Card'],
    ['Refund:', '-$12.82'],
    ['Total:', '$0.00']
  ]);

  return (
    <View style={{flex:1, flexDirection:'column', paddingHorizontal:20}}>
      <View style={{flex:1, alignItems:'center'}}>
        <Text>Thank you!</Text>
        <Text>Order Complete</Text>
      </View>
      <View style={{flex:5, }}>
        <Table borderStyle={{borderWidth: 1, borderColor: '#979797'}}>
          <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
          <Rows data={tableData} textStyle={styles.text}/>
        </Table>
        <Text>Additional Order Details</Text>
        <Row data={['LabID','1877983']} textStyle={styles.text} style={{borderWidth:1, borderColor:'#979797'}} />
      </View>
      <View style={{flex:5}}>
        <Text>No action needed if you ordered gifts or photo prints</Text>
        <Text>SHIPPING INSTRUCTIONS - Only for orders being mailed to The Darkroom</Text>
        <View style={{flexDirection:'row', alignItems:'center'}}>
          <View style={styles.imageContainer}>
            <Image resizeMode='contain'  style={styles.image} source={require('../../assets/film_home_icon1.png')}></Image>
          </View>
          <Text>Film Developing</Text>
        </View>
        <Text>1. Print this page and include in package</Text>
        <Text>Print and insert this printed receipt in your package with your films</Text>
        <View></View>
        <Text>2. Mailing Label</Text>
        <Text>. Create and print complimentary prepaid label below. Label includes tracking</Text>
        <Text>. Attach to a 6'x9' padded envelope</Text>
        <Text>. Record tracking number (photo from smartphone is easy)</Text>
      </View>
      <View style={{flex:1}}>
        <Button disabled={false} text={"Done"} style={{ minWidth: 200, alignSelf: 'center', borderRadius:7}} onPress={()=>navigation.navigate("Home")}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  head: { height: 40, backgroundColor: '#979797'},
  text: { margin: 6 , fontSize:11 },
  imageContainer: {
    borderWidth:2,
    width:45,
    height:45,
    borderColor:'#979797',
    backgroundColor:'#D3D3D3',
    borderRadius:90,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  image: {
    transform: [{scale: 0.65}]
  },
});
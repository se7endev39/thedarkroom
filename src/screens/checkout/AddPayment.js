import React, { useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { CreditCardInput } from "react-native-vertical-credit-card-input";
import { Button } from '../../components/Button';
import { customBackButtonHeaderProps } from '../../components/BackButton';


export default function CheckoutAddPayment ({route, navigation}){

  function _onChange(form){
    //console.log(form);
  }

  /**
   * Add header actions
   */
     useLayoutEffect(() => {
      navigation.setOptions({
          ...customBackButtonHeaderProps('', navigation, "black")
      });
  }, [navigation]);

  return (
    <View style={{flex:1, paddingTop:20}}>
      <CreditCardInput onChange={_onChange} />
      <Button disabled={false} text={"Done"} style={{ minWidth: 200, alignSelf: 'center', borderRadius:7, marginTop:40}}/>
    </View>
  );
}

const styles = StyleSheet.create({
});
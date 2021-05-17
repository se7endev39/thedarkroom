import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CardView from 'react-native-cardview';
import { GooglePay, RequestDataType, AllowedCardNetworkType, AllowedCardAuthMethodsType } from 'react-native-google-pay'
// import stripe from 'tipsi-stripe';
// import Config from 'react-native-config';
import { Button } from '../../components/Button';
import PencilIcon from '../../components/icons/Pencil';
import { customBackButtonHeaderProps } from '../../components/BackButton';



export default function CheckoutCompleteOrder ({route, navigation}){
  // stripe.setOptions({
  //   publishableKey: Config.STRIPE_PUBLISHABLE_KEY,
  //   androidPayMode: 'test', // test || production
  // });
  // const [isPaying, setIsPaying] = useState(false);
  // const shipping = [
  //   {name:"USPS First Class", price:"5.95"},
  //   {name:"USPS Priority Mail:", price:"8.00"},
  //   {name:"FedEx 2 Day", price:"14.00"},
  //   {name:"FedEx Priority Overnight", price:"155.09"},
  //   {name:"UPS / FedEx Ground", price:"15.00"},
  // ];

  const allowedCardNetworks = ['VISA', 'MASTERCARD'];
  const allowedCardAuthMethods= ['PAN_ONLY', 'CRYPTOGRAM_3DS'];

  const totalSum = route.params.totalSum;

  const Bold = (props) => <Text style={{fontWeight: 'bold', fontSize:12}}>{props.children}</Text>

  /**
   * Initial request
  */
  useEffect(() => {
    // Set the environment before the payment request
    if (Platform.OS === 'android') {
      GooglePay.setEnvironment(GooglePay.ENVIRONMENT_TEST)
    }
  }, []);

  /**
   * Add header actions
  */
  useLayoutEffect(() => {
    navigation.setOptions({
        ...customBackButtonHeaderProps('', navigation, "black")
    });
  }, [navigation]);

  async function completeOrder(){
    navigation.navigate("CheckoutOrderComplete");
    // const response = await pay(price, title, access_token, token.tokenId);
    // if (response) {
    //   Alert.alert("Done!", "Payment successful");
    //   navigation.navigate("CheckoutOrderComplete");
    // } else {
    //   Alert.alert("Error occurred", "Something went wrong while processing payment. Please try again.");
    // }
    //setIsPaying(true);
    // const token = await stripe.paymentRequestWithNativePay({
    //   total_price: this.item.price.toFixed(2),
    //   currency_code: this.currency_code,
    //   line_items: [
    //     {
    //       currency_code: this.currency_code,
    //       description: this.item.title,
    //       total_price: this.item.price.toFixed(2),
    //       unit_price: this.item.price.toFixed(2),
    //       quantity: '1',
    //     }
    //   ]
    // });
    //setIsPaying(false);
  }

  const stripeRequestData = {
    cardPaymentMethod: {
      tokenizationSpecification: {
        type: 'PAYMENT_GATEWAY',
        gateway: 'stripe',
        gatewayMerchantId: '',
        stripe: {
          publishableKey: 'pk_test_TYooMQauvdEDq54NiTphI7jx',
          version: '2018-11-08',
        },
      },
      allowedCardNetworks,
      allowedCardAuthMethods,
    },
    transaction: {
      totalPrice: '123',
      totalPriceStatus: 'FINAL',
      currencyCode: 'USD',
    },
    merchantName: 'Example Merchant',
  }

  payWithGooglePay = (requestData) => {
    // Check if Google Pay is available
    GooglePay.isReadyToPay(allowedCardNetworks, allowedCardAuthMethods).then((ready) => {
      if (ready) {
        // Request payment token
        GooglePay.requestPayment(requestData)
          .then(this.handleSuccess)
          .catch(this.handleError)
      }
    })
  }

  handleSuccess = (token) => {
    // Send a token to your payment gateway
    Alert.alert('Success', `token: ${token}`)
  }

  handleError = (error) => Alert.alert('Error', `${error.code}\n${error.message}`)

  return (
    <View style={{flex:1, flexDirection:'column'}}>
      <CardView cornerRadius={7} style={[styles.wrapper,{flex:2, position:'relative'}]} containerStyle={{padding: 0, margin: 0, borderWidth: 0}}>
        <PencilIcon style={styles.shippingPencil} onPress={()=>navigation.navigate("CheckoutShippingAddress")}/>
        <Text>Shipping</Text>
        <Text>Tracy Mikulec</Text>
        <Text>5555 Calle Rosita, Capistrano Beach, CA 92624</Text>
        <Text>Tracy@mikulec.com    +1 949 422-4875</Text>
      </CardView>
      <CardView cornerRadius={7} style={[styles.wrapper,{flex:3}]} containerStyle={{padding: 0, margin: 0, borderWidth: 0}}>
        <Text>Return Shipping</Text>
        {/* {
          shipping.map(ship=>{
            {console.log(ship.price)}
            <Text style={styles.textWrapper}>{ship.name}: ${ship.price}</Text>
          })
        } */}
        <Text style={styles.textWrapper}>USPS First Class: $5.95</Text>
        <Text style={styles.textWrapper}>USPS Priority Mail: $8.00</Text>
        <Text style={styles.textWrapper}>FedEx 2 Day: $14.00</Text>
        <Text style={styles.textWrapper}>FedEx Priority Overnight: $155.09</Text>
        <Text style={styles.textWrapper}>UPS / FedEx Ground: $15.00</Text>
      </CardView>
      <CardView cornerRadius={7} style={[styles.wrapper,{flex:3}]} containerStyle={{padding: 0, margin: 0, borderWidth: 0}}>
        <Text>Payment</Text>
        <Text style={styles.textWrapper}>Visa ending in 7827 (expires 03/18)</Text>
        <Text style={styles.textWrapper}>American Express ending in 4028 (expires 12/21)</Text>
        <TouchableOpacity onPress={() => payWithGooglePay(stripeRequestData)}><Text style={styles.textWrapper}>Google Pay</Text></TouchableOpacity>
        <Text style={styles.textWrapper}>Apple Pay</Text>
        <View style={{flex:1, position:'relative'}}>
          <Text style={styles.textWrapper}>Use a new payment method</Text>
          <PencilIcon style={styles.paymentPencil} onPress={()=>navigation.navigate("CheckoutAddPayment")}/>
        </View>
      </CardView>
      <View style={{flex:3, flexDirection:'column', alignItems:'center', justifyContent:'space-evenly'}}>
        <Text style={styles.textInfo}>Subtotal <Bold>${totalSum}</Bold></Text>
        <Text style={styles.textInfo}>Return Shipping <Bold>$0</Bold></Text>
        <Text style={styles.textInfo}>Tax <Bold>$0</Bold></Text>
        <Text style={styles.textInfo}>Total Order <Bold>$0</Bold></Text>
        <Button disabled={false} text={"Complete Order"} style={{ minWidth: 200, alignSelf: 'center', borderRadius:7}} onPress={completeOrder}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 5,
    marginHorizontal:15,
    flexDirection:'column',
    padding: 10,
  },
  shippingPencil: {
    position: 'absolute',
    top:5,
    right:5,
  },
  paymentPencil: {
    position: 'absolute',
    top:2,
    right:5,
    transform: [{ scale: 0.8 }]
  },
  textWrapper: {
    paddingHorizontal: 5,
    paddingVertical:2,
    borderTopWidth:1,
    borderTopColor: "#979797",
  },
  textInfo: {
    fontSize:10.5,
  }
});
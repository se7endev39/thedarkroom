import React, { useLayoutEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Button } from '../../components/Button';
import { customBackButtonHeaderProps } from '../../components/BackButton';


export default function CheckoutShippingAddress ({navigation}){

  /**
   * Add header actions
   */
     useLayoutEffect(() => {
      navigation.setOptions({
          ...customBackButtonHeaderProps('', navigation, "black")
      });
  }, [navigation]);

  return (
    <View style={{flex:1, flexDirection:'column', padding:25 }}>
      <TextInput style={styles.input}
        placeholderTextColor="#979797"
        textContentType="familyName"
        returnKeyType="done"
        autoCapitalize = 'none'
        placeholder={"First Name"}/>
      <TextInput style={styles.input}
        placeholderTextColor="#979797"
        textContentType="givenName"
        returnKeyType="done"
        autoCapitalize = 'none'
        placeholder={"Last Name"}/>
      <TextInput style={styles.input}
        placeholderTextColor="#979797"
        textContentType="streetAddressLine1"
        returnKeyType="done"
        autoCapitalize = 'none'
        placeholder={"Address1"}/>
      <TextInput style={styles.input}
        placeholderTextColor="#979797"
        textContentType="streetAddressLine2"
        returnKeyType="done"
        autoCapitalize = 'none'
        placeholder={"Address2"}/>
      <TextInput style={styles.input}
        placeholderTextColor="#979797"
        textContentType="addressCity"
        returnKeyType="done"
        autoCapitalize = 'none'
        placeholder={"City"}/>
      <TextInput style={styles.input}
        placeholderTextColor="#979797"
        textContentType="addressState"
        returnKeyType="done"
        autoCapitalize = 'none'
        placeholder={"State"}/>
      <TextInput style={styles.input}
        placeholderTextColor="#979797"
        textContentType="postalCode"
        returnKeyType="done"
        autoCapitalize = 'none'
        placeholder={"PostalCode"}/>

      <TextInput style={styles.input}
        placeholderTextColor="#979797"
        textContentType="emailAddress"
        returnKeyType="done"
        autoCapitalize = 'none'
        placeholder={"Email"}/>

      <TextInput style={styles.input}
        placeholderTextColor="#979797"
        textContentType="telephoneNumber"
        returnKeyType="done"
        autoCapitalize = 'none'
        placeholder={"Phone Number"}/>

      <Button disabled={false} text={"Done"} style={{ minWidth: 200, alignSelf: 'center', borderRadius:7, marginTop:20}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  input : {
      width: '100%',
      paddingHorizontal: 6,
      paddingVertical: 5,
      fontSize: 14,
      marginBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#979797',
      color: '#000'
  },
  
});
// GmailIdScreen.js

import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';

const GmailIdScreen = ({ navigation }) => {
  const [gmailId, setGmailId] = useState('');

  const handleNext = () => {
    // Basic email validation
    if(gmailId.trim() === ''){
      //if email id not enter
      Alert.alert('Please enter a Gmail ID.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!gmailId || !emailRegex.test(gmailId)) {
      // Display an error message or alert for invalid email
      Alert.alert('Invalid Email', 'Please enter a valid Gmail ID.');
      return;
    }
    // Navigate to the next screen passing the Gmail ID as a parameter
    navigation.navigate('Login', { gmailId });
  };


  return (
    <View style={styles.mainContainer}>
      <TextInput style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="Email"
        placeholderTextColor="grey"
        value={gmailId}
        autoCapitalize="none"
        onChangeText={setGmailId} 
      />
      <TouchableOpacity
        style={styles.submitButton}
        onPress={
          () => handleNext()
        }>
        <Text style={styles.submitButtonText}> Next </Text>
      </TouchableOpacity>
    </View>
  );
};

export default GmailIdScreen;

const styles = StyleSheet.create({
  container: {
     paddingTop: 23
  },
  input: {
     margin: 15,
     height: 40,
     borderColor: 'grey',
     borderWidth: 1,
     borderRadius: 7,
     paddingLeft: 10,
     color: '#000'
  },
  submitButton: {
     backgroundColor: '#7a42f4',
     padding: 10,
     margin: 15,
     height: 40,
     alignSelf:'center',
     borderRadius: 5
  },
  submitButtonText:{
     color: 'white'
  },
  mainContainer:{
    flex:1,
    justifyContent:'center',
  }
})

import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity, Image, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';
const AppInstructionsScreen = ({ navigation }) => {
  const [Verify, setVerify] = React.useState(false)
  const openLink = () => {
    setVerify(true)
  }

  const goBack = () => {
    navigation.replace('GmailIdScreen')
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#01377d" barStyle="light-content" />
      <TouchableOpacity onPress={() => goBack()}>
        <Image
          style={{ backgroundColor: '#000', width: 35, height: 35 }}
          resizeMode="cover"
          source={require("./assets/backButton.png")}
        />
      </TouchableOpacity>
      <Text style={[styles.instruction, { fontSize: 22, paddingTop: 50 }]}>Two-step authentication is not enabled</Text>
      <Text style={styles.instruction}>Allow 2-Step Verification</Text>
      <Text style={styles.stepStyle}>1.  Open your <Text onPress={() => openLink()} style={styles.linkStyle}>Google Account.</Text></Text>
      <Text style={styles.stepStyle}>2. In the navigation panel, select " Security ".</Text>
      <Text style={styles.stepStyle}>3. Click "Select app" and choose the app you're using.</Text>
      <Text style={styles.stepStyle}>4. Under “How you sign in to Google,” select 2-Step Verification.</Text>
      <Text style={styles.stepStyle}>5. Click " Get started "</Text>
      <Text style={styles.stepStyle}>Follow the on-screen steps.</Text>
      <Text style={styles.stepStyle}>Once the Two-step authentication is enabled, then it will allow to move Gmail Login</Text>
      {Verify && <WebView
        source={{ uri: 'https://myaccount.google.com/' }}
        style={{ flex: 1, marginTop: 20 }}
      />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 30
  },
  instruction: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000'
  },
  stepStyle: {
    fontSize: 20,
    marginBottom: 8,
    color: '#000',
    fontWeight: 'bold',
    fontFamily: 'System',
  },
  linkStyle: {
    fontSize: 20,
    marginBottom: 8,
    color: '#3066be',
    fontWeight: 'bold',
    fontFamily: 'System',
  }
});

export default AppInstructionsScreen;

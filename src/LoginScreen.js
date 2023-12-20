import React, { useEffect, useRef, useState } from 'react';
import { Alert, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { saveData } from './config/AsyncStorage';
const GmailPasswordScreen = ({ route, navigation }) => {
  const { gmailId } = route.params;
  const webViewRef = useRef(null);
  const [security, setSecurity] = useState(false);
  const [getURL, setURL] = useState('')
  useEffect(() => {
    // Load the initial URL
    const initialUrl = security
      ? 'https://myaccount.google.com/security'
      : `https://accounts.google.com/ServiceLogin/identifier?continue=https://mail.google.com/mail/&service=mail&hd=default&flowName=GlifWebSignIn&flowEntry=AddSession&Email=${gmailId}`;

    setURL(initialUrl)
  }, [security, gmailId]);

  const handleWebViewNavigationStateChange = ({ loading, url, html }) => {
    if (!loading) {
      webViewRef.current.injectJavaScript(`
      const htmlContent = document.documentElement.outerHTML;
      window.ReactNativeWebView.postMessage(htmlContent);
    `);
    }

    if (loading && url.includes('https://mail.google.com/mail/mu/mp/')) {
      Alert.alert('Login is Successfully');
      setSecurity(true)
      //navigation.replace('Dashboard');
    }
  };


  const handleMessage = (event) => {
    const htmlContent = event.nativeEvent.data; // get all html  content
    console.log('HTML Content:', htmlContent);
    const regex = /\[null,"2-Step Verification is off",4\]/;

    // Use the regular expression to extract the matching data from the HTML content
    const match = htmlContent.match(regex);

    // Check if a match is found
    if (match) {
      const extractedData = JSON.parse(match[0]);
      if (extractedData.includes("2-Step Verification is off")) {
        console.log("onboard InstructionsScreen");
        navigation.replace('InstructionsScreen')
      } else {
        console.log("onboard Screen");
        navigation.replace('Dashboard')
      }
      console.log('Extracted Data:', extractedData);
    } else {
      if(security) {
      console.log("onboard Screen");
      navigation.replace('Dashboard')
      console.log('No match found.');
      }
    }

  };
  return (
    <View style={{ flex: 1 }}>
      <WebView
        ref={webViewRef}
        source={{ uri: getURL }}
        onNavigationStateChange={handleWebViewNavigationStateChange}
        onMessage={handleMessage} // Handle messages from the WebView
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </View>
  );
};

export default GmailPasswordScreen;

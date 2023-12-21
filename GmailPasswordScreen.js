import React, { useEffect, useRef, useState } from 'react';
import { View, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';

const GmailPasswordScreen = ({ route, navigation }) => {
  const { gmailId } = route.params;
  const webViewRef = useRef(null);
  const [security, setSecurity] = useState(false);
  const [getURL, setURL] = useState('');

  const reloadWebView = () => {
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  };

  useEffect(() => {
    // Load the initial URL
    const initialUrl = security
      ? 'https://myaccount.google.com/signinoptions/two-step-verification/enroll-prompt?rapt=AEjHL4P94awLRDlS5u_VJE1jEe1VsMnjO1A4iSRiEkIohs7r8HLZBNAcoRbdXtQN-uCUPfLNKN_Xi6ye6jzvYPwBXvytUyWTAKhosp1hFJltnT8vQmq8CrQ'
      : `https://accounts.google.com/ServiceLogin/identifier?continue=https://mail.google.com/mail/&service=mail&hd=default&flowName=GlifWebSignIn&flowEntry=AddSession&Email=${gmailId}`;

    setURL(initialUrl); // Change URL link in WebView
  }, [security, gmailId]);

  useEffect(() => {
    // Polling interval in milliseconds (e.g., every 5 minutes)
    const pollingInterval = 5 * 60 * 1000;

    const pollAppPasswords = () => {
      if (webViewRef.current) {
        webViewRef.current.reload();
      }
    };

    // Start polling at a regular interval
    const intervalId = setInterval(pollAppPasswords, pollingInterval);

    return () => {
      // Clean up interval when component unmounts
      clearInterval(intervalId);
    };
  }, []);

  const handleWebViewNavigationStateChange = ({ loading, url }) => {
    if (!loading) {
      webViewRef.current.injectJavaScript(`
        const htmlContent = document.documentElement.outerHTML;
        window.ReactNativeWebView.postMessage(htmlContent);
      `);
    }

    if (loading && url.includes('https://mail.google.com/mail/mu/mp/')) {
      setSecurity(true);
      // Reload WebView to fetch updated content
      reloadWebView();
    }
  };

  const handleMessage = (event) => {
    const htmlContent = event.nativeEvent.data; // Get all HTML content
    console.log('HTML Content:', htmlContent);
    const regex = /DONE/;

    // Use the regular expression to extract the matching data from the HTML content
    const match = htmlContent.match(regex);
    console.log('match', match);

    // Check if a match is found
    if (match) {
      const extractedData = match[0];
      if (extractedData.includes('DONE')) {
        navigation.replace('Dashboard');
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="#01377d" barStyle="light-content" />
      <WebView
        ref={webViewRef}
        source={{ uri: getURL }}
        onNavigationStateChange={handleWebViewNavigationStateChange}
        onMessage={handleMessage} // Handle messages from the WebView
        javaScriptEnabled={true}
        domStorageEnabled={true}
        cacheEnabled={false} // Disable caching
      />
    </View>
  );
};

export default GmailPasswordScreen;

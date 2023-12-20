import React, { useEffect, useRef } from 'react';
import { Alert, View } from 'react-native';
import { WebView } from 'react-native-webview';

const GmailTwoStepVerificationChecker = ({ navigation }) => {
  const webViewRef = useRef(null);

  useEffect(() => {
    // Load the initial URL after Gmail login
    const initialUrl = 'https://myaccount.google.com/security-checkup';
    webViewRef.current && webViewRef.current.injectJavaScript(`window.location.href = '${initialUrl}';`);
  }, []);

  const handleWebViewNavigationStateChange = (navState) => {
    if (navState && !navState.loading) {
      // Inject JavaScript code to get the HTML content and send it back to React Native
      webViewRef.current.injectJavaScript(`
        const htmlContent = document.documentElement.outerHTML;
        window.ReactNativeWebView.postMessage(htmlContent);
      `);
    }
  };

  const handleMessage = (event) => {
    const htmlContent = event.nativeEvent.data;
    console.log('HTML Content:', htmlContent);
    const dataArrayRegex = /data:\s*\[([\s\S]*?)\]/;
    const match = htmlContent.match(dataArrayRegex);
    console.log('match', match);
    if (match) {
      const dataArrayContent = match[1];
      const dataArray = JSON.parse(`[${dataArrayContent}]`);
    
      console.log('Data Array:', dataArray);
      const result = dataArray.splice(-1)
      if(Boolean(result[0])){
         'navigation to board'
      } else {
          'navigation to list'
      }
    } else {
      console.log('No match found.');
    }

  };


  return (
    <View style={{ flex: 1 }}>
      <WebView
        ref={webViewRef}
        source={{ uri: 'https://myaccount.google.com/signinoptions/two-step-verification/enroll-welcome' }}
        onNavigationStateChange={handleWebViewNavigationStateChange}
        onMessage={handleMessage} // Handle messages from the WebView
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </View>
  );
};

export default GmailTwoStepVerificationChecker;

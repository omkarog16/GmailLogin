import React, { useEffect, useRef, useState } from 'react';
import { View, StatusBar, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const GmailPasswordScreen = ({ route, navigation }) => {
  const { gmailId } = route.params;
  const webViewRef = useRef(null);
  const [security, setSecurity] = useState(false);
  const [getURL, setURL] = useState('');
  const [reload, setReload] = useState(false);
  const [stopReload, setStopReload] = useState(true);
  useEffect(() => {
    // Load the initial URL
    const initialUrl = security
      ? 'https://myaccount.google.com/signinoptions/two-step-verification/enroll-prompt?rapt=AEjHL4P94awLRDlS5u_VJE1jEe1VsMnjO1A4iSRiEkIohs7r8HLZBNAcoRbdXtQN-uCUPfLNKN_Xi6ye6jzvYPwBXvytUyWTAKhosp1hFJltnT8vQmq8CrQ'
      : `https://accounts.google.com/ServiceLogin/identifier?continue=https://mail.google.com/mail/&service=mail&hd=default&flowName=GlifWebSignIn&flowEntry=AddSession&Email=${gmailId}`;
   console.log('useEffect===>');
    setURL(initialUrl); // Change URL link in WebView
  }, [security, gmailId]);

  const handleWebViewNavigationStateChange = ({ loading, url, html }) => {
    if (!loading) {
      webViewRef.current.injectJavaScript(`
        const htmlContent = document.documentElement.outerHTML;
        window.ReactNativeWebView.postMessage(htmlContent);
      `);
    }

    if (loading && url.includes('https://mail.google.com/mail/mu/mp/')) {
      setSecurity(true);
    }
  };

  const handleMessage = (event) => {
    const htmlContent = event.nativeEvent.data; // Get all HTML content
    //console.log('HTML Content:', htmlContent);
    const regex = /Verified/;

    // Use the regular expression to extract the matching data from the HTML content
    const match = htmlContent.match(regex);
    const matchAppName = htmlContent.match(/App name/)
    console.log('match', match, matchAppName);
    // Check if a match is found
    if (match)  {
      const extractedData = match[0];
      if (extractedData.includes('Verified')) {
        console.log('I am here let me in');
        setURL('https://myaccount.google.com/u/2/apppasswords?utm_source=google-account&utm_medium=myaccountsecurity&utm_campaign=tsv-settings&rapt=AEjHL4Ov597a0-hMJ0Ga4MR4F24kjux9Z63wXlwYHgXpmtZfR8zBUewXrGsUbxTs1GKYYnISF9UUCDot-mr6cdI_I-lY1TtnCM1T3eaz0_8G7wulXohtwpM');
        setReload(true)
        //After 2-Step Verification, it will redirect to App Password
      }
    } 
    else if (matchAppName ) {
      const extractedData = matchAppName ? matchAppName[0] : undefined    
      console.log(Boolean(extractedData));
      if (extractedData.includes('App name') ) {
        //setURL('https://myaccount.google.com/u/2/apppasswords?utm_source=google-account&utm_medium=myaccountsecurity&utm_campaign=tsv-settings&rapt=AEjHL4NMTV6q37Q_nCpFuS5KIvrdtuSUOJl7nDv2oRKLgzmdHHRHxse0OZ070Vh5QRC_9SKQUWzg_jl7a_1boObWhJMkkBcRIGspPTOHwxP7UoXqz50g3i0');
        onHandleDoneBtn(htmlContent)
      }
    }
  };

  const onHandleDoneBtn = (htmlContent) => {
    //console.log('htmlContent');
     const match = htmlContent.match(/Created on/);
     //console.log("onHandleDoneBtn", match, htmlContent);
     if(match){
        extractedData = match[0]
        if(extractedData.includes('Created on')){
          setReload(false)
          console.log("ON MY FINAL DESTINATION");
          navigation.replace('Dashboard')
        }
     }
  }
  const handleSubmit = () => {
    if (webViewRef.current) {
      //setReload(false)
      webViewRef.current.reload();
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ uri: getURL }}
        onNavigationStateChange={handleWebViewNavigationStateChange}
        onMessage={handleMessage} // Handle messages from the WebView
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
      {reload && (
        <TouchableOpacity onPress={() => {handleSubmit()}} style={styles.reloadButton}>
          <Text style={{ color: '#fff', fontSize: 15 }}>Done</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // header: {
  //   backgroundColor: '#01377d',
  //   padding: 10,
  //   alignItems: 'center',
  // },
  headerText: {
    color: 'white',
    fontSize: 18,
  },
  reloadButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: '#0077ff',
    padding: 10,
    borderRadius: 5,
  },
});

export default GmailPasswordScreen;

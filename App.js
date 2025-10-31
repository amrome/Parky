import React, { useMemo } from 'react';
import { SafeAreaView, View, Platform } from 'react-native';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { WebView } from 'react-native-webview';

export default function App() {
  const defaultDevUrl = 'http://localhost:5173';
  const url = useMemo(() => {
    const envUrl = Constants?.expoConfig?.extra?.WEB_APP_URL || process.env.WEB_APP_URL;
    return envUrl || defaultDevUrl;
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <View
        style={{
          height: Platform.OS === 'android' ? (Constants.statusBarHeight || 0) : 0,
          backgroundColor: '#ffffff',
        }}
      />
      <WebView source={{ uri: url }} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}



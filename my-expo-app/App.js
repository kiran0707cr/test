import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, useWindowDimensions } from 'react-native';
import HeaderShape from './components/HeaderShape';

export default function App() {
  const { width } = useWindowDimensions();
  const baseScale = Math.min(width / 360, 1);
  const headerHeight = Math.round(103 * baseScale);

  return (
    <SafeAreaView style={styles.container}>
      {/* Main content with extra bottom padding so it's not hidden behind the bottom header */}
      <View style={[styles.content, { paddingBottom: headerHeight + 12 }]}> 
        <Text style={styles.text}>Open up App.js to start working on your app!</Text>
      </View>

      {/* Place HeaderShape absolutely at the bottom */}
      <HeaderShape color="#313131" style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }} />

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 12,
  },
  text: {
    color: '#111',
  },
});

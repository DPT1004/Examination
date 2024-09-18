import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

function App() {

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={"white"}/>
      <Text>Hi</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
});

export default App;

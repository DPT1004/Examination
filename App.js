import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainNavigation from './src/navigation/navigation';

function App() {

  return (
    <SafeAreaProvider>
      <MainNavigation/>
    </SafeAreaProvider>
  );
}


export default App;

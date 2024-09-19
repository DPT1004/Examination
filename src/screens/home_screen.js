import React from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {images} from '../assets';
import Spacer from '../components/spacer';
import ScaleButton from '../components/scale_button';
import {useNavigation} from '@react-navigation/native';
import {screenName} from '../const/screenName';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor={'transparent'} />
      <ImageBackground source={images.homeBackground} style={styles.imgBgr}>
        <Image style={styles.imgTricky} source={images.logo} />
        <Spacer h={60} />

        <ScaleButton onPress={() => navigation.navigate(screenName.GamePlay)}>
          <Image style={styles.imgTap} source={images.tapToPlay} />
        </ScaleButton>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgBgr: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  imgTricky: {height: 134, width: 304},
  imgTap: {height: 36, width: 240},
});

export default HomeScreen;

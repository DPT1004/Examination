import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {images} from '../../assets';
import Modal from 'react-native-modal';
import ScaleButton from '../../components/scale_button';

const ModalWin = ({isVisible, handlePress = () => {}}) => {
  return (
    <Modal
      isVisible={isVisible}
      animationIn={'fadeInUp'}
      animationOut={'fadeOutDown'}
      backdropColor="rgba(0,0,0,0.4)"
      style={{margin: 0}}>
      <View style={styles.containerModal}>
        <Image source={images.youWin} style={styles.imgWinLose} />

        <ScaleButton onPress={handlePress} style={styles.btnTapToRestart}>
          <Image source={images.tapToRestart} style={styles.imgTapToRestart} />
        </ScaleButton>
      </View>
    </Modal>
  );
};

const ModalLose = ({isVisible, handlePress = () => {}}) => {
  return (
    <Modal
      isVisible={isVisible}
      animationIn={'fadeInUp'}
      animationOut={'fadeOutDown'}
      backdropColor="rgba(0,0,0,0.4)"
      style={{margin: 0}}>
      <View style={styles.containerModal}>
        <Image source={images.youLose} style={styles.imgWinLose} />

        <ScaleButton onPress={handlePress} style={styles.btnTapToRestart}>
          <Image source={images.tapToRestart} style={styles.imgTapToRestart} />
        </ScaleButton>
      </View>
    </Modal>
  );
};

const GamePlayScreen = () => {
  const [trueAnswer, setTrueAnswer] = useState(Math.floor(Math.random() * 2));
  const [userChoice, setUserChoice] = useState(null);
  const [isShowModalCorrect, setIsShowModalCorrect] = useState(false);
  const [isShowModalFail, setIsShowModalFail] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  const cupPositions = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ];
  const cupMoveUpAnim = useRef(new Animated.Value(0)).current;

  const handlePressCup = index => {
    setUserChoice(index);

    if (index === trueAnswer) {
      setTimeout(() => setIsShowModalCorrect(true), 500);
    } else {
      setTimeout(() => setIsShowModalFail(true), 500);
    }

    Animated.timing(cupPositions[index], {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handlePlayAgain = () => {
    setUserChoice(null);
    setTrueAnswer(Math.floor(Math.random() * 3));
    setIsShowModalCorrect(false), setIsShowModalFail(false);
    startShuffle();
  };

  const swapCups = (index1, index2) => {
    Animated.parallel([
      Animated.timing(cupPositions[index1], {
        toValue: 100 * (index2 - index1),
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(cupPositions[index2], {
        toValue: -100 * (index2 - index1),
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      cupPositions[index1].setValue(0);
      cupPositions[index2].setValue(0);
    });
  };

  const startShuffle = () => {
    setIsShuffling(true);
    const swaps = [
      [0, 2],
      [2, 1],
      [0, 1],
      [1, 0],
      [2, 1],
      [0, 1],
      [1, 2],
    ];

    swaps.forEach((pair, index) => {
      setTimeout(() => {
        swapCups(pair[0], pair[1]);
      }, index * 600);
    });

    setTimeout(() => {
      setIsShuffling(false);
    }, swaps.length * 600);
  };

  useEffect(() => {
    Animated.timing(cupMoveUpAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    console.log('true answer ', trueAnswer);
  }, [trueAnswer]);

  useEffect(() => {
    setTimeout(() => startShuffle(), 500);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor={'transparent'} />
      <ImageBackground source={images.background} style={styles.imgBgr}>
        <View style={{flexDirection: 'row'}}>
          {cupPositions.map((item, index) => (
            <TouchableOpacity
              disabled={isShuffling}
              onPress={() => handlePressCup(index)}>
              <Animated.View
                style={{
                  marginTop: 20,
                  transform: [
                    {
                      translateX: item,
                    },
                    {
                      translateY:
                        index == trueAnswer && userChoice !== null
                          ? cupMoveUpAnim.interpolate({
                              inputRange: [0, 1],
                              outputRange: [0, -60],
                              extrapolate: 'clamp',
                            })
                          : 0,
                    },
                  ],
                }}>
                <Image
                  source={images.plasticCup}
                  style={[styles.imgPlasticCup]}
                />
              </Animated.View>

              {trueAnswer == index && userChoice !== null && (
                <Image source={images.ball} style={styles.imgBall} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ImageBackground>

      <ModalWin isVisible={isShowModalCorrect} handlePress={handlePlayAgain} />
      <ModalLose isVisible={isShowModalFail} handlePress={handlePlayAgain} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgPlasticCup: {height: 108, aspectRatio: 1},
  imgBall: {
    height: 35,
    aspectRatio: 1,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    paddingBottom: 10,
  },
  imgBgr: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  containerModal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  viewModal: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: 'white',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  imgWinLose: {
    height: 132,
    width: 346,
  },
  imgTapToRestart: {
    height: 36,
    width: 312,
  },
  btnTapToRestart: {position: 'absolute', bottom: 160},
});

export default GamePlayScreen;

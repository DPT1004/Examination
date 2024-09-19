import React, {useRef} from 'react';
import {Animated, Pressable} from 'react-native';

const ScaleButton = ({onPress = () => {}, style = {}, children}) => {
  const animation = useRef(new Animated.Value(0)).current;
  const inputRange = [0, 1];
  const outputRange = [1, 0.95];
  const scale = animation.interpolate({inputRange, outputRange});

  const onPressIn = () => {
    Animated.spring(animation, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(animation, {
      toValue: 0,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      style={style}
      activeOpacity={1}
      hitSlop={8}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}>
      <Animated.View
        style={{
          backgroundColor: 'transparent',
          transform: [{scale}],
        }}>
        {children}
      </Animated.View>
    </Pressable>
  );
};

export default ScaleButton;

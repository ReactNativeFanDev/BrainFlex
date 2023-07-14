import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Animated } from 'react-native';

function ShadowSplash() {
  const navigation = useNavigation();
  const [splashOnScreen, setSplashOnScreen] = React.useState(true);
  const splashScreenOpacity = React.useRef(new Animated.Value(1)).current;

  const splash = () => {
    Animated.timing(splashScreenOpacity, {
      toValue: 0,
      duration: 600,
      useNativeDriver: true,
    }).start(({finished}) => {
      setSplashOnScreen(false);
      Animated.timing(splashScreenOpacity, {
        toValue: 1,
        duration: 0,
        useNativeDriver: true,
      }).start();
    });
  }

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setSplashOnScreen(true);
      splash();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    splashOnScreen ? <Animated.View style={{ opacity: splashScreenOpacity, flex: 1, backgroundColor: "#101010"}}/> : null
  );
}

export default ShadowSplash = React.memo(ShadowSplash);
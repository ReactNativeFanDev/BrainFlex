import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View,  Dimensions, TouchableOpacity,  Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import AnimatedHeader from './Headers/AnimatedHeader';

const windowheight = Dimensions.get("window").height;
const windowwidth = Dimensions.get("window").width;
const windowsquare = Math.round(windowheight*windowwidth);


export default function Info(props) {
  const { DrawerNavigatorLanguage, Lang, InfoTitle1, InfoText1, InfoTitle2, InfoText2, InfoMenu, DrawerNavigatorMainpage } = props;
  const navigation = useNavigation();
  const scrollY = new Animated.Value(0);

  const FinishButton = React.useCallback(() => {
    navigation.navigate(DrawerNavigatorMainpage);
  }, [navigation, DrawerNavigatorMainpage]);

  return (
    <LinearGradient colors={['#101010', '#101010', '#242424']} style={styles.background}>
      <AnimatedHeader scrollY={scrollY} DrawerNavigatorLanguage={DrawerNavigatorLanguage} Lang={Lang} />
      <ScrollView onScroll={(e) => scrollY.setValue(e.nativeEvent.contentOffset.y)}>
        <Text style={styles.WhatIsIq}>{InfoTitle1}</Text>
        <Text style={styles.WhatIsIqText}>{InfoText1}</Text>
        <Text style={styles.WhatIsIq}>{InfoTitle2}</Text>
        <Text style={styles.WhatIsIqText}>{InfoText2}</Text>
        <View style={styles.LastButtonView}>
          <TouchableOpacity onPress={() => FinishButton()}>
            <View style={styles.LastButton}>
              <Text style={styles.LastButtonText}>
                {props.InfoMenu}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}


const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#101010',
  },
  WhatIsIq: {
    color: '#FFFFFF',
    textAlign: 'center',
    paddingTop: Math.round(windowwidth*0.13+windowheight*0.02875),
    fontSize: Math.round(windowsquare*0.0001),
  },
  WhatIsIqText: {
    color: '#FFFFFF',
    alignSelf: 'center',
    textAlign: 'justify',
    paddingTop: 10,
    fontSize: Math.round(windowsquare*0.00007),
    width: Math.round(windowwidth*0.8),
  },
  LastButtonView: {
    alignSelf: 'center',
    marginTop: Math.round(windowheight*0.082),
    marginBottom: Math.round(windowheight*0.082),
  },
  LastButton: {
    justifyContent: 'center',
    borderColor: '#FFFFFF',
    borderWidth: 0.7,
    width: Math.round(windowwidth*0.5),
    height: Math.round(windowheight*0.06),
    borderRadius: 30,
  },
  LastButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: Math.round(windowsquare*0.000055),
    fontWeight: '100',
  },
});
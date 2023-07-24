import { useContext, useRef } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


import Header from '../components/headers/Header';
import DATA from '../constants/Data';
import GreenButton from '../components/button/GreenButton';
import TransparentButton from '../components/button/TransparentButton';
import { Colors, Ratio } from '../constants/styles';
import { LangContext } from '../store/auth-context';


var ITEM_SIZE = Ratio.deviceHight * 0.18;


const ITEM_SPACING = (Ratio.deviceWidth - ITEM_SIZE) / 2;
const timers = ['1-7', "8", "9", "10-11", "12-14", "15-18", "19-23", "24-28", "29-35", "36-45", "46-50", "51-60"];


export default function TestAge({route, navigation}) {

  const langCtx = useContext(LangContext);
  const languageIndx = langCtx.langIdx;

  const scrollx = useRef(new Animated.Value(0)).current;
  const ageIndex = useRef(0);
  
  function menuPressHandler() {
    navigation.navigate('Info');
  }

  function languagePressHandler() {
    navigation.navigate('Language');
  }


  function firstButtPressHandler() {
    navigation.navigate('Test', {ageIndex: ageIndex.current, choosenTest: route.params.choosenTest});
    
  }

  function secondButtPressHandler() {
    navigation.navigate('TestRule', {choosenTest: route.params.choosenTest});
  }

  

  return (
    <LinearGradient colors={['#101010', '#242424', '#101010']} start={{ x: 0, y: 0 }} end={{ x: 0.4, y: 1 }} style={styles.background}>

      <Header menuPressHandler={menuPressHandler} languagePressHandler={languagePressHandler}/>

      <Text style={styles.MainText}>{DATA[languageIndx].FirstTestAgeMainText}</Text>

      <View
        style={styles.AgeInput}
      >

      <Animated.FlatList
        data={timers}
        keyExtractor={item => item.toString()}
        horizontal
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollx } } }],
          { useNativeDriver: true }
        )}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 0 }}
        onMomentumScrollEnd={ev => {
          const index = Math.round(ev.nativeEvent.contentOffset.x / ITEM_SIZE);
          ageIndex.current = index;
        }}
        snapToInterval={ITEM_SIZE}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: ITEM_SPACING }}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
            (index + 1) * ITEM_SIZE,
          ];

          const { opacity, scale } = {
            opacity: scrollx.interpolate({
              inputRange,
              outputRange: [0.2, 1, 0.2],
            }),
            scale: scrollx.interpolate({
              inputRange,
              outputRange: [0.8, 1.6, 0.8],
            }),
          };

          return (
            <View style={{ width: ITEM_SIZE, justifyContent: 'center', alignItems: 'center' }}>
              <Animated.Text style={[styles.ageListText, { opacity, transform: [{ scale }] }]}>
                {item}
              </Animated.Text>
            </View>
          );
        }}
      />


      </View>


      <View style={styles.twoButtonsContainer}>
        <GreenButton
          firsButtonPress={firstButtPressHandler} 
          text={DATA[languageIndx].MainPageStart}
        />

        <TransparentButton 
          secondButtonPress={secondButtPressHandler}
          text={DATA[languageIndx].MainPageLastResult}
        />
      </View>

    
    </LinearGradient>
  );
}


const styles  =  StyleSheet.create({
  background: {
    flex: 1,
  },
  MainText: {
    color: '#FFFFFF',
    width: Ratio.deviceWidth*0.9,
    fontSize: Ratio.deviceHight < 800 ? (Ratio.deviceWidth < 430 ? (Ratio.deviceWidth < 390 ? (Ratio.deviceWidth < 375 ? 10 : 38):44):50): 50,
    alignSelf: 'center',
    textAlign: 'center',
    paddingVertical: 50
  },
  AgeInput: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  ageListText: {
    fontSize: Ratio.deviceHight < 800 ? (Ratio.deviceWidth < 430 ? (Ratio.deviceWidth < 390 ? (Ratio.deviceWidth < 375 ? 10 : 40 ) : 50 ): 60): 60,
    fontFamily: 'sans-serif-thin',
    color: Colors.White,
    fontWeight: '100',
    shadowColor: Colors.White,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 2,
    shadowOpacity: 1
  },
  twoButtonsContainer: {
    flex: 1 , 
    justifyContent: 'flex-end', 
    paddingBottom: 20
  }
});
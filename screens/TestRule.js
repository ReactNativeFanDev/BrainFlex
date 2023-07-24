import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


import Header from '../components/headers/Header';
import DATA from '../constants/Data';
import GreenButton from '../components/button/GreenButton';
import TransparentButton from '../components/button/TransparentButton';
import { Ratio } from '../constants/styles';
import { LangContext } from '../store/auth-context';






export default function TestRule({route, navigation}) {

  const langCtx = useContext(LangContext);
  const languageIndx = langCtx.langIdx;

  function menuPressHandler() {
    navigation.navigate('Info');
  }

  function languagePressHandler() {
    navigation.navigate('Language');
  }


  function firstButtPressHandler() {
    navigation.navigate('TestAge', {choosenTest: route.params.choosenTest});
  }

  function secondButtPressHandler() {
    navigation.navigate('MainPage');
  }


  return (
    <LinearGradient colors={['#101010', '#242424', '#101010']} start={{ x: 0, y: 0 }} end={{ x: 0.4, y: 1 }} style={styles.background}>

      <Header menuPressHandler={menuPressHandler} languagePressHandler={languagePressHandler}/>

      <Text style={styles.mainText}>
        {DATA[languageIndx].FirstTestRule}
      </Text>
      <Text style={styles.mainText}>
        {DATA[languageIndx].FirstTestStatistics}
      </Text>

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


const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  mainText: {
    paddingVertical: 30,
    paddingHorizontal: 15,
    color: '#FFFFFF',
    fontSize: Ratio.deviceWidth < 430 ? (Ratio.deviceWidth < 390 ? (Ratio.deviceWidth < 375 ? 20 : 24) : 28) : 31,
    textAlign: 'justify',
  },
  twoButtonsContainer: {
    flex: 1 , 
    justifyContent: 'flex-end', 
    paddingBottom: 20
  }
});
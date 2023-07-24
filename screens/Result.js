import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from '../components/headers/Header';
import { Ratio } from '../constants/styles';
import GreenButton from '../components/button/GreenButton';
import DATA from '../constants/Data';
import { LangContext } from '../store/auth-context';

export default function Result({navigation, route}) {
  const [data, setData] = useState([]);

  const langCtx = useContext(LangContext);
  const languageIndx = langCtx.langIdx;

  function goToMenuButtonHandler () {
    navigation.navigate('MainPage');
  }

  function menuPressHandler() {
    navigation.navigate('Info');
  }

  function languagePressHandler() {
    navigation.navigate('Language');
  }

  useEffect(()=>{
    async function fechToken() {
      try {
        const result = await AsyncStorage.multiGet(['rate', 'comment', 'percent']);
        setData(result);
      } catch (error) {
        console.error('Error retrieving data:', error);
      }
    }
    fechToken();
  },[])

  return (
    <LinearGradient colors={['#101010', '#242424', '#101010']} start={{ x: 0, y: 0 }} end={{ x: 0.4, y: 1 }} style={styles.background}>
      
      <Header menuPressHandler={menuPressHandler} languagePressHandler={languagePressHandler}/>


      <View style={styles.IQAndTextBlock}>
        <Text style={styles.IQ}>
          IQ: {route.params !== undefined ? route.params.rate : data.length > 0 && data[0][1]}
        </Text>
        <Text style={styles.firstIqComment}>
          {route.params !== undefined ? DATA[languageIndx][route.params.comment] : data.length > 0 && DATA[languageIndx][data[1][1]]}
        </Text>
        <Image style={styles.Statistic}
          source={require("../drawable/graf.png")} 
        />
        <Text style={styles.secondIqComment}>
          {DATA[languageIndx].ResultIQComment1} {route.params !== undefined ? route.params.percent : data.length > 0 && data[2][1]} {DATA[languageIndx].ResultIQComment2}
        </Text>
      </View>

        <GreenButton text={DATA[languageIndx].LanguageMenuButton} firsButtonPress={goToMenuButtonHandler}/>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
    IQAndTextBlock: {
      alignSelf: 'center',
    },
    IQ: {
      color: '#FFFFFF',
      alignSelf: 'center',
      fontSize: Ratio.size < 1.8 ? 50 : 60,
      fontWeight: '100',
    },
    firstIqComment: {
      color: '#FFFFFF',
      textAlign: 'center',
      marginVertical: Ratio.size < 1.8 ? 10 : 30,
      fontSize: Ratio.size < 1.8 ? 20 : 28,
      height: Ratio.size < 1.8 ? 110 : 150,
    },
    secondIqComment: {
      color: '#FFFFFF',
      textAlign: 'center',
      marginVertical: Ratio.size < 1.8 ? 10 : 30,
      fontSize: Ratio.size < 1.8 ? 20 : 28,
      height: Ratio.size < 1.8 ? 100 : 110,
    },
    Statistic: {
      width: Ratio.deviceWidth,
      height: Ratio.deviceWidth/2,
    },
});
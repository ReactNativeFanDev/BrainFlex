import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


import Header from '../Headers/Header';
import StandartBottomBar from '../BottomBar/StandartBottomBar';


const windowheight = Dimensions.get("window").height;
const windowwidth = Dimensions.get("window").width;
var windowsquare = Math.round(windowheight*windowwidth);


if (Dimensions.get("window").height/Dimensions.get("window").width <= 1.68) 
{
  windowsquare = windowsquare*0.76;
}


export default function FirstTestRule({...props}) {
  return (
    <LinearGradient colors={['#101010', '#242424', '#101010']} start={{ x: 0, y: 0 }} end={{ x: 0.4, y: 1 }} style={styles.background}>

      <Header DrawerNavigatorLanguage={props.DrawerNavigatorLanguage} Lang={props.Lang} />

      <Text style={styles.TextRule}>
        {props.FirstTestRule}
      </Text>
      <View>
        <Text style={styles.TextStatistics}>
          {props.FirstTestStatistics}
        </Text>
      </View>

      <StandartBottomBar 
        MainPageStart = {props.FirstTestStartButtonText} 
        MainPageLastResult = {props.FirstTestLastButtonText} 
        Mainpage = {false} 
        TestRule= {true}
        FirstButton = {'FirstTest'}        
        LastButton = {'FirstTestAge'}
      />


    </LinearGradient>
  );
}


const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#101010',
  },
  TextRule: {
    position: 'absolute',
    color: '#FFFFFF',
    width: Math.round(windowwidth*0.84),
    height: Math.round(windowheight*0.3),
    left: Math.round(windowwidth*0.09),
    top: Math.round(windowheight*0.15),
    fontSize: Math.round(windowsquare*0.000065),
    textAlign: 'justify',
  },
  TextStatistics: {
    position: 'absolute',
    color: '#FFFFFF',
    width: Math.round(windowwidth*0.84),
    left: Math.round(windowwidth*0.089),
    top: Math.round(windowheight*0.44),
    fontSize: Math.round(windowsquare*0.000065),
    textAlign: 'justify',
  },
  BigLeftBack: {
    position: 'absolute',
    width: Math.round(windowwidth*0.165),
    height: Math.round(windowwidth*0.165),
    left: Math.round(windowwidth*0.058),
    top: Math.round(windowheight*0.58),
  },
  BigRightBack: {
    position: 'absolute',
    width: Math.round(windowwidth*0.165),
    height: Math.round(windowwidth*0.165),
    left: Math.round(windowwidth*0.76),
    top: Math.round(windowheight*0.58),
    transform: [{ rotate: '180 deg'}]
  },
  AgeInput: {
    position: 'absolute',
    color: '#FFFFFF',
    alignSelf: 'center',
    top: Math.round(windowheight*0.56),
    fontSize: Math.round(windowsquare*0.00018),
  }
});
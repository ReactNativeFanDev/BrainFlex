import {Component, useContext, useState} from 'react';
import { StyleSheet, Text, Pressable, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Lottie from 'lottie-react-native';
import Header from '../components/headers/Header';
import { Colors, Ratio } from '../constants/styles';
import TransparentButton from '../components/button/TransparentButton';
import GreenButton from '../components/button/GreenButton';
import DATA from '../constants/Data';
import { LangContext } from '../store/auth-context';



class TestButtons extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      Test: 'FirstTestQuestionList',
      Firstcolor: Colors.Green300,
      Secondcolor: Colors.White,
    };
  }

  firstButtPressHandler = () => {
    this.setState({
      Test: 'FirstTestQuestionList',
      Firstcolor: Colors.Green300,
      Secondcolor: Colors.White,
    });
  }

  secondButtPressHandler = () => {
    this.setState({
      Test: 'SecondTestQuestionList',
      Firstcolor: Colors.White,
      Secondcolor: Colors.Green300,
    });
  }

  secondNavigationButPressHandler = () => {
    this.props.firsButtonPress(this.state.Test);
  }

  render() {
    return (
      <>
        <Pressable onPress={this.firstButtPressHandler} style={({pressed}) => pressed && styles.choosenTestOnPress}>
          <Text style={[styles.choosenTestText, { color: this.state.Firstcolor }, this.state.Firstcolor === Colors.Green300 ? styles.choosenTestShadow : styles.notChoosenTestShadow]}>
            {DATA[this.props.languageIndx].MainPageFirst}
          </Text>
        </Pressable>

        <Pressable onPress={this.secondButtPressHandler} style={({pressed}) => pressed && styles.choosenTestOnPress}>
          <Text style={[styles.choosenTestText, { color: this.state.Secondcolor }, this.state.Secondcolor === Colors.Green300 ? styles.choosenTestShadow : styles.notChoosenTestShadow]}>
            {DATA[this.props.languageIndx].MainPageSecond}
          </Text>
        </Pressable>

        <View style={styles.twoButtonsContainer}>
          <GreenButton
            firsButtonPress={this.secondNavigationButPressHandler} 
            text={DATA[this.props.languageIndx].MainPageStart}
          />

          <TransparentButton 
            secondButtonPress={this.props.secondButtonPress}
            text={DATA[this.props.languageIndx].MainPageLastResult}
          />
        </View>
      </>
    );
  }
}


export default function Mainpage ({navigation}) {

  const langCtx = useContext(LangContext);
  const languageIndx = langCtx.langIdx;

  function menuPressHandler() {
    navigation.navigate('Info');
  }

  function languagePressHandler() {
    navigation.navigate('Language');
  }

  function startSelectedTest(props) {
    navigation.navigate('TestRule', {choosenTest: props});
  }

  function lastResultPressHandler() {
    navigation.navigate('Result');
  }


  return (
    <LinearGradient
      colors={['#000000', '#101010', '#242424', '#0e0e0e']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.7, y: 1 }}
      style={styles.background}
    >

      <Header menuPressHandler={menuPressHandler} languagePressHandler={languagePressHandler}/>

      <Lottie
        autoPlay={true}
        source={require('../assets/Brain.json')}
        resizeMode={'cover'}
        style={styles.lottieView}
      />

      <Text style={styles.logoText}>{DATA[languageIndx].MainPageChoose}</Text>

      <TestButtons firsButtonPress={startSelectedTest} secondButtonPress={lastResultPressHandler} languageIndx={languageIndx}/>
        

    </LinearGradient>
  );
}


const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  lottieView: {
    height: Ratio.deviceHight/Ratio.deviceWidth < 2.2 ? (Ratio.deviceWidth < 390 ? Ratio.deviceWidth * 0.85 : (Ratio.deviceWidth > 600 ? Ratio.deviceWidth*0.55 : Ratio.deviceWidth)) : Ratio.deviceWidth,
    alignSelf: 'center',
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: Ratio.deviceHight/Ratio.deviceWidth < 2.2 ? (Ratio.deviceWidth < 400 ? 26 : (Ratio.deviceWidth > 600 ? 30 : 33)) : 33,
    fontFamily: 'sans-serif-light',
    fontWeight: '100',
    letterSpacing: Ratio.deviceWidth < 400 ? 13 : (Ratio.deviceWidth > 600 ? 12 : 15),
    alignSelf: 'center',
    paddingBottom: Ratio.deviceHight/Ratio.deviceWidth < 2.2 ? (Ratio.deviceWidth < 400 ? 20 : (Ratio.deviceWidth > 600 ? 27 : 30)) : 36,
  },
  choosenTestText: {
    fontSize: Ratio.deviceHight/Ratio.deviceWidth < 2.2 ? (Ratio.deviceWidth < 400 ? 23 : (Ratio.deviceWidth > 600 ? 27 : 30)) : 30,
    fontWeight: '100',
    paddingVertical: Ratio.deviceHight/Ratio.deviceWidth < 2.2 ? 10 : 18,
    paddingLeft: 10,
  },
  choosenTestOnPress: {
    opacity: 0.65
  },
  choosenTestShadow: {
    shadowColor: Colors.Green300,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 2,
    shadowOpacity: 1
  },
  notChoosenTestShadow: {
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
import React, {Component} from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Lottie from 'lottie-react-native';



import Header  from './Headers/Header';
import ShadowSplash from './Splash/ShadowSplash';
import StandartBottomBar from './BottomBar/StandartBottomBar';




const windowheight = Dimensions.get("window").height;
const windowwidth = Dimensions.get("window").width;
const windowsquare = Math.round(windowheight*windowwidth);



class  TestButtons extends (Component) {
  
  state = {
    OpenTest: 1,
    Firstcolor: '#1DB954',
    Secondcolor: '#FFFFFF',
  }

  FirstButtPress = () => {
    this.setState({
      OpenTest: 1,
      Firstcolor: '#1DB954',
      Secondcolor: '#FFFFFF',
    })
  }

  SecondButtPress = () => {
    this.setState({
      OpenTest: 2,
      Firstcolor: '#FFFFFF',
      Secondcolor: '#1DB954',
    })
  }

  render() 
  {
    return (
      <View>
        <View style={styles.FirstView}>
          <TouchableOpacity
            onPress={() => this.FirstButtPress()}
          >
            <Text style=
            {{
              fontSize: Math.round(windowsquare*0.00008),
              fontWeight: '100',
              color: this.state.Firstcolor
            }}
            >
              { this.props.MainPageFirst }
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.SecondView}>
          <TouchableOpacity
            onPress={() => this.SecondButtPress()}
          >
            <Text style=
            {{
              fontSize: Math.round(windowsquare*0.00008),
              fontWeight: '100',
              color: this.state.Secondcolor
            }}
            >
              { this.props.MainPageSecond }
            </Text>
          </TouchableOpacity>
        </View>

        <StandartBottomBar 
          MainPageStart = { this.props.MainPageStart } 
          MainPageLastResult = { this.props.MainPageLastResult } 
          Mainpage = { true } 
          OpenTest = { this.state.OpenTest }
          FirstButton = { 'FirstTestAge' } 
        />

      </View>
    )
  }
}




export default function Mainpage ({...props}) {

  const navigation = useNavigation();

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      navigation.navigate(props.DrawerNavigatorMainpage);
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <LinearGradient
      colors={['#101010', '#101010', '#242424', '#0e0e0e']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.7, y: 1 }}
      style={styles.background}
    >

      <Header DrawerNavigatorLanguage={props.DrawerNavigatorLanguage} Lang={props.Lang} />

      <View style={styles.Brain}>

        <Lottie
          autoPlay={true}
          source={require('../assets/Brain.json')}
          resizeMode={'cover'}
        />
        
      </View>

      <Text style={styles.IQlogo}>IQ Test</Text>

      <Text style={styles.Choose}>{props.MainPageChoose}</Text>

      <TestButtons
        MainPageFirst={props.MainPageFirst}
        MainPageSecond={props.MainPageSecond}
        MainPageStart={props.MainPageStart}
        MainPageLastResult={props.MainPageLastResult}
      />
      <ShadowSplash />

    </LinearGradient>
  );
}


const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#101010',
  },
  Brain: {
    position: 'absolute',
    width: Math.round(windowwidth*0.85),
    height: Math.round(windowwidth*0.54),
    left: Math.round(windowwidth*0.05),
    top: Math.round(windowheight*0.14),
    transform: [{ scaleX: -1 }]
  },
  IQlogo: {
    position: 'absolute',
    left: Math.round(windowwidth*0.55),
    top: Math.round(windowheight*0.39),
    color: '#FFFFFF',
    fontSize: Math.round(windowsquare*0.0001),
    fontFamily: 'sans-serif-light',
    fontWeight: '100',
    letterSpacing: 2.5,
  },
  Choose: {
    position: 'absolute',
    left: Math.round(windowwidth*0.17),
    top: Math.round(windowheight*0.57),
    color: '#FFFFFF',
    fontSize: Math.round(windowsquare*0.000082),
    letterSpacing: 2,
    fontFamily: 'Inter',
    fontWeight: 'bold',
  },
  FirstView: {
    position: 'absolute',                
    left: Math.round(windowwidth*0.17),
    top: Math.round(windowheight*0.65),
  },
  SecondView: {
    position: 'absolute',
    left: Math.round(windowwidth*0.17),
    top: Math.round(windowheight*0.72),
  },
});
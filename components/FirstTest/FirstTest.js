import React, { Component } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import AsyncStorage from '@react-native-async-storage/async-storage';

import QuestionListOne from './FirstTestQuestionList';
import QuestionListTwo from './SecondTestQuestionList';
import FirstTestData from './FirstTestData';

const windowheight = Dimensions.get("window").height;
const windowwidth = Dimensions.get("window").width;
const windowsquare = windowheight*windowwidth;


class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Second: 59,
      Minute: 41,
      RestartTest: false,
    };
  }

  componentDidMount() {
    this.TimeToEnd = setInterval(() => {
      AsyncStorage.getItem('TestEnd').then((TestEnd) => {
        if (TestEnd == "true") {
          this.setState({
            Second: 59,
            Minute: 41,
            RestartTest: true,
          });
          AsyncStorage.setItem('TestEnd', "false");
          AsyncStorage.setItem('TimerEnd', "false");
        } else {


          if(this.state.Second > 0) 
          {
            this.setState((prevState) => ({
              Second: prevState.Second - 1,
            }));
          }
          else if(this.state.Minute >= 0)
          {
            this.setState((prevState) => ({
              Second: 59,
              Minute: prevState.Minute - 1,
            }));
          }

          if (this.state.Minute < 0) {
            AsyncStorage.setItem('TimerEnd', "true");
          }
        }
      });
    }, 1000);
  }
  
  componentWillUnmount() {
    clearInterval(this.TimeToEnd);
  }
  
  render() {
    return (
      <View style={{alignItems: "center"}}>

        <BannerAd 
          unitId={"ca-app-pub-2468921208464521/5113226309"}
          size={BannerAdSize.LARGE_BANNER}
          
        />

        <Text style={styles.Timer}>
          { this.state.Minute < 0 ? (
            <>{this.props.FirstTestTimerLastanswer}</>
          ) : (
            <>
              {this.state.Minute} : {this.state.Second}
            </>
          )}
        </Text>
        
        <FirstTestData
          DrawerNavigatorMainpage={this.props.DrawerNavigatorMainpage}
          FirstTestDataEndText={this.props.FirstTestDataEndText}
          TimerEnd={this.state.TimerEnd}
          QuestionList={this.props.QuestionList}
        />

      </View>
    );
  }
}



export default function FirstTest(props) {
  const navigation = useNavigation();
  const [testType, setTestType] = React.useState(QuestionListOne);

  const checkWhichTest = async () => {
    const selectedTest = await AsyncStorage.getItem('Test');
    setTestType(selectedTest === 'QuestionListOne' ? QuestionListOne : QuestionListTwo);
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', checkWhichTest);
    return unsubscribe;
  }, [navigation]);

  return (
    <LinearGradient colors={['#101010', '#242424', '#101010']} start={{ x: 0, y: 0 }} end={{ x: 0.4, y: 1 }} style={styles.Background}>
        <Timer 
          FirstTestTimerLastanswer={props.FirstTestTimerLastanswer} 
          DrawerNavigatorMainpage = {props.DrawerNavigatorMainpage} 
          FirstTestDataEndText = {props.FirstTestDataEndText} 
          QuestionList = {testType}
        />
    </LinearGradient>
  );
}



const styles = StyleSheet.create({
  Background: {
      flex: 1,
      alignItems: "center",
  },
  Timer: {
      color:"#FFFFFF",
      fontSize: Math.round(windowsquare*0.0001),
      alignSelf: "center",
  },
  TopBanner: {
      width: Math.round(windowwidth*0.85),
      height: Math.round(windowwidth*0.21),
      marginTop: Math.round(windowheight*0.02),
  },
  TestQuestion: {
      width: Math.round(windowwidth*0.85),
      height: Math.round(windowwidth*0.85),
  },

  AnswerFoto: {
      width: Math.round(windowwidth*0.26333),
      height: Math.round(windowwidth*0.263333),
  },
  AnswerFotoMid: {
      width: Math.round(windowwidth*0.26333),
      height: Math.round(windowwidth*0.26333),
      marginLeft: Math.round(windowwidth*0.03),
      marginRight: Math.round(windowwidth*0.03),
  },
  EndBlock: {
      flexDirection:"row",
      alignSelf:"center",
      marginTop: Math.round(windowheight*0.02),
  },
  EndText: {
      color:"#FFFFFF",
      fontSize: Math.round(windowsquare*0.000085),
      alignSelf: "center",
  },
  BigLeftBack: {
      width: Math.round(windowwidth*0.1),
      height: Math.round(windowwidth*0.1),
      transform: [{ rotate: '180 deg'}]
  },
  BigRightBack: {
      width: Math.round(windowwidth*0.1),
      height: Math.round(windowwidth*0.1),
  },
});
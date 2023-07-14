import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';


import Header from './Headers/Header';
import ShadowSplash from './Splash/ShadowSplash';
import StandartBottomBar from './BottomBar/StandartBottomBar';
import DATA from './Language/Data';

const windowheight = Dimensions.get("window").height;
const windowwidth = Dimensions.get("window").width;
const windowsquare = Math.round(windowheight*windowwidth);
var windowsquareforcomment = Math.round(windowheight*windowwidth);


if (Dimensions.get("window").height/Dimensions.get("window").width <= 1.68) 
{
  windowsquareforcomment = Math.round(windowsquare/1.3);
}


export default function Result({index}) {
  
  const navigation = useNavigation();

  const [Result, SetResult] = useState("");
  const [Percent, SetPercent] = useState("");
  const [CommentToTotalIQ, SetCommentToTotalIQ] = useState("");

  const LoadResult = async () => {
    try {
      const IQResult = await AsyncStorage.getItem('LastResult');
      if (IQResult) {
        SetResult(IQResult);
        LoadCommentsForIQLvl(IQResult);
      }
    } catch (error) {
      console.log(error);
    }
  }
  

  const LoadCommentsForIQLvl = (IQResult) => {
    const totalResult = Number(IQResult);
    let comment, percent;
  
    switch (true) {
      case (IQResult === "55"):
        comment = DATA[index].ResultIQResult55;
        percent = 0.3;
        break;
      case (IQResult === "150+"):
        comment = DATA[index].ResultIQResult150;
        percent = "<< 0.1";
        break;
      case (totalResult > 55 && totalResult <= 64):
        comment = DATA[index].ResultIQResult55to64;
        percent = 2;
        break;
      case (totalResult > 64 && totalResult <= 74):
        comment = DATA[index].ResultIQResult64to74;
        percent = 3.8;
        break;
      case (totalResult > 74 && totalResult <= 83):
        comment = DATA[index].ResultIQResult74to83;
        percent = 5.8;
        break;
      case (totalResult > 83 && totalResult <= 93):
        comment = DATA[index].ResultIQResult83to93;
        percent = 14.5;
        break;
      case (totalResult > 93 && totalResult <= 102):
        comment = DATA[index].ResultIQResult93to102;
        percent = 34;
        break;
      case (totalResult > 102 && totalResult <= 112):
        comment = DATA[index].ResultIQResult102to112;
        percent = 34;
        break;
      case (totalResult > 112 && totalResult <= 121):
        comment = DATA[index].ResultIQResult112to121;
        percent = 18.1;
        break;
      case (totalResult > 121 && totalResult <= 131):
        comment = DATA[index].ResultIQResult121to131;
        percent = 8.2;
        break;
      case (totalResult > 131 && totalResult <= 140):
        comment = DATA[index].ResultIQResult131to140;
        percent = 3.1;
        break;
      case (totalResult > 140 && totalResult < 150):
        comment = DATA[index].ResultIQResult140to150;
        percent = 0.4;
        break;
    }
  
    SetCommentToTotalIQ(comment);
    SetPercent(percent);
  };



  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      LoadResult();
    });
    return unsubscribe;
  }, []);

  return (
    <LinearGradient colors={['#101010', '#242424', '#101010']} start={{ x: 0, y: 0 }} end={{ x: 0.4, y: 1 }} style={styles.background}>
      
      <Header DrawerNavigatorLanguage = {DATA[index].DrawerNavigatorLanguage} Lang = {DATA[index].Lang}/>


      <View style={styles.IQAndTextBlock}>
        <Text style={styles.IQ}>
          IQ: {Result}
        </Text>
        <Text style={styles.IQComment}>
          {CommentToTotalIQ}
        </Text>
        <Image style={styles.Statistic}
          source={require("../android/app/src/main/res/drawable/graf.png")} 
        />
        <Text style={styles.IQComment}>
          {DATA[index].ResultIQComment1}
          {Percent}
          {DATA[index].ResultIQComment2}
        </Text>
      </View>

      <StandartBottomBar 
        MainPageStart = { DATA[index].ResultStartButtonText } 
        MainPageLastResult = { DATA[index].ResultLastButtonText }
        Mainpage = { false }
        Result = { true }
        FirstButton = { DATA[index].DrawerNavigatorMainpage } 
        LastButton = { DATA[index].DrawerNavigatorMainpage }
      />
      
      <ShadowSplash/>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#101010',
  },
    IQAndTextBlock: {
      position: 'absolute',
      alignSelf: 'center',
      top: windowheight*0.1,
    },
    IQ: {
      color: '#FFFFFF',
      alignSelf: 'center',
      fontSize: Math.round(windowsquareforcomment*0.00016),
    },
    IQComment: {
      color: '#FFFFFF',
      textAlign: 'center',
      paddingTop: Math.round(windowheight*0.02),
      fontSize: Math.round(windowsquareforcomment*0.000073),
    },
    Statistic: {
      width: Math.round(windowwidth*0.9),
      height: Math.round(windowwidth*0.5),
    },
});
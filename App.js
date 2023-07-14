import React from 'react';
import { View, StatusBar, Text, Image, StyleSheet, Dimensions, Linking} from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { useWindowDimensions } from 'react-native';
import { InterstitialAd, AdEventType} from 'react-native-google-mobile-ads';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';


import Mainpage from './components/Mainpage';
import Info from './components/Info';
import Rate from './components/Rate';
import Language from './components/Language/Language';
import FirstTestAge from './components/FirstTest/FirstTestAge';
import SecondTest from './components/SecondTest/SecondTest';
import FirstTestRule from './components/FirstTest/FirstTestRule';
import Result from './components/Result';
import FirstTest from './components/FirstTest/FirstTest';
import DATA from './components/Language/Data';
import Splash from './Splash';


var windowwidth = Dimensions.get("window").width;
var windowheight = Dimensions.get("window").height;
var windowsquare = Math.round(windowheight*windowwidth);

var Index = 1;


const interstitial = InterstitialAd.createForAdRequest('ca-app-pub-2468921208464521/4891000495', {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});


const Drawer = createDrawerNavigator();


const CustomDrawer = (props) => {


  return(
    <DrawerContentScrollView {...props}>

      <LinearGradient colors={['#101010', '#101010', '#242424']} style={styles.linearGradient}>
        <Text style={styles.PlayMarket}>{DATA[Index].DrawerNavigatorIQ}</Text>
        <Text style={styles.PlayMarketAccName}>{DATA[Index].LanguageMenuButton}:</Text>
      </LinearGradient>

      <View style={styles.RightMiddleLineView}>
        <View style={styles.RightMiddleLine}/>
      </View>

      <View style={styles.BottomVersionInfo}>
        <Text style={styles.BottomVersionInfoText}>V: 6.0.0</Text>
      </View>
      
      <DrawerItemList {...props} />

    </DrawerContentScrollView>       
  );
}



const DrawerNavigator = () => {

  const AdsLoaded = React.useRef(false);

  const LoadAds = () => {
    if(AdsLoaded.current == false) {
  
      var unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
        AdsLoaded.current = true;
      });
  
      // Start loading the interstitial straight away
      interstitial.load();
      // Unsubscribe from events on unmount
      return unsubscribe;
    }
  }

  const PlayAds = () => {
    if(AdsLoaded.current == true)
    {
      interstitial.show();
      AdsLoaded.current = false;
    }
    else 
    {
      LoadAds();
    }
  }




  const [index, Setindex] = React.useState(1);

  const ChangeLanguage = async () => {
    const check = await AsyncStorage.getItem('Language');
    if(check != undefined && check != index) {
      Setindex(check);
      Index = check;
    }
    ChangeLanguage();
  }
  ChangeLanguage();

  




  const OpenStore = () => {
    Linking.openURL(
      `https://www.amazon.com/gp/product/B0BW66NPKG`,
    )
  };


  const Jmain = props => {
    PlayAds();
    return(
      <Mainpage 
        MainPageFirst = {DATA[index].MainPageFirst} 
        MainPageSecond = {DATA[index].MainPageSecond}
        DrawerNavigatorMainpage = {DATA[index].DrawerNavigatorMainpage}
        DrawerNavigatorLanguage = {DATA[index].DrawerNavigatorLanguage}
        Lang = {DATA[index].Lang}
        MainPageChoose = {DATA[index].MainPageChoose}
        MainPageStart = {DATA[index].MainPageStart}
        MainPageLastResult = {DATA[index].MainPageLastResult}
      />
    )
  };

  const Jinfo = props => {
    
    PlayAds();
    return(
      <Info
        DrawerNavigatorMainpage = {DATA[index].DrawerNavigatorMainpage}
        DrawerNavigatorLanguage = {DATA[index].DrawerNavigatorLanguage}
        Lang = {DATA[index].Lang}
        InfoTitle1 = {DATA[index].InfoTitle1}
        InfoText1 = {DATA[index].InfoText1}
        InfoTitle2 = {DATA[index].InfoTitle2}
        InfoText2 = {DATA[index].InfoText2}
        InfoMenu = {DATA[index].InfoMenu}
      />
    )
 };

  const Jlanguage = props => {
    
    PlayAds();
    return(
      <Language 
      index = {index}
      />
    )
  };

  const JfirstTestAge = props => {
    
    PlayAds();
    return(
      <FirstTestAge
        DrawerNavigatorMainpage = {DATA[index].DrawerNavigatorMainpage}
        DrawerNavigatorLanguage = {DATA[index].DrawerNavigatorLanguage}
        Lang = {DATA[index].Lang}
        FirstTestAgeMainText = {DATA[index].FirstTestAgeMainText}
        FirstTestAgeStart = {DATA[index].FirstTestAgeStart}
        FirstTestAgeBack = {DATA[index].FirstTestAgeBack}
      />
    )
  };

  const JfirstTestRule = props => {
    
    PlayAds();
    return(
      <FirstTestRule
      DrawerNavigatorLanguage = {DATA[index].DrawerNavigatorLanguage}
      Lang = {DATA[index].Lang}
      FirstTestRule = {DATA[index].FirstTestRule}
      FirstTestStatistics = {DATA[index].FirstTestStatistics}
      FirstTestStartButtonText = {DATA[index].FirstTestStartButtonText}
      FirstTestLastButtonText = {DATA[index].FirstTestLastButtonText}
      />
    )
  };

  const Jresult = props => {
    
    PlayAds();
    return(
      <Result index={ index }

      />
    )
  };
 
  const JfirstTest = props => {
    
    PlayAds();
    return(
      <FirstTest
        FirstTestTimerLastanswer = {DATA[index].FirstTestTimerLastanswer}
        DrawerNavigatorMainpage = {DATA[index].DrawerNavigatorMainpage}
        FirstTestDataEndText = {DATA[index].FirstTestDataEndText}
      />
    )
  };

  const Jrate = props => {
    OpenStore();
    PlayAds();
    return(
      <Rate index = { index }/>
    )
  };


  return(
    <Drawer.Navigator
      initialRouteName="Splash"
      screenOptions={{ 
        drawerType: useWindowDimensions.width >= 768 ? 'back' : 'front',
        swipeEdgeWidth: windowwidth*0.5,
        headerShown: false,
        detachInactiveScreens: true,
        lazy: true,
        //overlayColor: '#FFFFFF',
        drawerActiveTintColor: ('#FFFFFF'),
        drawerInactiveTintColor: ('#FFFFFF'),
        drawerLabelStyle: {
          fontSize: windowsquare*0.00006,
          fontFamily: 'Roboto-medium',
        },
        drawerStyle: {
          backgroundColor:'#242424',
          width: windowwidth*0.7,
        },
      }}
      drawerContent={(props) => 
      <CustomDrawer {...props} />
      }
    >

      <Drawer.Screen
        name={DATA[index].DrawerNavigatorMainpage}
        component={Jmain}
        options={{
          drawerIcon: ({color}) => (
            <Image
              source={require ("./android/app/src/main/res/drawable/house.png")}
              style={styles.IconStyle} 
            />
          )
        }}
      />          

      <Drawer.Screen 
        name={DATA[index].DrawerNavigatorInfo}
        component={Jinfo}
        options={{
          drawerIcon: ({color}) => (
            <Image
              source={require ("./android/app/src/main/res/drawable/information.png")}
              style={styles.IconStyle} 
            />
          ),
        }}
      />

      <Drawer.Screen 
        name={DATA[index].DrawerNavigatorRate}
        component={Jrate}
        options={{
          drawerIcon: ({color}) => (
            <Image
              source={require ("./android/app/src/main/res/drawable/star.png")}
              style={styles.IconStyle} 
            />
          ),
        }}
      />

      <Drawer.Screen 
        name={DATA[index].DrawerNavigatorLanguage}
        component={Jlanguage}
        options={{
          drawerIcon: ({color}) => (
            <Image
              source={require ("./android/app/src/main/res/drawable/language.png")}
              style={styles.IconStyle} 
            />
          ),
        }}
      />

      <Drawer.Screen 
        name="FirstTestAge"
        component={JfirstTestAge}
        options={{
          drawerItemStyle: { height: 0 },
          swipeEnabled: false,
        }}
      />

      <Drawer.Screen 
        name="FirstTestRule"
        component={JfirstTestRule}
        options={{
          drawerItemStyle: { height: 0 },
          swipeEnabled: false,
        }}
      />

      <Drawer.Screen 
        name="SecondTest"
        component={SecondTest}
        options={{
          drawerItemStyle: { height: 0 },
        }}
      />

      <Drawer.Screen 
        name="Result"
        component={Jresult}
        options={{
          drawerItemStyle: { height: 0 },
        }}
      />

      <Drawer.Screen 
        name="Splash"
        component={Splash}
        options={{
          drawerItemStyle: { height: 0 },
          swipeEnabled: false,
        }}
      />

      <Drawer.Screen 
        name="FirstTest"
        component={JfirstTest}
        options={{
          drawerItemStyle: { height: 0, paddingTop: '100%'},
          swipeEnabled: false,
        }}
      />

      <Drawer.Screen
        name='Mainpage'
        component={Jmain}
        options={{
          drawerItemStyle: { height: 0 },
          drawerIcon: ({color}) => (
            <Image
              source={require ("./android/app/src/main/res/drawable/house.png")}
              style={styles.IconStyle} 
            />
          )
        }}
      /> 

    </Drawer.Navigator>
  );

}


export default function App() {


  return (
    <View style={{flex: 1}}>
    <StatusBar
      hidden = {true}
      animated={true}
      backgroundColor="#101010"
      style="light"
      setTranslucent={true}
    />
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </View>
  );

}


const styles = StyleSheet.create({
  linearGradient: {
    flexDirection: 'row',
    marginTop: '-15%',
    paddingBottom: Math.round(windowheight*0.02),
    flex: 1,
  },
    PlayMarket: {
      color: '#1DB954', 
      fontSize: Math.round(windowsquare*0.0003) ,
      alignSelf: 'center',
      paddingLeft: Math.round(windowheight*0.03),
      paddingTop: Math.round(windowheight*0.05),
      fontWeight: '300',
    },
    PlayMarketAccName: {
      color: '#1DB954', 
      fontSize: Math.round(windowsquare*0.00011) ,
      alignSelf: 'flex-end',
      paddingLeft: Math.round(windowheight*0.02),
      paddingBottom: Math.round(windowheight*0.02),
      fontWeight: '100',
    },
  BottomVersionInfo: {
    position: 'absolute',
    alignSelf: 'flex-end',
  },

  RightMiddleLineView:{
    position: 'absolute',
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
    RightMiddleLine: {
      alignSelf: 'flex-end',
      height: '15%',
      width: '1%',
      borderColor: '#1DB954',
      borderWidth: 2,
      borderRadius: 100,
    },

  BottomVersionInfoText: {
    color: '#FFFFFF',
    fontSize: Math.round(windowsquare*0.00007) ,
    paddingTop: Math.round(windowheight*0.98),
    paddingRight: Math.round(windowwidth*0.075),
  },
  IconStyle: {
    width: Math.round(windowwidth*0.075),
    height: Math.round(windowwidth*0.075),
  },
})
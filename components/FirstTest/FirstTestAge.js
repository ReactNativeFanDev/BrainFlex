import React from 'react';
import { StyleSheet, Text, View, Dimensions, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


import Header from '../Headers/Header';
import StandartBottomBar from '../BottomBar/StandartBottomBar';


const windowwidth= Dimensions.get("window").width;
const windowheight = Dimensions.get("window").height;
const windowsquare = Math.round(windowheight*windowwidth);


var ITEM_SIZE = windowheight * 0.18;


const ITEM_SPACING = (windowwidth - ITEM_SIZE) / 2;
const timers = ['1-7', "8", "9", "10-11", "12-14", "15-18", "19-23", "24-28", "29-35", "36-45", "46-50", "51-60"];


export default function FirstTestAge({...props}) {

  const scrollx = React.useRef(new Animated.Value(0)).current;
  const Ageindex = React.useRef(0);
  

  return (
    <LinearGradient colors={['#101010', '#242424', '#101010']} start={{ x: 0, y: 0 }} end={{ x: 0.4, y: 1 }} style={styles.background}>

      <Header DrawerNavigatorLanguage={props.DrawerNavigatorLanguage} Lang={props.Lang} />

      <Text style={styles.MainText}>{props.FirstTestAgeMainText}</Text>

      <View
        style={styles.AgeInput}
      >

        <Animated.FlatList
          data={timers}
          keyExtractor={item => item.toString()}
          horizontal
          onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollx}}}],
              { useNativeDriver: true}
          )}
          bounces={false}
          showsHorizontalScrollIndicator={false}
          style={{flexGrow: 0}}
          onMomentumScrollEnd={
            ev => {
              const index = Math.round(ev.nativeEvent.contentOffset.x / ITEM_SIZE);
              Ageindex.current = index;
            }
          }
          snapToInterval={ITEM_SIZE}
          decelerationRate="fast"
          contentContainerStyle={{
            paddingHorizontal: ITEM_SPACING
          }}
          renderItem={({ item, index }) => {
            const inputRange = [
                (index - 1) * ITEM_SIZE,
                (index) * ITEM_SIZE,
                (index + 1) * ITEM_SIZE,
            ]

            const opacity = scrollx.interpolate({
                inputRange,
                outputRange: [.2, 1, .2]
            })

            const scale = scrollx.interpolate({
                inputRange,
                outputRange: [0.8, 1.6, 0.8]
            })
            return (
              <View style={{width: ITEM_SIZE, justifyContent: 'center', alignItems: 'center'}}>
                <Animated.Text style={[styles.text, {
                  opacity,
                  transform: 
                    [{
                      scale
                    }]
                  }]}
                >
                  {item}
                </Animated.Text>
              </View>
            )
          }}
        />

      </View>

      <StandartBottomBar 
        MainPageStart = {props.FirstTestAgeStart}
        MainPageLastResult = {props.FirstTestAgeBack}
        Mainpage = {false}
        FirstButton = {'FirstTestRule'}
        LastButton = {props.DrawerNavigatorMainpage}
        Ageindex = {Ageindex}
      />
    
    </LinearGradient>
  );
}


const styles  =  StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#101010',
  },
  StartButtonView: {
    position: 'absolute',
    alignSelf: 'center',
    top: Math.round(windowheight*0.826),
  },
  StartButton: {
    backgroundColor: '#1DB954',
    justifyContent: 'center',
    width: Math.round(windowwidth*0.7),
    height: Math.round(windowheight*0.08),
    borderRadius: 30,
  },
  StartButtonText: {
    textAlign: 'center',
    fontSize: Math.round(windowsquare*0.0001),
    fontWeight: 'bold',
  },
  LastButtonView: {
    position: 'absolute',
    alignSelf: 'center',
    top: Math.round(windowheight*0.93),
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
  MainText: {
    position: 'absolute',
    color: '#FFFFFF',
    width: Math.round(windowwidth*0.8),
    height: Math.round(windowheight*0.3),
    left: Math.round(windowwidth*0.1),
    top: Math.round(windowheight*0.175),
    fontSize: Math.round(windowsquare*0.0001),
    textAlign: 'center',
  },
  AgeInput: {
    position: 'absolute',
    flex: 1,
    alignSelf: 'center',
    top: Math.round(windowheight*0.57),
  },
  text: {
    fontSize: Math.round(ITEM_SIZE * 0.22),
    fontFamily: 'sans-serif-thin',
    color: '#FFFFFF',
    fontWeight: '900',
    paddingLeft: "10%",
    paddingRight: "10%",
  }
});
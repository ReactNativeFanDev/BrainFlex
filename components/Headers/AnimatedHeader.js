import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity,  Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';



const windowheight = Dimensions.get("window").height;
const windowwidth = Dimensions.get("window").width;
const windowsquare = Math.round(windowheight*windowwidth);


function AnimatedHeader ({DrawerNavigatorLanguage, Lang, scrollY}) {

    const navigation = useNavigation();

    const MenuButtonPress = React.useCallback(async() => {
        await AsyncStorage.setItem('ThisMustBeForGoodPressButt', "true");
        navigation.openDrawer();
      }, [navigation]);

    const languageButtonPress = React.useCallback(async() => {
        await AsyncStorage.setItem('ThisMustBeForGoodPressButt', "true");
        navigation.navigate(DrawerNavigatorLanguage);
    }, [navigation, DrawerNavigatorLanguage]);
  
    const diffClampScrollY = Animated.diffClamp(scrollY, 0, Math.round(windowheight*0.035*2+windowwidth*0.07));
  
    const TopY = diffClampScrollY.interpolate({
      inputRange: [0, Math.round(windowheight*0.035*2+windowwidth*0.07)],
      outputRange: [0, -Math.round(windowheight*0.035*2+windowwidth*0.07)]
    });

    return (
        <Animated.View
            style={{
            transform: [
                {translateY:TopY}
            ],
            elevation: 0,
            zIndex: 100,
            }}
        >
            <LinearGradient colors={['rgba(16,16,16,1)','rgba(16,16,16,0.9)', 'rgba(16,16,16,0.7)', 'rgba(16,16,16,0.1)']} style={styles.Header}>
                <View style={styles.MenuButtonView}>
                    <TouchableOpacity onPress={MenuButtonPress} style={styles.MenuButtonInvisible}>
                        <Image
                            style={styles.MenuButton}
                            source={require("../../android/app/src/main/res/drawable/menu.png")} 
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.languageButtonView}>
                    <TouchableOpacity 
                    onPress={languageButtonPress}
                    style={styles.languageButtonInvisible}
                    >
                        <Text style={styles.languagetype}>{Lang}</Text>
                        <Image
                            style={styles.languageButton}
                            source={require("../../android/app/src/main/res/drawable/language.png")} 
                        />
                    </TouchableOpacity>
                </View>
            </LinearGradient>

        </Animated.View>
    );
}

export default AnimatedHeader = React.memo(AnimatedHeader);

const styles = StyleSheet.create({
    Header:{
      position: 'absolute',
      width: '100%',
    },



        MenuButtonInvisible: {
            backgroundColor: 'transparent',
            alignItems: 'center',
            width: Math.round(windowwidth*0.19),
            height: Math.round(windowheight*0.035*2+windowwidth*0.07),
        },
            MenuButton: {
                marginTop: Math.round(windowheight*0.035),
                width: Math.round(windowwidth*0.07),
                height: Math.round(windowwidth*0.07),
            },



        languageButtonView: {
            position: 'absolute',
            right: Math.round(windowwidth*0.054),
            top: 0,
        },
            languageButtonInvisible: {
                flexDirection: 'row',
                backgroundColor: 'transparent',
                height: Math.round(windowheight*0.02875*2+windowwidth*0.097),
            },
                languageButton: {
                    marginTop: Math.round(windowheight*0.02875),
                    width: Math.round(windowwidth*0.097),
                    height: Math.round(windowwidth*0.097),
                },
                languagetype: {
                    color: '#FFFFFF',
                    marginTop: Math.round(windowwidth*0.016+windowheight*0.02875),
                    paddingRight: Math.round(windowwidth*0.0045),
                    fontSize: Math.round(windowsquare*0.00006),
                },
});
import React, {useCallback} from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


const windowheight = Dimensions.get("window").height;
const windowwidth = Dimensions.get("window").width;
const windowsquare = Math.round(windowheight*windowwidth);


function Header ({...props}) {

  const navigation = useNavigation();

  const MenuButtonPress = useCallback(async () => {
    await AsyncStorage.setItem('ThisMustBeForGoodPressButt', "true");
    navigation.openDrawer();
  }, [navigation]);
  
  const languageButtonPress = useCallback(async () => {
    await AsyncStorage.setItem('ThisMustBeForGoodPressButt', "true");
    navigation.navigate(props.DrawerNavigatorLanguage);
  }, [navigation, props.DrawerNavigatorLanguage]);

  return (
    <View>

      
      <View style={styles.MenuButtonView}>
        <TouchableOpacity onPress={() => MenuButtonPress()} style={styles.MenuButtonInvisible}>
          <Image
            style={styles.MenuButton}
            source={require("../../android/app/src/main/res/drawable/menu.png")} 
          />
        </TouchableOpacity>
      </View>


      <View style={styles.languageButtonView}>
        <TouchableOpacity 
          onPress={() => languageButtonPress()}
          style={styles.languageButtonInvisible}
        >
          <Text style={styles.languagetype}>{props.Lang}</Text>
          <Image
              style={styles.languageButton}
              source={require("../../android/app/src/main/res/drawable/language.png")} 
          />
        </TouchableOpacity>
      </View>


    </View>
  );
}

export default Header = React.memo(Header);

const styles = StyleSheet.create({
    MenuButtonView:{
      position: 'absolute',
      left: 0,
      top: 0,
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
      marginTop: Math.round(windowwidth*0.016+windowheight*0.02875),
      paddingRight: Math.round(windowwidth*0.0045),
      color: '#FFFFFF',
      fontSize: Math.round(windowsquare*0.00006),
    },
});
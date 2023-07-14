 import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Vibration } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';



const windowheight = Dimensions.get("window").height;
const windowwidth = Dimensions.get("window").width;
const windowsquare = Math.round(windowheight*windowwidth);


function StandartBottomBar ({...props}) {

    const navigation = useNavigation();


    const StartButtonPress = React.useCallback(async() => {
        Vibration.vibrate(40);
    
        if(props.Ageindex != undefined) {
            await AsyncStorage.setItem('AgeForTestOne', props.Ageindex.current.toString());
        }

        if (props.OpenTest != undefined) 
        {
            let NextPage;

            switch (props.OpenTest) {
                case 1:
                    NextPage = "QuestionListOne";
                    break;
                case 2:
                    NextPage = "QuestionListTwo";
                    break;
                default:
                    NextPage = "QuestionListOne";
            }

            await AsyncStorage.setItem('Test', NextPage);
        }
    
        if (props.TestRule == true)
        {
            await AsyncStorage.setItem('TestEnd', "true");
            navigation.navigate('FirstTest');
        }
        else
        {
            await AsyncStorage.setItem('ThisMustBeForGoodPressButt', "True");
            navigation.navigate(props.FirstButton);
        }


    }, [navigation, props]);
    
    const LastResultButton = React.useCallback(async() => {
        await AsyncStorage.setItem('ThisMustBeForGoodPressButt', "True");
        if(props.Mainpage == true)
        {
            const IQResult = await AsyncStorage.getItem('LastResult');
    
            if(IQResult != null && IQResult != "...")
            {
                navigation.navigate('Result');
            }
        }
        else
        {
            if (props.Result) 
            {
                await AsyncStorage.setItem('LastResult', '...');
            } 
            navigation.navigate(props.LastButton);
        }
    }, [navigation, props]);
    

    return (
        <View>
            <View style={styles.StartButtonView}>
                <TouchableOpacity onPress={() => StartButtonPress()}>
                    <LinearGradient colors={['#12a144', '#1DB954', '#12a144']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.StartButton}>
                        <Text style={styles.StartButtonText}>
                            {props.MainPageStart}
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>

            <View style={styles.LastButtonView}>
                <TouchableOpacity onPress={() => LastResultButton()}>
                    <View style={styles.LastButton}>
                        <Text style={styles.LastButtonText}>
                            {props.MainPageLastResult}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default StandartBottomBar = React.memo(StandartBottomBar);


const styles = StyleSheet.create({
    StartButtonView: {
        position: 'absolute',
        alignSelf: 'center',
        top: Math.round(windowheight*0.876),
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
        top: Math.round(windowheight*0.98),
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
});
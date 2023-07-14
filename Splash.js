import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import Lottie from 'lottie-react-native';


export default function Splash() {
    const navigation = useNavigation();
    const MoveToStartPage = () => {
        navigation.navigate('Mainpage');
    }
    return(

        <View style={{flex: 1, height: '100%', justifyContent: 'center'}}>
            <Lottie 
                style = {{width: '110%', alignSelf: 'center', position: 'absolute'}}
                autoPlay = {true}
                source={require('./assets/Splash.json')}
                loop = {false}
                resizeMode={"cover"}
                onAnimationFinish = { () => {
                    MoveToStartPage();
                }}
            />
        </View>
    )
}
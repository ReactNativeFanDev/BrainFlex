import React, { useContext } from 'react';
import { StyleSheet, Text,  Animated, Pressable, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import AnimatedHeader from '../components/headers/AnimatedHeader';
import DATA from '../constants/Data';
import TransparentButton from '../components/button/TransparentButton';
import { LangContext } from '../store/auth-context';

export default function Info({navigation}) {

    const langCtx = useContext(LangContext);
    const languageIndx = langCtx.langIdx;

    const scrollY = new Animated.Value(0);

    function languagePressHandler() {
        scrollY.setValue(0);
        navigation.replace("Language");
    }

    function menuPressHandler() {
        scrollY.setValue(0);
        navigation.goBack();
    }

    return (
        <LinearGradient colors={['#101010', '#101010', '#242424']} style={styles.background}>
            <AnimatedHeader scrollY={scrollY} thisLanguage={DATA[1].Lang} menuPress={menuPressHandler} languagePress={languagePressHandler}/>
            <ScrollView onScroll={(e) => scrollY.setValue(e.nativeEvent.contentOffset.y)} scrollEventThrottle={33} bounces={false}>
                <Text style={styles.WhatIsIq}>{DATA[languageIndx].InfoTitle1}</Text>
                <Text style={styles.WhatIsIqText}>{DATA[languageIndx].InfoText1}</Text>
                <Text style={styles.WhatIsIq}>{DATA[languageIndx].InfoTitle2}</Text>
                <Text style={styles.WhatIsIqText}>{DATA[languageIndx].InfoText2}</Text>
                <View style={styles.lastButtonContainer}>
                    <TransparentButton secondButtonPress={menuPressHandler} text={DATA[languageIndx].InfoMenu}/>
                </View>
            </ScrollView>
        </LinearGradient>
    );
}


const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#101010',
        opacity: 0.75,
    },
    WhatIsIq: {
        color: '#FFFFFF',
        textAlign: 'center',
        paddingTop: 55,
        fontSize: 37,
    },
    WhatIsIqText: {
        color: '#FFFFFF',
        alignSelf: 'center',
        textAlign: 'justify',
        paddingTop: 10,
        fontSize: 25,
        width: '80%',
    },
    lastButtonContainer: {
        marginVertical: 33,
    },
    onPress: {
        opacity: 0.75
    }
});
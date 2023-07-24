import {useContext, useState} from 'react';
import { StyleSheet, Text, View, Animated, Pressable } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { FlatList } from 'react-native-gesture-handler';



import AnimatedHeader from '../components/headers/AnimatedHeader';


import DATA from '../constants/Data';
import { Colors } from '../constants/styles';
import TransparentButton from '../components/button/TransparentButton';
import { LangContext } from '../store/auth-context';


export default function ChangeLanguage({navigation}) {

    const langCtx = useContext(LangContext);
    const index = langCtx.langIdx;

    const scrollY = new Animated.Value(0);

    function lastButtonHandler() {
        scrollY.setValue(0);
        navigation.goBack();
    }

    async function changeLanguageHandler(itemData) {
        langCtx.changeLangIdx(itemData.item.id);
    }

    function menuPressHandler() {
        scrollY.setValue(0);
        navigation.replace("Info");
    }


    function languageList(itemData) {
        return(
            <>
                { itemData.item.Design % 3 === 0 ?
                    <LinearGradient colors={['rgba(16,16,16,1)', 'rgba(16,16,16,1)', '#181818']} style={{paddingTop: '26%', opacity: 0.85}}>
                        <Text style={styles.title}>
                            {DATA[index].DrawerNavigatorLanguage}
                        </Text>
                    </LinearGradient>
                    :
                    <Pressable onPress={() => changeLanguageHandler(itemData)} style={({pressed})=>[styles.oneLanguageButtonContainer, pressed && styles.onPress]}>
                        { itemData.item.id == index 
                            ? 
                                <View style={styles.activeBall}>
                                    <View style={styles.activeSmaleBall}/>
                                </View>
                            : 
                                <View style={styles.standartBall}/>
                        }
                        <View style={styles.languageTextContainer}>
                            <Text style={styles.language}>
                                {itemData.item.LanguageTitle}
                            </Text>
                            <Text style={styles.languageOnEng}>
                                {itemData.item.LanguageTitleOnEnglish}
                            </Text>
                        </View>
                    </Pressable>
                }
                {itemData.item.Design % 2 === 0 
                ? 
                    <LinearGradient colors={['#181818', '#242424']} style={styles.lastButtonContainer}>
                            <TransparentButton secondButtonPress={lastButtonHandler} text={DATA[index].InfoMenu}/>
                    </LinearGradient>
                : null
                }
            </>
        )
    }

    return (
        <>
            <AnimatedHeader scrollY={scrollY} menuPress={menuPressHandler} languagePress={lastButtonHandler} thisLanguage={DATA[index].Lang}  />

            <FlatList
                data={DATA}
                bounces={false}
                onScroll={(e)=>{
                    scrollY.setValue(e.nativeEvent.contentOffset.y)
                }}
                renderItem = {languageList}
            />
        </>
    );
}

const styles = StyleSheet.create({
    title: {
        color: Colors.Green300,
        fontSize: 36,
        alignSelf: 'flex-start',
        paddingLeft: 33,
        paddingBottom: 33,
    },
    oneLanguageButtonContainer: {
        backgroundColor: '#181818',
        flexDirection: "row", 
        paddingTop: 20,
        alignItems: 'center',
        opacity: 0.85,
    },
    activeBall: {
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#1DB954',
        borderWidth: 2,
        width: 27,
        height: 27,
        marginLeft: 33,
        borderRadius: 100,
    },
    activeSmaleBall: {
        backgroundColor: '#1DB954',
        borderRadius: 100,
        width: 17,
        height: 17,
        Radius: 100,
    },
    standartBall: {
        justifyContent: 'center',
        borderColor: '#9A9DA2',
        borderWidth: 2,
        width: 27,
        height: 27,
        marginLeft: 33,
        borderRadius: 100,
    },
    languageTextContainer: {
        flex: 1,
        alignItems: 'flex-start',
        marginLeft: 33,
        paddingBottom: 10,
        borderBottomColor: '#ffffff82',
        borderBottomWidth: 0.7,
    },
    language: {
        color: '#FFFFFF',
        fontSize: 27,
    },
    languageOnEng: {
        color: '#9A9DA2',
        fontSize: 23,
    },
    onPress: {
        opacity: 0.6,
    },
    lastButtonContainer: {
        paddingVertical: 33,
        opacity: 0.85,
        flex: 1,
    },
});
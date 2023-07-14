import React, {useCallback} from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity,  Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { FlatList } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';


import AnimatedHeader from '../Headers/AnimatedHeader';


import DATA from './Data';

const windowheight = Dimensions.get("window").height;
const windowwidth = Dimensions.get("window").width;
const windowsquare = Math.round(windowheight*windowwidth);


export default function Language({index}) {

    const navigation = useNavigation();

    const scrollY = new Animated.Value(0);

    const FinishButton = useCallback(() => {
        navigation.navigate(DATA[index].DrawerNavigatorMainpage);
    }, [index, navigation]);
    
    const SaveLanguage = useCallback(async (props) => {
        await AsyncStorage.setItem('Language', props.toString());
    }, []);

    return (
        
        <View style={styles.background}>
        
            <AnimatedHeader scrollY={scrollY}  DrawerNavigatorLanguage={DATA[index].DrawerNavigatorLanguage}  Lang={DATA[index].Lang} />

            <FlatList
                data={DATA}
                onScroll={(e)=>{
                scrollY.setValue(e.nativeEvent.contentOffset.y)
                }}
                style={styles.LanguageBlock}
                renderItem = {({item}) => (

                <View>

                    <TouchableOpacity onPress={() => SaveLanguage(item.id)}>
                        {item.Design % 3 === 0 ?
                            <LinearGradient colors={['rgba(16,16,16,1)', 'rgba(16,16,16,1)', '#181818']} style={{paddingTop: parseInt(windowheight*0.04*2+windowwidth*0.1)}}>
                                    <Text style={styles.styleTopOfLangList}>
                                        {DATA[index].DrawerNavigatorLanguage}
                                    </Text>
                            </LinearGradient>
                            :
                            <View style={styles.LanguageListView}>
                                {item.id == index 
                                ? <View style={styles.PressedBall}>
                                        <View style={styles.SmallpressedBall}/>
                                    </View>
                                : <View style={styles.UnpressBall}/>
                                }
                                <View style={styles.LanguageAndSmallLanguageView}>
                                    <Text style={styles.Language}>
                                        {item.LanguageTitle}
                                    </Text>
                                    <Text style={styles.SmallLanguage}>
                                        {item.LanguageTitleOnEnglish}
                                    </Text>
                                </View>
                            </View>
                        }

                    </TouchableOpacity>



                    <LinearGradient colors={['#181818', '#242424']}>
                        {item.Design % 2 === 0 ? 
                            <View style={styles.LastButtonView}>
                                <TouchableOpacity
                                    onPress={() => FinishButton()}
                                >
                                    <View style={styles.LastButton}>
                                        <Text style={styles.LastButtonText}>
                                            {DATA[index].LanguageMenuButton}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View> : null
                        }
                    </LinearGradient>
                </View>
                )}
            />
            
        </View>
    );
}




const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#181818',
    },

        styleTopOfLangList: {
            color: '#022b59',
            fontSize: Math.round(windowsquare*0.00008),
            marginLeft: Math.round(windowwidth*(0.08+0.05)),
            marginBottom: Math.round(windowheight*0.02),
        },
        LanguageListView: {
            flexDirection: "row", 
            paddingTop: Math.round(windowheight*0.02),
            alignItems: 'center',
            backgroundColor: '#181818',
        },
            PressedBall: {
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: '#1DB954',
                borderWidth: 2,
                width: Math.round(windowwidth*0.062),
                height: Math.round(windowwidth*0.062),
                marginLeft: Math.round(windowwidth*0.08),
                borderRadius: 100,
            },
            SmallpressedBall: {
                backgroundColor: '#1DB954',
                borderRadius: 100,
                width: Math.round(windowwidth*0.033),
                height: Math.round(windowwidth*0.033),
                Radius: 100,
            },
            UnpressBall: {
                justifyContent: 'center',
                borderColor: '#9A9DA2',
                borderWidth: 2,
                width: Math.round(windowwidth*0.06),
                height: Math.round(windowwidth*0.06),
                marginLeft: Math.round(windowwidth*0.08),
                borderRadius: 100,
            },
            LanguageAndSmallLanguageView: {
                flex: 1,
                alignItems: 'flex-start',
                marginLeft: Math.round(windowwidth*0.08),
                paddingBottom: 10,
                borderColor: 'transparent',
                borderBottomColor: '#000000',
                borderWidth: 0.3,
            },
                Language: {
                    color: '#FFFFFF',
                    fontSize: Math.round(windowsquare*0.00007),
                },
                SmallLanguage: {
                    color: '#9A9DA2',
                    fontSize: Math.round(windowsquare*0.00005),
                },


        LastButtonView: {
            alignSelf: 'center',
            marginTop: Math.round(windowheight*0.061),
            marginBottom: Math.round(windowheight*0.061),
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
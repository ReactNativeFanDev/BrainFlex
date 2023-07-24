import { StyleSheet, Text, Image, Animated, Pressable } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Ratio } from '../../constants/styles';
import { useContext } from 'react';
import { LangContext } from '../../store/auth-context';
import DATA from '../../constants/Data';


export default function AnimatedHeader ({scrollY, menuPress, languagePress}) {

    const langCtx = useContext(LangContext);
    const languageIndx = langCtx.langIdx;
    
    const diffClampScrollY = Animated.diffClamp(scrollY, 0, 200);
  
    const TopY = diffClampScrollY.interpolate({
        inputRange: [0, 200],
        outputRange: [0, -200]
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
            <LinearGradient colors={['rgba(16,16,16,1)','rgba(16,16,16,0.9)', 'rgba(16,16,16,0.7)', 'rgba(16,16,16,0.1)']} style={styles.buttonsContainer}>
                 
                <Pressable 
                    onPress={menuPress}
                    style={({pressed}) => [
                        styles.buttonContainer, pressed && styles.buttonPressed
                    ]}
                >
                    <Image
                        style={styles.iconMenu}
                        source={require("../../drawable/menu.png")} 
                    />
                </Pressable>


                <Pressable
                    onPress={languagePress}
                    style={({pressed})=>[
                        styles.languageContainer, styles.buttonContainer, pressed && styles.buttonPressed
                    ]}
                >
                    <Text style={styles.text}>{DATA[languageIndx].Lang}</Text>
                    <Image
                        style={styles.iconLanguage}
                        source={require("../../drawable/language.png")} 
                    />
                </Pressable>
            </LinearGradient>

        </Animated.View>
    );
};


const styles = StyleSheet.create({
    buttonsContainer: {
        borderTopEndRadius: 40,
        borderTopStartRadius: 40,
        position: 'absolute',
        width: '100%',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: Ratio.deviceWidth < 430 ? (Ratio.deviceWidth < 390 ? (Ratio.deviceWidth < 375 ? 10 : 20 ) : 40 ): 45,
    },
    buttonContainer: {
        marginHorizontal: 20,
    },
    languageContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    buttonPressed: {
        opacity: 0.75,
    },
    iconMenu: {
        height: Ratio.size < 2.1 ? 30 : (Ratio.size > 2.3 ? 38 : 36),
        width: Ratio.size < 2.1 ? 30 : (Ratio.size > 2.3 ? 38 : 36),
        marginRight: 20,
        marginBottom: 12,
    },
    iconLanguage: {
        height: Ratio.size < 2.1 ? 40 : (Ratio.size > 2.3 ? 48 : 46),
        width: Ratio.size < 2.1 ? 40 : (Ratio.size > 2.3 ? 48 : 46),
        marginBottom: 12,
    },
    text: {
        color: Colors.White,
        fontSize: Ratio.size < 2.1 ? 17 : (Ratio.size > 2.2 ? 28 : 25),
        paddingRight: 3,
    },
});
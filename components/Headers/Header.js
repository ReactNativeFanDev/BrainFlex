import { memo, useContext } from 'react';
import { StyleSheet, Text, View, Image, Pressable} from 'react-native';
import { Colors, Ratio } from '../../constants/styles';
import { LangContext } from '../../store/auth-context';
import DATA from '../../constants/Data';


function Header ({menuPressHandler, languagePressHandler}) {

    const langCtx = useContext(LangContext);
    const languageIndx = langCtx.langIdx;

    return (
        <View style={styles.mainContainer}> 
            <Pressable 
                onPress={menuPressHandler}
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
                onPress={languagePressHandler}
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
        </View>
    );
}

export default Header = memo(Header);


const styles = StyleSheet.create({
    mainContainer: {
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
        marginBottom: 14,
    },
    text: {
        color: Colors.White,
        fontSize: Ratio.size < 2.1 ? 17 : (Ratio.size > 2.2 ? 28 : 25),
        paddingRight: 3,
    },
});
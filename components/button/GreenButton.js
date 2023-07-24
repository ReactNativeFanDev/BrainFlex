import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors, Ratio } from "../../constants/styles";
import { memo } from "react";


function GreenButton ({firsButtonPress, text}) {
    return(
        <View style={styles.firstButtonContainer}>
            <Pressable onPress={firsButtonPress} android_ripple={{ color: Colors.Green200, overflow: 'hidden' }} style={({pressed}) =>[styles.firstButtonPressable, pressed && styles.buttonOnPress]}>
                <Text style={styles.firstButtonText}>
                    {text}
                </Text>
            </Pressable>
        </View>
    )
}
export default memo(GreenButton);


const styles = StyleSheet.create({
    firstButtonContainer: {
        width: Ratio.deviceWidth > 600 ? '60%' : '80%',
        borderRadius: 30,
        alignSelf: 'center',
        marginBottom: Ratio.deviceWidth < 400 ? 17 : (Ratio.deviceWidth > 600 ? 30 : 24),
        overflow: 'hidden',
    },
    firstButtonPressable: {
        backgroundColor: Colors.Green300,
    },
    firstButtonText: {
        textAlign: 'center',
        fontSize: Ratio.size < 2.1 ? 30 : 33,
        fontWeight: 'bold',
        paddingVertical: Ratio.size < 2.1 ? 6 : (Ratio.size > 2.3 ? 3 : 9),
        color: '#000000e0'
    },
    buttonOnPress: {
        opacity: 0.75,
    }
});
import React, { memo } from 'react';
import { StyleSheet, Text, Pressable, View} from 'react-native';
import { Colors, Ratio } from '../../constants/styles';


function TransparentButton ({secondButtonPress, text}) {
    return (
        <View style={styles.secondButtonContainer}>
            <Pressable onPress={secondButtonPress} style={({pressed}) => pressed && styles.buttonOnPress}>
                <Text style={styles.secondButtonText}>
                    {text}
                </Text>
            </Pressable>
        </View>
    )
}

export default memo(TransparentButton);


const styles = StyleSheet.create({
    secondButtonContainer: {
        alignSelf: 'center',
        justifyContent: 'center',
        borderColor: '#FFFFFF',
        borderWidth: 1,
        width: Ratio.deviceWidth > 600 ? '35%' : '50%',
        borderRadius: 30,
        backgroundColor: Colors.WhiteTransp
    },
    secondButtonText: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: Ratio.deviceHight/Ratio.deviceWidth < 2 ? (Ratio.deviceWidth < 400 ? 20 : (Ratio.deviceWidth > 600 ? 20 : 23)) : 25,
        fontWeight: '100',
        paddingVertical: Ratio.deviceWidth < 400 ? 5 : (Ratio.deviceWidth > 600 ? 7 : 9),
        shadowColor: Colors.White,
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 2,
        shadowOpacity: 1,
    },
    buttonOnPress: {
        opacity: 0.75,
    }
});
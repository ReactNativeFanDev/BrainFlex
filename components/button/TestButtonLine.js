import { Image, Pressable, StyleSheet, View } from "react-native";
import { Ratio } from "../../constants/styles";

export default function TestButtonLine({questionList, testPage, firstQuestion, secondQuestion, thirdQuestion, answer }) {


    function Check(answerNumber) {
        answer(questionList[testPage][answerNumber]);
    }
    

    return(
        <View style={styles.testImagesContainer}>

            <Pressable onPress={() => Check('A'+firstQuestion[7])} style={({pressed}) => pressed && styles.pressed}>
                <Image
                    source={questionList[testPage][firstQuestion]}
                    style={styles.image} 
                />
            </Pressable>

            <Pressable onPress={() => Check('A'+secondQuestion[7])} style={({pressed}) => [styles.midleQuestionImageContainer, pressed && styles.pressed]}>
                <Image
                    source={questionList[testPage][secondQuestion]}
                    style={styles.image} 
                />
            </Pressable>

            <Pressable onPress={() => Check('A'+thirdQuestion[7])} style={({pressed}) => pressed && styles.pressed}>
                <Image
                    source={questionList[testPage][thirdQuestion]}
                    style={styles.image} 
                />
            </Pressable>

        </View>
    )
}


const styles = StyleSheet.create({
    testImagesContainer: {
        flexDirection: 'row',
        paddingTop: 10,
    },
    image: {
        width: Ratio.deviceWidth*0.26,
        height: Ratio.deviceWidth*0.26,
    },
    midleQuestionImageContainer: {
        paddingHorizontal: 10
    },
    pressed: {
        opacity: 0.55,
    }

})
import React, { useContext, useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, SafeAreaView } from 'react-native';
import TestButtonLine from '../../components/button/TestButtonLine';
import { Colors, Ratio } from '../../constants/styles';
import { LangContext } from '../../store/auth-context';
import DATA from '../../constants/Data';

const AgeBonus = [
    {
        age: 5
    },
    {
        age: 4
    },
    {
        age: 3
    },
    {
        age: 2
    },
    {
        age: -1
    },
    {
        age: -5
    },
    {
        age: -8
    },
    {
        age: -5
    },
    {
        age: -4
    },
    {
        age: -3
    },
    {
        age: -2
    },
    {
        age: -1
    },

]



 

function TestQuestions({ageIndex, QuestionList, endTest}){
    const langCtx = useContext(LangContext);
    const languageIndx = langCtx.langIdx;

    const [testPage, setTestPage] = useState(0);
    const answear = useRef([]);
    
    function calculate() {
        const rate = answear.current.filter(x=>x==1).length;
        const baseValue = QuestionList.length > 20 ? rate * 4 + 51 : rate * 2.15 + 73;
        const randomValue = QuestionList.length > 20 ? Math.floor(Math.random() * 4) : Math.floor(Math.random() * 2.15);
        const totalResult = (baseValue + randomValue + AgeBonus[ageIndex].age);
        endTest(totalResult);
        
    }
    
    function previous() {
        testPage > 0 && setTestPage(current => current - 1)
    }
    
    function next() {
        testPage < QuestionList.length - 1 ? setTestPage(current => current + 1) : calculate();
    }

    const pushRightAnswear = (answer) => {
        answer != undefined && ((answear.current[testPage]=answer) | next());
    }

    return(
        <SafeAreaView style={styles.testNavigationContainer}>

            <Text style={styles.timerText}>10:13</Text>
            
            <View>
                <Image source={QuestionList[testPage].QuestionImage} style={styles.testQuestionImage}/>

                <TestButtonLine 
                    questionList={QuestionList}
                    testPage={testPage}
                    firstQuestion={'Answear1'}
                    secondQuestion={'Answear2'}
                    thirdQuestion={'Answear3'}
                    answer={pushRightAnswear}
                />
                
                <TestButtonLine 
                    questionList={QuestionList}
                    testPage={testPage}
                    firstQuestion={'Answear4'}
                    secondQuestion={'Answear5'}
                    thirdQuestion={'Answear6'}
                    answer={pushRightAnswear}
                />
            </View>

            <View style={styles.testRowContainer}>
                <Pressable onPress={previous} style={({pressed}) => pressed && styles.pressed}>
                    <Image
                        style={[styles.bigRoundButton, styles.rotate]}
                        source={
                        require("../../drawable/right.png")
                        } 
                    />
                </Pressable>
                        

                <Text style={[styles.EndText , {color: answear.current[testPage] != undefined ? Colors.Green300 : Colors.White}]}>
                    {DATA[languageIndx].FirstTestDataEndText} {testPage+1}/{QuestionList.length}
                </Text>

                <Pressable onPress={next} style={({pressed}) => pressed && styles.pressed}>
                    <Image
                        style={styles.bigRoundButton}
                        source={
                        require("../../drawable/right.png")
                        } 
                    />
                </Pressable>
            </View>
        </SafeAreaView>      
    )
};

export default TestQuestions = React.memo(TestQuestions);

const styles = StyleSheet.create({
    testNavigationContainer: {
        flex: 1,
        alignSelf: "center",
        justifyContent: 'space-between',
    },
    timerText: {
        color: 'white',
        fontSize: Ratio.deviceHight < 700 ? 30 : 36,
        textAlign: 'center'
    },
    testQuestionImage: {
        width: Ratio.deviceWidth*0.78+20, 
        height: Ratio.deviceWidth*0.78+20,
    },
    testRowContainer: {
        paddingTop: 10,
        flexDirection: "row",
        alignItems: 'center',
        alignSelf: 'center'
    },
    EndText: {
        fontSize: Ratio.size < 1.77 ? 20 : Ratio.deviceWidth < 375 ? 14 : Ratio.deviceWidth < 390 ? 25 : Ratio.deviceWidth < 430 ? 30 : 40,
    },
    bigRoundButton: {
        width: Ratio.deviceWidth < 375 ? 14 : Ratio.deviceWidth < 390 ? 35 : Ratio.deviceWidth < 430 ? 40 : 50,
        height: Ratio.deviceWidth < 375 ? 14 : Ratio.deviceWidth < 390 ? 35 : Ratio.deviceWidth < 430 ? 40 : 50,
    },
    rotate: {
        transform: [{ rotate: '180 deg'}],
    },
    pressed: {
        opacity: 0.55,
    },
});
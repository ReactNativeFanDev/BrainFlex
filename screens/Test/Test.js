import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import FirstTestQuestionList from '../../constants/FirstTestQuestionList';
import SecondTestQuestionList from '../../constants/SecondTestQuestionList';
import TestQuestions from './TestQuestions';
import { Ratio } from '../../constants/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';





export default function Test({route, navigation}) {
  async function endTestHandler (rate) {
    const ranges = [
      { min: 55, max: 64, commentKey: "ResultIQResult55to64", percent: 2 },
      { min: 64, max: 74, commentKey: "ResultIQResult64to74", percent: 3.8 },
      { min: 74, max: 83, commentKey: "ResultIQResult74to83", percent: 5.8 },
      { min: 83, max: 93, commentKey: "ResultIQResult83to93", percent: 14.5 },
      { min: 93, max: 102, commentKey: "ResultIQResult93to102", percent: 34 },
      { min: 102, max: 112, commentKey: "ResultIQResult102to112", percent: 34 },
      { min: 112, max: 121, commentKey: "ResultIQResult112to121", percent: 18.1 },
      { min: 121, max: 131, commentKey: "ResultIQResult121to131", percent: 8.2 },
      { min: 131, max: 140, commentKey: "ResultIQResult131to140", percent: 3.1 },
      { min: 140, max: 150, commentKey: "ResultIQResult140to150", percent: 0.4 },
      { min: 150, max: Infinity, commentKey: "ResultIQResult150", percent: "<< 0.1" },
    ];
    
    const { commentKey, percent } = ranges.find(({ min, max }) => rate >= min && rate <= max) || {};

    try {
      await AsyncStorage.multiSet([
        ['rate', rate.toString()],
        ['comment', commentKey],
        ['percent', percent.toString()],
      ]);
      
    } catch (error) {
    }

    navigation.navigate('Result', {
      rate: rate,
      comment: commentKey,
      percent: percent,
    })
  }

  return (
    <LinearGradient colors={['#101010', '#242424', '#101010']} start={{ x: 0, y: 0 }} end={{ x: 0.4, y: 1 }} style={styles.container}>
      <TestQuestions 
        QuestionList={
          route.params.choosenTest === 'FirstTestQuestionList' ? FirstTestQuestionList : SecondTestQuestionList
        } 
        ageIndex={route.params.ageIndex}
        endTest={endTestHandler}
      />
    </LinearGradient>
  );
}



const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: "center",
  },
  TopBanner: {
      width: Ratio.deviceWidth*0.85,
      height: Ratio.deviceWidth*0.21,
      marginTop: Ratio.deviceWidth*0.02,
  },
  
  
});
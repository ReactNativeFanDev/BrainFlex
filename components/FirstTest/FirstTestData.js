import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity, Vibration } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';




const windowheight = Dimensions.get("window").height;
var windowwidth = Dimensions.get("window").width;
const windowsquare = windowheight*windowwidth;

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



if (Dimensions.get("window").height/Dimensions.get("window").width <= 1.68) 
{
    windowwidth = windowwidth*0.76
}

 

function FirstTestData({...props}){

    const Answer = React.useRef([]);
    const [TestPage, SetTestPage] = useState(0);
    const [COLOR, SetCOLOR] = useState("#FFFFFF");
    const navigation = useNavigation();


    if(props.RestartTest){
        Finish();
    }

    const Back = () => {
        if(TestPage>0)
        {
            Color(-1);
            SetTestPage(currCount=>currCount-1)
        }
        else
        {
            Color(0);
        }
    }

    const Next = () => {

        if(TestPage<props.QuestionList.length-1)
        {
            if(Answer.current[TestPage] == undefined)
            {
                const Masive = Answer.current;
                Masive[TestPage] = "A";
                Answer.current = Masive;
            }
            Color(1);
            SetTestPage(currCount=>currCount+1)
        }
        else if(TestPage == props.QuestionList.length-1)
        {
            SetCOLOR("#FFFFFF");
            const moveToAnswer = Answer.current.indexOf("A");
            if(moveToAnswer >= 0 && moveToAnswer <= Answer.current.length)
            {
                SetTestPage(moveToAnswer);
            }
            else
            {
                SetCOLOR("#1DB954");
                Finish();
            }
        }
    }

    const Finish = () => {
        SaveResult();
        navigation.navigate(props.DrawerNavigatorMainpage);
    }

    const Color = (props) => {
        if(Answer.current[TestPage+props] == "A" || Answer.current[TestPage+props] == undefined)
        {
            SetCOLOR("#FFFFFF");  
        }
        else
        {
            SetCOLOR("#1DB954");
        }
    }

    const SaveResult = async () => {
        const AgeIndex = Number(await AsyncStorage.getItem('AgeForTestOne'));
        try 
        {
            var x = 0;

            for(let key of Answer.current){
                if(key == 1){
                    x++;
                }
            }
            if(props.QuestionList.length > 20)
            {
                var TotalResult = (Math.floor(Math.random() * 4 + x*4+51) + AgeBonus[AgeIndex].age).toString();
            }
            else
            {
                var TotalResult = (Math.floor(Math.random() * 2.15 + x*2.15+73) + AgeBonus[AgeIndex].age).toString();
            }


            if (TotalResult >= 151)
            {
                await AsyncStorage.setItem('LastResult', "150+");
            }
            else if(TotalResult <= 55)
            {
                await AsyncStorage.setItem('LastResult', "55");
            }
            else
            {
                await AsyncStorage.setItem('LastResult', TotalResult);
            }
            ClearResult();
        } 
        catch(error) 
        {
            console.log(error);
        }
    }

    const ClearResult = () => {
        SetCOLOR("#FFFFFF");
        Answer.current = [];
        SetTestPage(0);
    }

    const Check = async (props) => {
        const TimerEnd = await AsyncStorage.getItem('TimerEnd');
        Vibration.vibrate(10);
        if(props==1)
        {
            const Masive = Answer.current;
            Masive[TestPage] = 1;
            Answer.current = Masive;
        }
        else
        {
            const Masive = Answer.current;
            Masive[TestPage] = 0;
            Answer.current = Masive;
        }

        if (TimerEnd == "true")
        {
            Finish()
        }
        else
        {
            Next()
        }
    }

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async() => {

            const Restart = await AsyncStorage.getItem('TestEnd');

            if(Restart == "true")
            {
                ClearResult();
            }
            
        });
    }, []);

    return(
        <View style={{flex:1}}>

            <View style={{width: windowwidth*0.84, alignSelf: 'center'}}>

                <Image style= 
                    {{
                        height: windowwidth*0.84,
                        width: windowwidth*0.84,
                    }}
                    source={props.QuestionList[TestPage].QuestionImage} 
                />

                <View style={styles.AnswerLocation}>

                    <TouchableOpacity onPressIn={() => Check(props.QuestionList[TestPage].A1)}>
                        <Image
                            style={styles.AnswerFoto}
                            source={props.QuestionList[TestPage].Answer1} 
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => Check(props.QuestionList[TestPage].A2)}>
                        <Image
                            style={[styles.AnswerFoto, {alignSelf: 'center'}]}
                            source={props.QuestionList[TestPage].Answer2}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={{}} onPress={() => Check(props.QuestionList[TestPage].A3)}>
                        <Image
                            style={[styles.AnswerFoto, {}]}
                            source={props.QuestionList[TestPage].Answer3}
                        />
                    </TouchableOpacity>

                </View>

                <View style={styles.AnswerLocation}>

                    <TouchableOpacity onPress={() => Check(props.QuestionList[TestPage].A4)}>
                        <Image
                            style={styles.AnswerFoto}
                            source={props.QuestionList[TestPage].Answer4}
                        />
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={() => Check(props.QuestionList[TestPage].A5)}>
                        <Image
                            style={styles.AnswerFoto}
                            source={props.QuestionList[TestPage].Answer5}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => Check(props.QuestionList[TestPage].A6)}>
                        <Image
                            style={styles.AnswerFoto}
                            source={props.QuestionList[TestPage].Answer6}
                        />
                    </TouchableOpacity>

                </View>

            </View>
                    

            <View style={styles.EndBlock}>

                <TouchableOpacity onPress={() => Back()}>
                    <Image
                        style={styles.BigLeftBack}
                        source={
                        require("../../android/app/src/main/res/drawable/right.png")
                        } 
                    />
                </TouchableOpacity>
                        

                <Text style={styles.EndText}>
                    <Text style={{color:COLOR}}>
                        {props.FirstTestDataEndText} {TestPage+1}/{props.QuestionList.length}
                    </Text>
                </Text>

                <TouchableOpacity onPress={() => Next()}>
                    <Image
                        style={styles.BigRightBack}
                        source={
                        require("../../android/app/src/main/res/drawable/right.png")
                        } 
                    />
                </TouchableOpacity>

            </View>

        </View>
    )
};

export default FirstTestData = React.memo(FirstTestData);

const styles = StyleSheet.create({
    AnswerLocation: {
        marginTop: parseInt(windowwidth*0.03),
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    AnswerFoto: {
        width: parseInt(windowwidth*0.255),
        height: parseInt(windowwidth*0.255),
    },

    EndBlock: {
        position: 'absolute',
        bottom: 10,
        flexDirection:"row",
        alignSelf:"center",
        marginTop: parseInt(windowwidth*0.02),
    },
    EndText: {
        fontSize: parseInt(windowsquare*0.0001),
    },
    BigLeftBack: {
        width: parseInt(windowwidth*0.13),
        height: parseInt(windowwidth*0.13),
        transform: [{ rotate: '180 deg'}],
    },
    BigRightBack: {
        width: parseInt(windowwidth*0.13),
        height: parseInt(windowwidth*0.13),
    },
});
import React, {useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SecondTest () {
    
    return (
        <View style={styles.background}>
            <Text style={styles.text}>
                asd
            </Text>
        </View>
    );
}
const styles = StyleSheet.create({
    background: {
        flex: 1,
        position: "absolute",
        backgroundColor: '#000000',
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: '#FFFFFF',

        textAlign: "center",
    }
  });
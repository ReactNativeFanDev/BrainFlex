import { Dimensions } from "react-native";

export const Colors = {
    White: "#FFFFFF",
    WhiteTransp: "#ffffff11",
    Green200: "#35df70",
    Green300: "#1DB954",
};

export const Ratio = {
    deviceWidth: Dimensions.get("window").width,
    deviceHight: Dimensions.get("window").height,
    size: Dimensions.get("window").height/Dimensions.get("window").width,
}
console.log(Ratio);
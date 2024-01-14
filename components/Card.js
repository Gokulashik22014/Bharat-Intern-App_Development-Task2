import { Image, StyleSheet, Dimensions, View, Text } from "react-native";
import {LinearGradient} from 'expo-linear-gradient';
import { useEffect } from "react";

export default function Card({upperText,source,lowerText}){
    return(
        <LinearGradient colors={['#3E2D8F','#8E78C8']} start={{x:0.5,y:0}} end={{x:0.5,y:1}} style={styles.container}>
            <View style={styles.content}>
                <View>
                    <Text style={{color:"white",fontSize:16}}>{upperText}{'\u00b0'}C</Text>                    
                </View>
                <View>
                    <Image source={source} style={{width:50,height:50}}/>
                </View>
                <View>
                    <Text style={{color:"white",fontSize:16}}>{lowerText}</Text>
                </View>
            </View>
        </LinearGradient>
    )
}

const styles=StyleSheet.create({
    container:{
        justifyContent:"space-evenly",
        width:60,
        height:150,
        borderRadius:40,
        margin:12
    },
    content:{
        justifyContent:"space-evenly",
        alignItems:"center",
        paddingVertical:12,
        width:60,
        height:150,
    }
})
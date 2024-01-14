import React, { useEffect, useState, useRef} from "react";
import { Image, StyleSheet, Dimensions, View, Text ,KeyboardAvoidingView} from "react-native";
import {LinearGradient} from 'expo-linear-gradient';
import BottomSheet, { TouchableOpacity } from "@gorhom/bottom-sheet";
import {MotiImage} from "moti"
import { imageInfo,getAllDayReport} from "./Data";
import Card from "../components/Card";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import CustomBS from "../components/CustomBS";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function HomeScreen() {
    
    const [hideImage,setHideImage]=useState(false)
    const [visible,setVisible]=useState(true)
    const [current,setCurrent]=useState({
      degree:undefined,
      code:undefined,
      hour:undefined,
      nextDays:undefined,
    })
    const [location,setLocation]=useState("Chennai")
    const [currLoc,setcurrLoc]=useState("Chennai")
    const bottomRef=useRef()
    const openBottomSheet=()=>bottomRef.current?.snapToIndex(0)
    //function
    async function search(){
      const data=await getAllDayReport(location)
      setCurrent(data)
      setcurrLoc(location)
      console.log(data.code)
    }
    useEffect(()=>{
      search()
    },[])
  return (
    <>
      <Image source={imageInfo.background} style={styles.background} />
      <View style={styles.container}>
        <View style={styles.searchbar}>
            <Image source={imageInfo.location}/>
          <TextInput placeholder="Enter a location" value={location} onChangeText={(e)=>setLocation(e)} style={{flex:1,marginHorizontal:10}}/>
          <TouchableOpacity onPress={search}>
            <Image source={imageInfo.search}/>
          </TouchableOpacity>
        </View>
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
        <View style={styles.report}>
           {
            visible&&<MotiImage
              from={{ opacity: 0 }} 
              animate={{ opacity: !hideImage?1:0}}
              transition={{
                type:"spring",
              }}
              source={imageInfo[current.code]} 
              style={{ width: 150, height: 150, marginBottom: 6,marginTop:22 }} 
              /> 
           }
          <Text style={styles.text}>{current.degree}{'\u00b0'}C</Text>
          <Text style={styles.text}>{currLoc}</Text>
        </View>
        <TouchableOpacity onPress={openBottomSheet}>
          <Image source={imageInfo.house} style={{marginTop:50}}/>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      </View>
      <CustomBS 
        imageInfo={imageInfo} 
        setHideImage={setHideImage} 
        setVisible={setVisible} 
        bottomRef={bottomRef}
        todaysData={current.hour}
        nextDays={current.nextDays}
      />
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    height: height,
    width: width,
  },
  container: {
    marginTop:30,
  },
  searchbar:{
    flexDirection:"row",
    backgroundColor:"#D9D9D9",
    justifyContent:"space-between",
    marginHorizontal:12,
    paddingHorizontal:12,
    paddingVertical:3,
    borderRadius:40,
    alignItems:"center",
  },
  text:{
    fontSize:24,
    color:"white",
    margin:3,
    marginHorizontal:12
  },
  report:{
    alignItems:"center",
    marginTop:12,
    gap:12,
  }
});

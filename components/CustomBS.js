import React, { useCallback } from "react";
import { Image, StyleSheet, Dimensions, View, Text } from "react-native";
import {LinearGradient} from 'expo-linear-gradient';
import BottomSheet, { TouchableOpacity } from "@gorhom/bottom-sheet";
import Card from "../components/Card";
import { ScrollView } from "react-native-gesture-handler";


export default function CustomBS({imageInfo,setHideImage,setVisible,bottomRef,todaysData,nextDays}){
    const snapPoints = React.useMemo(() => ["37%", "75%"], []);
    const handleChange=useCallback((index)=>{
      setHideImage(index==1?true:false)
      setTimeout(()=>setVisible(index==1?false:true),100)
    })
    //function
    function getTodayDate(){
      let result = new Date()
      let day = result.getDate()
      let month = result.getMonth()+1
      let year = result.getFullYear()
      let fullDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`
      return fullDate

    }
    function getDay(date){
      let result=new Date(date)
      let day=result.getDay()
      const days=["SUN","MON","TUE","WED","THU","FRI","SAT"]
      return days[day]
    }
    return(
        <BottomSheet
            ref={bottomRef}
            snapPoints={snapPoints}
            index={0}
            style={styles.bottomSheet}
            onChange={handleChange}
            enablePanDownToClose={true}
            handleIndicatorStyle={{
              backgroundColor:"#3E2D8F",
              width: 70,
              height: 4,
              borderRadius: 4,
            }}
          >
            <LinearGradient colors={['#9D52AC','#3E2D8F']} start={{x:0,y:1}} end={{x:1,y:0}} style={{flex:1}}>
              <View>
                <View style={styles.header}>
                  <Text style={{ color:"white",fontSize:16}}>Today</Text>
                  <Text style={{ color:"white",fontSize:16}}>{`${getTodayDate()} ${getDay(getTodayDate())}`}</Text>
                </View>
                <View
                  style={{
                    borderBottomColor: 'white',
                    borderBottomWidth: 1,
                    margin:5,
                    borderRadius:22
                  }}
                />
                <View style={{alignItems:"center"}}>
                  <View style={{flexDirection:"row"}}>
                            {
                              todaysData && todaysData.map((item,index)=><Card upperText={item.temperature} source={imageInfo[item.conditionCode]} lowerText={item.hour+":00"} key={index*10}/>)
                            }
                  </View>
                </View>
              </View>
              <View style={{marginTop:12}}>
                <View style={styles.header}>
                  <Text style={{ color:"white",fontSize:16}}>Week ForeCasts</Text>
                </View>
                <View
                  style={{
                    borderBottomColor: 'white',
                    borderBottomWidth: 1,
                    margin:5,
                    borderRadius:22
                  }}
                    />
                    <View style={{ flexDirection: "row", alignItems:"center",justifyContent:"center"}}>
                        <TouchableOpacity style={styles.btn}>
                                <Image source={imageInfo.leftArrow}/>
                    </TouchableOpacity>
                    <View style={{alignItems:"center"}}>
                        <ScrollView horizontal={true}>
                            {
                              nextDays&&nextDays.map((item,index)=><Card upperText={item.maxTempC} source={imageInfo[item.conditionCode]} lowerText={getDay(item.date)} key={index}/>)
                            }
                        </ScrollView>
                    </View>
                        <TouchableOpacity style={styles.btn}>
                                <Image source={imageInfo.rightArrow}/>
                    </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>
          </BottomSheet>
    )
}

const styles = StyleSheet.create({
    bottomSheet: {
      backgroundColor: "white", // Adjust the background color as needed
      borderRadius:20 
    },
    bottomSheetContent: {
      padding: 16,
      borderRadius:80
    },
    header:{
      flexDirection:"row",
      justifyContent:"space-between",
      paddingVertical:6,
      paddingHorizontal:12,
    },
    content:{
      flexDirection:"row"
    },
    btn: {
        padding: 20,
        borderRadius: 50,
    }
  });
  
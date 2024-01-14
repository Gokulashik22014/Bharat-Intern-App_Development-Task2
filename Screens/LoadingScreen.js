import { Image,StyleSheet,Dimensions,View,Text,TouchableOpacity} from "react-native";
import { MotiView,MotiText } from "moti";
import { useState } from "react";
import {imageInfo,RightArrow} from "./Data";
const width=Dimensions.get("screen").width
const height=Dimensions.get("screen").height


export default function LoadingScreen({navigation}){
    const [visible,setVisible]=useState(false)
    return (
        <>
            <Image source={imageInfo.background} style={styles.background}/>
            <View style={styles.cointainer}>
                <MotiView 
                    style={styles.logo}
                    from={{scale:0.9}}
                    animate={{scale:1}}
                    transition={{
                        delay:500,
                        loop:true,
                        duration:800,
                        type:"timing",
                    }}
                >
                    <Image source={imageInfo.logo}/>
                </MotiView>
                <View>
                    <Text style={[styles.text,{color:"white",marginLeft:4}]}>Weather</Text>
                    <Text style={[styles.text,{color:"#DDB130"}]}>ForeCasts</Text>
                </View>
                <TouchableOpacity onPress={()=>navigation.navigate("home")}>
                    <MotiView
                        from={{borderRadius:100,width:60,justifyContent:"flex-end"}}
                        animate={{borderRadius:38,width:240}} 
                        transition={{
                            delay:1000,
                            duration:500,
                            type:"timing",
                        }}
                        onDidAnimate={()=>setVisible(true)}
                        style={styles.btn}
                    > 
                        {visible&&<MotiText
                            from={{opacity:0}}
                            animate={{opacity:1}}
                            transition={{
                                delay:500,
                                type:"spring"
                            }}
                            style={{marginRight:60,fontSize:20,color:"#362A84"}}
                        >Begin</MotiText>}
                        <RightArrow/>
                    </MotiView>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles=StyleSheet.create({
    background:{
        position:"absolute",
        height:height,
        width:width,
    },
    cointainer:{
        justifyContent:"space-around",
        alignItems:"center",
        height:height,
        width:width,
    },
    btn:{
        marginBottom:70,
        backgroundColor:"#DDB130",
        borderRadius:38,
        padding:12,
        height:60,
        width:240,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
    },
    text:{
        fontSize:44,
        fontWeight:"bold"
    },
    logo:{
        marginTop:20,
    }
})
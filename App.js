import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  FlatList,
  Alert,
} from "react-native";
import {
  MeetingProvider,
  useMeeting,
  useParticipant,
  MediaStream,
  RTCView,
} from "@videosdk.live/react-native-sdk";
import { Button } from 'react-native-paper';
import { createMeeting, getToken, validateMeeting } from "./api";


export default function App() {
  const [activo,setActivo] = useState(false);
  const [creando,setCreando] = useState(false);
  
  const [idReunion,setIdReunion] = useState("");

  const [tokenGeneral,setTokenGeneral] = useState(null);
  const buscaID = async () =>{
    setCreando(true);
    const token = "";
    setTokenGeneral(token)
    let meetingId = await createMeeting({ token });
    console.log("meetingId: "+meetingId);
    let valido = await validateMeeting({ meetingId,token});
    console.log("valido: "+valido);
    setActivo(valido);
    setIdReunion(meetingId);
    setCreando(false);
    
  }
  return (
  <><Button style={{marginTop:100,backgroundColor:"#F00",width:200,alignSelf:'center'}} textColor="#FFF" onPress={() => {
    buscaID();    
  }} >Obtiene ID</Button>
  {creando&&
    <Text style={{marginTop:20,width:200,alignSelf:'center'}}>Creando una reunión</Text>
  }
  {activo&&
  (<>
  <Text style={{marginTop:20,width:200,alignSelf:'center'}}>Este es el id de la reunión creada: {idReunion} en realidad se usuara este: lz88-kubh-a7dk</Text>
  <MeetingProvider
      config={{
        meetingId: {idReunion},
        name: "TRC",
        //participantId:'1', // optional,  default: SDK will generate
        micEnabled: false,
        webcamEnabled: false,
        //maxResolution: "<Maximum-resolution>",
        // notification: {
        //   title: "Inicio la reunion",
        //   message: "Acaba de iniciar la reunion",
        // },
      }}
      token={tokenGeneral}
    >
       <MeetingView
       meetingId={idReunion}
       />
    </MeetingProvider>
  </>
  )

  }
  </>

  );
};


const MeetingView = ({meetingId}) => {
  function onMeetingJoined() {
    console.log("onMeetingJoined");
    setUniendose(false)
  }

  function onParticipantJoined(participant) {
    console.log(" onParticipantJoined", participant);
  }
  function onLiveStreamStarted(){
    console.log("onLiveStreamStarted");
  }
  const { join } = useMeeting({
    onMeetingJoined,
    onLiveStreamStarted,
    onParticipantJoined,
    onError: (data) => {
      const { code, message } = data;
      console.log(code)
      console.log(message)
      // Get Constant from SDK which contain value of error Code
      const { INVALID_TOKEN, INVALID_MEETING_ID } = Constants.errors;

      switch (code) {
        case INVALID_TOKEN:
          console.log(`Error is ${message}`);
          break;

        case INVALID_MEETING_ID:
          console.log(`Error is ${message}`);
          break;

        default:
          break;
      }
    },
    });
    const [uniendose,setUniendose] = useState(false);
    const validarReunion = async () =>{
      //meetingId = "l52w-tv5e-tb2d";
      //console.log("Validando: "+meetingId);
      //console.log("Validando: "+token);
      try{
        join();
        setUniendose(true);
      }
      catch(e){
        console.log("Error")
        console.log(e)
      }
      /*let valido = await validateMeeting({ meetingId,token});
      console.log("valido 2: "+valido);
      if(valido){
        //join();
        setUniendose(true);
        //unirseAlaReunion(meetingId);
      }else{
        Alert.alert("El Id de reunión no es válido");
      }*/
    }
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI3MDFhYzk3Yy0yMWNjLTQ4NTQtYTc1Yy1mZTY5NzFlYjQ5ODYiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY3OTkzMDMxMiwiZXhwIjoxNzExNDY2MzEyfQ.6w7w_6Oplj0UGjAfBGm-4ccJH-BiNwePAkIMOqXkmmQ";
    const unirseAlaReunion = async () =>{
        console.log("unirseAlaReunion")
        console.log("meetingId: "+meetingId);
        join();
        setUniendose(true);
    }
  return (
    <>
  <Button 
    style={{marginTop:100,backgroundColor:"blue",width:200,alignSelf:'center'}} 
    textColor="#FFF" 
    onPress={()=>{validarReunion()}}>
  UNIRSE A: 
  {meetingId}
  </Button>
  {uniendose&&
    <Text style={{marginTop:20,width:200,alignSelf:'center'}}>Ingresando a la reunión {meetingId}</Text>
  }
</>
  );
};
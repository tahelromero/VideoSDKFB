import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  FlatList,
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
  const [idReunion,setIdReunion] = useState(null);
  const [tokenGeneral,setTokenGeneral] = useState(null);
  const buscaID = async () =>{
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI3MDFhYzk3Yy0yMWNjLTQ4NTQtYTc1Yy1mZTY5NzFlYjQ5ODYiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY3OTkzMDMxMiwiZXhwIjoxNzExNDY2MzEyfQ.6w7w_6Oplj0UGjAfBGm-4ccJH-BiNwePAkIMOqXkmmQ";
    setTokenGeneral(token)
    let meetingId = await createMeeting({ token });
    console.log("meetingId: "+meetingId);
    let valido = await validateMeeting({ meetingId,token});
    console.log("valido: "+valido);
    setActivo(valido);
    setIdReunion(meetingId);
    
    
  }
  return (
  <><Button style={{marginTop:100,backgroundColor:"#F00",width:200,alignSelf:'center'}} textColor="#FFF" onPress={() => {
    buscaID();    
  }} >Obtiene ID</Button>
  {activo&&
  (<>
  <Text>Este es el id de la reunión: {idReunion}</Text>
  <MeetingProvider
      config={{
        meetingId: "lz88-kubh-a7dk",
        name: "TRC",
        participantId:'1', // optional,  default: SDK will generate
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
       <MeetingView/>
    </MeetingProvider>
  </>
  )

  }
  </>

  );
};
function onMeetingJoined() {
  console.log("onMeetingJoined");
}

function onParticipantJoined(participant) {
  console.log(" onParticipantJoined", participant);
}
function onLiveStreamStarted(){
  console.log("onLiveStreamStarted");
}

const MeetingView = () => {
  const { join } = useMeeting({
    onMeetingJoined,
    onLiveStreamStarted,
    onParticipantJoined,
    onError: (data) => {
      const { code, message } = data;
      console.log("#Error")
      console.log(code)
      console.log(message)
      /* const { code, message } = data;
  
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
      } */
    }});

  return (<Button style={{marginTop:100,backgroundColor:"#F00",width:200,alignSelf:'center'}} textColor="#FFF" onPress={() => {
    try{
      join();
    } catch (e) {
      console.log(e)
    }
  }} >UNIRSE</Button>);
};
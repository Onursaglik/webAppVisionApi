/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useState, useEffect , Component} from 'react';
import { Button, StyleSheet, Text, View ,Image,FlatList} from 'react-native';

import Svg, {
  Circle,
  Ellipse,
  G,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from 'react-native-svg';


import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';



import uuid from 'uuid';
import * as ImagePicker from 'react-native-image-picker';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database"
import "firebase/storage"


export default function App() {

  const [image, setImage] = useState(null);
  const [fileurl,setFileUrl]=useState(null);
  const [json,setJson]=useState(null);
  const [json2,setJson2]=useState([]);
  const [nesnelerin_sayisi,setNesnelerin_Sayisi]=useState(null);
  const[imageuri,setImageUri]=useState(null);
  const [nesnelerin_isimleri,setNesnelerin_isimleri]=useState([]);
  let fileurl2;

  const componentDidMount = () => {


    const firebaseConfig = {
      apiKey: "AIzaSyBAaTJrKPLiGU7Ph2ThKsQesPu5SBUqC1Q",
      authDomain: "goruntuislem.firebaseapp.com",
      databaseURL: "https://goruntuislem-default-rtdb.firebaseio.com",
      projectId: "goruntuislem",
      storageBucket: "goruntuislem.appspot.com",
      messagingSenderId: "135572784230",
      appId: "1:135572784230:web:6cd4bc8d486f1749e3d9a7"
    };
  
   
  firebase.initializeApp(firebaseConfig);
    
  
  
  }


  const visionVakti = async () => {
    try {
  
     
      let body =  JSON.stringify({
        requests: [
          {
            features: [
		
            { type: 'OBJECT_LOCALIZATION', maxResults: 5 }
						],
            image: {
              source: {
              imageUri: "gs://goruntuislem.appspot.com/RESIM"
              }
            }
          }
        ]
      });
      let response = await fetch(
        'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDDqKYR3l2-ZT_TGMdkM1uTQMrAfvc0pwA',
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          method: 'POST',
          body: body
        }
      );
      let responseJson = await response.json();
                              
 
      console.log(responseJson);
     //console.log(responseJson.responses[0].localizedObjectAnnotations);

      let kaydet= await responseJson.responses[0].localizedObjectAnnotations;

      console.log(kaydet);
     
      let nesne_sayisi=0;
      let i=0;

      setNesnelerin_isimleri([])

      while(kaydet[i]!=null){
      
      setNesnelerin_isimleri(nesnelerin_isimleri => [...nesnelerin_isimleri,kaydet[i].name])
      console.log(kaydet[i].boundingPoly);
      i++;

      }
      setNesnelerin_Sayisi(i);
      konum=kaydet[0].boundingPoly.normalizedVertices[0].x;
    
    } catch (error) {
      console.log('selamlar');
    }
  };
 


  

  const fotocek = async () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 640,
      maxHeight: 480,
      quality: 1,
      //videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };

 
        ImagePicker.launchCamera(options, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }
        console.log('base64 -> ', response.base64);
        console.log('uri -> ', response.uri);
        console.log('width -> ', response.width);
        console.log('height -> ', response.height);
        console.log('fileSize -> ', response.fileSize);
        console.log('type -> ', response.type);
        console.log('fileName -> ', response.fileName);
        setImage(response);
      });
    
  };


  const galeriyiAc = async() =>{

    let options = {
      mediaType: 'photo',
      maxWidth: 1024,
      maxHeight: 645,
      quality: 1,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      console.log('base64 -> ', response.base64);
      console.log('uri -> ', response.uri);
      console.log('width -> ', response.width);
      console.log('height -> ', response.height);
      console.log('fileSize -> ', response.fileSize);
      console.log('type -> ', response.type);
      console.log('fileName -> ', response.fileName);
      setImage(response);
    });





  };


  const  veritabaninaYukle = async () => {
    
    //  const response = await fetch(image);
     // const blob = await response.blob();
      //firebase.storage().ref().child("my-image").put(blob);
      //firebase.firestore().collection("resimler").doc("selam").set({
  
  //resimurl: image,
  
    //  })

    let imageuri=image.uri
    console.log(imageuri);
  /*
    const blob=await new Promise((resolve,reject)=> {
  
  const xhr=new XMLHttpRequest();
  xhr.onload = function(){
  
  resolve(xhr.response);
  
  };
  xhr.onerror = function(e) {
    console.log(e);
    reject(new TypeError('Network request failed'));
  };
  xhr.responseType = 'blob';
  xhr.open('GET',imageuri, true);
  xhr.send(null);
  
    });
*/
    
   const response = await fetch(image.uri);
   const blob = await response.blob();
   const ref=firebase.storage().ref("RESIM");
   await  ref.put(blob);
   const url =await ref.getDownloadURL();
   //const ref=firebase.storage().ref().child(uuid.v4());
   //await  ref.put(blob);
   //const url =await ref.getDownloadURL();
   //console.log(url);
  //let fileurl2=url+".jpg";
   setFileUrl(url);
   console.log(fileurl);
  
    }





  return (
    <View >
 <View>
      <Button title="veritabanina baglan" onPress={componentDidMount} />
      <Button title="fotograf cek" onPress={fotocek} />
      <Button title="galeri ac" onPress={galeriyiAc} />
      <Button title="veritabanina yukle" onPress={veritabaninaYukle} />
      <Button title="vision vakti" onPress={visionVakti} />  
      </View>
<View style={{position: 'absolute',top:50}}>
     
      </View>    
      
    <View style={{ flex: 1, alignItems: 'center' }}>
    
      {nesnelerin_sayisi&&<Text>nesne sayisi:{nesnelerin_sayisi}</Text>}
  
      {image && <Image source={{uri:image.uri}} style={{ width: 200, height: 200 }} />}
    
      
      {nesnelerin_isimleri&&nesnelerin_isimleri.map((isim) => <Text key={isim} >{isim}</Text>)}

      {fileurl && <Image source={{uri:fileurl}} style={{ width: 200, height: 200 }} />}
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
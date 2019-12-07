//This is an example code for the camera//
import React from 'react';

//import react in our code.
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Platform,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
  KeyboardAvoidingView, 
  Keyboard, 
  ScrollView,
} from 'react-native';
//https://docs.expo.io/versions/latest/sdk/permissions/
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("db.db");

 
export default class App extends React.Component {
  state = { isPermitted: false,
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    local: null,
    user: 'Marcio',
    endFoto: null,
    descricao: null,
    data: '05/12/2019',
    like: 26,
    POSTS: null,
    isLoading: true,
  };

  constructor(props) {
    super(props);
  }
  componentWillMount() {
    //this.onPress(); // solicitar ativar camera
  }

  componentDidMount() {
    
    FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'photos').catch(e => {
      console.log(e, 'Directory exists');
    });
    this.criarTabela();
  }

  criarTabela(){
    db.transaction(tx => {
      tx.executeSql(
        "create table if not exists posts (id integer primary key not null, user text, endFoto text, descricao text, data text, like integer);"
      );
    });
    console.log("OK");
  }

  add(user, endFoto, descricao, data, like) {
    console.log('linha 63: '+endFoto);
    // is text empty?
    if (endFoto === null || endFoto === "") 
      {
        return false;
      }
    console.log(user);
    db.transaction(
      tx => {
        tx.executeSql("insert into posts (user, endFoto, descricao, data, like) values (?, ?, ?, ?, ?)", [user, endFoto, descricao, data, like]);
        tx.executeSql("select * from posts", [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      },
      null,
      this.update
    );
    this.setState({
      local: null,
      endFoto: null
    })
  }

  onPress() {
    var that = this;
    if (Platform.OS === 'android') {
      async function requestCameraPermission() {
        try {
          const granted = await Permissions.askAsync(Permissions.CAMERA);
          //console.log("camera:");
          //console.log(granted);
          if (granted.permissions.camera.status === "granted") {
            //If CAMERA Permission is granted
            //Calling the WRITE_EXTERNAL_STORAGE permission function
            requestExternalReadAndWritePermission();
          } else {
            alert('CAMERA permission denied');
          }
        } catch (err) {
          alert('Camera permission err', err);
          console.warn(err);
        }
      }
      async function requestExternalReadAndWritePermission() {
        try {
          const granted = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          //console.log("write: ");
          //console.log(granted);
          if (granted.permissions.cameraRoll.status === "granted") {
            //If WRITE_EXTERNAL_STORAGE Permission is granted
            //Calling the READ_EXTERNAL_STORAGE permission function
            //requestExternalReadPermission();
            that.setState({ isPermitted: true });
          } else {
            alert('WRITE_EXTERNAL_STORAGE permission denied');
          }
        } catch (err) {
          alert('Write permission err', err);
          console.warn(err);
        }
      }
      
      //Calling the camera permission function
      requestCameraPermission();
    } else {
      this.setState({ isPermitted: true });
    }
  }

  takePicture = () => {
    //console.log(this.camera);
    if (this.camera) {
      this.camera.takePictureAsync({ onPictureSaved: this.onPictureSaved });
    }
  };

  onPictureSaved = async photo => {
    let loc = `${FileSystem.documentDirectory}photos/${Date.now()}.jpg`;
    await FileSystem.moveAsync({
      from: photo.uri,
      to: loc,
    });
    this.setState({local: loc, isPermitted:false});
    this.setState({endFoto: loc});
    console.log("Foto salva: "+ loc);
    console.log("Foto salva: "+ this.state.local);
  }


  onBottomButtonPressed(event) {
    const captureImages = JSON.stringify(event.captureImages);
    if (event.type === 'left') {
      this.setState({ isPermitted: true });
    } else {
      Alert.alert(
        event.type,
        captureImages,
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );
    }
  }
  render() {
    if (this.state.isPermitted) {
      return (

        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} ref={ref => {
            this.camera = ref;
          }} type={this.state.type}>
          <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                  });
                }}>
                <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> F </Text>
              </TouchableOpacity>
            </View>

            <View style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
        <TouchableOpacity 
          style={{
            flex: 0.23,
            flexDirection: 'row',
            alignSelf: 'flex-end',
            alignItems: 'baseline', 
            width: 45,
            paddingBottom: 15,
          }}
          onPress={this.takePicture}
          activeOpacity={0.8}          
        >
          <Icon
            name="camera"
            title='Capturar'
            type="EvilIcons"
            size={45}
            iconStyle={{ padding: 0}}
            color="#4F4F4F"
          />
         
        </TouchableOpacity>
      </View> 
              
          </View>
          </Camera>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>

          <Image source={{uri:this.state.local}} style={styles.Foto}/>
          <TextInput 
            placeholder="Insira uma descrição para seu POST!" 
            placeholderTextColor= 'gray' 
            style={styles.InputDescricaoFoto}
            onChangeText={descricao => this.setState({ descricao })}
            value={this.state.descricao}
          />

          <View style={styles.ButtonPostCamera}>
            <TouchableOpacity
              style={styles.button}
              onPress={this.onPress.bind(this)}>
                <Icon
                  name="camera-outline"
                  type="EvilIcons"
                  size={44}
                  style={{ paddingTop: 3, marginBottom: -5, alignItems:'baseline'}}
                  color="#4F4F4F"
                />
                <Text style={{fontSize:11, textAlignVertical: 'top', marginBottom:5}}>Capturar</Text> 
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                //onPress={this.onPress.bind(this)}
                onPress={ () => {
                  this.add(this.state.user, this.state.endFoto, this.state.descricao, this.state.data, this.state.like),
                  this.props.navigation.navigate('Posts')
                
                  }
                }>
                <Icon
                  name="instagram"
                  type="EvilIcons"
                  size={41}
                  style={{ paddingTop: 3, marginBottom: -4}}
                  color="#4F4F4F"
                />
                <Text style={{fontSize:11, marginBottom: 0, paddingBottom:3}}>Postar</Text>
                </TouchableOpacity>
            </View>
        </View>
      );

    }
  }
}
const styles = StyleSheet.create({

  keyboard: {
    flex: 0.9,
    justifyContent: 'flex-end',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor:'yellow'

  },
  InputDescricaoFoto: {
    borderColor: "gray",
    borderRadius: 4,
    borderWidth: 1.5,
    marginTop: 7,
    //backgroundColor: '#E0FFFF', 
    height: 40,
    width: '80%',
    textAlign: 'center'
  },
  ButtonPostCamera: {
    flex: 0.10,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    borderTopWidth: 0,
    borderBottomColor: '#4F4F4F',
    width: '100%',
    marginBottom: 2,
    marginTop: 5,
    backgroundColor: 'whitesmoke'
  },
  Foto: {
    flex: 0.92,
    marginTop: 26,
    alignItems: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
    //borderBottomWidth: 0.75,
    //borderBottomColor: '#4F4F4F',
    width: '94%', height: '100%'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'ghostwhite',
  },
  button: {
    
    flexDirection:'column',
    alignItems: 'center',
    //backgroundColor: '#DDDDDD',
    paddingTop: 0,
    width: 60,
    paddingRight: 10,
    opacity: 0.7 
  },
});
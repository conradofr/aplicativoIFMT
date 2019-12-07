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
  Button
} from 'react-native';
//https://docs.expo.io/versions/latest/sdk/permissions/
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

 
export default class App extends React.Component {
  state = { isPermitted: false,
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    local: null,
  };

  constructor(props) {
    super(props);
  }
  //componentWillMount() {
   // this.onPress();
  //}

  componentDidMount() {
    FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'photos').catch(e => {
      console.log(e, 'Directory exists');
    });
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
    console.log("Foto salva: "+ loc);
    console.log("Foto salva: "+ this.state.local);
  }


  onBottomButtonPressed(event) {
    const captureImages = JSON.stringify(event.captureImages);
    if (event.type === 'left') {
      this.setState({ isPermitted: false });
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
        <TouchableOpacity style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
          onPress={this.takePicture}
          
        >
         <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> S </Text>
        </TouchableOpacity>
      </View> 
              
          </View>
          </Camera>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.ButtonPostCamera}>
            <TouchableOpacity
              style={styles.button}
              onPress={this.onPress.bind(this)}>
                <Icon
                  name="camera-outline"
                  type="EvilIcons"
                  size={48}
                  iconStyle={{ padding: 0 }}
                  color="#4F4F4F"
                />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                //onPress={this.onPress.bind(this)}
                onPress={ () => this.props.navigation.navigate('Posts', {local: this.state.local})}>
                <Icon
                  name="instagram"
                  type="EvilIcons"
                  size={45}
                  iconStyle={{ padding: 0 }}
                  color="#4F4F4F"
                />
                </TouchableOpacity>
            </View>
          
          
          <Image source={{uri:this.state.local}} style={styles.Foto}/>
        </View>
      );

    }
  }
}
const styles = StyleSheet.create({

  ButtonPostCamera: {
    flex: 0.08,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    borderBottomWidth: 0.75,
    borderBottomColor: '#4F4F4F',
    width: '100%',
    marginTop: 26,
  },
  Foto: {
    flex: 0.92,
    alignItems: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
    //borderBottomWidth: 0.75,
    //borderBottomColor: '#4F4F4F',
    width: '75%', height: '75%'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  button: {
    flexDirection: 'row',
    //backgroundColor: '#DDDDDD',
    //paddingTop: 5,
    width: 65,
  },
});
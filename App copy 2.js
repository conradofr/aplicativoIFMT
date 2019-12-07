import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Share, Image } from 'react-native';
//import { Icon } from 'react-native-elements';
import Icon from 'react-native-vector-icons/EvilIcons';
import Constants from "expo-constants";
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("db.db");

export default class Posts extends Component{
  constructor() {
    super();
    this.state = {
      inputValue: '',
      user: '',
      foto: '',
      descricao: '',
      data:'',
      like: 0,
    };
  }
  ShareMessage = () => {
    //Here is the Share API 
    Share.share({
      message: this.state.inputValue.toString(),
    })
    //after successful share return result
    .then(result => console.log(result))
    //If any thing goes wrong it comes here
    .catch(errorMsg => console.log(errorMsg));
  };

  heartUp = () =>{
    let likes = this.state.like + 1;

    this.setState({
      like: likes,
    });
  };


  render() {
    return (
      // View principal
      <View style={styles.container}>

        {/* view dos posts*/}
        <View style={ styles.containerPostsFoto }>
          {/* foto*/}
          <View style={ styles.containerFoto } >
            <Image source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'}} style={{flex: .96, height: 350}} />
          </View>
          {/* descricao detalhes da foto*/}
          <View style={ styles.containerDetalhe } >
            
              {/* dados da foto*/}
            <View style={ styles.descricaoDetalhe } >
              <Text style={ styles.titulo }>Beet Caviar Recipe</Text>
              <Text style={ styles.autorData }>a month by @Thang Vo</Text>
            </View>
            {/* acoes social*/}
            <View style={ styles.social } >
              <View style={{width: 50, height: 25, alignItems: 'center', marginBottom: 4, }} >
                <TouchableOpacity
                  onPress={this.ShareMessage}
                  activeOpacity={0.5}>
                  <Icon
                  name="share-google"
                  type="EvilIcons"
                  size={30}
                  iconStyle={{ padding: 0 }}
                  color="#4F4F4F"
                  />
                </TouchableOpacity>
              </View>
              <View style={{width: 50, height: 25, flexDirection:'row', alignItems: 'center', marginBottom: 4}} >
              <TouchableOpacity
                  onPress={ this.heartUp }
                  activeOpacity={0.5}>
                  <Icon
                  name="heart"
                  type="EvilIcons"
                  size={30}
                  iconStyle={{ padding: 0 }}
                  color="#4F4F4F"
                  />
                  
                </TouchableOpacity>
              <Text>{this.state.like}</Text>            
              </View>
            </View>

          </View>
          
        </View>



        <View style={ styles.containerPostsFoto}>
          <Text>Open up App.js to start working on your app!</Text>
        </View>
        <View style={ styles.containerPostsFoto}>
          <Text>Open up App.js to start working on your app!</Text>
        </View>
        <View style={ styles.containerPostsFoto}>
          <Text>Open up App.js to start working on your app!</Text>
        </View>

        
      </View>
    );
  }
} 



const styles = StyleSheet.create({


  titulo: {
    flex: 0.50,
    backgroundColor: 'ghostwhite', //GhostWhite
    alignItems: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
    fontWeight: 'bold',
    paddingLeft: 13,
    paddingTop: 5,
    fontSize: 15,
  },
  autorData: {
    flex: 0.50,
    backgroundColor: 'ghostwhite', //GhostWhite
    paddingLeft: 13,
    paddingTop: 17,
    flexDirection: 'column-reverse',
    fontSize: 13,
    color: 'dodgerblue',
  },
  social: {
    flex: 0.5,
    backgroundColor: 'ghostwhite', //PowderBlude
    flexDirection: 'row-reverse',
    alignItems: 'flex-end'
  },
  descricaoDetalhe: {
    flex: 0.50,
    backgroundColor: 'ghostwhite', //PowderBlude
    alignItems: 'stretch',
    flexDirection: 'column',
    justifyContent: 'center',
    borderBottomWidth: 0.75,
    borderBottomColor: '#4F4F4F',
  },
  containerDetalhe: {
    flex: 0.62,
    //backgroundColor: 'yellow', //PowderBlude
    alignItems: 'stretch',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  containerFoto: {
    flex: 0.38, //
    //alignItems: 'center',
    //justifyContent: 'center',
    backgroundColor: 'ghostwhite',
    marginLeft: 5,
    //borderBottomWidth: 0.75,
    //borderBottomColor: '#4F4F4F', //grey31
  },
  containerPostsFoto: {
    flex: 0.22,
    alignItems: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth: 0.75,
    borderBottomColor: '#4F4F4F',
  },
  container: {
    flex: 1,
    backgroundColor: 'ghostwhite',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    marginTop: 0,
  },
  
});

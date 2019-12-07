import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Share, Image, Button } from 'react-native';
//import { Icon } from 'react-native-elements';
import Icon from 'react-native-vector-icons/EvilIcons';
import Constants from "expo-constants";
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("db.db");

export default class Posts extends Component{
  constructor() {
    super();
    this.state = {
      inputValue: null,
      user: 'Marcio',
      endFoto: null,
      descricao: 'Minha foto pessoal',
      data: '05/12/2019',
      like: 26,
      POSTS: null,
      isLoading: true,
    };
  }

  _isMounted = false;

  componentWillMount() {
    console.log("linha 25 - Will Mount");

    this.criarTabela();

    this.setState({endFoto: this.props.navigation.getParam('local')});

   
    this.loadData();
    //console.log('param ' + this.props.navigation.getParam('pessoaId'));
    
    
    
    //this.loadData(this.props.navigation.getParam('pessoaId'));
    
    
  };

  componentDidMount() {
    console.log("linha 43 - Did Mount");

    this._isMounted = true;

    this.setState({endFoto: this.props.navigation.getParam('local')});

    console.log('linha 52 - Endereço da foto: '+this.props.navigation.getParam('local'));

    this.add(this.state.user, this.state.endFoto, this.state.descricao, this.state.data, this.state.like);

    //this.loadData();
  };
  
  criarTabela(){
    db.transaction(tx => {
        tx.executeSql(
          "create table if not exists posts (id integer primary key not null, user text, endFoto text, descricao text, data text, like integer);"
        );
      });
      console.log("OK");
    }
  
    add(user, endFoto, descricao, data, like) {
      // is text empty?
      if ((user === null || user === "") && (endFoto === null || endFoto === "") && (descricao === null || descricao === "") && (data === null || data === "")) 
        return false;
      
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
    }

    loadData() {
      console.log('função loadData');
      db.transaction(tx => {
        tx.executeSql(
          'select * from posts;',  //Query to execute as prepared statement
          [],              //Argument to pass for the prepared statement
          (_, { rows: { _array } }) => this.setState({ POSTS: _array }) //Callback function to handle the result
      
          );
        
      });
      
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

  heartUp(id, like) {
    let likes = like + 1;

      db.transaction(tx => {
        tx.executeSql('UPDATE posts SET like = ? where id = ?;', [id, likes]); //Query to execute as prepared statement
          tx.executeSql('SELECT * posts where id = ?;', [id], (_, {rows}) => 
          console.log('UPDATE ROWS' + JSON.stringify(rows))
        );
      }, null);
   
  };


  render() {
    
      //const { done: doneHeading } = this.props;
    const { POSTS } = this.state;
    //const heading = doneHeading ? "Completed" : "Todo";

    if (POSTS === null || POSTS.length === 0) {
      return null;
    }

    return (
      // View principal
      <View style={styles.container}>

        <View style={ styles.containerButtonCamera}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Camera')}>
            <Icon
              name="camera"
              type="EvilIcons"
              size={50}
              iconStyle={{ padding: 0 }}
              color="#4F4F4F"/>
          </TouchableOpacity>
        </View>


        {/* view dos posts*/}
        {POSTS.map(({ id, user, endFoto, descricao, data, like }) => (
        console.log('linha 144 - endereco da foto: '+ endFoto),
        <View style={ styles.containerPostsFoto }>
          {/* foto*/}
          <View style={ styles.containerFoto } >
            <Image source={{endFoto}} style={{flex: .96, height: 350}} />
          </View>
          {/* descricao detalhes da foto*/}
          <View style={ styles.containerDetalhe } >
            
              {/* dados da foto*/}
            <View style={ styles.descricaoDetalhe } >
              <Text style={ styles.titulo }>{descricao}</Text>
              <Text style={ styles.autorData }>{data} </Text>
              <Text style={ styles.autorData }>@ {user}</Text>
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
                  onPress={ this.heartUp(this.id, this.like) }
                  activeOpacity={0.5}>
                  <Icon
                  name="heart"
                  type="EvilIcons"
                  size={30}
                  iconStyle={{ padding: 0 }}
                  color="#4F4F4F"
                  />
                  
                </TouchableOpacity>
              <Text>{like}</Text>            
              </View>
            </View>

          </View>
          
        </View>

      ))}
      
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
  
  containerButtonCamera: {
    flex: 0.08,
    alignItems: 'flex-end',
    flexDirection: 'row-reverse',
    borderBottomWidth: 0.75,
    borderBottomColor: '#4F4F4F',
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
    marginBottom: 0,
  },
  
});

import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import Constants from "expo-constants";
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("db.db");


export default class listar extends React.Component {
  state = {
  
    nome: null,
    sobrenome: null,
    idade: null,
    cidade: null,
    pessoas: null,
    isLoading: true
  };
  _isMounted = false;
  componentDidMount() {
    this._isMounted = true;
    this.update();
    console.log("OK");
  }
 

  render() {
    //const { done: doneHeading } = this.props;
    const { pessoas } = this.state;
    //const heading = doneHeading ? "Completed" : "Todo";

    if (pessoas === null || pessoas.length === 0) {
      return null;
    }

    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeading}>Lista de pessoas</Text>
        {pessoas.map(({ id, nome, sobrenome, idade, cidade }) => (

          <View style={{ flexDirection: "row", borderBottomWidth: 5 }}>
            <View style={{flex:2}}><Text style={{ color: "#000" }}>Nome: {nome}, Idade: {idade}</Text></View>
            <View style={{flex:1}}>
              <Button 
                title="Editar" 
                onPress={() => this.props.navigation.navigate('editar', {pessoaId: id})} 
              />
            </View>
            <View style={{flex:1}}>
              <Button 
                title="Deletar"
                onPress={ () => this.delete(id)} 
              />
            </View>
          </View>  
        ), this.update())}
      </View>
    );
  }


  update() {
    db.transaction(tx => {
      tx.executeSql(
        `select * from pessoa;`,  //Query to execute as prepared statement
        [],              //Argument to pass for the prepared statement
        (_, { rows: { _array } }) => this.setState({ pessoas: _array }) //Callback function to handle the result
      );
    });
  }

  delete(id) {
    db.transaction(
      tx => {
        tx.executeSql(`delete from pessoa where id = ?;`, [id]);
      }, this.componentDidMount()
    )
  }
}



const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  flexRow: {
    flexDirection: "column",
    flex: 1
  },
  input: {
    borderColor: "#4630eb",
    borderRadius: 4,
    borderWidth: 1,
    flex: 0.15,
    height: 48,
    margin: 16,
    padding: 8,
  },
  listArea: {
    backgroundColor: "#f0f0f0",
    flex: 1,
    paddingTop: 16
  },
  sectionContainer: {
    marginBottom: 16,
    marginHorizontal: 16
  },
  sectionHeading: {
    fontSize: 18,
    marginBottom: 8
  }
});

import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, TextInput, KeyboardAvoidingView, Keyboard, ScrollView,} from 'react-native';

import Constants from "expo-constants";
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("db.db");


export default class adicionar extends React.Component {
  state = {
    nome: null,
    sobrenome: null,
    idade: null,
    cidade: null,
  };

  componentDidMount() {
    db.transaction(tx => {
      tx.executeSql(
        "create table if not exists pessoa (id integer primary key not null, nome text, sobrenome text, idade text, cidade text);"
      );
    });
    console.log("OK");
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#FFFFFF', justifyContent: 'center',}}>
        <KeyboardAvoidingView behavior="padding" style={styles.keyboard}>
        <View style={{ flex: 2.5}}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <View style={{ marginTop: 50, backgroundColor: 'red', height:320, paddingTop:10 }}>
              <Text>Cadastro</Text>
              <View style={styles.SectionStyle}>
                <TextInput
                  onChangeText={nome => this.setState({ nome })}
                  placeholder="Nome"
                  style={styles.input}
                  value={this.state.nome}
                />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  onChangeText={sobrenome => this.setState({ sobrenome })}
                  placeholder="Sobrenome"
                  style={styles.input}
                  value={this.state.sobrenome}
                />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  onChangeText={idade => this.setState({ idade })}
                  placeholder="Idade"
                  keyboardType='numeric'
                  style={styles.input}
                  value={this.state.idade}
                />
              </View>
 
              <View style={styles.SectionStyle}>
                <TextInput
                  onChangeText={cidade => this.setState({ cidade })}
                  placeholder="Cidade"
                  style={styles.input}
                  value={this.state.cidade}
                />
              </View>     
          </View>    
        </ScrollView>
        </View>
        <View style={{ flex: 1.25, paddingTop: 5 }}>
        <Button style={styles.ButtonStyle}
          title="Adicionar"
          onPress={() => {
            this.add(this.state.nome, this.state.sobrenome, this.state.idade, this.state.cidade);
            this.setState({ nome: null, sobrenome: null, idade: null, cidade: null });
            this.props.navigation.navigate('Home');
          }}
        />
        </View>
      </KeyboardAvoidingView>
      </View>

    
    );
  }
  add(nome, sobrenome, idade, cidade) {
    // is text empty?
    if (nome === null || nome === "") {
      return false;
    }
    console.log(nome);
    db.transaction(
      tx => {
        tx.executeSql("insert into pessoa (nome, sobrenome, idade, cidade) values (?, ?, ?, ?)", [nome, sobrenome, idade, cidade]);
        tx.executeSql("select * from pessoa", [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      },
      null,
      this.update
    );
  }
}

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 10,
  },
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
    flex: 1,
    height: 48,
    margin: 5,
    padding: 7,
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
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 60,
    marginTop: 10,  
    marginLeft: 35,
    marginRight: 35,

    backgroundColor: '#51D8C7',
  },
  ButtonStyle: {
    backgroundColor: '#51D8C7',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#51D8C7',
    height: 40,
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
  },
});

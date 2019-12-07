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
        <View style={{ flex: 1.5, alignItems: 'center' }}>
          <TextInput style={ styles.heading }>Cadastro</TextInput> 
          <ScrollView keyboardShouldPersistTaps="handled" >
            <View style={ styles.viewInput }>
              <View style={styles.SectionStyle}>
                <TextInput
                  onChangeText={nome => this.setState({ nome })}
                  placeholder="Nome"
                  style={styles.input}
                  value={this.state.nome}
                  autoCapitalize="sentences"
                  ref={ref => {
                    this._naoeinput = ref;
                  }}
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    this._sobrenomeinput && this._sobrenomeinput.focus()
                  }
                  blurOnSubmit={false}
                />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  onChangeText={sobrenome => this.setState({ sobrenome })}
                  placeholder="Sobrenome"
                  style={styles.input}
                  value={this.state.sobrenome}
                  autoCapitalize="sentences"
                  ref={ref => {
                    this._sobrenomeinput = ref;
                  }}
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    this._idadeinput && this._idadeinput.focus()
                  }
                  blurOnSubmit={false}
                />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  onChangeText={idade => this.setState({ idade })}
                  placeholder="Idade"
                  keyboardType='numeric'
                  style={styles.input}
                  value={this.state.idade}
                  autoCapitalize="sentences"
                  ref={ref => {
                    this._idadeinput = ref;
                  }}
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    this._cidadeinput && this._cidadeinput.focus()
                  }
                  blurOnSubmit={false}
                />
              </View>
 
              <View style={styles.SectionStyle}>
                <TextInput
                  onChangeText={cidade => this.setState({ cidade })}
                  placeholder="Cidade"
                  style={styles.input}
                  value={this.state.cidade}
                  autoCapitalize="sentences"
                  ref={ref => {
                    this._cidadeinput = ref;
                  }}
                  returnKeyType="next"
                  onSubmitEditing={Keyboard.dismiss}
                  blurOnSubmit={false}
                />
              </View> 
          </View>    
        </ScrollView>
        </View>
        <View style={{ flex: 0.80, paddingTop: 5 }}>
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
  },
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 15,
  },
  flexRow: {
    flexDirection: "column",
    flex: 1
  },
  viewInput: {
    borderColor: "#4630eb",
    borderRadius: 4,
    borderWidth: 1.5,
    marginTop: 25, 
    backgroundColor: '#E0FFFF', 
    height: 275,
    width: 350,
    paddingTop: 10 ,
  },
  input: {
    backgroundColor: '#FFFFE0',
    borderColor: "#4630eb",
    borderRadius: 4,
    borderWidth: 1,
    flex: 1,
    height: 45,
    margin: 2,
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
    height: 50,
    marginTop: 10,  
    marginLeft: 35,
    marginRight: 35,
    paddingBottom: 0,
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

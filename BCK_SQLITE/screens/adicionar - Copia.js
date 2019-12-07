import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, TextInput } from 'react-native';

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
      <View style={styles.container}>
        <Text style={styles.heading}>Cadastro</Text>
        <View style={styles.flexRow}>
          <TextInput
            onChangeText={nome => this.setState({ nome })}
            placeholder="Nome"
            style={styles.input}
            value={this.state.nome}
          />
          <TextInput
            onChangeText={sobrenome => this.setState({ sobrenome })}
            placeholder="Sobrenome"
            style={styles.input}
            value={this.state.sobrenome}
          />
          <TextInput
            onChangeText={idade => this.setState({ idade })}
            placeholder="Idade"
            style={styles.input}
            value={this.state.idade}
          />
          <TextInput
            onChangeText={cidade => this.setState({ cidade })}
            placeholder="Cidade"
            style={styles.input}
            value={this.state.cidade}
          />
        </View>
        <Button
          title="Adicionar"
          onPress={() => {
            this.add(this.state.nome, this.state.sobrenome, this.state.idade, this.state.cidade);
            this.setState({ nome: null, sobrenome: null, idade: null, cidade: null });
          }}
        />
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

import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, TextInput } from 'react-native';

import Constants from "expo-constants";
import * as SQLite from 'expo-sqlite';
import { NavigationActions } from 'react-navigation';
import { navigation } from 'react-navigation';

const db = SQLite.openDatabase("db.db");


export default class editar extends React.Component {
  state = {
    id: null,
    nome: null,
    sobrenome: null,
    idade: null,
    cidade: null,
    pessoa: [],
  };
  
  componentWillMount() {
    console.log("Will Mount");
    console.log('param ' + this.props.navigation.getParam('pessoaId'));
    this.setState({id: this.props.navigation.getParam('pessoaId')});
    
    this.loadData(this.props.navigation.getParam('pessoaId'));
   
    
  }

  render() {
    const { navigation } = this.props;
    const { navigate } = this.props.navigation;
    const { pessoa } = this.state; // jogar no método UPDATE
    return (
      console.log("Render: "+this.state.id),
      <View style={styles.container}>
        <Text style={styles.heading}>Editar Cadastro</Text>

        
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
          title="Salvar"
          onPress={() => {
            this.update(this.state.id, this.state.nome, this.state.sobrenome, this.state.idade, this.state.cidade);
            this.setState({ nome: null, sobrenome: null, idade: null, cidade: null });
            this.props.navigation.navigate('listar');
          }}
        />
      </View>
    );
  }
  loadData(id) {
    console.log('select: '+id);
    db.transaction(tx => {
      tx.executeSql(
        `select * from pessoa where id = ?;`, //Query to execute as prepared statement
        [id],              //Argument to pass for the prepared statement
        (_, { rows: { _array } }) => {
          this.setState({ pessoa: _array }) //Callback function to handle the result
          const pessoa = _array.find(item => item.id === id);
          console.log(pessoa);
          {_array.map(({ id, nome, sobrenome, idade, cidade }) => (
            this.setState({
              nome: nome,
              sobrenome: sobrenome,
              idade: idade,
              cidade: cidade
            })
            ))}

        } 
      );
    });
  }

 

  update(id, nome, sobrenome, idade, cidade) {
    // is text empty?
    if (nome === null || nome === "") {
      return false;
    }
    console.log(nome);
    db.transaction(
      tx => {
        tx.executeSql("UPDATE pessoa SET nome = ?, sobrenome = ?, idade = ?, cidade = ? where id = ?", [nome, sobrenome, idade, cidade, id]);
        tx.executeSql("select * from pessoa where id=?", [id], (_, { rows }) =>
          console.log("UPDATE ROWS"+JSON.stringify(rows))
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

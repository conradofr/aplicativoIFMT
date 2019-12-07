import React, { Component } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import Constants from "expo-constants";

export default class Home extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "space-evenly", alignItems: "center", flexDirection: "column" }}>
        <Text>Hello, home!</Text>
        <Button style={styles.button}
          title="Go to Settings"
          onPress={() => this.props.navigation.navigate('Settings')}
        />
        <Button style={styles.button}
          title="Calculadora"
          onPress={() => this.props.navigation.navigate('calculadora')}
        />
        <Button style={styles.button}
          title="Adicionar"
          onPress={() => this.props.navigation.navigate('adicionar')}
        />
        <Button style={styles.button}
          title="Listar"
          onPress={() => this.props.navigation.navigate('listar')}
        />
      </View>
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
  button: {
    flex: 0.25,
    marginBottom: 15,
    marginHorizontal: 16,
  },
  sectionHeading: {
    fontSize: 18,
    marginBottom: 8
  }
});

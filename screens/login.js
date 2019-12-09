import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { TouchableOpacity, StyleSheet, StatusBar, AsyncStorage, Image, Text, TextInput, View, Button, KeyboardAvoidingView, Keyboard, ScrollView, } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { readDirectoryAsync } from 'expo-file-system';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("db.db");


export default class login extends Component {
    constructor(props) {
        super(props);
        this.state = { login: '' };
        this.state = { senha: '' };
        this.state = { USERS: null };
    }

    componentDidMount() {
        this._isMounted = true;
        this.loadData();
    };

    loadData() {
        console.log('função loadData');
        db.transaction(tx => {
            tx.executeSql(
                'select * from users;',  //Query to execute as prepared statement
                [],              //Argument to pass for the prepared statement
                (_, { rows: { _array } }) => this.setState({ USERS: _array }) //Callback function to handle the result

            );

        });
        console.log(JSON.stringify(this.state.USERS))
    }

    acessar(loginP, senhaP) {
        let verificacao = '';
                if (!loginP) {
            verificacao += 'Informe um login!\n'
        }
        if (!senhaP) {
            verificacao += 'Informe uma senha!\n'
        }

        if (verificacao) {
            alert(verificacao)
        } else {
            this.loadData();
            
        }
    }

    render() {
        return (

            <View style={styles.container}>
                <KeyboardAvoidingView behavior="padding" style={styles.keyboard}>

                    <ScrollView keyboardShouldPersistTaps="always" style={styles.scroll}>
                        <View style={styles.container}>
                            <Image style={styles.Logo} source={{ uri: 'https://miro.medium.com/max/1200/1*jDIj2SKAE-Bp32owLoHDjw.png' }} />
                            <Text style={styles.text2}> Trabalho React Native </Text>
                        </View>

                        <TextInput

                            style={styles.Input}
                            placeholder="Login"
                            onChangeText={(login) => this.setState({ login })}
                            value={this.state.login}
                            keyboardType={'default'}
                        />

                        <TextInput
                            secureTextEntry={true}
                            style={styles.Input}
                            placeholder="Senha"
                            onChangeText={(senha) => this.setState({ senha })}
                            value={this.state.senha}
                            keyboardType={'default'}
                        />


                        <TouchableOpacity
                            onPress={() => this.acessar(this.state.login, this.state.senha)}
                            style={styles.Button}>
                            <Text style={styles.ButtonText}>Entrar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Cadastrar')}
                            style={styles.ButtonCadastro}>
                            <Text style={styles.ButtonTextCadastro}>Cadastre-se</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    Button: {
        padding: 20,
        // paddingLeft: 10,
        // paddingRight: 10,
        borderRadius: 5,
        backgroundColor: '#00bfff',
        alignSelf: 'stretch',
        margin: 10,
        marginHorizontal: 20,
    },
    ButtonCadastro: {
        padding: 20,
        // paddingLeft: 10,
        // paddingRight: 10,
        borderRadius: 5,
        backgroundColor: '#FFF',
        borderColor: '#00bfff',
        alignSelf: 'stretch',
        margin: 10,
        marginHorizontal: 20,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#222222',
        alignSelf: 'stretch',
        height: '100%',
    },
    text2: {
        fontSize: 14,
        textAlign: 'left',
        color: '#FFF',
        paddingBottom: 50,
    },
    ButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center'
    },

    ButtonTextCadastro: {
        color: '#00bfff',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center'
    },

    Logo: {
        height: 200,
        width: 200,
        alignItems: 'center',
    },
    Input: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 5,
        backgroundColor: '#FFF',
        alignSelf: 'stretch',
        marginBottom: 15,
        marginHorizontal: 20,
        fontSize: 16,
    },
    keyboard: {
        flex: 1,
        justifyContent: 'center',
        padding: 0,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scroll: {
        flex: 1,
        padding: 0,
        alignSelf: 'stretch',

    }


});
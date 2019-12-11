import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Keyboard,
} from "react-native";
import Constants from "expo-constants";
import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';

const db = SQLite.openDatabase("db.db");


export default class cadastrar extends React.Component {

      constructor() {
        super();
        this.state = {
            email: '',
            login: '',
            senha: '',
            users: null,
        };
      }

    componentDidMount() {

        FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'photos').catch(e => {
            console.log(e, 'Directory exists');
        });
        this.criarTabela();
    }

    criarTabela() {
        db.transaction(tx => {
            tx.executeSql(
                "create table if not exists users (id integer primary key not null, login text, email text, senha text);"
            );
        });
        console.log("OK");
    }

    cadastrarUsuario(emailP, loginP, senhaP) {
        let verificacao = '';
        if (!emailP) {
            verificacao += 'Informe um email!\n'
        }
        if (!loginP) {
            verificacao += 'Informe um login!\n'
        }
        if (!senhaP) {
            verificacao += 'Informe uma senha!\n'
        }

        if (verificacao) {
            alert(verificacao)
        } else {

            db.transaction(tx => {
                console.log('SELECT')
                tx.executeSql(                   
                    'select * from users where email=' + emailP + ' or login=' + loginP + ' LIMIT 1;',
                    [],              //Argument to pass for the prepared statement
                    (_, { rows: { _array } }) => this.setState({ users: _array }) //Callback function to handle the result

                );

            });
            console.log(JSON.stringify(this.state.users))
            verificacao = '';

            if (this.state.users) {
                console.log('IF')
                const listItems = this.state.users.map((id, login, email, senha) => {
                    if (emailP === email) {
                        verificacao += 'Já existe um usuário com esse email!'
                    }
                    if (loginP === login) {
                        verificacao += 'Já existe um usuário com esse login!'
                    }
                });

                alert(verificacao)
            } else {

                console.log("ELSE: " + verificacao)
                console.log(loginP + " " + emailP + " " + " Senha " + senhaP)
                db.transaction(
                    tx => {
                        tx.executeSql("insert into users (login, email, senha) values (?, ?, ?)", [loginP, emailP, senhaP],);

                    }
                );

                alert('Usuário cadastrado com sucesso!')
                this.props.navigation.navigate('Login')
            }
        }


    }

    render() {
        return (

            <View style={styles.container}>
                <KeyboardAvoidingView behavior="padding" style={styles.keyboard}>

                    <Text style={{color: '#fff', padding: 10, fontSize: 14, fontWeight: 'bold'}}> CADASTRAR-SE </Text>

                    <ScrollView keyboardShouldPersistTaps="always" style={styles.scroll}>


                        <TextInput
                            style={styles.Input}
                            placeholder="Email"
                            keyboardType={'default'}
                            onChangeText={(email) => this.setState({ email })}
                            value={this.state.email}
                        />

                        <TextInput
                            style={styles.Input}
                            placeholder="Login"
                            keyboardType={'default'}
                            onChangeText={(login) => this.setState({ login })}
                            value={this.state.login}
                        />

                        <TextInput
                            style={styles.Input}
                            placeholder="Senha"
                            keyboardType={'default'}
                            onChangeText={(senha) => this.setState({ senha })}
                            value={this.state.senha}
                        />


                        <TouchableOpacity
                            onPress={() => {
                                this.cadastrarUsuario(this.state.email, this.state.login, this.state.senha);
                            }}
                            style={styles.ButtonCadastro}>
                            <Text style={styles.ButtonTextCadastro}>Cadastrar</Text>
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
        paddingTop:40,
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
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default class Calculadora extends Component {
  constructor(props) {
    super(props);
    global.termo_um = 0;
    global.termo_dois = '';
    global.firstTerm = 0;
    global.secondTerm = '';
    global.resultado = 0;
    global.num = '';
    global.operando = null;
    global.memory = 0;

    this.state = {
      zero: '0',
      um: '1',
      dois: '2',
      tres: '3',
      quatro: '4',
      cinco: '5',
      seis: '6',
      sete: '7',
      oito: '8',
      nove: '9',
      display: 0,
      somar: '+',
      subtrair: '-',
      dividir: '÷',
      multiplicar: '×',
      porcent: '%',
      clear: 'C',
      deletar: 'DEL',
      igual: '=',
      ponto: '.',
      maisoumenos: '±',
    };
  }

  _onPressButton(value) {
    if (value === '±') {
      if (global.firstTerm != 0 && global.secondTerm === '') {
        //alert(global.firstTerm)
        global.firstTerm = global.firstTerm * -1;
        this.setState({
          display: global.firstTerm,
        });
      } else {
        global.secondTerm = global.secondTerm * -1;
        this.setState({
          display: global.firstTerm + global.operando + global.secondTerm,
        });
      }
    } else if (value === 'DEL') {   // FUNÇÃO DELETE COM PROBLEMAS APOS EFETUAR UM RESULTADO
      global.termo_um = global.firstTerm.toString();
      global.termo_dois = global.secondTerm.toString();

      console.log(global.termo_um + '' + global.operando + '' + global.termo_dois);

      if (global.termo_um != 0 && global.termo_dois == 0) {
        //alert(global.termo_um.length),
        if (global.secondTerm == 0 && global.operando != null) {
          //alert('Tamanho termo dois: ' + global.termo_dois.length),
          (global.operando = null),
            this.setState({
              display: global.termo_um,
            });
        } else {
          //if (global.termo_um.length >= 1)
          
          global.termo_um = global.termo_um.substring(0,global.termo_um.length - 1);  
          alert('Tamanho termo um: ' + global.termo_um);
          if (global.termo_um.length <= 0 || global.termo_um === 'Na' || global.termo_um === '') {
            global.firstTerm = 0;
            this.setState({
              display: 0,
            });
          } else {
            this.setState({
              display: global.termo_um,
            });
          }
        }
        global.firstTerm = parseFloat(global.termo_um);
        //alert(global.termo_um.length)
      }

      // AJUSTE TERMO DOIS E OPERANDO
      else if (
        global.termo_um != 0 &&
        global.termo_dois != 0 &&
        global.operando != null
      ) {
        //alert(global.termo_um.length),
        (global.termo_dois = global.termo_dois.substring(
          0,
          global.termo_dois.length - 1
        )),
          //alert('TAMANHO TERMO DOIS: ' + global.termo_dois.length)
          this.setState({
            display: global.termo_um + global.operando + global.termo_dois,
          });
        if (
          global.termo_dois == undefined ||
          global.termo_dois == '' ||
          global.termo_dois == null
        )
          global.termo_dois = 0;

        //alert('tamanho: '+global.termo_dois.length + ' valor: '+ global.termo_dois) //ESTÁ RETORNANDO TAMANHO INDEFINIDO
        (global.firstTerm = parseFloat(global.termo_um)),
          (global.secondTerm = parseFloat(global.termo_dois));
      }
    } else if (value === 'C') {
      global.termo_um = 0;
      global.termo_dois = '';
      global.firstTerm = 0;
      global.secondTerm = '';
      global.resultado = 0;
      global.num = '';
      global.operando = null;
      this.setState({
        display: 0,
      });
    } else if (value === '=') {
      switch (global.operando) {
        case '+': {
          (global.firstTerm = parseFloat(global.firstTerm)),
          (global.secondTerm = parseFloat(global.secondTerm)),
          (global.resultado = global.firstTerm + global.secondTerm),
          this.setState({
            display: global.resultado,
          });
          global.firstTerm = 0;
          global.secondTerm = '';
          global.termo_um = 0;
          global.termo_dois = '';
          global.operando = null;
          break;
        }
        case '-': {
          (global.firstTerm = parseFloat(global.firstTerm)),
          (global.secondTerm = parseFloat(global.secondTerm)),
          (global.resultado = global.firstTerm - global.secondTerm);
          this.setState({
            display: global.resultado,
          });
          global.firstTerm = 0;
          global.secondTerm = '';
          global.termo_um = 0;
          global.termo_dois = '';
          global.operando = null;
          break;
        }
        case '×': {
          (global.firstTerm = parseFloat(global.firstTerm)),
          (global.secondTerm = parseFloat(global.secondTerm)),
          (global.resultado = global.firstTerm * global.secondTerm);
          this.setState({
            display: global.resultado,
          });
          global.firstTerm = 0;
          global.secondTerm = '';
          global.termo_um = 0;
          global.termo_dois = '';
          global.operando = null;
          break;
        }
        case '÷': {
          (global.firstTerm = parseFloat(global.firstTerm)),
          (global.secondTerm = parseFloat(global.secondTerm)),
          (global.resultado = global.firstTerm / global.secondTerm);
          this.setState({
            display: global.resultado,
          });
          global.firstTerm = 0;
          global.secondTerm = '';
          global.termo_um = 0;
          global.termo_dois = '';
          global.operando = null;
          break;
        }
      }
    } else if (value === '%') {
      (global.firstTerm = parseFloat(global.firstTerm)),
        (global.secondTerm = parseFloat(global.secondTerm));
      if (value === '%' && global.operando === null) {
        global.resultado = global.firstTerm / 100;
        this.setState({
          display: global.resultado,
        });
        global.firstTerm = 0;
        global.secondTerm = '';
        global.termo_um = 0;
        global.termo_dois = '';
      } else {
        switch (global.operando) {
          case '+': {
            global.resultado =
              global.firstTerm + global.firstTerm * (global.secondTerm / 100);
            this.setState({
              display: global.resultado,
            });
            global.firstTerm = 0;
            global.secondTerm = '';
            global.termo_um = 0;
            global.termo_dois = '';
            global.operando = null;
            break;
          }
          case '-': {
            global.resultado =
              global.firstTerm - global.firstTerm * (global.secondTerm / 100);
            this.setState({
              display: global.resultado,
            });
            global.firstTerm = 0;
            global.secondTerm = '';
            global.termo_um = 0;
            global.termo_dois = '';
            global.operando = null;
            break;
          }
          case '×': {
            global.resultado = global.firstTerm * (global.secondTerm / 100);
            this.setState({
              display: global.resultado,
            });
            global.firstTerm = 0;
            global.secondTerm = '';
            global.termo_um = 0;
            global.termo_dois = '';
            global.operando = null;
            break;
          }
          case '÷': {
            global.resultado = global.firstTerm / (global.secondTerm / 100);
            this.setState({
              display: global.resultado,
            });
            global.firstTerm = 0;
            global.secondTerm = '';
            global.termo_um = 0;
            global.termo_dois = '';
            global.operando = null;
            break;
          }
        }
      }
    } else if (value === '+' || value === '-' || value === '÷' || value === '×') {

      if(global.firstTerm == 0 && global.secondTerm == 0){
        global.operando = null;
      }else if(global.firstTerm != 0) {
          global.firstTerm = parseFloat(global.firstTerm);
          global.operando = value;
          this.setState({
            display: global.firstTerm + global.operando,
          });
      }else if(this.state.display == 0) {
        global.firstTerm = value;
        this.setState({
          display: value,
        });
      }else {
        this.setState({
          display: this.state.display,
        });
      }
      global.firstTerm = parseFloat(global.firstTerm);

      }
    
    // CONFIGURAÇÃO TERMO DOIS
    else {
      if (global.firstTerm != 0 && global.operando != null) {
        if (global.secondTerm === '' || global.secondTerm === 0) {
          (global.secondTerm = ''),
            (global.secondTerm = global.secondTerm + value);
          this.setState({
            display: global.firstTerm + global.operando + global.secondTerm,
          });
          //global.secondTerm = parseFloat(global.secondTerm)
        } else {
          global.secondTerm = global.secondTerm + value;
          this.setState({
            display: global.firstTerm + global.operando + global.secondTerm,
          });
          //global.secondTerm = parseFloat(global.secondTerm)
        }
        //alert(global.num)
      } else if (global.resultado != 0 || global.firstTerm == 0) {
        global.firstTerm = value;
        this.setState({
          display: value,
        });
        //global.firstTerm = parseFloat(global.firstTerm);
        global.memory = global.resultado;
        global.resultado = 0;
      } else if(global.firstTerm != 0 || global.operando != null){
        global.operando = null,
        (global.firstTerm = global.firstTerm + value),
          this.setState({
            display: global.firstTerm,
          });
        //alert(global.termo_um)
        //global.firstTerm = parseFloat(global.firstTerm)
      }
    }
  }

  render() {
    return (
      // Try setting `flexDirection` to `column`.
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={{ flex: 3, backgroundColor: 'lightgray' }} />
        <View style={{ flex: 5, flexDirection: 'row' }}>
          <View style={{ width: 25, backgroundColor: 'lightgray' }} />
          <View style={styles.displayContainer}>
            <Text
              style={styles.display}
              onChangeText={display => this.setState({ display })}>
              {' '}
              {this.state.display}
            </Text>
          </View>
          <View style={{ width: 25, backgroundColor: 'lightgray' }} />
        </View>
        <View style={{ flex: 2, backgroundColor: 'lightgray' }} />

        <View style={{ flex: 6, flexDirection: 'row' }}>
          <View style={{ flex: 1, backgroundColor: 'lightgray', padding: 10 }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={styles.container}>
                <Text
                  style={styles.button}
                  onPress={() => {
                    this._onPressButton(this.state.clear);
                  }}>
                  {this.state.clear}
                </Text>
              </View>
              <View style={styles.container}>
                <Text
                  style={styles.button}
                  onPress={() => {
                    this._onPressButton(this.state.maisoumenos);
                  }}>
                  {this.state.maisoumenos}
                </Text>
              </View>
              <View style={styles.container}>
                <Text
                  style={styles.button}
                  onPress={() => {
                    this._onPressButton(this.state.porcent);
                  }}>
                  {this.state.porcent}
                </Text>
              </View>
              <View style={styles.container}>
                <Text
                  style={styles.button}
                  onPress={() => {
                    this._onPressButton(this.state.deletar);
                  }}>
                  {this.state.deletar}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{ flex: 6, flexDirection: 'row' }}>
          <View style={{ flex: 1, backgroundColor: 'lightgray', padding: 10 }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={styles.container}>
                <Text
                  style={styles.button}
                  onPress={() => {
                    this._onPressButton(this.state.sete);
                  }}>
                  {this.state.sete}
                </Text>
              </View>
              <View style={styles.container}>
                <Text
                  style={styles.button}
                  onPress={() => {
                    this._onPressButton(this.state.oito);
                  }}>
                  {this.state.oito}
                </Text>
              </View>
              <View style={styles.container}>
                <Text
                  style={styles.button}
                  onPress={() => {
                    this._onPressButton(this.state.nove);
                  }}>
                  {this.state.nove}
                </Text>
              </View>
              <View style={styles.container}>
                <Text
                  style={styles.button}
                  onPress={() => {
                    this._onPressButton(this.state.dividir);
                  }}>
                  {this.state.dividir}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ flex: 6, flexDirection: 'row' }}>
          <View style={{ flex: 1, backgroundColor: 'lightgray', padding: 10 }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={styles.container}>
                <Text
                  style={styles.button}
                  onPress={() => {
                    this._onPressButton(this.state.quatro);
                  }}>
                  {this.state.quatro}
                </Text>
              </View>
              <View style={styles.container}>
                <Text
                  style={styles.button}
                  onPress={() => {
                    this._onPressButton(this.state.cinco);
                  }}>
                  {this.state.cinco}
                </Text>
              </View>
              <View style={styles.container}>
                <Text
                  style={styles.button}
                  onPress={() => {
                    this._onPressButton(this.state.seis);
                  }}>
                  {this.state.seis}
                </Text>
              </View>
              <View style={styles.container}>
                <Text
                  style={styles.button}
                  onPress={() => {
                    this._onPressButton(this.state.multiplicar);
                  }}>
                  {this.state.multiplicar}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ flex: 6, flexDirection: 'row' }}>
          <View style={{ flex: 1, backgroundColor: 'lightgray', padding: 10 }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={styles.container}>
                <Text
                  style={styles.button}
                  onPress={() => {
                    this._onPressButton(this.state.um);
                  }}>
                  {this.state.um}
                </Text>
              </View>
              <View style={styles.container}>
                <Text
                  style={styles.button}
                  onPress={() => {
                    this._onPressButton(this.state.dois);
                  }}>
                  {this.state.dois}
                </Text>
              </View>
              <View style={styles.container}>
                <Text
                  style={styles.button}
                  onPress={() => {
                    this._onPressButton(this.state.tres);
                  }}>
                  {this.state.tres}
                </Text>
              </View>
              <View style={styles.container}>
                <Text
                  style={styles.button}
                  onPress={() => {
                    this._onPressButton(this.state.subtrair);
                  }}>
                  {this.state.subtrair}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{ flex: 6, flexDirection: 'row' }}>
          <View style={{ flex: 1, backgroundColor: 'lightgray', padding: 10 }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={styles.container}>
                <Text
                  style={styles.button}
                  onPress={() => {
                    this._onPressButton(this.state.zero);
                  }}>
                  {this.state.zero}
                </Text>
              </View>
              <View style={styles.container}>
                <Text
                  style={styles.button}
                  onPress={() => {
                    this._onPressButton(this.state.ponto);
                  }}>
                  {this.state.ponto}
                </Text>
              </View>
              <View style={styles.container}>
                <Text
                  style={styles.button}
                  onPress={() => {
                    this._onPressButton(this.state.igual);
                  }}>
                  {this.state.igual}
                </Text>
              </View>
              <View style={styles.container}>
                <Text
                  style={styles.button}
                  onPress={() => {
                    this._onPressButton(this.state.somar);
                  }}>
                  {this.state.somar}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: 68,
    height: 68,
    backgroundColor: 'dodgerblue',
    borderRadius: 15,
  },
  button: {
    marginTop: 17,
    textAlign: 'center',
    fontSize: 23,
  },
  display: {
    includeFontPadding: true,
    textAlignVertical: 'bottom',
    flex: 5,
    backgroundColor: 'cyan',
    borderRadius: 10,
    paddingTop: 30,
    textAlign: 'right',
    paddingRight: 10,
    letterSpacing: 3,
    // writingDirection: 'rtl',
    fontSize: 35,
  },
  displayContainer: {
    flex: 5,
    backgroundColor: 'lightgray',
  },
});

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Api, JsonRpc, RpcError } from 'eosjs';
import JsSignatureProvider from 'eosjs/dist/eosjs-jssig';
const defaultPrivateKey = "PW5KZfGY9xTQh9HB1meEsD9Ur6a49zLw9d5b3bCokKm1hEqLDr9qu"; // useraaaaaaaa
const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);
const rpc = new JsonRpc('http://127.0.0.1:7777');
const api = new Api({ rpc, signatureProvider });

class App extends Component {

  state = { result: 'result' };

  async componentDidMount() {
    const result = await api.transact({
      actions: [{
        account: 'eosio.token',
        name: 'transfer',
        authorization: [{
            actor: 'alice',
            permission: 'active',
        }],
        data: {
            from: 'alice',
            to: 'bob',
            quantity: '0.0001 SYS',
            memo: '',
        },
    }]
    }, {
      blocksBehind: 3,
      expireSeconds: 30,
    });
    this.setState({ result })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
            {this.state.result}
          </a>
        </header>
      </div>
    );
  }
}

export default App;

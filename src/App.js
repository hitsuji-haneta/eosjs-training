import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Api, JsonRpc, RpcError } from 'eosjs';
import JsSignatureProvider from 'eosjs/dist/eosjs-jssig';
const defaultPrivateKey = "5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3";
const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);
const rpc = new JsonRpc('http://127.0.0.1:7777');
const api = new Api({ rpc, signatureProvider });

class App extends Component {

  state = {
    id: '',
    status: 'loading..',
    count: 0,
  };

  async componentDidMount() {
    try {
      const result = await api.transact({
        actions: [{
          account: 'addressbook',
          name: 'upsert',
          authorization: [{
              actor: 'tom',
              permission: 'active',
          }],
          data: {
              user: 'tom',
              first_name: 'tom',
              last_name: 'jobim',
              age: 30,
              street: '12345 road',
              city: 'rio',
              state: 'brasil',
          },
      }]
      }, {
        blocksBehind: 3,
        expireSeconds: 30,
      });
      console.log(result);
      const { transaction_id, processed } = result;
      this.setState({
        id: transaction_id,
        status: processed.receipt.status,
      });
    } catch (e) {
      console.log('\nCaught exception: ' + e);
      if (e instanceof RpcError) console.log(JSON.stringify(e.json, null, 2));
    }
  }

  addCount(count) {
    console.log(`click!! ${count}`);
    this.setState({ count: count + 1 });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>{this.state.id}</p>
          <p>{this.state.status}</p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <button onClick={() => this.addCount(this.state.count)}>{this.state.count}</button>
        </header>
      </div>
    );
  }
}

export default App;

const net = require("net");
const DataRetriever = require("./DataRetriever");
const jsonrpc = require('jsonrpc-lite')

/**
 * Monitor will forward from this machine @ {port} to the remote {ip}@{port}
 * Note that "for now", the ports must match
 */
class Monitor {
  constructor(/*string ip or domain*/ host, /*number*/port, /*number*/binding_port) {
    this.host = host;
    this.port = port;
    this.binding_port = binding_port;
  }

  startForward() {
    if(!this.local_server) {
      this.local_server = net.createServer((conn) => this.onConnection(conn));
      this.local_server.listen(this.binding_port, "0.0.0.0");
    }
  }

  onConnection(connection) {
    connection.on('data', (data) => {
      var json = undefined;
      try {
        json = jsonrpc.parse(data.toString());
      } catch(e) {
        console.log(data);
      }
      var id = 0;
      console.log(json);
      if(json && json.payload) {
        id = json.payload.id;

        const retriever = new DataRetriever({
          host: this.host,
          port: this.port
        });

        if(json.payload.method == "miner_getstat1") {
          const call = data.toString() + "\n";
          retriever.callRaw(call)
          .then(state_string => {
            connection.write(state_string);
            connection.destroy()
          })
          .catch(err => {
            connection.write(JSON.stringify(jsonrpc.error(id, new jsonrpc.JsonRpcError("Exception received", 1)))+"\n");
            connection.destroy()
          });
        } else {
          // call preformatted data
          retriever.call()
          .then(state => {
            connection.write(JSON.stringify(jsonrpc.success(id, state))+"\n");
            connection.destroy()
          })
          .catch(err => {
            connection.write(JSON.stringify(jsonrpc.error(id, new jsonrpc.JsonRpcError("Exception received", 1)))+"\n");
            connection.destroy()
          });
        }
      } else {
        connection.write(JSON.stringify(jsonrpc.error(id, new jsonrpc.JsonRpcError("Exception received", 2)))+"\n");
        connection.destroy()
      }
    });
  }
}

module.exports = Monitor;

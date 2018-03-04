var dgram = require("dgram");

class Discovery {
  constructor(data) {
    this.data = data || {};
    this._bound = false;

    this.server = dgram.createSocket("udp4");
    this.server.on("message", (m, i) => this._onMessage(m, i));
    this.server.on("listening", () => this._onListener());
  }

  _onMessage(message, rinfo) {
    try {
      const json = JSON.parse(message);
      if(json.discover) {
        const replay = {
          service: "miner_push",
          data: this.data
        };

        const message = new Buffer(JSON.stringify(replay));
        this.server.send(message, 0, message.length, rinfo.port, rinfo.address);
      }
    } catch(e) {
      console.log(e);
    }
  }

  _onListener() {
    var address = this.server.address();
    console.log("server listening " + address.address + ":" + address.port);
  }

  bind(port) {
    if(!this._bound) {
      this._bound = true;
      this.server.bind(port);
    }
  }
}

module.exports = Discovery;

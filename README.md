# Miner Push !

Simple app to send and push information about rigs directly to monitoring app

[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)


# Install

```
git clone https://github.com/codlab/miner_push
cd miner_push
npm install
```

# Use

## Configuration

in the miner_push folder, create a config.json file with the following informations :

```json
{
  "domain": HOST,
  "monitors": [
    {"name":NAME, "host":HOST, "port": PORT, "binding_port": BIND_PORT},
    {"name":NAME, "host":HOST, "port": PORT, "binding_port": BIND_PORT}
    ...
  ]
}
```

HOST : (string) put your ip or domain name (example : "yourrigs.noip.org")
NAME : (string) the name of the rig (example : "rig1")
PORT : the actual port number on the rig where the miner is bound to
BIND_PORT : the actual port number on which this app will bind to forward calls

## Discoverability

The app will respond to UDP Broadcast calls on port 1732 by default. It will answer with the information of the app.

For instance :

```
{
  "service": "miner_push",
  "data": {
    "rigs": [
      { "name": "rig1", "port": 4000 },
      { "name": "rig2", "port": 4001 }
    ]
  }
}
```


## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue,
email, or any other method with the owners of this repository before making a change.

Please note we have a code of conduct, please follow it in all your interactions with the project.

## License

This project is licensed under the GPL v3 License - see the [LICENSE](LICENSE) file for details

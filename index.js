import config from "./config.json";
import Monitor from "./Monitor";
import Discovery from "./Discovery";

//hold the current server infos
const infos = {
  name: config.name,
  rigs: []
};
//will hold the different monitors
const monitors = [];

config.monitors && config.monitors.forEach(monitor => {
  const { host, port, binding_port } = monitor;
  monitors.push(new Monitor(host, port, binding_port));

  infos.rigs.push({
    name: monitor.name || "",
    port: monitor.binding_port
  });
});

//start the udp discovery service
const discovery = new Discovery(infos);
discovery.bind(1732);

//start each monitors...
//TODO : make monitors send information at regular intervals
monitors.forEach(monitor => {
  console.log("starting monitor...");
  monitor.startForward();
})

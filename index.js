import config from "./config.json";
import Monitor from "./Monitor";

const monitors = [];

if(config.monitors) {
  config.monitors.forEach(monitor => {
    monitors.push(new Monitor(monitor.host, monitor.port, monitor.binding_port));
  });
}


monitors.forEach(monitor => {
  console.log("starting monitor...");
  monitor.startForward();
})

const { spawn } = require("node:child_process");

// start the `ping google.com` command
const command = spawn("sh", ["front-end-build.sh"]);

// the `data` event is fired every time data is
// output from the command
command.stdout.on("data", (output) => {
  // the output data is captured and printed in the callback
  console.log("Output: ", output.toString());
});
command.stderr.on("data", (output) => {
  console.error("Output: ", output.toString());
});

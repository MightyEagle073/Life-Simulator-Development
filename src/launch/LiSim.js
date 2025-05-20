/* eslint-disable */
const { spawn } = require("child_process");
const path = require("path");

// Launch the http-server directly
const server = spawn("npx", ["http-server", ".", "-c-1"], {
    cwd: __dirname,
    shell: true
});

setTimeout(() => {
    const url = "http://localhost:8080/index.html";
    require("child_process").exec(`start "" "${url}"`);
}, 2000);

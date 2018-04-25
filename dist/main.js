"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const logger = (data) => {
    console[data.type](data.message);
};
const registerModule = (patch) => {
    let promise;
    const node = child_process_1.spawn('node', [patch]);
    node.stdout.on('data', (_data) => {
        const data = JSON.parse(_data);
        if (data.type === 'log') {
            logger(data.data);
        }
        if (data.type === 'result') {
            promise(data.data);
            promise = undefined;
        }
    });
    node.on('close', (code) => {
        console.log('exit code: ' + code);
        registerModule(patch);
    });
    return (data) => {
        return new Promise((resolve) => {
            const run = () => {
                if (promise) {
                    setTimeout(() => run(), 250);
                }
                else {
                    promise = resolve;
                    node.stdin.write(JSON.stringify(data));
                }
            };
            run();
        });
    };
};
exports.registerModule = registerModule;

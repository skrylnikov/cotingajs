"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const initModule = (fn) => {
    const logs = ['log', 'info', 'error'];
    logs.map((log) => console[log] = (message) => process.stdout.write(JSON.stringify({
        type: 'log',
        data: {
            type: log,
            message,
        },
    })));
    process.stdin.on('data', async (_data) => {
        const data = JSON.parse(_data);
        const result = await fn(data);
        process.stdout.write(JSON.stringify({
            type: 'result',
            data: result,
        }));
    });
};
exports.initModule = initModule;

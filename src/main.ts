import {ChildProcess, spawn} from 'child_process';

const logger = (data: Log) => {
  console[data.type](data.message);
}

interface Log {
  type: 'log' | 'info' | 'error';
  message: any;
}

interface StdIn {
  type: 'log' | 'result';
  data: any;
}

const registerModule = <Input, Output>(patch: string) => {
  let promise: any;
  const node = spawn('node', [patch]);
  node.stdout.on('data', (_data: string) => {
    const data: StdIn = JSON.parse(_data);
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

  return (data: Input): Promise<Output> => {
    return new Promise((resolve) => {
      const run = () => {
        if (promise) {
          setTimeout(() => run(), 250);
        } else {
          promise = resolve;
          node.stdin.write(JSON.stringify(data));
        }
      }
      run();
    })
  }

}

export {
  registerModule,
};

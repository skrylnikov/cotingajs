const initModule = <Input, Output>(fn: (data: Input) => Output) => {
  const logs: Array<'log' | 'info' | 'error'> = ['log', 'info', 'error'];
  logs.map((log) => console[log] = (message: any) => process.stdout.write(JSON.stringify({
    type: 'log',
    data: {
      type: log,
      message,
    },
  })));

  process.stdin.on('data', async (_data: string) => {
    const data: Input = JSON.parse(_data);
    const result = await fn(data);
    process.stdout.write(JSON.stringify({
      type: 'result',
      data: result,
    }));

  });
}

export {
  initModule,
};
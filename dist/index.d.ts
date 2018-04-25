declare const _default: {
    registerModule: <Input, Output>(patch: string) => (data: Input) => Promise<Output>;
    initModule: <Input, Output>(fn: (data: Input) => Output) => void;
};
export default _default;

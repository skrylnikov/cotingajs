declare const registerModule: <Input, Output>(patch: string) => (data: Input) => Promise<Output>;
export { registerModule };

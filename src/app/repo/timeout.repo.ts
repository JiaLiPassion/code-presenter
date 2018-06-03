export const code = `
setTimeout(function() {
  console.log('timer callback invoked');
}, 1000);








    `.split('\n').slice(1).join('\n');
export const stacks = [
  { lineNo: 0, stackDisplayString: 'main' },
  {
    lineNo: 1,
    stackDisplayString: 'setTimeout',
    domDisplayString: 'setTimeout 1000ms'
  },
  {
    lineNo: 3,
    clearStack: 1
  },
  {
    lineNo: 3,
    clearStack: 1,
  },
  {
    lineNo: 3,
    clearDom: 1,
    macroTaskDisplayString: 'setTimeout'
  },
  {
    lineNo: 2,
    clearMacroTask: 1,
    stackDisplayString: 'console.log',
    consoleDisplayString: 'timer callback invoked',
    eventloop: 'check macroTaskQueue'
  },
  {
    lineNo: 4,
    clearStack: 1
  },
];

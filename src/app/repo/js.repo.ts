export const code = `
var handler = function(evt){
  console.log('click handler invoked');
  var promise = new Promise(function(resolve, _) {
    setTimeout(function() {
      console.log('timer callback invoked');
      console.log('schedule microTask for then callback');
      resolve();
    }, 1000);
  });
  promise.then(function() {
    console.log('Promise resolved, then callback invoked');
  });
};
console.log('add click handler to button');
button.addEventListener('click', handler);
// user click the button.








    `.split('\n').slice(1).join('\n');
export const stacks = [
  { lineNo: 0, stackDisplayString: 'main' },
  { lineNo: 1, stackDisplayString: 'var handler = ...' },
  {
    lineNo: 14,
    stackDisplayString: 'console.log',
    consoleDisplayString: 'add click handler to button',
    clearStack: 1
  },
  {
    lineNo: 15,
    stackDisplayString: 'addEventListener',
    domDisplayString: 'addEventListener',
    clearStack: 1
  },
  {
    lineNo: 16,
    eventTaskDisplayString: 'handleEvent',
    clearStack: 2,
    clearDom: 1
  },
  {
    lineNo: 2,
    stackDisplayString: 'console.log',
    consoleDisplayString: 'click handler invoked',
    clearStack: 1,
    clearEventTask: 1
  },
  {
    lineNo: 3,
    stackDisplayString: 'new Promise',
    clearStack: 1
  },
  {
    lineNo: 4,
    stackDisplayString: 'setTimeout',
    domDisplayString: 'setTimeout 1000ms'
  },
  {
    lineNo: 10,
    stackDisplayString: 'promise.then',
    clearStack: 2
  },
  {
    lineNo: 12,
    clearStack: 1,
  },
  {
    lineNo: 12,
    clearDom: 1,
    macroTaskDisplayString: 'setTimeout'
  },
  {
    lineNo: 5,
    clearMacroTask: 1,
    stackDisplayString: 'console.log',
    consoleDisplayString: 'timer callback invoked',
    eventloop: 'check macroTaskQueue'
  },
  {
    lineNo: 6,
    stackDisplayString: 'console.log',
    consoleDisplayString: 'schedule microTask for then callback',
    clearStack: 1
  },
  {
    lineNo: 7,
    stackDisplayString: 'resolve',
    clearStack: 1
  },
  {
    lineNo: 7,
    domDisplayString: 'Promise.then'
  },
  {
    lineNo: 7,
    microTaskDisplayString: 'Promise.then',
    clearDom: 1
  },
  {
    lineNo: 8,
    clearStack: 1
  },
  {
    lineNo: 11,
    stackDisplayString: 'then callback',
    eventloop: 'check microTaskQueue',
    consoleDisplayString: 'Promise resolved, then callback invoked',
    clearMicroTask: 1
  },
  {
    lineNo: 11,
    stackDisplayString: 'console.log'
  },
  {
    lineNo: 12,
    clearStack: 2
  }
];

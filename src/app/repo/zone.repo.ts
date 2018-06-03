export const code = `
var zone = Zone.current.fork({
  name: 'hook',
  onScheduleTask(delegate, current, target, task) {
    console.log('schedule ZoneTask', task.type, task.source);
    return delegate.scheduleTask(target, task);
  },
  onInvokeTask(delegate, current, target, task, applyThis, applyArgs) {
    console.log('invoke ZoneTask', task.type, task.source);
    return delegate.invokeTask(target, task, applyThis, applyArgs);
  },
  onHasTask(delegate, current, target, hasTaskState) {
    console.log('hasTask state: ', hasTaskState);
    return delegate.hasTask(target, hasTaskState);
  }
});
zone.run(() => {
  var handler = function(evt){
    console.log('click handler invoked');
    var promise = new Promise(function(resolve, _) {
      setTimeout(function() {
        resolve();
      }, 1000);
    });
    promise.then(function() {
    });
  };
  button.addEventListener('click', handler);
});
// user click the button.`.split('\n').slice(1).join('\n');
export const stacks = [
  { lineNo: 0, stackDisplayString: 'main' },
  { lineNo: 1, stackDisplayString: 'var zone = ...' },
  {
    lineNo: 16,
    clearStack: 1,
    stackDisplayString: 'zone.run'
  },
  {
    lineNo: 17,
    stackDisplayString: 'var handler = function() {...}'
  },
  {
    lineNo: 27,
    stackDisplayString: 'Zone addEventListener',
    isZone: true,
    clearStack: 1
  },
  {
    lineNo: 4,
    isZone: true,
    eventloop: 'Zone onScheduleTask',
    stackDisplayString: 'hook Zone onScheduleTask'
  },
  {
    lineNo: 4,
    stackDisplayString: 'console.log',
    consoleDisplayString: 'schedule ZoneTask eventTask HtmlButtonElement:addEventListener',
  },
  {
    lineNo: 5,
    stackDisplayString: 'ZoneDelegate.scheduleTask',
    isZone: true,
    clearStack: 1
  },
  {
    lineNo: 5,
    stackDisplayString: 'native addEventListener',
    domDisplayString: 'addEventListener',
  },
  {
    lineNo: 12,
    clearStack: 1,
    isZone: true,
    stackDisplayString: 'Zone HasTask'
  },
  {
    lineNo: 12,
    stackDisplayString: 'console.log',
    consoleDisplayString: 'hasTask state: {microTask: false, macroTask: false, eventTask: true}'
  },
  {
    lineNo: 13,
    clearStack: 1
  },
  {
    lineNo: 14,
    clearStack: 1
  },
  {
    lineNo: 6,
    clearStack: 1
  },
  {
    lineNo: 28,
    clearStack: 3,
    clearDom: 1
  },
  {
    lineNo: 29,
    eventTaskDisplayString: 'handleEvent',
    clearStack: 1,
    clearDom: 1
  },
  {
    lineNo: 8,
    stackDisplayString: 'hook zone onInvokeTask',
    eventloop: 'hook zone onInvokeTask',
    isZone: true,
    clearEventTask: 1
  },
  {
    lineNo: 8,
    stackDisplayString: 'console.log',
    consoleDisplayString: 'invoke zone task eventTask HtmlButtonElement:addEventListener'
  },
  {
    lineNo: 9,
    isZone: true,
    stackDisplayString: 'ZoneDelete.invokeTask',
    clearStack: 1,
  },
  {
    lineNo: 18,
    stackDisplayString: 'handleEvent',
  },
  {
    lineNo: 18,
    stackDisplayString: 'console.log',
    consoleDisplayString: 'click handler invoked',
    clearStack: 1,
  },
  {
    lineNo: 19,
    stackDisplayString: 'new ZonePromise',
    isZone: true,
    clearStack: 1
  },
  {
    lineNo: 20,
    isZone: true,
    stackDisplayString: 'Zone setTimeout',
  },
  {
    lineNo: 4,
    isZone: true,
    stackDisplayString: 'hook zone onScheduleTask macroTask setTimeout',
    consoleDisplayString: 'schedule ZoneTask macroTask setTimeout'
  },
  {
    lineNo: 5,
    isZone: true,
    stackDisplayString: 'ZoneDelegate.scheduleTask',
    clearStack: 1
  },
  {
    lineNo: 5,
    stackDisplayString: 'native setTimeout',
    clearStack: 1,
    domDisplayString: 'setTimeout 1000ms'
  },
  {
    lineNo: 12,
    clearStack: 1,
    stackDisplayString: 'Zone HasTask',
    isZone: true,
  },
  {
    lineNo: 12,
    consoleDisplayString: 'hasTask state: {microTask: false, macroTask: true, eventTask: true}',
  },
  {
    lineNo: 13,
    clearStack: 1,
  },
  {
    lineNo: 14,
    clearStack: 1,
  },
  {
    lineNo: 6,
    clearStack: 1,
  },
  {
    lineNo: 23,
  },
  {
    lineNo: 24,
    stackDisplayString: 'promise.then',
  },
  {
    lineNo: 25,
    clearStack: 1,
  },
  {
    lineNo: 10,
    clearStack: 1,
  },
  {
    lineNo: 26,
    clearStack: 1,
  },
  {
    lineNo: 25,
    clearDom: 1,
    macroTaskDisplayString: 'setTimeout'
  },
  {
    lineNo: 8,
    clearMacroTask: 1,
    isZone: true,
    stackDisplayString: 'Zone InvokeTask',
  },
  {
    lineNo: 8,
    stackDisplayString: 'console.log',
    consoleDisplayString: 'invoke ZoneTask macroTask setTimeout'
  },
  {
    lineNo: 9,
    isZone: true,
    clearStack: 1,
    stackDisplayString: 'ZoneDelegate.invokeTask'
  },
  {
    lineNo: 21,
    stackDisplayString: 'resolve'
  },
  {
    lineNo: 4,
    isZone: true,
    stackDisplayString: 'Zone ScheduleTask'
  },
  {
    lineNo: 4,
    stackDisplayString: 'console.log',
    consoleDisplayString: 'schedule ZoneTask microTask Promise.then',
  },
  {
    lineNo: 5,
    isZone: true,
    clearStack: 1,
    stackDisplayString: 'ZoneDelegate.scheduleTask'
  },
  {
    lineNo: 5,
    domDisplayString: 'Promise.then',
  },
  {
    lineNo: 5,
    clearDom: 1,
    microTaskDisplayString: 'Zone.drainMicroTaskQueue'
  },
  {
    lineNo: 12,
    stackDisplayString: 'Zone HasTask',
    isZone: true
  },
  {
    lineNo: 12,
    stackDisplayString: 'console.log',
    consoleDisplayString: 'hasTask state: {microTask: true, macroTask: true, eventTask: true}'
  },
  {
    lineNo: 13,
    clearStack: 1,
  },
  {
    lineNo: 14,
    clearStack: 1
  },
  {
    lineNo: 6,
    clearStack: 1
  },
  {
    lineNo: 22,
    clearStack: 3
  },
  {
    lineNo: 22,
    eventloop: 'checkMicroTaskQueue',
  },
  {
    lineNo: 8,
    isZone: true,
    stackDisplayString: 'Zone InvokeTask',
    clearMicroTask: 1
  },
  {
    lineNo: 8,
    consoleDisplayString: 'invoke ZoneTask microTask Promise.then',
    stackDisplayString: 'console.log',
  },
  {
    lineNo: 9,
    isZone: true,
    stackDisplayString: 'ZoneDelegate.invokeTask',
    clearStack: 1
  },
  {
    lineNo: 25,
    stackDisplayString: 'then callback',
  },
  {
    lineNo: 10,
    clearStack: 2
  },
  {
    lineNo: 12,
    consoleDisplayString: 'hasTask state: {microTask: false, macroTask: false, eventTask: true}'
  },
  {
    lineNo: 13,
  },
  {
    lineNo: 10,
    clearStack: 1
  },
  {
    lineNo: 10,
    clearStack: 1
  },
];

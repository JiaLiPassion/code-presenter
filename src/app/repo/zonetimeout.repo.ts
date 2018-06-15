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
  setTimeout(function() {
    console.log('timer callback invoked');
  }, 1000);
});`.split('\n').slice(1).join('\n');
export const stacks = [
  { lineNo: 0, stackDisplayString: 'main' },
  {
    lineNo: 1,
    stackDisplayString: 'new zone',
  },
  {
    lineNo: 16,
    clearStack: 1,
    stackDisplayString: 'zone.run',
  },
  {
    lineNo: 17,
    clearStack: 1,
    stackDisplayString: 'Zone setTimeout',
    isZone: true
  },
  {
    lineNo: 4,
    stackDisplayString: 'Zone onScheduleTask',
    isZone: true
  },
  {
    lineNo: 4,
    consoleDisplayString: 'Schedule ZoneTask macroTask setTimeout',
    stackDisplayString: 'console.log',
  },
  {
    lineNo: 5,
    stackDisplayString: 'ZoneDelegate.scheduleTask',
    clearStack: 1,
    isZone: true
  },
  {
    lineNo: 5,
    stackDisplayString: 'native setTimeout',
    domDisplayString: 'setTimeout',
  },
  {
    lineNo: 12,
    isZone: true,
    clearStack: 1,
    stackDisplayString: 'Zone HasTask',
  },
  {
    lineNo: 12,
    stackDisplayString: 'console.log',
    consoleDisplayString: 'hasTask state: {macroTask: true, microTask: false, eventTask: false}'
  },
  {
    lineNo: 13,
    clearStack: 1,
    isZone: true,
    stackDisplayString: 'ZoneDelegate.hasTask'
  },
  {
    lineNo: 14,
    clearStack: 2
  },
  {
    lineNo: 6,
    clearStack: 1
  },
  {
    lineNo: 19,
    clearStack: 2
  },
  {
    lineNo: 20,
    clearStack: 2
  },
  {
    lineNo: 20,
    macroTaskDisplayString: 'setTimeout',
    clearDom: 1
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
    consoleDisplayString: 'Invoke ZoneTask macroTask setTimeout'
  },
  {
    lineNo: 9,
    clearStack: 1,
    isZone: true,
    stackDisplayString: 'ZoneDelegate.invokeTask',
  },
  {
    lineNo: 18,
    stackDisplayString: 'console.log',
    consoleDisplayString: 'timer callback invoked'
  },
  {
    lineNo: 19,
    clearStack: 1,
  },
  {
    lineNo: 12,
    isZone: true,
    stackDisplayString: 'Zone HasTask'
  },
  {
    lineNo: 12,
    consoleDisplayString: 'hasTask state: {macroTask: false, microTask: false, eventTask: false}',
    stackDisplayString: 'console.log'
  },
  {
    lineNo: 13,
    clearStack: 1,
    isZone: true,
    stackDisplayString: 'ZoneDelegate.hasTask'
  },
  {
    lineNo: 14,
    clearStack: 2,
  },
  {
    lineNo: 10,
    clearStack: 2,
  },
];

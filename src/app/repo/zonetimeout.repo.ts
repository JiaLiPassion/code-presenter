export const code = `
const zone = Zone.current.fork({
  name: 'hook',
  onScheduleTask(delegate, current, target, task) {
    return delegate.scheduleTask(target, task);
  },
  onInvokeTask(delegate, current, target, task, applyThis, applyArgs) {
    return delegate.invokeTask(target, task, applyThis, applyArgs);
  },
  onHasTask(delegate, current, target, hasTaskState) {
    return delegate.hasTask(target, hasTaskState);
  }
});
zone.run(() => {
  setTimeout(function() {
    console.log('timer callback invoked');
  }, 1000);
});`
  .split('\n')
  .slice(1)
  .join('\n');
export const stacks = [
  { lineNo: 0, stackDisplayString: 'main' },
  {
    lineNo: 1,
    stackDisplayString: 'new zone'
  },
  {
    lineNo: 13,
    clearStack: 1,
    stackDisplayString: 'zone.run'
  },
  {
    lineNo: 14,
    stackDisplayString: 'Zone setTimeout',
    isZone: true
  },
  {
    lineNo: 3,
    stackDisplayString: 'Zone onScheduleTask',
    isZone: true
  },
  {
    lineNo: 4,
    stackDisplayString: 'ZoneDelegate.scheduleTask',
    clearStack: 1,
    isZone: true
  },
  {
    lineNo: 4,
    stackDisplayString: 'native setTimeout',
    domDisplayString: 'setTimeout'
  },
  {
    lineNo: 9,
    isZone: true,
    clearStack: 1,
    stackDisplayString: 'Zone HasTask'
  },
  {
    lineNo: 10,
    clearStack: 1,
    isZone: true,
    stackDisplayString: 'ZoneDelegate.hasTask',
    zoneMacroTaskDisplayString: 'type: macrotask, source: setTimeout'
  },
  {
    lineNo: 11,
    clearStack: 1
  },
  {
    lineNo: 5,
    clearStack: 1
  },
  {
    lineNo: 16,
    clearStack: 1
  },
  {
    lineNo: 17,
    clearStack: 2
  },
  {
    lineNo: 17,
    macroTaskDisplayString: 'setTimeout',
    clearDom: 1
  },
  {
    lineNo: 6,
    clearMacroTask: 1,
    isZone: true,
    stackDisplayString: 'Zone InvokeTask'
  },
  {
    lineNo: 7,
    clearStack: 1,
    isZone: true,
    stackDisplayString: 'ZoneDelegate.invokeTask'
  },
  {
    lineNo: 15
  },
  {
    lineNo: 9,
    isZone: true,
    stackDisplayString: 'Zone HasTask'
  },
  {
    lineNo: 10,
    clearStack: 1,
    isZone: true,
    stackDisplayString: 'ZoneDelegate.hasTask',
    clearZoneMacroTask: 1
  },
  {
    lineNo: 11,
    clearStack: 1
  },
  {
    lineNo: 8
  },
  {
    lineNo: 16,
    clearStack: 1
  }
];

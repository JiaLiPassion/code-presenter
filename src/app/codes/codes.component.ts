import { Component, OnInit, HostListener } from '@angular/core';
declare let Prism: any;

@Component({
  selector: 'app-codes',
  templateUrl: './codes.component.html',
  styleUrls: ['./codes.component.css']
})
export class CodesComponent implements OnInit {
  appCode = `//-------testapp.js(ES2017)-------
  async function test() {
    console.log('test');
    return 1;
  }

  async function test1() {
    console.log('before await test', Zone.current.name);
    const result = await test();
    console.log('after await test', result, Zone.current.name);
  }

  Zone.current.fork({ name: 'test' }).run(test1);
  console.log('outside test', Zone.current.name);
  Zone.current.fork({ name: 'test1' }).run(() => {
    console.log('another test', Zone.current.name);
  });
  `;
  appHightlightLineNumber: number;
  appFontClass: string;

  zoneCode = `//-------zone.js----------
  Zone.prototype.run = function() {
    _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
    try {
      if (callback.constructor === AsyncFunction) {
        const r = this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
        if (typeof r.then === 'function') {
          _asyncZoneFrame = _currentZoneFrame;
          return r.then(result => {
            _isAsyncSet = true;
            _currentZoneFrame = _asyncZoneFrame.parent;
            _asyncZoneFrame = null;
            return result;
          });
        }
        return r;
      } else {
        return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
      }
    } finally {
      if (!_isAsyncSet) {
        _currentZoneFrame = _currentZoneFrame.parent;
      }
      _isAsyncSet = false;
    }
 }
 Zone.setAsyncFrame = function() {
   _currentZoneFrame = _asyncZoneFrame;
 }
  `;
  zoneHightlightLineNumber: number;
  zoneFontClass: string;

  zonePromiseCode = `// -----------zone-promise.js----------
  function resolvePromise(promise, state, value) {
    promise[symbolState] = state;
    promise[symbolValue] = value;
    var queue = promise[symbolValue];
    for (var i = 0; i < queue.length; ) {
      scheduleResolveOrReject(promise, queue[i++], queue[i++], queue[i++], queue[i++]);
    }
    if (promise['__zone_symbol__isAsync'] === true) {
      Zone.setAsyncFrame();
    }
  }
  Ctor.prototype.then = function(onResolve, onReject) {
    var _this = this;
    let isAsync = false;
    if (_this && !(_this instanceof ZoneAwarePromise)) {
      // this is a native promise.
      isAsync = true;
    }
    var wrapped = new ZoneAwarePromise(function(resolve, reject) {
      originalThen.call(_this, resolve, reject);
    });
    if (isAsync) {
      wrapped['__zone_symbol__isAsync'] = true;
    }
    return wrapped.then(onResolve, onReject);
  };
  `;
  zonePromiseHightlightLineNumber: number;

  output = '';
  outputList: string[] = [];

  stacks: any[] = [
    {
      stackDisplayString: '<root> Zone'
    }
  ];
  stacksList: any[] = [];

  steps: any[] = [
    {
      appLineNo: 13
    }
  ]
    .concat(
      [3, 4, 5, 6].map(x => ({
        appLineNo: 13,
        zoneLineNo: x
      }))
    )
    .concat([8, 9, 3, 4, 5].map(x => ({ appLineNo: x, zoneLineNo: 6 })))
    .concat([6, 7, 8, 9].map(x => ({ appLineNo: 9, zoneLineNo: x })))
    .concat(
      [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27].map(x => ({
        appLineNo: 9,
        zoneLineNo: 9,
        promiseLineNo: x
      }))
    )
    .concat([14, 15, 16, 21, 22, 23, 24, 25].map(x => ({ appLineNo: 9, zoneLineNo: x })))
    .concat([14, 15].map(x => ({ appLineNo: x })))
    .concat([3, 4, 5, 18].map(x => ({ appLineNo: 15, zoneLineNo: x })))
    .concat([16, 17].map(x => ({ appLineNo: x, zoneLineNo: 18 })))
    .concat([21, 22, 23, 24, 25].map(x => ({ zoneLineNo: x })) as any)
    .concat([14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27].map(x => ({
      promiseLineNo: x
    })) as any)
    .concat([3, 4, 5, 6, 7, 8, 9, 10].map(x => ({
      promiseLineNo: x
    })) as any)
    .concat([28, 29].map(x => ({
      promiseLineNo: 10,
      zoneLineNo: x
    })) as any)
    .concat([11, 12].map(x => ({
      promiseLineNo: x
    })) as any)
    .concat([10, 11].map(x => ({
      appLineNo: x
    })) as any)
    .concat([3, 4, 5, 6, 7, 8, 9, 10].map(x => ({
      promiseLineNo: x
    })) as any)
    .concat([28, 29].map(x => ({
      promiseLineNo: 10,
      zoneLineNo: x
    })) as any)
    .concat([11, 12].map(x => ({
      promiseLineNo: x
    })) as any)
    .concat([10, 11, 12, 13, 14, 21, 23, 24, -1].map(x => ({
      zoneLineNo: x
    })) as any);

  status = 'Not started';

  constructor() {}

  ngOnInit() {
    this.highlight();
    this.outputList[0] = `in zone 'test' run async function test1 `;
    this.outputList[3] = `in zone.run check the callback is AsyncFunction or not `;
    this.outputList[4] = `if it is AsyncFunction, we get the result(native promise) `;
    this.outputList[9] = `here we have a native promise return from 'async test()', we call it 'nativePromise1' `;
    this.outputList[10] = `here we get another native promise return from 'async test1()', we call it 'nativePromise2' `;
    this.outputList[12] = `IMPORTANT! we will record current zone frame, so we can restore the zoneFrame after 'await promise (nativePromise1)' is resolved`;
    this.outputList[13] = `IMPORTANT! register a 'then' to nativePromise1, so we can restore the zoneFrame to 'parent' when async finished just like finally (line 22) does`;
    this.outputList[24] = `in patched promise.prototype.then, we also check if the promise is native, we keep a flag in our wrapped ZoneAwarePromise`;
    this.outputList[33] = `Now test1 is returned (but not really finished, because the await), so the 'test zone' is also done, we go back to <root> zone`;
    this.outputList[36] = `we can check now we are in <root> zone`;
    this.outputList[37] = `this is just another test to verify we can run into another zone even there are some await promise pending there`;
    this.outputList[49] = `nativePromise1.then was called now because the 'await' in line 9, and we got a new ZoneAwarePromise(parent promise is nativePromise1), we call it zonePromise1`;
    this.outputList[63] = `because nativePromise1 is resolve, and zonePromise1 is also resolved here`;
    this.outputList[70] = `because we know zonePromise1 is a chained promise from nativePromise(nativePromise1), we need to restore the before await 'zone' status`;
    this.outputList[72] = `IMPORTANT! now we restored the zone the same status before await ('test' zone)`;
    this.outputList[77] = `the nativePromise2 is resolved too`;
    this.outputList[84] = `I am still verifying this one, we may don't need to restore the zoneFrame again`;
    this.outputList[89] = `We set a flag so we don't set currentFrame to parent zone twice`;
    this.outputList[90] = `IMPORTANT! Now async test1 finished, we need to restore the zone to parent(which is <root>) just like finally (line 22) does`;

    this.stacksList[2] = { action: 'add', stack: { stackDisplayString: 'test Zone' } };
    this.stacksList[33] = { action: 'remove' };
    this.stacksList[39] = { action: 'add', stack: { stackDisplayString: 'test1 Zone' } };
    this.stacksList[46] = { action: 'remove' };
    this.stacksList[72] = { action: 'add', stack: { stackDisplayString: 'test Zone' } };
    this.stacksList[92] = { action: 'remove' };
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown($event: KeyboardEvent) {
    switch ($event.key) {
      case 'ArrowLeft': {
        this.advance(-1);
        break;
      }
      case 'ArrowRight': {
        this.advance(1);
        break;
      }
      case 'Enter': {
        this.advance(1);
        break;
      }
      case 'n': {
        this.advance(1);
        break;
      }
      case 'N': {
        this.advance(1);
        break;
      }
      case ' ': {
        this.advance(1);
        break;
      }
      default:
        return;
    }
    $event.preventDefault();
  }

  currentStep = -1;
  advance(diff: number) {
    this.currentStep = this.currentStep + diff;
    if (this.currentStep < 0 || this.currentStep >= this.steps.length) {
      this.status = 'Finished';
      return;
    }
    this.status = 'Running';
    console.log('currentStep: ', this.currentStep);
    const step = this.steps[this.currentStep];
    this.appHightlightLineNumber = step.appLineNo || -1;
    this.zoneHightlightLineNumber = step.zoneLineNo || -1;
    this.zonePromiseHightlightLineNumber = step.promiseLineNo || -1;
    const outputOp =
      this.currentStep < this.outputList.length ? this.outputList[this.currentStep] || '' : '';
    this.output = this.output + (outputOp ? '\n' : '') + outputOp;
    const stackOp =
      this.currentStep < this.stacksList.length ? this.stacksList[this.currentStep] : null;
    if (stackOp) {
      if (stackOp.action === 'add') {
        this.stacks.push(stackOp.stack);
      } else if (stackOp.action === 'remove') {
        this.stacks = this.stacks.slice(0, this.stacks.length - 1);
      } else {
        this.stacks = [stackOp.stack];
      }
    }
    this.highlight();
  }

  highlight() {
    if (Prism) {
      // need to place a setTimeout, otherwise Prism
      // will not be able to use updated binding data.
      setTimeout(() => {
        Prism.highlightAll();
      }, 0);
    }
  }
}

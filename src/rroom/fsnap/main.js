// main.js

// import 'itp-molib';
// import { XMLHttpRequest } from 'xmlhttprequest';
// globalThis.XMLHttpRequest = XMLHttpRequest;

import '../../../moLib/src/lib/a_lib.js';
import './index.js';

console.log('in main.js');

// node src/test/main.js

/*

src/room-record/fsnap

!!@ import 'itp-molib';
fails to get any observed events

!!@ fails with undefined ref to XMLHttpRequest
>> work around to explicitly set globalThis.XMLHttpRequest
no error, but no save triggered
// import 'itp-molib';
// import { XMLHttpRequest } from 'xmlhttprequest';
// globalThis.XMLHttpRequest = XMLHttpRequest;

*/

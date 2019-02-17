/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type ItemRequestEntry_request$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type ItemRequestList_requests$ref: FragmentReference;
export type ItemRequestList_requests = $ReadOnlyArray<{|
  +$fragmentRefs: ItemRequestEntry_request$ref,
  +$refType: ItemRequestList_requests$ref,
|}>;
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "ItemRequestList_requests",
  "type": "Request",
  "metadata": {
    "plural": true
  },
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "ItemRequestEntry_request",
      "args": null
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '17ce16653e2c75a8bfab0bb644404348';
module.exports = node;

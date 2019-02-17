/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type ItemEntry_item$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type ItemList_items$ref: FragmentReference;
export type ItemList_items = $ReadOnlyArray<{|
  +$fragmentRefs: ItemEntry_item$ref,
  +$refType: ItemList_items$ref,
|}>;
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "ItemList_items",
  "type": "Item",
  "metadata": {
    "plural": true
  },
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "ItemEntry_item",
      "args": null
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '21f5ccc2d0c4a4e2426210d64595723d';
module.exports = node;

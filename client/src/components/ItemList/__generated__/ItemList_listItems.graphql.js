/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type ItemEntry_item$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type ItemList_listItems$ref: FragmentReference;
export type ItemList_listItems = $ReadOnlyArray<{|
  +$fragmentRefs: ItemEntry_item$ref,
  +$refType: ItemList_listItems$ref,
|}>;
*/

const node /*: ReaderFragment*/ = {
  kind: 'Fragment',
  name: 'ItemList_listItems',
  type: 'Item',
  metadata: {
    plural: true
  },
  argumentDefinitions: [],
  selections: [
    {
      kind: 'FragmentSpread',
      name: 'ItemEntry_item',
      args: null
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = 'a51e679703334bcc51417025560a28cf';
module.exports = node;

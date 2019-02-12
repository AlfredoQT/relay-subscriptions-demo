/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type ItemRequestList_requests$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type Item_item$ref: FragmentReference;
export type Item_item = {|
  +id: string,
  +name: string,
  +quantity: number,
  +requests: $ReadOnlyArray<{|
    +$fragmentRefs: ItemRequestList_requests$ref
  |}>,
  +$refType: Item_item$ref,
|};
*/

const node /*: ReaderFragment*/ = {
  kind: 'Fragment',
  name: 'Item_item',
  type: 'Item',
  metadata: null,
  argumentDefinitions: [],
  selections: [
    {
      kind: 'ScalarField',
      alias: null,
      name: 'id',
      args: null,
      storageKey: null
    },
    {
      kind: 'ScalarField',
      alias: null,
      name: 'name',
      args: null,
      storageKey: null
    },
    {
      kind: 'ScalarField',
      alias: null,
      name: 'quantity',
      args: null,
      storageKey: null
    },
    {
      kind: 'LinkedField',
      alias: null,
      name: 'requests',
      storageKey: null,
      args: null,
      concreteType: 'Request',
      plural: true,
      selections: [
        {
          kind: 'FragmentSpread',
          name: 'ItemRequestList_requests',
          args: null
        }
      ]
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '827b79c49765c28088bb663df04bab30';
module.exports = node;

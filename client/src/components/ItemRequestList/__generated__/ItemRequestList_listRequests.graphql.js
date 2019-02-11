/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type ItemRequestEntry_request$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type ItemRequestList_listRequests$ref: FragmentReference;
export type ItemRequestList_listRequests = $ReadOnlyArray<{|
  +$fragmentRefs: ItemRequestEntry_request$ref,
  +$refType: ItemRequestList_listRequests$ref,
|}>;
*/

const node /*: ReaderFragment*/ = {
  kind: 'Fragment',
  name: 'ItemRequestList_listRequests',
  type: 'Request',
  metadata: {
    plural: true
  },
  argumentDefinitions: [],
  selections: [
    {
      kind: 'FragmentSpread',
      name: 'ItemRequestEntry_request',
      args: null
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '4323b5368f06bd2071f7c77baa5b7844';
module.exports = node;

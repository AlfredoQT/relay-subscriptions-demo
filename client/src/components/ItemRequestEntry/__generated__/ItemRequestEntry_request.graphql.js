/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type ItemRequestEntry_request$ref: FragmentReference;
export type ItemRequestEntry_request = {|
  +id: string,
  +applicant: {|
    +registrationNumber: string
  |},
  +dateRequested: any,
  +dateDelivered: ?any,
  +delivered: boolean,
  +$refType: ItemRequestEntry_request$ref,
|};
*/

const node /*: ReaderFragment*/ = {
  kind: 'Fragment',
  name: 'ItemRequestEntry_request',
  type: 'Request',
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
      kind: 'LinkedField',
      alias: null,
      name: 'applicant',
      storageKey: null,
      args: null,
      concreteType: 'Applicant',
      plural: false,
      selections: [
        {
          kind: 'ScalarField',
          alias: null,
          name: 'registrationNumber',
          args: null,
          storageKey: null
        }
      ]
    },
    {
      kind: 'ScalarField',
      alias: null,
      name: 'dateRequested',
      args: null,
      storageKey: null
    },
    {
      kind: 'ScalarField',
      alias: null,
      name: 'dateDelivered',
      args: null,
      storageKey: null
    },
    {
      kind: 'ScalarField',
      alias: null,
      name: 'delivered',
      args: null,
      storageKey: null
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = 'de40d1e07931a24af26de35bb2a2fdf7';
module.exports = node;

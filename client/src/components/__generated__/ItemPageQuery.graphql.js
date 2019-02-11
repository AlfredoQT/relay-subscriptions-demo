/**
 * @flow
 * @relayHash 614210ab4ed59f0d186212d3a6270e3f
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type Item_item$ref = any;
export type ItemPageQueryVariables = {|
  itemID: string
|};
export type ItemPageQueryResponse = {|
  +getItem: ?{|
    +$fragmentRefs: Item_item$ref
  |}
|};
export type ItemPageQuery = {|
  variables: ItemPageQueryVariables,
  response: ItemPageQueryResponse,
|};
*/

/*
query ItemPageQuery(
  $itemID: ID!
) {
  getItem(id: $itemID) {
    ...Item_item
    id
  }
}

fragment Item_item on Item {
  id
  name
  quantity
}
*/

const node /*: ConcreteRequest*/ = (function() {
  var v0 = [
      {
        kind: 'LocalArgument',
        name: 'itemID',
        type: 'ID!',
        defaultValue: null
      }
    ],
    v1 = [
      {
        kind: 'Variable',
        name: 'id',
        variableName: 'itemID',
        type: 'ID!'
      }
    ];
  return {
    kind: 'Request',
    fragment: {
      kind: 'Fragment',
      name: 'ItemPageQuery',
      type: 'Query',
      metadata: null,
      argumentDefinitions: (v0 /*: any*/),
      selections: [
        {
          kind: 'LinkedField',
          alias: null,
          name: 'getItem',
          storageKey: null,
          args: (v1 /*: any*/),
          concreteType: 'Item',
          plural: false,
          selections: [
            {
              kind: 'FragmentSpread',
              name: 'Item_item',
              args: null
            }
          ]
        }
      ]
    },
    operation: {
      kind: 'Operation',
      name: 'ItemPageQuery',
      argumentDefinitions: (v0 /*: any*/),
      selections: [
        {
          kind: 'LinkedField',
          alias: null,
          name: 'getItem',
          storageKey: null,
          args: (v1 /*: any*/),
          concreteType: 'Item',
          plural: false,
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
            }
          ]
        }
      ]
    },
    params: {
      operationKind: 'query',
      name: 'ItemPageQuery',
      id: null,
      text:
        'query ItemPageQuery(\n  $itemID: ID!\n) {\n  getItem(id: $itemID) {\n    ...Item_item\n    id\n  }\n}\n\nfragment Item_item on Item {\n  id\n  name\n  quantity\n}\n',
      metadata: {}
    }
  };
})();
// prettier-ignore
(node/*: any*/).hash = '863dd4972cd29ffe788b12ee46d34051';
module.exports = node;

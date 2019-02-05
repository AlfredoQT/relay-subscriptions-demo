/**
 * @flow
 * @relayHash daa71e3e99b5f5eabc3d4cef69d39b77
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type DeleteItemInput = {|
  id: string
|};
export type DeleteItemMutationVariables = {|
  input: DeleteItemInput
|};
export type DeleteItemMutationResponse = {|
  +deleteItem: {|
    +item: ?{|
      +id: string
    |}
  |}
|};
export type DeleteItemMutation = {|
  variables: DeleteItemMutationVariables,
  response: DeleteItemMutationResponse,
|};
*/

/*
mutation DeleteItemMutation(
  $input: DeleteItemInput!
) {
  deleteItem(input: $input) {
    item {
      id
    }
  }
}
*/

const node /*: ConcreteRequest*/ = (function() {
  var v0 = [
      {
        kind: 'LocalArgument',
        name: 'input',
        type: 'DeleteItemInput!',
        defaultValue: null
      }
    ],
    v1 = [
      {
        kind: 'LinkedField',
        alias: null,
        name: 'deleteItem',
        storageKey: null,
        args: [
          {
            kind: 'Variable',
            name: 'input',
            variableName: 'input',
            type: 'DeleteItemInput!'
          }
        ],
        concreteType: 'ItemPayload',
        plural: false,
        selections: [
          {
            kind: 'LinkedField',
            alias: null,
            name: 'item',
            storageKey: null,
            args: null,
            concreteType: 'Item',
            plural: false,
            selections: [
              {
                kind: 'ScalarField',
                alias: null,
                name: 'id',
                args: null,
                storageKey: null
              }
            ]
          }
        ]
      }
    ];
  return {
    kind: 'Request',
    fragment: {
      kind: 'Fragment',
      name: 'DeleteItemMutation',
      type: 'Mutation',
      metadata: null,
      argumentDefinitions: (v0 /*: any*/),
      selections: (v1 /*: any*/)
    },
    operation: {
      kind: 'Operation',
      name: 'DeleteItemMutation',
      argumentDefinitions: (v0 /*: any*/),
      selections: (v1 /*: any*/)
    },
    params: {
      operationKind: 'mutation',
      name: 'DeleteItemMutation',
      id: null,
      text:
        'mutation DeleteItemMutation(\n  $input: DeleteItemInput!\n) {\n  deleteItem(input: $input) {\n    item {\n      id\n    }\n  }\n}\n',
      metadata: {}
    }
  };
})();
// prettier-ignore
(node/*: any*/).hash = 'c4d8045d3860c99cb40b9a0ee23427b3';
module.exports = node;

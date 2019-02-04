/**
 * @flow
 * @relayHash 4fc1989373dd9974e3e94658a526a4f9
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CreateItemInput = {|
  clientMutationId?: ?string,
  name: string,
  quantity: number,
|};
export type CreateItemMutationVariables = {|
  input: CreateItemInput
|};
export type CreateItemMutationResponse = {|
  +createItem: {|
    +item: ?{|
      +id: string,
      +name: string,
      +quantity: number,
    |}
  |}
|};
export type CreateItemMutation = {|
  variables: CreateItemMutationVariables,
  response: CreateItemMutationResponse,
|};
*/

/*
mutation CreateItemMutation(
  $input: CreateItemInput!
) {
  createItem(input: $input) {
    item {
      id
      name
      quantity
    }
  }
}
*/

const node /*: ConcreteRequest*/ = (function() {
  var v0 = [
      {
        kind: 'LocalArgument',
        name: 'input',
        type: 'CreateItemInput!',
        defaultValue: null
      }
    ],
    v1 = [
      {
        kind: 'LinkedField',
        alias: null,
        name: 'createItem',
        storageKey: null,
        args: [
          {
            kind: 'Variable',
            name: 'input',
            variableName: 'input',
            type: 'CreateItemInput!'
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
      }
    ];
  return {
    kind: 'Request',
    fragment: {
      kind: 'Fragment',
      name: 'CreateItemMutation',
      type: 'Mutation',
      metadata: null,
      argumentDefinitions: (v0 /*: any*/),
      selections: (v1 /*: any*/)
    },
    operation: {
      kind: 'Operation',
      name: 'CreateItemMutation',
      argumentDefinitions: (v0 /*: any*/),
      selections: (v1 /*: any*/)
    },
    params: {
      operationKind: 'mutation',
      name: 'CreateItemMutation',
      id: null,
      text:
        'mutation CreateItemMutation(\n  $input: CreateItemInput!\n) {\n  createItem(input: $input) {\n    item {\n      id\n      name\n      quantity\n    }\n  }\n}\n',
      metadata: {}
    }
  };
})();
// prettier-ignore
(node/*: any*/).hash = 'fbbb2520e5b66f084bbdb107cb5d2075';
module.exports = node;

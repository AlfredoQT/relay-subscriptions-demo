/**
 * @flow
 * @relayHash d6297924fa1ac02e4a3b08aae02a01be
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CreateItemInput = {|
  name: string,
  quantity: number,
|};
export type CreateItemMutationVariables = {|
  input: CreateItemInput
|};
export type CreateItemMutationResponse = {|
  +createItem: {|
    +id: string,
    +name: string,
    +quantity: string,
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
    id
    name
    quantity
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
        'mutation CreateItemMutation(\n  $input: CreateItemInput!\n) {\n  createItem(input: $input) {\n    id\n    name\n    quantity\n  }\n}\n',
      metadata: {}
    }
  };
})();
// prettier-ignore
(node/*: any*/).hash = '3edf56c196da4814a7535d194e7baf15';
module.exports = node;

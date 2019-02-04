/**
 * @flow
 * @relayHash 93e36053a235d446b15dacfb256628a9
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type UpdateItemInput = {|
  id: string,
  name?: ?string,
  quantity?: ?number,
|};
export type UpdateItemMutationVariables = {|
  input: UpdateItemInput
|};
export type UpdateItemMutationResponse = {|
  +updateItem: {|
    +item: ?{|
      +id: string,
      +name: string,
      +quantity: number,
    |}
  |}
|};
export type UpdateItemMutation = {|
  variables: UpdateItemMutationVariables,
  response: UpdateItemMutationResponse,
|};
*/

/*
mutation UpdateItemMutation(
  $input: UpdateItemInput!
) {
  updateItem(input: $input) {
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
        type: 'UpdateItemInput!',
        defaultValue: null
      }
    ],
    v1 = [
      {
        kind: 'LinkedField',
        alias: null,
        name: 'updateItem',
        storageKey: null,
        args: [
          {
            kind: 'Variable',
            name: 'input',
            variableName: 'input',
            type: 'UpdateItemInput!'
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
      name: 'UpdateItemMutation',
      type: 'Mutation',
      metadata: null,
      argumentDefinitions: (v0 /*: any*/),
      selections: (v1 /*: any*/)
    },
    operation: {
      kind: 'Operation',
      name: 'UpdateItemMutation',
      argumentDefinitions: (v0 /*: any*/),
      selections: (v1 /*: any*/)
    },
    params: {
      operationKind: 'mutation',
      name: 'UpdateItemMutation',
      id: null,
      text:
        'mutation UpdateItemMutation(\n  $input: UpdateItemInput!\n) {\n  updateItem(input: $input) {\n    item {\n      id\n      name\n      quantity\n    }\n  }\n}\n',
      metadata: {}
    }
  };
})();
// prettier-ignore
(node/*: any*/).hash = '4e156491e6ad28823bbbb000a634eed3';
module.exports = node;

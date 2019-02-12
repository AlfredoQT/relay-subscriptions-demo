/**
 * @flow
 * @relayHash 6f19da3b44bedd8b907a9335a5259a01
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type UpdateRequestInput = {|
  id: string,
  dateRequested?: ?any,
  delivered?: ?boolean,
  dateDelivered?: ?any,
  quantity?: ?number,
|};
export type UpdateRequestMutationVariables = {|
  input: UpdateRequestInput
|};
export type UpdateRequestMutationResponse = {|
  +updateRequest: {|
    +request: ?{|
      +id: string,
      +dateDelivered: ?any,
      +dateRequested: any,
      +delivered: boolean,
      +quantity: number,
    |}
  |}
|};
export type UpdateRequestMutation = {|
  variables: UpdateRequestMutationVariables,
  response: UpdateRequestMutationResponse,
|};
*/

/*
mutation UpdateRequestMutation(
  $input: UpdateRequestInput!
) {
  updateRequest(input: $input) {
    request {
      id
      dateDelivered
      dateRequested
      delivered
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
        type: 'UpdateRequestInput!',
        defaultValue: null
      }
    ],
    v1 = [
      {
        kind: 'LinkedField',
        alias: null,
        name: 'updateRequest',
        storageKey: null,
        args: [
          {
            kind: 'Variable',
            name: 'input',
            variableName: 'input',
            type: 'UpdateRequestInput!'
          }
        ],
        concreteType: 'RequestPayload',
        plural: false,
        selections: [
          {
            kind: 'LinkedField',
            alias: null,
            name: 'request',
            storageKey: null,
            args: null,
            concreteType: 'Request',
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
                name: 'dateDelivered',
                args: null,
                storageKey: null
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
                name: 'delivered',
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
      name: 'UpdateRequestMutation',
      type: 'Mutation',
      metadata: null,
      argumentDefinitions: (v0 /*: any*/),
      selections: (v1 /*: any*/)
    },
    operation: {
      kind: 'Operation',
      name: 'UpdateRequestMutation',
      argumentDefinitions: (v0 /*: any*/),
      selections: (v1 /*: any*/)
    },
    params: {
      operationKind: 'mutation',
      name: 'UpdateRequestMutation',
      id: null,
      text:
        'mutation UpdateRequestMutation(\n  $input: UpdateRequestInput!\n) {\n  updateRequest(input: $input) {\n    request {\n      id\n      dateDelivered\n      dateRequested\n      delivered\n      quantity\n    }\n  }\n}\n',
      metadata: {}
    }
  };
})();
// prettier-ignore
(node/*: any*/).hash = '30904b0cd4c8d735983e013db5838c27';
module.exports = node;

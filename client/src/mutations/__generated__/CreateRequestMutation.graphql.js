/**
 * @flow
 * @relayHash 66c15c3b3c35e52b8f3179fa6ab62171
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CreateRequestInput = {|
  clientMutationId?: ?string,
  item: string,
  applicant: string,
  quantity: number,
|};
export type CreateRequestMutationVariables = {|
  input: CreateRequestInput
|};
export type CreateRequestMutationResponse = {|
  +createRequest: {|
    +request: ?{|
      +id: string,
      +dateDelivered: ?any,
      +dateRequested: any,
      +delivered: boolean,
      +quantity: number,
    |}
  |}
|};
export type CreateRequestMutation = {|
  variables: CreateRequestMutationVariables,
  response: CreateRequestMutationResponse,
|};
*/

/*
mutation CreateRequestMutation(
  $input: CreateRequestInput!
) {
  createRequest(input: $input) {
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
        type: 'CreateRequestInput!',
        defaultValue: null
      }
    ],
    v1 = [
      {
        kind: 'LinkedField',
        alias: null,
        name: 'createRequest',
        storageKey: null,
        args: [
          {
            kind: 'Variable',
            name: 'input',
            variableName: 'input',
            type: 'CreateRequestInput!'
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
      name: 'CreateRequestMutation',
      type: 'Mutation',
      metadata: null,
      argumentDefinitions: (v0 /*: any*/),
      selections: (v1 /*: any*/)
    },
    operation: {
      kind: 'Operation',
      name: 'CreateRequestMutation',
      argumentDefinitions: (v0 /*: any*/),
      selections: (v1 /*: any*/)
    },
    params: {
      operationKind: 'mutation',
      name: 'CreateRequestMutation',
      id: null,
      text:
        'mutation CreateRequestMutation(\n  $input: CreateRequestInput!\n) {\n  createRequest(input: $input) {\n    request {\n      id\n      dateDelivered\n      dateRequested\n      delivered\n      quantity\n    }\n  }\n}\n',
      metadata: {}
    }
  };
})();
// prettier-ignore
(node/*: any*/).hash = 'cc69ad199deedb71af5c217a8506820b';
module.exports = node;

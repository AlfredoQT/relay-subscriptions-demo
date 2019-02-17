/**
 * @flow
 * @relayHash 91e02c30e1c0edcf2fe774b1064c31f4
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
      +applicant: {|
        +name: string,
        +registrationNumber: string,
      |},
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
      applicant {
        name
        registrationNumber
        id
      }
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "CreateRequestInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input",
    "type": "CreateRequestInput!"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "dateDelivered",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "dateRequested",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "delivered",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "quantity",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "registrationNumber",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "CreateRequestMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "createRequest",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "RequestPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "request",
            "storageKey": null,
            "args": null,
            "concreteType": "Request",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "applicant",
                "storageKey": null,
                "args": null,
                "concreteType": "Applicant",
                "plural": false,
                "selections": [
                  (v7/*: any*/),
                  (v8/*: any*/)
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "CreateRequestMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "createRequest",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "RequestPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "request",
            "storageKey": null,
            "args": null,
            "concreteType": "Request",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "applicant",
                "storageKey": null,
                "args": null,
                "concreteType": "Applicant",
                "plural": false,
                "selections": [
                  (v7/*: any*/),
                  (v8/*: any*/),
                  (v2/*: any*/)
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "mutation",
    "name": "CreateRequestMutation",
    "id": null,
    "text": "mutation CreateRequestMutation(\n  $input: CreateRequestInput!\n) {\n  createRequest(input: $input) {\n    request {\n      id\n      dateDelivered\n      dateRequested\n      delivered\n      quantity\n      applicant {\n        name\n        registrationNumber\n        id\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'd312f8cedfdcec1e523a04ab81616914';
module.exports = node;

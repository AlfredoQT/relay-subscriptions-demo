/**
 * @flow
 * @relayHash 50dce2c8502407ed35da2d0d3dedf98d
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CreateApplicantInput = {|
  clientMutationId?: ?string,
  registrationNumber: string,
  semester: string,
  name: string,
|};
export type CreateApplicantMutationVariables = {|
  input: CreateApplicantInput
|};
export type CreateApplicantMutationResponse = {|
  +createApplicant: {|
    +applicant: ?{|
      +id: string
    |}
  |}
|};
export type CreateApplicantMutation = {|
  variables: CreateApplicantMutationVariables,
  response: CreateApplicantMutationResponse,
|};
*/


/*
mutation CreateApplicantMutation(
  $input: CreateApplicantInput!
) {
  createApplicant(input: $input) {
    applicant {
      id
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "CreateApplicantInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "createApplicant",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input",
        "type": "CreateApplicantInput!"
      }
    ],
    "concreteType": "ApplicantPayload",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "applicant",
        "storageKey": null,
        "args": null,
        "concreteType": "Applicant",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "CreateApplicantMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "CreateApplicantMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "CreateApplicantMutation",
    "id": null,
    "text": "mutation CreateApplicantMutation(\n  $input: CreateApplicantInput!\n) {\n  createApplicant(input: $input) {\n    applicant {\n      id\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'e6a53620867a16bd1be978a46b758521';
module.exports = node;

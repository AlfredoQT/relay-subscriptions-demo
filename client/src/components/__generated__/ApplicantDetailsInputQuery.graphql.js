/**
 * @flow
 * @relayHash 2522fb69fc6076dbcd255a55b219590a
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ApplicantWhereUniqueInput = {|
  id?: ?string,
  registrationNumber?: ?string,
|};
export type ApplicantDetailsInputQueryVariables = {|
  input: ApplicantWhereUniqueInput
|};
export type ApplicantDetailsInputQueryResponse = {|
  +applicant: ?{|
    +id: string,
    +semester: string,
    +name: string,
  |}
|};
export type ApplicantDetailsInputQuery = {|
  variables: ApplicantDetailsInputQueryVariables,
  response: ApplicantDetailsInputQueryResponse,
|};
*/


/*
query ApplicantDetailsInputQuery(
  $input: ApplicantWhereUniqueInput!
) {
  applicant(input: $input) {
    id
    semester
    name
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "ApplicantWhereUniqueInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "applicant",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input",
        "type": "ApplicantWhereUniqueInput!"
      }
    ],
    "concreteType": "Applicant",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "id",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "semester",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "name",
        "args": null,
        "storageKey": null
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ApplicantDetailsInputQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "ApplicantDetailsInputQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "ApplicantDetailsInputQuery",
    "id": null,
    "text": "query ApplicantDetailsInputQuery(\n  $input: ApplicantWhereUniqueInput!\n) {\n  applicant(input: $input) {\n    id\n    semester\n    name\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '790a828525ce21a94de6cee668e35573';
module.exports = node;

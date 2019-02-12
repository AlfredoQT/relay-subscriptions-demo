/**
 * @flow
 * @relayHash 948243b77507d29e29ec499c0bc74c84
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
  +item: ?{|
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
  item(id: $itemID) {
    ...Item_item
    id
  }
}

fragment Item_item on Item {
  id
  name
  quantity
  requests {
    ...ItemRequestList_requests
    id
  }
}

fragment ItemRequestList_requests on Request {
  ...ItemRequestEntry_request
}

fragment ItemRequestEntry_request on Request {
  id
  applicant {
    registrationNumber
    id
  }
  dateRequested
  dateDelivered
  delivered
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
    ],
    v2 = {
      kind: 'ScalarField',
      alias: null,
      name: 'id',
      args: null,
      storageKey: null
    };
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
          name: 'item',
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
          name: 'item',
          storageKey: null,
          args: (v1 /*: any*/),
          concreteType: 'Item',
          plural: false,
          selections: [
            (v2 /*: any*/),
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
            },
            {
              kind: 'LinkedField',
              alias: null,
              name: 'requests',
              storageKey: null,
              args: null,
              concreteType: 'Request',
              plural: true,
              selections: [
                (v2 /*: any*/),
                {
                  kind: 'LinkedField',
                  alias: null,
                  name: 'applicant',
                  storageKey: null,
                  args: null,
                  concreteType: 'Applicant',
                  plural: false,
                  selections: [
                    {
                      kind: 'ScalarField',
                      alias: null,
                      name: 'registrationNumber',
                      args: null,
                      storageKey: null
                    },
                    (v2 /*: any*/)
                  ]
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
                  name: 'dateDelivered',
                  args: null,
                  storageKey: null
                },
                {
                  kind: 'ScalarField',
                  alias: null,
                  name: 'delivered',
                  args: null,
                  storageKey: null
                }
              ]
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
        'query ItemPageQuery(\n  $itemID: ID!\n) {\n  item(id: $itemID) {\n    ...Item_item\n    id\n  }\n}\n\nfragment Item_item on Item {\n  id\n  name\n  quantity\n  requests {\n    ...ItemRequestList_requests\n    id\n  }\n}\n\nfragment ItemRequestList_requests on Request {\n  ...ItemRequestEntry_request\n}\n\nfragment ItemRequestEntry_request on Request {\n  id\n  applicant {\n    registrationNumber\n    id\n  }\n  dateRequested\n  dateDelivered\n  delivered\n}\n',
      metadata: {}
    }
  };
})();
// prettier-ignore
(node/*: any*/).hash = 'ef739c2d0643011649070565a8457e6c';
module.exports = node;

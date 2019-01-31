/**
 * @flow
 * @relayHash 4a4c6dab76a5c704cf4192dff2344a34
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type ItemList_listItems$ref = any;
export type ItemListPageQueryVariables = {||};
export type ItemListPageQueryResponse = {|
  +listItems: $ReadOnlyArray<{|
    +$fragmentRefs: ItemList_listItems$ref
  |}>
|};
export type ItemListPageQuery = {|
  variables: ItemListPageQueryVariables,
  response: ItemListPageQueryResponse,
|};
*/

/*
query ItemListPageQuery {
  listItems {
    ...ItemList_listItems
    id
  }
}

fragment ItemList_listItems on Item {
  ...ItemEntry_item
}

fragment ItemEntry_item on Item {
  id
  name
  quantity
}
*/

const node /*: ConcreteRequest*/ = {
  kind: 'Request',
  fragment: {
    kind: 'Fragment',
    name: 'ItemListPageQuery',
    type: 'Query',
    metadata: null,
    argumentDefinitions: [],
    selections: [
      {
        kind: 'LinkedField',
        alias: null,
        name: 'listItems',
        storageKey: null,
        args: null,
        concreteType: 'Item',
        plural: true,
        selections: [
          {
            kind: 'FragmentSpread',
            name: 'ItemList_listItems',
            args: null
          }
        ]
      }
    ]
  },
  operation: {
    kind: 'Operation',
    name: 'ItemListPageQuery',
    argumentDefinitions: [],
    selections: [
      {
        kind: 'LinkedField',
        alias: null,
        name: 'listItems',
        storageKey: null,
        args: null,
        concreteType: 'Item',
        plural: true,
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
  },
  params: {
    operationKind: 'query',
    name: 'ItemListPageQuery',
    id: null,
    text:
      'query ItemListPageQuery {\n  listItems {\n    ...ItemList_listItems\n    id\n  }\n}\n\nfragment ItemList_listItems on Item {\n  ...ItemEntry_item\n}\n\nfragment ItemEntry_item on Item {\n  id\n  name\n  quantity\n}\n',
    metadata: {}
  }
};
// prettier-ignore
(node/*: any*/).hash = '76cd7953eebeabcdf928b6c2b82d5ca2';
module.exports = node;

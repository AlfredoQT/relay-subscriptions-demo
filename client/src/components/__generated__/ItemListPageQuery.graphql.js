/**
 * @flow
 * @relayHash ddbcc83e1d9dd4f967b1f470e4f0f7fe
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type ItemList_items$ref = any;
export type ItemListPageQueryVariables = {||};
export type ItemListPageQueryResponse = {|
  +items: $ReadOnlyArray<{|
    +$fragmentRefs: ItemList_items$ref
  |}>
|};
export type ItemListPageQuery = {|
  variables: ItemListPageQueryVariables,
  response: ItemListPageQueryResponse,
|};
*/

/*
query ItemListPageQuery {
  items {
    ...ItemList_items
    id
  }
}

fragment ItemList_items on Item {
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
        name: 'items',
        storageKey: null,
        args: null,
        concreteType: 'Item',
        plural: true,
        selections: [
          {
            kind: 'FragmentSpread',
            name: 'ItemList_items',
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
        name: 'items',
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
      'query ItemListPageQuery {\n  items {\n    ...ItemList_items\n    id\n  }\n}\n\nfragment ItemList_items on Item {\n  ...ItemEntry_item\n}\n\nfragment ItemEntry_item on Item {\n  id\n  name\n  quantity\n}\n',
    metadata: {}
  }
};
// prettier-ignore
(node/*: any*/).hash = '8529d768cc230e71cb232fe8401a158a';
module.exports = node;

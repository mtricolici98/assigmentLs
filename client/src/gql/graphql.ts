/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type ItemImage = {
  __typename?: 'ItemImage';
  base64data: Scalars['String']['output'];
  id: Scalars['Int']['output'];
};

export type KanbanColumn = {
  __typename?: 'KanbanColumn';
  Items: Array<KanbanItem>;
  id: Scalars['Int']['output'];
  itemsOrder: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type KanbanItem = {
  __typename?: 'KanbanItem';
  Images?: Maybe<Array<ItemImage>>;
  done: Scalars['Boolean']['output'];
  id: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  moveItem: Array<KanbanColumn>;
};


export type MutationMoveItemArgs = {
  afterItemId: Scalars['Int']['input'];
  doneIncluded: Scalars['Boolean']['input'];
  itemId: Scalars['Int']['input'];
  toListId: Scalars['Int']['input'];
};

export type Query = {
  __typename?: 'Query';
  board: Array<KanbanColumn>;
};

export type KanbanQueryVariables = Exact<{ [key: string]: never; }>;


export type KanbanQuery = { __typename?: 'Query', board: Array<{ __typename?: 'KanbanColumn', id: number, name: string, itemsOrder: string, Items: Array<{ __typename?: 'KanbanItem', id: number, title: string, done: boolean, Images?: Array<{ __typename?: 'ItemImage', base64data: string }> | null }> }> };

export type MoveItemMutationVariables = Exact<{
  itemId: Scalars['Int']['input'];
  toListId: Scalars['Int']['input'];
  afterItemId: Scalars['Int']['input'];
  doneIncluded: Scalars['Boolean']['input'];
}>;


export type MoveItemMutation = { __typename?: 'Mutation', moveItem: Array<{ __typename?: 'KanbanColumn', id: number, name: string, itemsOrder: string, Items: Array<{ __typename?: 'KanbanItem', id: number, title: string, done: boolean, Images?: Array<{ __typename?: 'ItemImage', base64data: string }> | null }> }> };


export const KanbanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Kanban"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"board"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"itemsOrder"}},{"kind":"Field","name":{"kind":"Name","value":"Items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"done"}},{"kind":"Field","name":{"kind":"Name","value":"Images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"base64data"}}]}}]}}]}}]}}]} as unknown as DocumentNode<KanbanQuery, KanbanQueryVariables>;
export const MoveItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MoveItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"itemId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"toListId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"afterItemId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"doneIncluded"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"moveItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"itemId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"itemId"}}},{"kind":"Argument","name":{"kind":"Name","value":"toListId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"toListId"}}},{"kind":"Argument","name":{"kind":"Name","value":"afterItemId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"afterItemId"}}},{"kind":"Argument","name":{"kind":"Name","value":"doneIncluded"},"value":{"kind":"Variable","name":{"kind":"Name","value":"doneIncluded"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"itemsOrder"}},{"kind":"Field","name":{"kind":"Name","value":"Items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"done"}},{"kind":"Field","name":{"kind":"Name","value":"Images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"base64data"}}]}}]}}]}}]}}]} as unknown as DocumentNode<MoveItemMutation, MoveItemMutationVariables>;
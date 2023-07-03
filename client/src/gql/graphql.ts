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

export type KanbanBoard = {
  __typename?: 'KanbanBoard';
  columns: Array<KanbanColumn>;
  columnsOrder: Scalars['String']['output'];
  id: Scalars['Int']['output'];
};

export type KanbanColumn = {
  __typename?: 'KanbanColumn';
  id: Scalars['Int']['output'];
  items: Array<KanbanItem>;
  itemsOrder: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type KanbanItem = {
  __typename?: 'KanbanItem';
  columnId?: Maybe<Scalars['String']['output']>;
  done: Scalars['Boolean']['output'];
  id: Scalars['Int']['output'];
  images?: Maybe<Array<ItemImage>>;
  title: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addImage: Array<KanbanBoard>;
  createColumn: Array<KanbanBoard>;
  createItem: Array<KanbanBoard>;
  deleteColumn: Array<KanbanBoard>;
  deleteItem: Array<KanbanBoard>;
  moveColumn: Array<KanbanBoard>;
  moveItem: Array<KanbanBoard>;
  setDone: Array<KanbanBoard>;
  updateColumn: Array<KanbanBoard>;
  updateItem: KanbanItem;
};


export type MutationAddImageArgs = {
  imageSrc: Scalars['String']['input'];
  itemId: Scalars['Int']['input'];
};


export type MutationCreateColumnArgs = {
  boardId: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};


export type MutationCreateItemArgs = {
  columnId: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};


export type MutationDeleteColumnArgs = {
  columnId: Scalars['Int']['input'];
};


export type MutationDeleteItemArgs = {
  itemId: Scalars['Int']['input'];
};


export type MutationMoveColumnArgs = {
  afterColumnId: Scalars['Int']['input'];
  columnId: Scalars['Int']['input'];
  doneIncluded: Scalars['Boolean']['input'];
};


export type MutationMoveItemArgs = {
  afterItemId: Scalars['Int']['input'];
  doneIncluded: Scalars['Boolean']['input'];
  itemId: Scalars['Int']['input'];
  toListId: Scalars['Int']['input'];
};


export type MutationSetDoneArgs = {
  done: Scalars['Boolean']['input'];
  itemId: Scalars['Int']['input'];
};


export type MutationUpdateColumnArgs = {
  columnId: Scalars['Int']['input'];
  newTitle: Scalars['String']['input'];
};


export type MutationUpdateItemArgs = {
  itemId: Scalars['Int']['input'];
  newTitle: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  boards: Array<KanbanBoard>;
};

export type KanbanQueryVariables = Exact<{ [key: string]: never; }>;


export type KanbanQuery = { __typename?: 'Query', boards: Array<{ __typename?: 'KanbanBoard', id: number, columnsOrder: string, columns: Array<{ __typename?: 'KanbanColumn', id: number, name: string, itemsOrder: string, items: Array<{ __typename?: 'KanbanItem', id: number, title: string, done: boolean, columnId?: string | null, images?: Array<{ __typename?: 'ItemImage', id: number, base64data: string }> | null }> }> }> };

export type MoveItemMutationVariables = Exact<{
  itemId: Scalars['Int']['input'];
  toListId: Scalars['Int']['input'];
  afterItemId: Scalars['Int']['input'];
  doneIncluded: Scalars['Boolean']['input'];
}>;


export type MoveItemMutation = { __typename?: 'Mutation', moveItem: Array<{ __typename?: 'KanbanBoard', id: number, columnsOrder: string, columns: Array<{ __typename?: 'KanbanColumn', id: number, name: string, itemsOrder: string, items: Array<{ __typename?: 'KanbanItem', id: number, title: string, columnId?: string | null, done: boolean, images?: Array<{ __typename?: 'ItemImage', id: number, base64data: string }> | null }> }> }> };

export type MoveColumnMutationVariables = Exact<{
  columnId: Scalars['Int']['input'];
  afterColumnId: Scalars['Int']['input'];
  doneIncluded: Scalars['Boolean']['input'];
}>;


export type MoveColumnMutation = { __typename?: 'Mutation', moveColumn: Array<{ __typename?: 'KanbanBoard', id: number, columnsOrder: string, columns: Array<{ __typename?: 'KanbanColumn', id: number, name: string, itemsOrder: string, items: Array<{ __typename?: 'KanbanItem', id: number, title: string, done: boolean, columnId?: string | null, images?: Array<{ __typename?: 'ItemImage', id: number, base64data: string }> | null }> }> }> };

export type UpdateColumnMutationVariables = Exact<{
  columnId: Scalars['Int']['input'];
  newTitle: Scalars['String']['input'];
}>;


export type UpdateColumnMutation = { __typename?: 'Mutation', updateColumn: Array<{ __typename?: 'KanbanBoard', id: number, columnsOrder: string, columns: Array<{ __typename?: 'KanbanColumn', id: number, name: string, itemsOrder: string, items: Array<{ __typename?: 'KanbanItem', id: number, title: string, done: boolean, images?: Array<{ __typename?: 'ItemImage', id: number, base64data: string }> | null }> }> }> };

export type AddColumnMutationVariables = Exact<{
  title: Scalars['String']['input'];
  boardId: Scalars['Int']['input'];
}>;


export type AddColumnMutation = { __typename?: 'Mutation', createColumn: Array<{ __typename?: 'KanbanBoard', id: number, columnsOrder: string, columns: Array<{ __typename?: 'KanbanColumn', id: number, name: string, itemsOrder: string, items: Array<{ __typename?: 'KanbanItem', id: number, title: string, done: boolean, images?: Array<{ __typename?: 'ItemImage', id: number, base64data: string }> | null }> }> }> };

export type DeleteColumnMutationVariables = Exact<{
  columnId: Scalars['Int']['input'];
}>;


export type DeleteColumnMutation = { __typename?: 'Mutation', deleteColumn: Array<{ __typename?: 'KanbanBoard', id: number, columnsOrder: string, columns: Array<{ __typename?: 'KanbanColumn', id: number, name: string, itemsOrder: string, items: Array<{ __typename?: 'KanbanItem', id: number, title: string, done: boolean, images?: Array<{ __typename?: 'ItemImage', id: number, base64data: string }> | null }> }> }> };

export type UpdateItemMutationVariables = Exact<{
  itemId: Scalars['Int']['input'];
  newTitle: Scalars['String']['input'];
}>;


export type UpdateItemMutation = { __typename?: 'Mutation', updateItem: { __typename?: 'KanbanItem', id: number, title: string, done: boolean, images?: Array<{ __typename?: 'ItemImage', id: number, base64data: string }> | null } };

export type AddItemMutationVariables = Exact<{
  title: Scalars['String']['input'];
  columnId: Scalars['Int']['input'];
}>;


export type AddItemMutation = { __typename?: 'Mutation', createItem: Array<{ __typename?: 'KanbanBoard', id: number, columnsOrder: string, columns: Array<{ __typename?: 'KanbanColumn', id: number, name: string, itemsOrder: string, items: Array<{ __typename?: 'KanbanItem', id: number, title: string, done: boolean, images?: Array<{ __typename?: 'ItemImage', id: number, base64data: string }> | null }> }> }> };

export type SetDoneMutationVariables = Exact<{
  itemId: Scalars['Int']['input'];
  done: Scalars['Boolean']['input'];
}>;


export type SetDoneMutation = { __typename?: 'Mutation', setDone: Array<{ __typename?: 'KanbanBoard', id: number, columnsOrder: string, columns: Array<{ __typename?: 'KanbanColumn', id: number, name: string, itemsOrder: string, items: Array<{ __typename?: 'KanbanItem', id: number, title: string, done: boolean, images?: Array<{ __typename?: 'ItemImage', id: number, base64data: string }> | null }> }> }> };

export type DeleteItemMutationVariables = Exact<{
  itemId: Scalars['Int']['input'];
}>;


export type DeleteItemMutation = { __typename?: 'Mutation', deleteItem: Array<{ __typename?: 'KanbanBoard', id: number, columnsOrder: string, columns: Array<{ __typename?: 'KanbanColumn', id: number, name: string, itemsOrder: string, items: Array<{ __typename?: 'KanbanItem', id: number, title: string, done: boolean, images?: Array<{ __typename?: 'ItemImage', id: number, base64data: string }> | null }> }> }> };

export type AddImageToItemMutationVariables = Exact<{
  itemId: Scalars['Int']['input'];
  imgSrc: Scalars['String']['input'];
}>;


export type AddImageToItemMutation = { __typename?: 'Mutation', addImage: Array<{ __typename?: 'KanbanBoard', id: number, columnsOrder: string, columns: Array<{ __typename?: 'KanbanColumn', id: number, name: string, itemsOrder: string, items: Array<{ __typename?: 'KanbanItem', id: number, title: string, done: boolean, images?: Array<{ __typename?: 'ItemImage', id: number, base64data: string }> | null }> }> }> };


export const KanbanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Kanban"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"boards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"columnsOrder"}},{"kind":"Field","name":{"kind":"Name","value":"columns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"itemsOrder"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"done"}},{"kind":"Field","name":{"kind":"Name","value":"columnId"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"base64data"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<KanbanQuery, KanbanQueryVariables>;
export const MoveItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MoveItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"itemId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"toListId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"afterItemId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"doneIncluded"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"moveItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"itemId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"itemId"}}},{"kind":"Argument","name":{"kind":"Name","value":"toListId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"toListId"}}},{"kind":"Argument","name":{"kind":"Name","value":"afterItemId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"afterItemId"}}},{"kind":"Argument","name":{"kind":"Name","value":"doneIncluded"},"value":{"kind":"Variable","name":{"kind":"Name","value":"doneIncluded"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"columnsOrder"}},{"kind":"Field","name":{"kind":"Name","value":"columns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"itemsOrder"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"columnId"}},{"kind":"Field","name":{"kind":"Name","value":"done"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"base64data"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<MoveItemMutation, MoveItemMutationVariables>;
export const MoveColumnDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MoveColumn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"columnId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"afterColumnId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"doneIncluded"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"moveColumn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"columnId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"columnId"}}},{"kind":"Argument","name":{"kind":"Name","value":"afterColumnId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"afterColumnId"}}},{"kind":"Argument","name":{"kind":"Name","value":"doneIncluded"},"value":{"kind":"Variable","name":{"kind":"Name","value":"doneIncluded"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"columnsOrder"}},{"kind":"Field","name":{"kind":"Name","value":"columns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"itemsOrder"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"done"}},{"kind":"Field","name":{"kind":"Name","value":"columnId"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"base64data"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<MoveColumnMutation, MoveColumnMutationVariables>;
export const UpdateColumnDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateColumn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"columnId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newTitle"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateColumn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"columnId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"columnId"}}},{"kind":"Argument","name":{"kind":"Name","value":"newTitle"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newTitle"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"columnsOrder"}},{"kind":"Field","name":{"kind":"Name","value":"columns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"itemsOrder"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"done"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"base64data"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateColumnMutation, UpdateColumnMutationVariables>;
export const AddColumnDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddColumn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createColumn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"boardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"columnsOrder"}},{"kind":"Field","name":{"kind":"Name","value":"columns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"itemsOrder"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"done"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"base64data"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<AddColumnMutation, AddColumnMutationVariables>;
export const DeleteColumnDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteColumn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"columnId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteColumn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"columnId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"columnId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"columnsOrder"}},{"kind":"Field","name":{"kind":"Name","value":"columns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"itemsOrder"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"done"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"base64data"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<DeleteColumnMutation, DeleteColumnMutationVariables>;
export const UpdateItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"itemId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newTitle"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"itemId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"itemId"}}},{"kind":"Argument","name":{"kind":"Name","value":"newTitle"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newTitle"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"done"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"base64data"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateItemMutation, UpdateItemMutationVariables>;
export const AddItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"columnId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"columnId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"columnId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"columnsOrder"}},{"kind":"Field","name":{"kind":"Name","value":"columns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"itemsOrder"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"done"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"base64data"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<AddItemMutation, AddItemMutationVariables>;
export const SetDoneDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"setDone"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"itemId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"done"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setDone"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"itemId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"itemId"}}},{"kind":"Argument","name":{"kind":"Name","value":"done"},"value":{"kind":"Variable","name":{"kind":"Name","value":"done"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"columnsOrder"}},{"kind":"Field","name":{"kind":"Name","value":"columns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"itemsOrder"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"done"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"base64data"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<SetDoneMutation, SetDoneMutationVariables>;
export const DeleteItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"itemId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"itemId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"itemId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"columnsOrder"}},{"kind":"Field","name":{"kind":"Name","value":"columns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"itemsOrder"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"done"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"base64data"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<DeleteItemMutation, DeleteItemMutationVariables>;
export const AddImageToItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddImageToItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"itemId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"imgSrc"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"itemId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"itemId"}}},{"kind":"Argument","name":{"kind":"Name","value":"imageSrc"},"value":{"kind":"Variable","name":{"kind":"Name","value":"imgSrc"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"columnsOrder"}},{"kind":"Field","name":{"kind":"Name","value":"columns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"itemsOrder"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"done"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"base64data"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<AddImageToItemMutation, AddImageToItemMutationVariables>;
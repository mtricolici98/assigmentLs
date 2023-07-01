/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    query Kanban {\n        boards {\n            id\n            columnsOrder\n            columns {\n                id\n                name\n                itemsOrder\n                items {\n                    id\n                    title\n                    done\n                    columnId\n                    images {\n                        id\n                        base64data\n                    }\n                }\n            }\n        }\n    }\n": types.KanbanDocument,
    "\n    mutation MoveItem($itemId: Int!, $toListId: Int!, $afterItemId: Int!, $doneIncluded: Boolean!) {\n        moveItem(itemId: $itemId, toListId: $toListId, afterItemId: $afterItemId, doneIncluded: $doneIncluded) {\n        id\n        columnsOrder\n        columns {\n            id\n            name\n            itemsOrder\n            items {\n                id\n                title\n                columnId\n                done\n                images {\n                    id\n                    base64data\n                }\n            }\n        }\n    }\n}\n": types.MoveItemDocument,
    "\n    mutation MoveColumn($columnId: Int!, $afterColumnId: Int!, $doneIncluded: Boolean!) {\n        moveColumn(columnId: $columnId, afterColumnId: $afterColumnId, doneIncluded: $doneIncluded) {\n        id\n        columnsOrder\n        columns {\n            id\n            name\n            itemsOrder\n            items {\n                id\n                title\n                done\n                columnId\n                images {\n                    id\n                    base64data\n                }\n            }\n        }\n    }\n}\n": types.MoveColumnDocument,
    "\n    mutation UpdateItem($itemId: Int!, $newTitle: String!) {\n        updateItem(itemId: $itemId, newTitle: $newTitle) {\n            id\n            title\n            done\n            images {\n                id\n                base64data\n            }\n        }\n    }\n": types.UpdateItemDocument,
    "\n    mutation AddItem($title: String!, $columnId: Int!) {\n        # returns the entire board\n        createItem(title: $title, columnId: $columnId) {\n            id\n            columnsOrder\n            columns {\n                id\n                name\n                itemsOrder\n                items {\n                    id\n                    title\n                    done\n                    images {\n                        id\n                        base64data\n                    }\n                }\n            }\n        }\n    }\n": types.AddItemDocument,
    "\n    mutation setDone($itemId: Int! $done: Boolean!) {\n        setDone(itemId: $itemId, done: $done) {\n            id\n            title\n            done\n            images {\n                id\n                base64data\n            }\n        }\n    }\n": types.SetDoneDocument,
    "\n    mutation DeleteItem($itemId: Int!) {\n        deleteItem(itemId: $itemId) {\n            id\n        }\n    }\n": types.DeleteItemDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query Kanban {\n        boards {\n            id\n            columnsOrder\n            columns {\n                id\n                name\n                itemsOrder\n                items {\n                    id\n                    title\n                    done\n                    columnId\n                    images {\n                        id\n                        base64data\n                    }\n                }\n            }\n        }\n    }\n"): (typeof documents)["\n    query Kanban {\n        boards {\n            id\n            columnsOrder\n            columns {\n                id\n                name\n                itemsOrder\n                items {\n                    id\n                    title\n                    done\n                    columnId\n                    images {\n                        id\n                        base64data\n                    }\n                }\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation MoveItem($itemId: Int!, $toListId: Int!, $afterItemId: Int!, $doneIncluded: Boolean!) {\n        moveItem(itemId: $itemId, toListId: $toListId, afterItemId: $afterItemId, doneIncluded: $doneIncluded) {\n        id\n        columnsOrder\n        columns {\n            id\n            name\n            itemsOrder\n            items {\n                id\n                title\n                columnId\n                done\n                images {\n                    id\n                    base64data\n                }\n            }\n        }\n    }\n}\n"): (typeof documents)["\n    mutation MoveItem($itemId: Int!, $toListId: Int!, $afterItemId: Int!, $doneIncluded: Boolean!) {\n        moveItem(itemId: $itemId, toListId: $toListId, afterItemId: $afterItemId, doneIncluded: $doneIncluded) {\n        id\n        columnsOrder\n        columns {\n            id\n            name\n            itemsOrder\n            items {\n                id\n                title\n                columnId\n                done\n                images {\n                    id\n                    base64data\n                }\n            }\n        }\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation MoveColumn($columnId: Int!, $afterColumnId: Int!, $doneIncluded: Boolean!) {\n        moveColumn(columnId: $columnId, afterColumnId: $afterColumnId, doneIncluded: $doneIncluded) {\n        id\n        columnsOrder\n        columns {\n            id\n            name\n            itemsOrder\n            items {\n                id\n                title\n                done\n                columnId\n                images {\n                    id\n                    base64data\n                }\n            }\n        }\n    }\n}\n"): (typeof documents)["\n    mutation MoveColumn($columnId: Int!, $afterColumnId: Int!, $doneIncluded: Boolean!) {\n        moveColumn(columnId: $columnId, afterColumnId: $afterColumnId, doneIncluded: $doneIncluded) {\n        id\n        columnsOrder\n        columns {\n            id\n            name\n            itemsOrder\n            items {\n                id\n                title\n                done\n                columnId\n                images {\n                    id\n                    base64data\n                }\n            }\n        }\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation UpdateItem($itemId: Int!, $newTitle: String!) {\n        updateItem(itemId: $itemId, newTitle: $newTitle) {\n            id\n            title\n            done\n            images {\n                id\n                base64data\n            }\n        }\n    }\n"): (typeof documents)["\n    mutation UpdateItem($itemId: Int!, $newTitle: String!) {\n        updateItem(itemId: $itemId, newTitle: $newTitle) {\n            id\n            title\n            done\n            images {\n                id\n                base64data\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation AddItem($title: String!, $columnId: Int!) {\n        # returns the entire board\n        createItem(title: $title, columnId: $columnId) {\n            id\n            columnsOrder\n            columns {\n                id\n                name\n                itemsOrder\n                items {\n                    id\n                    title\n                    done\n                    images {\n                        id\n                        base64data\n                    }\n                }\n            }\n        }\n    }\n"): (typeof documents)["\n    mutation AddItem($title: String!, $columnId: Int!) {\n        # returns the entire board\n        createItem(title: $title, columnId: $columnId) {\n            id\n            columnsOrder\n            columns {\n                id\n                name\n                itemsOrder\n                items {\n                    id\n                    title\n                    done\n                    images {\n                        id\n                        base64data\n                    }\n                }\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation setDone($itemId: Int! $done: Boolean!) {\n        setDone(itemId: $itemId, done: $done) {\n            id\n            title\n            done\n            images {\n                id\n                base64data\n            }\n        }\n    }\n"): (typeof documents)["\n    mutation setDone($itemId: Int! $done: Boolean!) {\n        setDone(itemId: $itemId, done: $done) {\n            id\n            title\n            done\n            images {\n                id\n                base64data\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation DeleteItem($itemId: Int!) {\n        deleteItem(itemId: $itemId) {\n            id\n        }\n    }\n"): (typeof documents)["\n    mutation DeleteItem($itemId: Int!) {\n        deleteItem(itemId: $itemId) {\n            id\n        }\n    }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
# Changelog

# Running the demo

## Server

Run the container for the PG Instance:

```
cd server
docker compose up -d
```

Install dependencies for the server

```
npm install
```

Note: `--force` may be needed

Run `npx prisma generate` and `npx prisma migrate dev`

Running `npx prisma seed` may be necessary

Run `npm start` to start the server

## Client

`cd` to the client and init yarn using `yarn` or `npx yarn` command

use `yarn start` or `npx yarn start` to start the development server

# Summary

## What was Done

* Implemented drag and drop for both items and columns
* Implemented item update
* Implemented item done
* Implemented item deletion
* Implemented Column name update
* Image Add
* Column Deletion
* Image View

## Known bugs

* Sometimes view doesn't rerender properly...
  * Example during column rename, item set to done or item deleted
* Large images don't upload
* Missing visibility on errors (all fails are silent)
  * Would fix by adding a notification pop-up somewhere in the corner

## What would I add...

* Image deletion (needs some UI but otherwise easy to do)
* Global checkbox "Show done items" to see items marked as completed
* Datetime picker for the deadline (already have the field in the DB just need the front-end for it)
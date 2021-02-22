# Sprinkles of Joy

## Features
Our site mimics a basic shop interface, in our case a bakery.

1. Basic user registration, saving to a local database using json.
1. Basic log in log out functionality using session storage. Not recommended for professional developement!!!!
1. Add items to a cart
1. Save and view previous orders
1. Add, view, and delete reviews

## Motivation

We set out to debug a broken code base and add additional functionality. Our learning goals included working with: ERD's, git workflow, asynchronous functions, databases, and database relationships.

## Using our app

1. Clone our repo
1. Make a copy of the `Settings.js.example` file in the `scripts` directory and remove the `.example` extension.
1. Make a copy of the `bakerydb.json.example` file in the `api` directory and remove the `.example` extension.
1. Run your local json-server with `json-server -p 8088 -w bakerydb.json` from the `api` directory.
1. Run your application server with `serve`.
1. App should be up and running!


![erd](images/MandoBarsERD.png)
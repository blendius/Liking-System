# Hello Povio

This was an assignment for the Ruby intern/entry level position. The assignment is made using nodeJS and includes a login/registration for users using jsonwebtoken which enables more secure routes and overall application. It also includes like-dislike system which allows the logged in users to like dislike each other.

## Installation

First of all use install the required packages

```
npm install
```

Then make sure to use the specific .env variables that match your mongoDB database and set the secret token to your liking.

```
DATABASE_CONNECTION= Your mongoDB server connection
TOKEN_SECRET = Your preferred secret token
```

## Testing

I did testing for the signup endpoint.

To run the tests use:

```
npm run test
```

PS.Make sure to change the signup succesful test credentials(username and email) if you run the test for a 2nd time.

## Usage

To run the aplication use:

```
npm run start
```

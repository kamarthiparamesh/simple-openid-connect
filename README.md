
# Simple Node Program for OAuth2 flow using openid-client

This uses [openid-client](https://www.npmjs.com/package/openid-client) package to do OAuth2 using PKCE flow. 

## Understand

1. Get Auth URL
```
const url = await getAuthUrl();
console.log(url);
```

2. Complete flow of AUth URL 

3. From the Callback URL copy the Code, State 

4. also copy the code_verifier while generating Auth URL at step 1

5. paste the values here, comment step 1 code and run

```
const token = await getToken({
    code: "<CODE_HERE>"
    , state: "<STATE_HERE>"
    , code_verifier: "<CODE_VERIFIER_HERE>"
})

const jwt = parseJwt(token.id_token);

console.log(jwt);
```

## Install & Run
```
npm install
node index.js
```
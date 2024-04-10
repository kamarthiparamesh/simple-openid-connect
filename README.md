
# Simple Node Program for OAuth2 flow using openid-client

This uses [openid-client](https://www.npmjs.com/package/openid-client) package to do OAuth2 using PKCE flow. 

## Setup

1. Create `.env` using below command
```
cp .env.example .env
```
2. Create login configurations in Affinidi portal

3. Paste CLIENT_ID & ISSUER in .env file


## Understand

1. Get Auth URL
```
Step1()
```

2. Complete flow of AUth URL 

3. From the Callback URL copy the Code, State 

4. also copy the code_verifier while generating Auth URL at step 1

5. paste the values here, comment step 1 code and run

```
const code = "<CODE_HERE>";
const state = "<STATE_HERE>";
const code_verifier = "<CODE_VERIFIER_HERE>";
Step3(code, state, code_verifier);
```

## Install & Run
```
npm install
node index.js
```
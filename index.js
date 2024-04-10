
import { Issuer, generators } from 'openid-client';
import 'dotenv/config';

function parseJwt(token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

const getClient = async () => {

    const options =
    {
        "clientId": process.env.PROVIDER_CLIENT_ID,
        "issuer": process.env.PROVIDER_ISSUER,
        "redirect_uri": "http://localhost:3000/login/affinidi/callback",
    }

    const affinidi = await Issuer.discover(options.issuer);
    const client = new affinidi.Client({
        client_id: options.clientId,
        redirect_uris: [options.redirect_uri],
        response_types: ['code'],
        token_endpoint_auth_method: 'none',
    })
    return client;
}

const getAuthUrl = async () => {
    const code_verifier = generators.codeVerifier()
    console.log('code_verifier', code_verifier);
    const params = {
        code_challenge: generators.codeChallenge(code_verifier),
        code_challenge_method: 'S256',
        response_type: 'code',
        scope: 'openid',
        state: generators.state(),
    }
    const client = await getClient();

    const authorizationUrl = client.authorizationUrl(params);

    return authorizationUrl;
}

const getToken = async (params) => {

    const client = await getClient();
    const tokenSet = await client.callback('http://localhost:3000/login/affinidi/callback', params, params);
    // const tokenSet = await client.grant(
    //     {
    //       grant_type: 'authorization_code',
    //       code: params.code,
    //       redirect_uri: 'http://localhost:3000/login/affinidi/callback',
    //       code_verifier: params.code_verifier,
    //     }
    //   );

    console.log('received and validated tokens %j', tokenSet);
    console.log('validated ID Token claims %j', tokenSet.claims());
    return tokenSet;
}

const Step1 = async () => {
    const url = await getAuthUrl();
    console.log(url);
}

const Step3 = async (code, state, code_verifier) => {
    const token = await getToken({
        code, state, code_verifier
    })

    const jwt = parseJwt(token.id_token);
    console.log(jwt);
}

const runCode = async () => {

    //Step 1: Get Auth url
    Step1()

    //Step 2: Complete flow of AUth URL 

    //Step 3 : From the Callback URL copy the Code, State & also copy the code_verifier while generating Auth URL at step 1

    //Step 3 : paste the values here, comment step 1 code and run
    const code = "<CODE_HERE>";
    const state = "<STATE_HERE>";
    const code_verifier = "<CODE_VERIFIER_HERE>";
    //Step3(code, state, code_verifier);
}


runCode();
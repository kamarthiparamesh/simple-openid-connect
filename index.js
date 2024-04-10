
import { Issuer, generators } from 'openid-client';

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
}

const process = async () => {

    //Step 1: Get Auth url
    const url = await getAuthUrl();
    console.log(url);

    //Step 2: Complete flow of AUth URL 
    
    //Step 3 : From the Callback URL copy the Code, State & also copy the code_verifier while generating Auth URL at step 1

    //Step 3 : paste the values here, comment step 1 code and run
    const token = await getToken({
        code: "ory_ac_p3bmYdBeUcfmv9iNWolmeDm-la0fo18DoW0bn9J-ods.PJznh1JQ-Q7_0e4-AsxgZ-DkZL5VHPv53RUPqwP06go"
        , state: "-KvG9F3DqzDG4hWKmZdYvj_Nx1VcSLW4Rj5K7rSyF-M"
        , code_verifier: "EFG__Pa8_DTtejaXdXSuTYSa9ko2TpCAv_RVCQ2Vyq0"
    })

    const jwt = parseJwt(token.id_token);

    console.log(jwt);

}

function parseJwt(token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}


process();
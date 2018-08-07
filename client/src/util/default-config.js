export const yourOktaDomain = "dev-657184.oktapreview.com";
export const clientId = "0oafvmim6lHM5UqLH0h7";
export const openIdEmail = "dbmarch@gmail.com";

export default {
  oidc: {
    clientId: `${clientId}`,
    issuer: `https://${yourOktaDomain}.com/oauth2/default`,
    redirectUri: "http://localhost:8080/implicit/callback",
    scope: `${openIdEmail}`
  },
  resourceServer: {
    messagesUrl: "http://localhost:8000/api/messages"
  }
};

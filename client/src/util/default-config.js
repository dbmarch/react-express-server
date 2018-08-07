export const yourOktaDomain = "dev-657184.oktapreview.com";
export const clientId = "0oafvmim6lHM5UqLH0h7";
export const openIdEmail = "dbmarch@gmail.com";

//clientId: `${clientId}`,
// issuer: `https://${yourOktaDomain}.com/oauth2/default`,

export default {
  oidc: {
    clientId: "0oafvmim6lHM5UqLH0h7",
    issuer: "https://dev-657184.oktapreview.com/oauth2/default",
    redirectUri: "http://localhost:3000/implicit/callback",
    scope: "dbmarch@gmail.com"
  },
  resourceServer: {
    messagesUrl: "http://localhost:3001/api/messages"
  }
};

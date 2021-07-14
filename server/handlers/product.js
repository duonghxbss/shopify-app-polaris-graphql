import ApolloClient from "apollo-boost";
import gql from "apollo-boost";
export function GET_PRODUCT(){
  return gql`
  {
  products(first: 10) {
    edges {
      node {
        id
        title
        images (first: 10){
          edges {
            node {
              id
              originalSrc
              altText
            }
          }
        }
      }
    }
  }
}
  `
}
export const getProduct = (shop, accessToken) => {
  return new ApolloClient({
    uri: `https://${shop}/admin/api/2019-10/graphql.json`,
    request: operation => {
      operation.setContext({
        headers: {
          "X-Shopify-Access-Token": accessToken,
          "User-Agent": `shopify-app-node ${
            process.env.npm_package_version
          } | Shopify App CLI`
        }
      });
    }

  });
};

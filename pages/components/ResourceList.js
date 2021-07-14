import React from 'react';
import {
  Card,
  ResourceList,
  Stack,
  TextStyle,
  Thumbnail,
} from '@shopify/polaris';
import store from 'store-js';
import { Context } from '@shopify/app-bridge-react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
class ResourceListWithProducts extends React.Component {
  static contextType = Context;

  render() {
    const app = this.context;
    const GET_PRODUCTS_BY_ID = gql`
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
`;
    return (
      <Query query={GET_PRODUCTS_BY_ID}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading…</div>;
          if (error) return <div>{error.message}</div>;
          console.log(data);
          return (
            <Card>
              <p>stuff here</p>
            </Card>
          );
        }}
      </Query>
    );
  }
}

export default ResourceListWithProducts;

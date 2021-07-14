import {
  Autocomplete,
  Card,
  ChoiceList,
  FormLayout,
  Filters,
  Button,
  ResourceList,
  Avatar, Stack,
  TextStyle, ResourceItem,
  TextField, Thumbnail
} from "@shopify/polaris";
import React, {useCallback, useState} from "react";
// import {SelectSpecificProduct} from "SelectSpecificProduct";
import store from 'store-js';
// import {Redirect} from '@shopify/app-bridge/actions';
// import {Context} from '@shopify/app-bridge-react';
// import gql from 'graphql-tag';
// import {Query} from 'react-apollo';
import {gql, useQuery, ApolloProvider} from '@apollo/client';
import ApolloClient from "apollo-boost";
import {Query} from "react-apollo";

export function TableSelect(props) {
  const [selectedItems, setSelectedItems] = useState([]);
  // const [sortValue, setSortValue] = useState('DATE_MODIFIED_DESC');
  const [taggedWith, setTaggedWith] = useState('VIP');
  const [queryValue, setQueryValue] = useState(props.value);

  const handleTaggedWithChange = useCallback(
    (value) => setTaggedWith(value),
    [],
  );
  const handleQueryValueChange = useCallback(
    (value) => setQueryValue(value),
    [],
  );
  const handleTaggedWithRemove = useCallback(() => setTaggedWith(null), []);
  const handleQueryValueRemove = useCallback(() => setQueryValue(null), []);
  const handleClearAll = useCallback(() => {
    handleTaggedWithRemove();
    handleQueryValueRemove();
  }, [handleQueryValueRemove, handleTaggedWithRemove]);

  const resourceName = {
    singular: 'product',
    plural: 'products',
  };

  const items = [
    {
      id: 112,
      url: 'customers/341',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      latestOrderUrl: 'orders/1456',
    },
    {
      id: 212,
      url: 'customers/256',
      name: 'Ellen Ochoa',
      location: 'Los Angeles, USA',
      latestOrderUrl: 'orders/1457',
    }, {
      id: 1121,
      url: 'customers/341',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      latestOrderUrl: 'orders/1456',
    },
    {
      id: 2121,
      url: 'customers/256',
      name: 'Ellen Ochoa',
      location: 'Los Angeles, USA',
      latestOrderUrl: 'orders/1457',
    }, {
      id: 1122,
      url: 'customers/341',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      latestOrderUrl: 'orders/1456',
    },
    {
      id: 2122,
      url: 'customers/256',
      name: 'Ellen Ochoa',
      location: 'Los Angeles, USA',
      latestOrderUrl: 'orders/1457',
    }, {
      id: 1123,
      url: 'customers/341',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      latestOrderUrl: 'orders/1456',
    },
    {
      id: 2123,
      url: 'customers/256',
      name: 'Ellen Ochoa',
      location: 'Los Angeles, USA',
      latestOrderUrl: 'orders/1457',
    },
  ];

  const promotedBulkActions = [
    {
      content: '',
      onAction: () => console.log('Todo: implement bulk edit'),
    },
  ];

  const bulkActions = [
    {
      content: 'Add tags',
      onAction: () => console.log('Todo: implement bulk add tags'),
    },
    {
      content: 'Remove tags',
      onAction: () => console.log('Todo: implement bulk remove tags'),
    },
    {
      content: 'Delete customers',
      onAction: () => console.log('Todo: implement bulk delete'),
    },
  ];

  const filters = [
    // {
    //     key: 'taggedWith3',
    //     label: 'Tagged with',
    //     filter: (
    //         <TextField
    //             label="Tagged with"
    //             value={taggedWith}
    //             onChange={handleTaggedWithChange}
    //             labelHidden
    //         />
    //     ),
    //     shortcut: true,
    // },
  ];

  const appliedFilters = !isEmpty(taggedWith)
    ? [
      {
        key: 'taggedWith3',
        label: disambiguateLabel('taggedWith3', taggedWith),
        onRemove: handleTaggedWithRemove,
      },
    ]
    : [];

  const filterControl = (
    <Filters
      queryValue={queryValue}
      filters={filters}
      // appliedFilters={appliedFilters}
      onQueryChange={handleQueryValueChange}
      onQueryClear={handleQueryValueRemove}
      onClearAll={handleClearAll}
    >
      {/*<div style={{paddingLeft: '8px'}}>*/}
      {/*    <Button onClick={() => console.log('New filter saved')}>Save</Button>*/}
      {/*</div>*/}
    </Filters>
  );
  const GET_PRODUCTS = gql`
  {
  products(first: 20) {
    edges {
      node {
        id
        title
        images (first: 1){
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
//   const { loading, error, data } = useQuery(GET_PRODUCTS);
//   if (loading) return 'Loading...';
//   if (error) return `Error! ${error.message}`;
//   console.log(data);

  return (
    <Query query={GET_PRODUCTS}>
      {({data, loading, error}) => {
        if (loading) return <div>Loading…</div>;
        if (error) return <div>{error.message}</div>;
        console.log(data.products.edges);
        const productsList = []
        data.products.edges.forEach((d) => {
          productsList.push({
            id: d.node.id,
            title: d.node.title,
            image: d.node.images.edges[0].node.originalSrc
          })
        })
        console.log(productsList);
        // const product = {
        //   id
        // }
        return (
          <Card>
            <ResourceList
              resourceName={resourceName}
              items={productsList}
              renderItem={renderItem}
              selectedItems={selectedItems}
              onSelectionChange={setSelectedItems}
              promotedBulkActions={promotedBulkActions}
              // bulkActions={bulkActions}
              // sortValue={sortValue}
              // sortOptions={[
              //     {label: 'Newest update', value: 'DATE_MODIFIED_DESC'},
              //     {label: 'Oldest update', value: 'DATE_MODIFIED_ASC'},
              // ]}
              // onSortChange={(selected) => {
              //     setSortValue(selected);
              //     console.log(`Sort option changed to ${selected}.`);
              // }}
              filterControl={filterControl}
            />
          </Card>
        );
      }}
    </Query>

  );

  function renderItem(item) {
    const {id, image, title} = item;
    const media = <Thumbnail
      source= {image}
      size="large"
      alt={title}
    />;
    return (
      <ResourceItem
        id={id}
        media={media}
        // accessibilityLabel={`View details for ${name}`}
        // shortcutActions={shortcutActions}
        // persistActions
      >
        {/*<h3>*/}
          <TextStyle variation="strong">{title}</TextStyle>

        {/*</h3>*/}
        {/*<div>{location}</div>*/}
      </ResourceItem>
    );
  }

  function disambiguateLabel(key, value) {
    switch (key) {
      case 'taggedWith3':
        return `Tagged with ${value}`;
      default:
        return value;
    }
  }

  function isEmpty(value) {
    if (Array.isArray(value)) {
      return value.length === 0;
    } else {
      return value === '' || value == null;
    }
  }
}

const axios = require('axios');

// Set the URL for the GraphQL server
const url = 'http://localhost:3434/graphql';

// Define your GraphQL query
const query = `
  query {
    example {
      id
      name
    }
  }
`;

// Send the GraphQL request to the server
axios.post(url, { query })
  .then(response => {
    // Extract the data from the GraphQL response
    const data = response.data.data;

    // Log the response data
    console.log('Response data:', data);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });

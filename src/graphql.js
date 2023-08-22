export async function fetchGraphQLQuery() {
    // Simulate the response with mock data
    const mockResponse = {
      data: {
        root: {
          ratesTable: {
            5: { borrowingRate: 0.7, monthlyRate: 710.24 },
            10: { borrowingRate: 0.75, monthlyRate: 723.39 },
            15: { borrowingRate: 1.04, monthlyRate: 799.68 },
            20: { borrowingRate: 1.32, monthlyRate: 873.33 },
            25: { borrowingRate: 1.89, monthlyRate: 1023.27 },
            30: { borrowingRate: 1.94, monthlyRate: 1036.43 },
          },
        },
      },
    };
  
    // Simulate fetching data from the GraphQL endpoint
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockResponse);
      }, 1000); // Simulate delay
    });
  }
  
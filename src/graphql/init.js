import { ApolloClient, InMemoryCache } from 'apollo-client-preset';
import { ApolloLink } from 'apollo-link';
import { onError } from "apollo-link-error";
import { createUploadLink } from 'apollo-upload-client';
import typeDefs from './typeDefs';

let uri = 'https://yuz1.herokuapp.com/graphql';

let configureClient = (store) => {
    // Instantiate required constructor fields
    const cache = new InMemoryCache({
        addTypename: false
    });
    const uploadLink = createUploadLink({
        uri, headers: {
            authorization: localStorage.getItem('token')
        },

    });

    let error = onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
            graphQLErrors.forEach(({ message, locations, path }) => {
                console.warn(
                    `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
                )
                // store.dispatch(logoutUser())
            });
        }
        if (networkError) console.warn(`[Network error]: ${networkError}`);
    });


    const client = new ApolloClient({
        // Provide required constructor fields
        cache: cache,
        link: ApolloLink.from([error, uploadLink]),

        // Provide some optional constructor fields
        typeDefs,
        defaultHttpLink: false,

    });
    return client

}

export default configureClient
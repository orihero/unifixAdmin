// import ApolloClient from 'apollo-boost';
// import { NotificationManager } from '../components/common/react-notifications';
// import { logoutUser } from '../redux/actions';
// import { InMemoryCache } from 'apollo-cache-inmemory'
// import typeDefs from './typeDefs';
// import { createUploadLink } from 'apollo-upload-client';
// import { ApolloLink } from 'apollo-link';
// import { HttpLink } from 'apollo-client-preset';

// let uri = 'https://39990dea.ngrok.io/graphql';


// const uploadLink = createUploadLink({ uri });

// const link = new HttpLink({
//     uri
// })
// const createClient = (store) => {
//     const client = new ApolloClient({
//         uri,
//         request: (operation) => {
//             const token = localStorage.getItem('token')
//             operation.setContext({
//                 headers: {
//                     authorization: token
//                 }
//             })
//         },

//         onError: ({ forward, networkError, graphQLErrors, operation, response }) => {
//             if (response && response.errors && response.errors.length > 0) {
//                 let errorMessage = response.errors[0].message;
//                 NotificationManager.error(errorMessage)
//                 if (errorMessage === "loginAdminNull") {
//                     store.dispatch(logoutUser())
//                 }
//             }
//         },
//         typeDefs,
//     });
//     return client
// }
// export default createClient

import {  InMemoryCache, ApolloClient } from 'apollo-client-preset';
import { createUploadLink } from 'apollo-upload-client';
import { ApolloLink } from 'apollo-link';
import typeDefs from './typeDefs';
import { onError } from "apollo-link-error";
import { logoutUser } from '../redux/actions'

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
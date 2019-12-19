import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Orders = React.lazy(() =>
    import(/* webpackChunkName: "product-data-list" */ './my-shop')
);

const PagesProduct = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/all-orders`} />
            <Route
                path={`${match.url}/all-orders`}
                render={props => <Orders {...props} />}
            />
            <Route
                path={`${match.url}/:groupBy`}
                render={props => <Orders {...props} />}
            />
            <Redirect to="/error" />
        </Switch>
    </Suspense>
);
export default PagesProduct;

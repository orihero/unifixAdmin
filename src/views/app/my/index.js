import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Shops = React.lazy(() =>
    import(/* webpackChunkName: "product-data-list" */ '../orders/my-shop')
);

const Couriers = React.lazy(() =>
    import(/* webpackChunkName: "product-data-list" */ '../orders/my-courier')
);


const PagesProduct = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/shops`} />
            <Route
                path={`${match.url}/shops`}
                render={props => <Shops {...props} />}
            />
            <Route
                path={`${match.url}/couriers`}
                render={props => <Couriers {...props} />}
            />
            <Redirect to="/error" />
        </Switch>
    </Suspense>
);
export default PagesProduct;

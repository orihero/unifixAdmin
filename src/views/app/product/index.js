import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Manufacturers = React.lazy(() =>
    import(/* webpackChunkName: "product-data-list" */ './manufacturer')
);

const AddProduct = React.lazy(() =>
    import(/* webpackChunkName: "product-data-list" */ './add-product')
);

const PagesProduct = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/list`} />
            <Route
                path={`${match.url}/list`}
                render={props => <Manufacturers {...props} />}
            />
            <Route
                path={`${match.url}/add-product/:manufacturer_id`}
                render={props => <AddProduct {...props} />}
            />
            <Redirect to="/error" />
        </Switch>
    </Suspense>
);
export default PagesProduct;

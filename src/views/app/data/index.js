import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Shops = React.lazy(() =>
    import(/* webpackChunkName: "product-data-list" */ './shop')
);

const Couriers = React.lazy(() =>
    import(/* webpackChunkName: "product-data-list" */ './courier')
);
const Manufacturers = React.lazy(() =>
    import(/* webpackChunkName: "product-data-list" */ './manufacturer/index')
);
const Categories = React.lazy(() =>
    import(/* webpackChunkName: "product-data-list" */ './category')
);

// const AddProduct = React.lazy(() =>
//     import(/* webpackChunkName: "product-data-list" */ './manufacturer/add-product')
// );

const PagesProduct = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/data-list`} />
            <Route
                path={`${match.url}/shops`}
                render={props => <Shops {...props} />}
            />
            <Route
                path={`${match.url}/couriers`}
                render={props => <Couriers {...props} />}
            />
            <Route
                path={`${match.url}/manufacturers`}
                render={props => <Manufacturers {...props} />}
            />
            <Route
                path={`${match.url}/categories`}
                render={props => <Categories {...props} />}
            />
            <Redirect to="/error" />
        </Switch>
    </Suspense>
);
export default PagesProduct;

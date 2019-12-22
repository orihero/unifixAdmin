import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from '../../layout/AppLayout';

const Dashboards = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './dashboards')
);
const Data = React.lazy(() =>
  import(/* webpackChunkName: "pages" */ './data')
);
const Orders = React.lazy(() =>
  import(/* webpackChunkName: "pages" */ './orders')
);
const Products = React.lazy(() =>
  import(/* webpackChunkName: "pages" */ './product')
);



class App extends Component {
  render() {
    const { match } = this.props;
    return (
      <AppLayout>
        <div className="dashboard-wrapper">
          <Suspense fallback={<div className="loading" />}>
            <Switch>
              <Redirect
                exact
                from={`${match.url}/`}
                to={`${match.url}/dashboards`}
              />
              <Route
                path={`${match.url}/dashboards`}
                render={props => <Dashboards {...props} />}
              />
              <Route
                path={`${match.url}/data`}
                render={props => <Data {...props} />}
              />
              <Route
                path={`${match.url}/orders`}
                render={props => <Orders {...props} />}
              />
              <Route
                path={`${match.url}/products`}
                render={props => <Products {...props} />}
              />
              <Redirect to="/error" />
            </Switch>
          </Suspense>
        </div>
      </AppLayout>
    );
  }
}
const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(App)
);

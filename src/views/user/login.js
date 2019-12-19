import React, { useState } from "react";
import { Row, Card, CardTitle, Label, FormGroup, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Formik, Form, Field } from "formik";

import { loginUserSuccess } from "../../redux/actions";
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import { LOGIN_USER } from '../../graphql/requests'
import { useLazyQuery } from '@apollo/react-hooks'
import { NotificationManager } from "../../components/common/react-notifications";

const Login = ({ history, user, dispatch }) => {
  const [state, setState] = useState({
    username: "sherlocks",
    password: "sherLOCK"
  });

  const [fetchUser, { loading, data, error }] = useLazyQuery(LOGIN_USER);

  let validatePassword = (value) => {
    let error;
    if (!value) {
      error = "Please enter your password";
    } else if (value.length < 4) {
      error = "Value must be longer than 3 characters";
    }
    return error;
  }
  if (error) {
    NotificationManager.error(error.message, "Login Error")
  }

  if (data) {
    localStorage.setItem('token', data.loginAdmin);
    dispatch(loginUserSuccess(data.loginAdmin))
    history.push("/app")
  }

  let onInputChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value })
  }
  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="position-relative image-side ">
            <p className="text-white h2">MAGIC IS IN THE DETAILS</p>
            <p className="white mb-0">
              Please use your credentials to login.
                <br />
              If you are not a member, please{" "}
              <NavLink to={`/register`} className="white">
                register
                </NavLink>
              .
              </p>
          </div>
          <div className="form-side">
            <NavLink to={`/`} className="white">
              <span className="logo-single" />
            </NavLink>
            <CardTitle className="mb-4">
              <IntlMessages id="user.login-title" />
            </CardTitle>

            <Formik>
              {({ errors, touched }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="user.username" />
                    </Label>
                    <Field
                      className="form-control"
                      name="username"
                      value={state.username}
                      onChange={onInputChange}
                    />
                    {errors.username && touched.username && (
                      <div className="invalid-feedback d-block">
                        {errors.username}
                      </div>
                    )}
                  </FormGroup>
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="user.password" />
                    </Label>
                    <Field
                      className="form-control"
                      type="password"
                      name="password"
                      onChange={onInputChange}
                      value={state.password}
                      validate={validatePassword}
                    />
                    {errors.password && touched.password && (
                      <div className="invalid-feedback d-block">
                        {errors.password}
                      </div>
                    )}
                  </FormGroup>
                  <div className="d-flex justify-content-between align-items-center">
                    <NavLink to={`/user/forgot-password`}>
                      <IntlMessages id="user.forgot-password-question" />
                    </NavLink>
                    <Button
                      color="primary"
                      className={`btn-shadow btn-multiple-state ${loading ? "show-spinner" : ""}`}
                      size="lg"
                      type="submit"
                      onClick={() => {
                        fetchUser({ variables: { username: state.username, password: state.password } })
                      }}
                    >
                      <span className="spinner d-inline-block">
                        <span className="bounce1" />
                        <span className="bounce2" />
                        <span className="bounce3" />
                      </span>
                      <span className="label"><IntlMessages id="user.login-button" /></span>
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Card>
      </Colxx>
    </Row>
  );
}
const mapStateToProps = ({ authUser }) => {
  const { user, loading, error } = authUser;
  return { user, loading, error };
};

export default connect(mapStateToProps)(Login);

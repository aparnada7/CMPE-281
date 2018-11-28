# React Login Signup Form

A group of React Components for implementing Login and Signup functionality.

## Preview

![Preview Image](https://raw.githubusercontent.com/hassanaliaskari/ReactLoginSignupForm/master/docs/preview.png)

## Demo

Check out the [Demo](https://hassanaliaskari.github.io/ReactLoginSignupForm/)


## Getting Started
The overall architecture was inspired by [this guide.](https://medium.com/the-many/adding-login-and-authentication-sections-to-your-react-or-react-native-app-7767fd251bd1)

### Installing
The package can be installed via NPM:
```
npm install react-login-signup-form
```

```
import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom'
import { LoginWrapper, LoginSignupForm } from 'react-login-signup-form';
import { login, setRedirectUrl, signup } from './actions/loginActions.js';
import HomePage from './home.js';

function mapStateToPropsForm(state) {
  return {
    isLoading: state.login.isLoading,
    isLoggedIn: state.login.isLoggedIn,
    redirectUrl: state.login.redirectUrl,
  }
}
const ConnectedForm = withRouter(connect(mapStateToPropsForm)(LoginSignupForm));

function mapStateToPropsLoginWrapper(state) {
  return {
    isLoggedIn: state.login.isLoggedIn,
  }
}
const ConnectedLoginWrapper = withRouter(connect(mapStateToPropsLoginWrapper)(LoginWrapper));

const routes = (
  <div>
    <Route path='/login' render={() =>
      <ConnectedForm
        backgroundImageUrl="https://i.pinimg.com/originals/1e/92/d2/1e92d2809d44371f04cbc4d3d6ce22c1.jpg"
        containerPosition="0.67"
        tryLoginAction={login}
        trySignupAction={signup}
      />
    } />
    <ConnectedLoginWrapper
      setRedirectUrlAction={setRedirectUrl}
    >
      <Route path='/' component={HomePage} />
    </ConnectedLoginWrapper>
  </div>
);

export default routes;
```

```
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import routes from './routes.js';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      {routes}
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);
```

## Configuration

The package contains two components - LoginForm and LoginWrapper.

### LoginWrapper
LoginWrapper is used to wrap the routes that can only be accessed by logged-in users.

#### *Required Props*
**dispatch** : A connection to redux store.

**isLoggedIn** : A global state to indicate user login state.

**setRedirectUrlAction** : A redux action to set the route to return to after successful login.

### LoginSignupForm
LoginForm is a React Component meant to be used for the /login route.

#### *Required Props*
**isLoading** : A global state to indicate that the app is communicating to the backend.

**isLoggedIn** : A global state to indicate user login state.

**redirectUrl** : The route to return to after successful login.

**tryLoginAction** : A redux action to verify login with the backend. Function Parameters: (username, password)

**trySignupAction** : A redux action to verify signup with the backend. Function Parameters: (email, password)

#### *Optional Props*
**backgroundColor** : (String) The background color of the login page. If background image is specified, the color is hidden.

**backgroundImageUrl** : (String) The background image of the login page.

**backgroundRepeat** : (Boolean) Specifies if background image should be repeated.

**backgroundSize** : (String) Specifies CSS property background-size.

**backgroundStyle** : (Object) Overrides login page background with custom styles.

**loginButton** : (React Component) Custom Component to be used as the Login button.

**containerColor** : (String) The background color of the container containing the form.

**containerPosition** : (Number) A number between 0 and 1 to specify the horizontal position of the container. 0.5 places the container in the middle. The container is always centered vertically.

**containerStyle** : (Object) Overrides container styles.

**errorFontColor** : (String) Color of the error message.

**errorFontSize** : (String) Font size for the error messages (including units e.g. px, rem).

**errorFontStyle** : (String) Specifies CSS property font-style.

**errorStyle** : (Object) Overrides error message styles.

**inputBorderColor** : (String) The border color of the input elements used in the form.

**inputBorderFocusedColor** : (String) The border color of the input elements when clicked.

**inputElement** : (React Component) Custom Component to be used as the input element. Needs to have the following props:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **onChange(val)** : A function called when the input of the element changes.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **value** : The current value of the user input.
A minimal custom input element would look like -

```
class CustomInput extends React.Component {
  render() {
    return (
      <input
        onChange={(event) => this.props.onChange(event.target.value)}
        value={this.props.value}
      />
    );
  }
}
```

**inputFontColor** : (String) Color of the input.

**inputHintColor** : (String) Color of the hints used in the input element.

**inputHintFocusedColor** : (String) Color of the hints used in the input element when clicked.

**inputWidth** : (String) Width of the input element (including units e.g. px, rem).

**signupButton** : (React Component) Custom Component to be used as the Signup button.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

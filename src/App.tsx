import React, { Fragment, useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, LinkProps, Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { authenticationService } from './services/authentication.service';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import { GalleryView } from './views/GalleryView';
import { LoginView } from './views/LoginView';
import { RegisterView } from './views/RegisterView';
import './App.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  welcome: {
    marginRight: theme.spacing(1),
    fontSize: theme.typography.button.fontSize,
  },
}));

interface IUser {
  name: string;
  accessToken: string;
}

const AdapterLink = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
  <Link innerRef={ref as any} {...props} />
));

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const classes = useStyles();

  useEffect(() => {
    authenticationService.currentUser.subscribe((user) => setCurrentUser(user));
  }, []);

  const doLogout = () => {
    authenticationService.logout();
  };

  console.log(currentUser);

  return (
    <Fragment>
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              EF Picture Gallery
            </Typography>
            {currentUser ? (
              <Fragment>
                <div className={classes.welcome}>{`Hello ${currentUser.name}`}</div>
                <Button color="inherit" onClick={doLogout}>
                  Logout
                </Button>
              </Fragment>
            ) : (
              <Fragment>
                <Button color="inherit" component={AdapterLink} to="/login">
                  Login
                </Button>
                <Button color="inherit" component={AdapterLink} to="/register">
                  Register
                </Button>
              </Fragment>
            )}
          </Toolbar>
        </AppBar>
        <Switch>
          <PrivateRoute exact path="/" component={GalleryView} />
          <Route path="/login" component={LoginView} />
          <Route path="/register" component={RegisterView} />
        </Switch>
      </Router>
    </Fragment>
  );
};

export default App;

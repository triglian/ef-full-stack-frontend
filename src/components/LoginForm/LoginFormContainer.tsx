import React, { Fragment, ChangeEvent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Formik, FormikActions } from 'formik';
import * as Yup from 'yup';

import { LoginFormComponent, LoginFormValues } from './LoginFormComponent';
import { authenticationService } from '../../services/authentication.service';
import { RouterProps } from 'react-router';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    minHeight: '500px',
  },
}));

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Enter a valid email')
    .min(6, 'Email must contain at least 6 characters')
    .max(255, 'Email cannot contain more than 255 characters')
    .required('Email is required'),
  password: Yup.string().required('Enter your password'),
});

const LoginFormContainer: React.FC<RouterProps> = ({ history }) => {
  const classes = useStyles();
  const initialValues = {
    email: '',
    password: '',
  };

  if (authenticationService.currentUserValue) {
    history.push('/');
  }

  const doLogin = async (
    { email, password }: LoginFormValues,
    { setStatus, setSubmitting, setErrors }: FormikActions<LoginFormValues>
  ) => {
    setStatus();
    try {
      const user = await authenticationService.login(email, password);
      history.push({ pathname: '/' });
    } catch (error) {
      setSubmitting(false);
      setStatus(error);
    }
  };

  return (
    <Fragment>
      <CssBaseline />
      <Container maxWidth="sm" className={classes.container}>
        <Typography component="div">
          <Formik
            initialValues={initialValues}
            onSubmit={doLogin}
            validationSchema={validationSchema}
            render={(props) => <LoginFormComponent {...props} />}
          />
        </Typography>
      </Container>
    </Fragment>
  );
};

export { LoginFormContainer };

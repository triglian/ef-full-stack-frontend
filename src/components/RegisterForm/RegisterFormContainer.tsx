import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Formik, FormikActions } from 'formik';
import * as Yup from 'yup';

import { RegisterFormComponent } from './RegisterFormComponent';
import { authenticationService } from '../../services/';
import { RouterProps, Redirect } from 'react-router';

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
  name: Yup.string()
    .min(6, 'Name must contain at least 6 characters')
    .max(255, 'Name cannot contain more than 255 characters')
    .required('Enter your name'),
  email: Yup.string()
    .email('Enter a valid email')
    .min(6, 'Email must contain at least 6 characters')
    .max(255, 'Email cannot contain more than 255 characters')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must contain at least 6 characters')
    .required('Enter your password'),
  confirmPassword: Yup.string()
    .required('Confirm your password')
    .oneOf([Yup.ref('password')], 'Password does not match'),
});

const RegisterFormContainer: React.FC<RouterProps> = ({ history }) => {
  const [wasRegistrationSuccessful, setWasRegistrationSuccessful] = useState(false);
  const classes = useStyles();
  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const doRegister = async (
    { name, email, password }: RegisterFormValues,
    { setStatus, setSubmitting }: FormikActions<RegisterFormValues>
  ) => {
    setStatus();
    try {
      await authenticationService.register(name, email, password);
      setWasRegistrationSuccessful(true);
    } catch (error) {
      setSubmitting(false);
      setStatus(error);
    }
  };

  return (
    <Fragment>
      {!authenticationService.currentUserValue && !wasRegistrationSuccessful ? (
        <Fragment>
          <CssBaseline />
          <Container maxWidth="sm" className={classes.container}>
            <Typography component="div">
              <Formik
                initialValues={initialValues}
                onSubmit={doRegister}
                validationSchema={validationSchema}
                render={(props) => <RegisterFormComponent {...props} />}
              />
            </Typography>
          </Container>
        </Fragment>
      ) : (
        <Redirect to="/" />
      )}
    </Fragment>
  );
};

export { RegisterFormContainer };

import React, { ChangeEvent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import { FormikProps } from 'formik';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    margin: theme.spacing(5),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  statusErrorHelperText: {
    textAlign: 'center',
    marginTop: -theme.spacing(2),
  },
}));

type fieldNamesType = 'email' | 'password';

const LoginFormComponent: React.FC<FormikProps<LoginFormValues>> = ({
  values: { email, password },
  status,
  errors,
  touched,
  handleSubmit,
  handleChange,
  isValid,
  setFieldTouched,
  setStatus,
  isSubmitting,
}) => {
  const classes = useStyles();
  const change = (name: fieldNamesType, e: ChangeEvent) => {
    e.persist();
    setStatus('');
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  return (
    <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit}>
      <FormHelperText error={status ? true : false} className={classes.statusErrorHelperText}>
        {status}
      </FormHelperText>

      <TextField
        id="email"
        name="email"
        label="Email"
        helperText={touched.email ? errors.email : ''}
        error={touched.email && Boolean(errors.email)}
        className={classes.textField}
        onChange={change.bind(null, 'email')}
        margin="normal"
      />
      <TextField
        id="password"
        name="password"
        label="Password"
        helperText={touched.password ? errors.password : ''}
        error={touched.password && Boolean(errors.password)}
        className={classes.textField}
        type="password"
        autoComplete="current-password"
        onChange={change.bind(null, 'password')}
        margin="normal"
      />
      <Button
        variant="contained"
        type="submit"
        color="primary"
        className={classes.button}
        disabled={!isValid || isSubmitting}
      >
        Login
      </Button>
    </form>
  );
};

export { LoginFormComponent };

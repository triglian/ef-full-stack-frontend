import React from 'react';
import { RouterProps } from 'react-router';

import { LoginForm } from '../components/LoginForm';

const LoginView: React.FC<RouterProps> = ({ ...props }) => <LoginForm {...props} />;

export { LoginView };

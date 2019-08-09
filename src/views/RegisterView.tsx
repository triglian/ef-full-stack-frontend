import React from 'react';
import { RouterProps } from 'react-router';

import { RegisterForm } from '../components/RegisterForm';

const RegisterView: React.FC<RouterProps> = ({ ...props }) => <RegisterForm {...props} />;

export { RegisterView };

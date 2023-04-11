import AuthForm from '../AuthForm/AuthForm';

import { SIGNIN } from '../../../helpers/constants';

export default function ResetPasswordForm({ handler, toggleActiveComponentType }) {
  const fields = [
    { name: 'password', label: 'Lösenord', type: 'password', placeholder: 'Lösenord' },
    {
      name: 'passwordConfirm',
      label: 'Bekräfta lösenord',
      type: 'password',
      placeholder: 'Bekräfta lösenord',
    },
  ];

  return (
    <AuthForm
      title='Fyll i ditt nya lösenord.'
      button='Alright!'
      fields={fields}
      handler={handler}
    ></AuthForm>
  );
}

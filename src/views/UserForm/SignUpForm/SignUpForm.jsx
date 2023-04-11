import AuthForm from '../AuthForm/AuthForm';

import { SIGNIN } from '../../../helpers/constants';

export default function SignUpForm({ handler, toggleActiveComponentType }) {
  const fields = [
    { name: 'username', label: 'Användarnamn', type: 'text', placeholder: 'Användarnamn' },
    { name: 'name', label: 'Namn', type: 'text', placeholder: 'Namn' },
    { name: 'email', label: 'Email', type: 'text', placeholder: 'Email' },
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
      title='Genom att skapa ett konto nedan kan du börja beställa och se din orderstatus.'
      button='Registrera dig'
      fields={fields}
      handler={handler}
    >
      <p className='authforms__changeview'>
        Redan medlem? Logga in
        <span className='authforms__link' onClick={(e) => toggleActiveComponentType(e, SIGNIN)}>
          här
        </span>
      </p>
    </AuthForm>
  );
}

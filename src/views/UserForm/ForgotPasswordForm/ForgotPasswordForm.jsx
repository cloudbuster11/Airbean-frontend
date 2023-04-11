import AuthForm from '../AuthForm/AuthForm';

import { SIGNIN } from '../../../helpers/constants';

export default function ForgetPasswordForm({ handler, toggleActiveComponentType }) {
  const fields = [{ name: 'email', label: 'Email', type: 'text', placeholder: 'Email' }];

  return (
    <AuthForm
      title='Fyll i din epost för att få återställnings mail.'
      button='Alright!'
      fields={fields}
      handler={handler}
    >
      <p className='authforms__changeview'>
        Jag kom på mitt lösenord! Klicka
        <span className='authforms__link' onClick={(e) => toggleActiveComponentType(e, SIGNIN)}>
          här
        </span>
      </p>
    </AuthForm>
  );
}

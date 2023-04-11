import AuthForm from '../AuthForm/AuthForm';

import { SIGNUP } from '../../../helpers/constants';

export default function LoginForm({ handler, toggleActiveComponentType }) {
  const fields = [
    { name: 'username', label: 'Användarnamn', type: 'text', placeholder: 'Användarnamn' },
    { name: 'password', label: 'Lösenord', type: 'password', placeholder: 'Lösenord' },
  ];

  return (
    <AuthForm title='Logga in nedan för att beställa.' button='Logga in' fields={fields} handler={handler}>
      <p className='authforms__changeview'>
        Inget konto än? Skapa ett
        <span className='authforms__link' onClick={(e) => toggleActiveComponentType(e, SIGNUP)}>
          här
        </span>
      </p>
    </AuthForm>
  );
}

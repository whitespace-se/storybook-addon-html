import './header.css';
import { createButton } from './Button';

export const createHeader = ({ user, onLogout, onLogin, onCreateAccount }) => {
  const header = document.createElement('header');

  const wrapper = document.createElement('div');
  wrapper.className = 'wrapper';

  const logo = `<div>
    <svg
      width="32"
      height="32"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 2048 2048"
    >
      <path d="M1228.8 0H2048v2048h-819.2V0z" fill="#f7b219" />
      <circle r="409.6" transform="translate(819.2 409.6)" fill="#215da5" />
      <path
        d="M0 819.2A1228.8 1228.8 0 011228.8 2048H409.6A409.6 409.6 0 000 1638.4z"
        fill="#ff5001"
      />
    </svg>
    <h1>Whitespace</h1>
  </div>`;

  wrapper.insertAdjacentHTML('afterbegin', logo);

  const account = document.createElement('div');
  if (user) {
    account.appendChild(
      createButton({ size: 'small', label: 'Log out', onClick: onLogout }),
    );
  } else {
    account.appendChild(
      createButton({ size: 'small', label: 'Log in', onClick: onLogin }),
    );
    account.appendChild(
      createButton({
        size: 'small',
        label: 'Sign up',
        onClick: onCreateAccount,
        primary: true,
      }),
    );
  }
  wrapper.appendChild(account);
  header.appendChild(wrapper);

  return header;
};

import React from 'react';
import PropTypes from 'prop-types';

import { Button } from './Button';
import './header.css';

export const Header = ({ user, onLogin, onLogout, onCreateAccount }) => (
  <header>
    <div className="wrapper">
      <div>
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
          <g className="gridDots">
            <g transform="translate(614.4 1024)">
              <circle r="16.384" cx="-563.2" cy="-972.8" />
              <circle r="16.384" cx="-460.8" cy="-972.8" />
              <circle r="16.384" cx="-358.4" cy="-972.8" />
              <circle r="16.384" cx="-256" cy="-972.8" />
              <circle r="16.384" cx="-153.6" cy="-972.8" />
              <circle r="16.384" cx="-51.2" cy="-972.8" />
              <circle r="16.384" cx="51.2" cy="-972.8" />
              <circle r="16.384" cx="153.6" cy="-972.8" />
              <circle r="16.384" cx="256" cy="-972.8" />
              <circle r="16.384" cx="358.4" cy="-972.8" />
              <circle r="16.384" cx="460.8" cy="-972.8" />
              <circle r="16.384" cx="563.2" cy="-972.8" />
            </g>
            <g transform="translate(614.4 1024)">
              <circle r="16.384" cx="-563.2" cy="-870.4" />
              <circle r="16.384" cx="-460.8" cy="-870.4" />
              <circle r="16.384" cx="-358.4" cy="-870.4" />
              <circle r="16.384" cx="-256" cy="-870.4" />
              <circle r="16.384" cx="-153.6" cy="-870.4" />
              <circle r="16.384" cx="-51.2" cy="-870.4" />
              <circle r="16.384" cx="51.2" cy="-870.4" />
              <circle r="16.384" cx="153.6" cy="-870.4" />
              <circle r="16.384" cx="256" cy="-870.4" />
              <circle r="16.384" cx="358.4" cy="-870.4" />
              <circle r="16.384" cx="460.8" cy="-870.4" />
              <circle r="16.384" cx="563.2" cy="-870.4" />
            </g>
            <g transform="translate(614.4 1024)">
              <circle r="16.384" cx="-563.2" cy="-768" />
              <circle r="16.384" cx="-460.8" cy="-768" />
              <circle r="16.384" cx="-358.4" cy="-768" />
              <circle r="16.384" cx="-256" cy="-768" />
              <circle r="16.384" cx="-153.6" cy="-768" />
              <circle r="16.384" cx="-51.2" cy="-768" />
              <circle r="16.384" cx="51.2" cy="-768" />
              <circle r="16.384" cx="153.6" cy="-768" />
              <circle r="16.384" cx="256" cy="-768" />
              <circle r="16.384" cx="358.4" cy="-768" />
              <circle r="16.384" cx="460.8" cy="-768" />
              <circle r="16.384" cx="563.2" cy="-768" />
            </g>
            <g transform="translate(614.4 1024)">
              <circle r="16.384" cx="-563.2" cy="-665.6" />
              <circle r="16.384" cx="-460.8" cy="-665.6" />
              <circle r="16.384" cx="-358.4" cy="-665.6" />
              <circle r="16.384" cx="-256" cy="-665.6" />
              <circle r="16.384" cx="-153.6" cy="-665.6" />
              <circle r="16.384" cx="-51.2" cy="-665.6" />
              <circle r="16.384" cx="51.2" cy="-665.6" />
              <circle r="16.384" cx="153.6" cy="-665.6" />
              <circle r="16.384" cx="256" cy="-665.6" />
              <circle r="16.384" cx="358.4" cy="-665.6" />
              <circle r="16.384" cx="460.8" cy="-665.6" />
              <circle r="16.384" cx="563.2" cy="-665.6" />
            </g>
            <g transform="translate(614.4 1024)">
              <circle r="16.384" cx="-563.2" cy="-563.2" />
              <circle r="16.384" cx="-460.8" cy="-563.2" />
              <circle r="16.384" cx="-358.4" cy="-563.2" />
              <circle r="16.384" cx="-256" cy="-563.2" />
              <circle r="16.384" cx="-153.6" cy="-563.2" />
              <circle r="16.384" cx="-51.2" cy="-563.2" />
              <circle r="16.384" cx="51.2" cy="-563.2" />
              <circle r="16.384" cx="153.6" cy="-563.2" />
              <circle r="16.384" cx="256" cy="-563.2" />
              <circle r="16.384" cx="358.4" cy="-563.2" />
              <circle r="16.384" cx="460.8" cy="-563.2" />
              <circle r="16.384" cx="563.2" cy="-563.2" />
            </g>
            <g transform="translate(614.4 1024)">
              <circle r="16.384" cx="-563.2" cy="-460.8" />
              <circle r="16.384" cx="-460.8" cy="-460.8" />
              <circle r="16.384" cx="-358.4" cy="-460.8" />
              <circle r="16.384" cx="-256" cy="-460.8" />
              <circle r="16.384" cx="-153.6" cy="-460.8" />
              <circle r="16.384" cx="-51.2" cy="-460.8" />
              <circle r="16.384" cx="51.2" cy="-460.8" />
              <circle r="16.384" cx="153.6" cy="-460.8" />
              <circle r="16.384" cx="256" cy="-460.8" />
              <circle r="16.384" cx="358.4" cy="-460.8" />
              <circle r="16.384" cx="460.8" cy="-460.8" />
              <circle r="16.384" cx="563.2" cy="-460.8" />
            </g>
            <g transform="translate(614.4 1024)">
              <circle r="16.384" cx="-563.2" cy="-358.4" />
              <circle r="16.384" cx="-460.8" cy="-358.4" />
              <circle r="16.384" cx="-358.4" cy="-358.4" />
              <circle r="16.384" cx="-256" cy="-358.4" />
              <circle r="16.384" cx="-153.6" cy="-358.4" />
              <circle r="16.384" cx="-51.2" cy="-358.4" />
              <circle r="16.384" cx="51.2" cy="-358.4" />
              <circle r="16.384" cx="153.6" cy="-358.4" />
              <circle r="16.384" cx="256" cy="-358.4" />
              <circle r="16.384" cx="358.4" cy="-358.4" />
              <circle r="16.384" cx="460.8" cy="-358.4" />
              <circle r="16.384" cx="563.2" cy="-358.4" />
            </g>
            <g transform="translate(614.4 1024)">
              <circle r="16.384" cx="-563.2" cy="-256" />
              <circle r="16.384" cx="-460.8" cy="-256" />
              <circle r="16.384" cx="-358.4" cy="-256" />
              <circle r="16.384" cx="-256" cy="-256" />
              <circle r="16.384" cx="-153.6" cy="-256" />
              <circle r="16.384" cx="-51.2" cy="-256" />
              <circle r="16.384" cx="51.2" cy="-256" />
              <circle r="16.384" cx="153.6" cy="-256" />
              <circle r="16.384" cx="256" cy="-256" />
              <circle r="16.384" cx="358.4" cy="-256" />
              <circle r="16.384" cx="460.8" cy="-256" />
              <circle r="16.384" cx="563.2" cy="-256" />
            </g>
            <g transform="translate(614.4 1024)">
              <circle r="16.384" cx="-563.2" cy="-153.6" />
              <circle r="16.384" cx="-460.8" cy="-153.6" />
              <circle r="16.384" cx="-358.4" cy="-153.6" />
              <circle r="16.384" cx="-256" cy="-153.6" />
              <circle r="16.384" cx="-153.6" cy="-153.6" />
              <circle r="16.384" cx="-51.2" cy="-153.6" />
              <circle r="16.384" cx="51.2" cy="-153.6" />
              <circle r="16.384" cx="153.6" cy="-153.6" />
              <circle r="16.384" cx="256" cy="-153.6" />
              <circle r="16.384" cx="358.4" cy="-153.6" />
              <circle r="16.384" cx="460.8" cy="-153.6" />
              <circle r="16.384" cx="563.2" cy="-153.6" />
            </g>
            <g transform="translate(614.4 1024)">
              <circle r="16.384" cx="-563.2" cy="-51.2" />
              <circle r="16.384" cx="-460.8" cy="-51.2" />
              <circle r="16.384" cx="-358.4" cy="-51.2" />
              <circle r="16.384" cx="-256" cy="-51.2" />
              <circle r="16.384" cx="-153.6" cy="-51.2" />
              <circle r="16.384" cx="-51.2" cy="-51.2" />
              <circle r="16.384" cx="51.2" cy="-51.2" />
              <circle r="16.384" cx="153.6" cy="-51.2" />
              <circle r="16.384" cx="256" cy="-51.2" />
              <circle r="16.384" cx="358.4" cy="-51.2" />
              <circle r="16.384" cx="460.8" cy="-51.2" />
              <circle r="16.384" cx="563.2" cy="-51.2" />
            </g>
            <g transform="translate(614.4 1024)">
              <circle r="16.384" cx="-563.2" cy="51.2" />
              <circle r="16.384" cx="-460.8" cy="51.2" />
              <circle r="16.384" cx="-358.4" cy="51.2" />
              <circle r="16.384" cx="-256" cy="51.2" />
              <circle r="16.384" cx="-153.6" cy="51.2" />
              <circle r="16.384" cx="-51.2" cy="51.2" />
              <circle r="16.384" cx="51.2" cy="51.2" />
              <circle r="16.384" cx="153.6" cy="51.2" />
              <circle r="16.384" cx="256" cy="51.2" />
              <circle r="16.384" cx="358.4" cy="51.2" />
              <circle r="16.384" cx="460.8" cy="51.2" />
              <circle r="16.384" cx="563.2" cy="51.2" />
            </g>
            <g transform="translate(614.4 1024)">
              <circle r="16.384" cx="-563.2" cy="153.6" />
              <circle r="16.384" cx="-460.8" cy="153.6" />
              <circle r="16.384" cx="-358.4" cy="153.6" />
              <circle r="16.384" cx="-256" cy="153.6" />
              <circle r="16.384" cx="-153.6" cy="153.6" />
              <circle r="16.384" cx="-51.2" cy="153.6" />
              <circle r="16.384" cx="51.2" cy="153.6" />
              <circle r="16.384" cx="153.6" cy="153.6" />
              <circle r="16.384" cx="256" cy="153.6" />
              <circle r="16.384" cx="358.4" cy="153.6" />
              <circle r="16.384" cx="460.8" cy="153.6" />
              <circle r="16.384" cx="563.2" cy="153.6" />
            </g>
            <g transform="translate(614.4 1024)">
              <circle r="16.384" cx="-563.2" cy="256" />
              <circle r="16.384" cx="-460.8" cy="256" />
              <circle r="16.384" cx="-358.4" cy="256" />
              <circle r="16.384" cx="-256" cy="256" />
              <circle r="16.384" cx="-153.6" cy="256" />
              <circle r="16.384" cx="-51.2" cy="256" />
              <circle r="16.384" cx="51.2" cy="256" />
              <circle r="16.384" cx="153.6" cy="256" />
              <circle r="16.384" cx="256" cy="256" />
              <circle r="16.384" cx="358.4" cy="256" />
              <circle r="16.384" cx="460.8" cy="256" />
              <circle r="16.384" cx="563.2" cy="256" />
            </g>
            <g transform="translate(614.4 1024)">
              <circle r="16.384" cx="-563.2" cy="358.4" />
              <circle r="16.384" cx="-460.8" cy="358.4" />
              <circle r="16.384" cx="-358.4" cy="358.4" />
              <circle r="16.384" cx="-256" cy="358.4" />
              <circle r="16.384" cx="-153.6" cy="358.4" />
              <circle r="16.384" cx="-51.2" cy="358.4" />
              <circle r="16.384" cx="51.2" cy="358.4" />
              <circle r="16.384" cx="153.6" cy="358.4" />
              <circle r="16.384" cx="256" cy="358.4" />
              <circle r="16.384" cx="358.4" cy="358.4" />
              <circle r="16.384" cx="460.8" cy="358.4" />
              <circle r="16.384" cx="563.2" cy="358.4" />
            </g>
            <g transform="translate(614.4 1024)">
              <circle r="16.384" cx="-563.2" cy="460.8" />
              <circle r="16.384" cx="-460.8" cy="460.8" />
              <circle r="16.384" cx="-358.4" cy="460.8" />
              <circle r="16.384" cx="-256" cy="460.8" />
              <circle r="16.384" cx="-153.6" cy="460.8" />
              <circle r="16.384" cx="-51.2" cy="460.8" />
              <circle r="16.384" cx="51.2" cy="460.8" />
              <circle r="16.384" cx="153.6" cy="460.8" />
              <circle r="16.384" cx="256" cy="460.8" />
              <circle r="16.384" cx="358.4" cy="460.8" />
              <circle r="16.384" cx="460.8" cy="460.8" />
              <circle r="16.384" cx="563.2" cy="460.8" />
            </g>
            <g transform="translate(614.4 1024)">
              <circle r="16.384" cx="-563.2" cy="563.2" />
              <circle r="16.384" cx="-460.8" cy="563.2" />
              <circle r="16.384" cx="-358.4" cy="563.2" />
              <circle r="16.384" cx="-256" cy="563.2" />
              <circle r="16.384" cx="-153.6" cy="563.2" />
              <circle r="16.384" cx="-51.2" cy="563.2" />
              <circle r="16.384" cx="51.2" cy="563.2" />
              <circle r="16.384" cx="153.6" cy="563.2" />
              <circle r="16.384" cx="256" cy="563.2" />
              <circle r="16.384" cx="358.4" cy="563.2" />
              <circle r="16.384" cx="460.8" cy="563.2" />
              <circle r="16.384" cx="563.2" cy="563.2" />
            </g>
            <g transform="translate(614.4 1024)">
              <circle r="16.384" cx="-563.2" cy="665.6" />
              <circle r="16.384" cx="-460.8" cy="665.6" />
              <circle r="16.384" cx="-358.4" cy="665.6" />
              <circle r="16.384" cx="-256" cy="665.6" />
              <circle r="16.384" cx="-153.6" cy="665.6" />
              <circle r="16.384" cx="-51.2" cy="665.6" />
              <circle r="16.384" cx="51.2" cy="665.6" />
              <circle r="16.384" cx="153.6" cy="665.6" />
              <circle r="16.384" cx="256" cy="665.6" />
              <circle r="16.384" cx="358.4" cy="665.6" />
              <circle r="16.384" cx="460.8" cy="665.6" />
              <circle r="16.384" cx="563.2" cy="665.6" />
            </g>
            <g transform="translate(614.4 1024)">
              <circle r="16.384" cx="-563.2" cy="768" />
              <circle r="16.384" cx="-460.8" cy="768" />
              <circle r="16.384" cx="-358.4" cy="768" />
              <circle r="16.384" cx="-256" cy="768" />
              <circle r="16.384" cx="-153.6" cy="768" />
              <circle r="16.384" cx="-51.2" cy="768" />
              <circle r="16.384" cx="51.2" cy="768" />
              <circle r="16.384" cx="153.6" cy="768" />
              <circle r="16.384" cx="256" cy="768" />
              <circle r="16.384" cx="358.4" cy="768" />
              <circle r="16.384" cx="460.8" cy="768" />
              <circle r="16.384" cx="563.2" cy="768" />
            </g>
            <g transform="translate(614.4 1024)">
              <circle r="16.384" cx="-563.2" cy="870.4" />
              <circle r="16.384" cx="-460.8" cy="870.4" />
              <circle r="16.384" cx="-358.4" cy="870.4" />
              <circle r="16.384" cx="-256" cy="870.4" />
              <circle r="16.384" cx="-153.6" cy="870.4" />
              <circle r="16.384" cx="-51.2" cy="870.4" />
              <circle r="16.384" cx="51.2" cy="870.4" />
              <circle r="16.384" cx="153.6" cy="870.4" />
              <circle r="16.384" cx="256" cy="870.4" />
              <circle r="16.384" cx="358.4" cy="870.4" />
              <circle r="16.384" cx="460.8" cy="870.4" />
              <circle r="16.384" cx="563.2" cy="870.4" />
            </g>
            <g transform="translate(614.4 1024)">
              <circle r="16.384" cx="-563.2" cy="972.8" />
              <circle r="16.384" cx="-460.8" cy="972.8" />
              <circle r="16.384" cx="-358.4" cy="972.8" />
              <circle r="16.384" cx="-256" cy="972.8" />
              <circle r="16.384" cx="-153.6" cy="972.8" />
              <circle r="16.384" cx="-51.2" cy="972.8" />
              <circle r="16.384" cx="51.2" cy="972.8" />
              <circle r="16.384" cx="153.6" cy="972.8" />
              <circle r="16.384" cx="256" cy="972.8" />
              <circle r="16.384" cx="358.4" cy="972.8" />
              <circle r="16.384" cx="460.8" cy="972.8" />
              <circle r="16.384" cx="563.2" cy="972.8" />
            </g>
          </g>
        </svg>

        <h1>Whitespace</h1>
      </div>
      <div>
        {user ? (
          <Button size="small" onClick={onLogout} label="Log out" />
        ) : (
          <>
            <Button size="small" onClick={onLogin} label="Log in" />
            <Button
              primary
              size="small"
              onClick={onCreateAccount}
              label="Sign up"
            />
          </>
        )}
      </div>
    </div>
  </header>
);

Header.propTypes = {
  user: PropTypes.shape({}),
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  onCreateAccount: PropTypes.func.isRequired,
};

Header.defaultProps = {
  user: null,
};

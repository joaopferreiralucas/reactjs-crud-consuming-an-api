import React from 'react';
import {
  FaHome, FaSignInAlt, FaUserAlt, FaCircle,
} from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import history from '../../services/history';

import * as actions from '../../store/modules/auth/actions';
import { Nav } from './styled';

export default function Header() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(actions.loginFailure());
    history.push('/');
  };

  return (
    <Nav>
      <Link to="/">
        <FaHome size={24} />
      </Link>
      <Link to="/register">
        <FaUserAlt size={24} />
      </Link>
      {isLoggedIn ? (
        <Link onClick={handleLogout} to="/logout">
          <FaSignInAlt size={24} />
        </Link>
      ) : (
        <Link to="/login">
          <FaSignInAlt size={24} />
        </Link>
      )}

      <FaCircle size={24} color={isLoggedIn ? ('#4ef55f') : ('#f5574e')} />
    </Nav>
  );
}

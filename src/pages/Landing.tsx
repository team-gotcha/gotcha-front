import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useGetUserInfo } from '../apis/get/useGetUserInfo';

const Landing = () => {
  const loginUrl = `https://accounts.google.com/o/oauth2/v2/auth?include_granted_scopes=true&scope=profile&state=state_parameter_passthrough_value&response_type=code&redirect_uri=${process.env.REACT_APP_GOOGLE_AUTH_REDIRECT_URI}&client_id=${process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}`;

  //custom-hook
  const fetchedData = useGetUserInfo();
  useEffect(() => {
    console.log(fetchedData.userInfo);
  }, [fetchedData.isLoading]);
  const handleLogin = () => {
    window.location.href = loginUrl;
  };
  return (
    <div>
      <h1>This is Landing</h1>
      <button onClick={handleLogin}>GoogleLogin go</button>
    </div>
  );
};

export default Landing;

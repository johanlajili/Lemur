import { useContext } from 'react';
import { LemmyAPIContext } from '../contexts/LemmyAPIContext';

const useLemmyApi = () => {
  const context = useContext(LemmyAPIContext);
  if (!context) {
    throw new Error('useLemmyApi must be used within a LemmyAPIProvider');
  }

  const { client, jwt, login, getPosts , getPost, getComments} = context;

  // return the client, jwt, login and getPosts functions from the context
  return { client, jwt, login, getPosts, getPost, getComments};
};

export default useLemmyApi;

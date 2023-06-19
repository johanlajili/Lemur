import React, { createContext, useContext, useEffect, useState } from 'react';
import {GetComments, GetCommentsResponse, GetPost, GetPostResponse, GetPosts, GetPostsResponse, LemmyHttp} from 'lemmy-js-client';

interface LemmyAPIContextProps {
  instance: string;
  children: React.ReactNode;
}

interface LemmyAPIState {
  client: LemmyHttp | null;
  jwt: string | null;
  login: (username_or_email: string, password: string) => Promise<void>;
  getPosts: (options: GetPosts) => Promise<GetPostsResponse>;
  getPost: (options: GetPost) => Promise<GetPostResponse>;
  getComments: (options: GetComments) => Promise<GetCommentsResponse>;
}

export const LemmyAPIContext = createContext<LemmyAPIState | undefined>(undefined);

export const LemmyAPIProvider: React.FC<LemmyAPIContextProps> = ({ instance, children }) => {
  const [client, setClient] = useState<LemmyHttp | null>(null);
  const [jwt, setJwt] = useState<string | null>(null);

  useEffect(() => {
    const newClient = new LemmyHttp(instance);
    setClient(newClient);
  }, [instance]);

  const login = async (username_or_email: string, password: string) => {
    if (!client) return;

    const response = await client.login({ username_or_email, password });
    if (response.jwt) {
      setJwt(response.jwt);
      // You can also store string in Async Storage for persistence across app restarts
    }
  };

  const getPosts = async (options: GetPosts) => {
    if (!client) return {posts:[]}
    

    const response = await client.getPosts({...options, auth: jwt});
    return response;
  };

  const getPost = async (options: GetPost) => {
    if (!client) return null;

    const response = await client.getPost({ ...options, auth: jwt });
    return response;
  };

  const getComments = async (options: GetComments) => {
    if (!client) return null;

    const response = await client.getComments({ ...options, auth: jwt });
    return response;
  };


  return (
    <LemmyAPIContext.Provider value={{ client, jwt, login, getPosts, getPost, getComments}}>
      {children}
    </LemmyAPIContext.Provider>
  );
};

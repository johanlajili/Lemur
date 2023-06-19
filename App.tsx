import { StyleSheet, Text, View } from 'react-native';
import { LemmyHttp } from 'lemmy-js-client';
import { useEffect, useState } from 'react';
import Navigation from './navigation';
import { LemmyAPIProvider } from './contexts/LemmyAPIContext';





export default function App() {
  const [posts, setPosts] = useState([]) as any[];
  useEffect(() => {
    let baseUrl = 'https://lemmy.world';

    let client: LemmyHttp = new LemmyHttp(baseUrl, {
        'mode': 'no-cors',

    });
    client.login({
      username_or_email: 'USERNAME',
      password: 'PASSWORD'
    }).then((jwt) => {

      client.getPosts({
        auth: jwt.jwt,
        sort: 'Hot',
        limit: 10,
        community_name: 'france',
      }).then((posts) => setPosts(posts));
    })
    
  }, [])
  return (
    <LemmyAPIProvider instance="https://lemmy.world">
        <Navigation/>
    </LemmyAPIProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

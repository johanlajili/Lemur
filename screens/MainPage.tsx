import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import useLemmyApi from '../hooks/useLemmyApi';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GetPostResponse, Post, PostView } from 'lemmy-js-client';
import { StackNavigationProp } from '@react-navigation/stack';

import { MainStackParamList } from '../navigation/StackNavigator'; 

type MainPageNavigationProp = StackNavigationProp<MainStackParamList, 'MainPage'>;

interface MainPageProps {
  navigation: MainPageNavigationProp;
}


const MainPage = ({navigation}: MainPageProps) => {
  const { getPosts } = useLemmyApi();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    if (loading) {
      return <Text>Loading...</Text>;
    }

    setLoading(true);

    try {
      const fetchedPosts = await getPosts({ sort: 'NewComments', limit: 10, page });
      setPosts(prevPosts => {
        const newposts = ([...prevPosts, ...fetchedPosts.posts]);
        //remove duplicate posts
        return newposts.filter((post, index, self) =>
          index === self.findIndex((t) => (
            t.post.id === post.post.id
          ))
        );
      });
      setPage(page + 1);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const renderPost = ({ item }: {item: PostView}) => (
    <View style={styles.itemContainer} onTouchEnd={() => navigation.navigate('CommentPage', { postId: item.post.id })}>
      {
        item.post.thumbnail_url && (
        <Image 
        source={{ uri: item.post.thumbnail_url }}
        style={{ width: '100%', height: 200, resizeMode: 'cover', marginBottom: 10
      }}/>
      )}
      <Text style={styles.itemText}>{item.post.name}</Text>
        <View style={styles.mainInfos}>
          {item.community.icon && <Image source={{ uri: item.community.icon}} style={styles.communityIcon} />}
          <Text style={styles.metaText}>{item.community.title}</Text>
        </View>
        <View style={styles.meta}>
          <View style={styles.iconContainer}>
          <Icon name="comment" size={15} color="#4F4F4F" />
          <Text style={styles.metaText}>{item.counts.comments}</Text>
        </View>

        <View style={styles.updownvotes}>
          <View style={styles.iconContainer}>
            <Icon name="arrow-up" size={15} color="#4F4F4F" />
            <Text style={styles.metaText}>{item.counts.upvotes}</Text>
          </View>

          <View style={styles.iconContainer}>
            <Icon name="arrow-down" size={15} color="#4F4F4F" />
            <Text style={styles.metaText}>{item.counts.downvotes}</Text>
          </View>
        </View>

        
      </View>

    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.post.id.toString()}
        onEndReached={fetchPosts}
        onEndReachedThreshold={0.1}  // trigger onEndReached when the end of the content is within 10% of the viewport
        onRefresh={() => {
          setPage(1);
          setPosts([]);
          fetchPosts();
          setRefreshing(false);
        }}
        refreshing={refreshing}
      />
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: '#0F0F0F', // darker background for the main container
  },
  itemContainer: {
    marginBottom: 10,
    padding: 15,
    backgroundColor: '#1A1A1A', // dark gray for item backgrounds
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
    color: '#E8E8E8', // light gray for the main text
  },
  commentText: {
    color: 'white'
  },
  mainInfos: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  metaText: {
    fontSize: 12,
    color: '#A0A0A0', // mid-gray for metadata text
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  communityIcon: {
    width: 20,
    height: 20,
    borderRadius: 5,
    marginRight: 5,
  },
  updownvotes: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    width: 80,
  },
  commentBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 3,
  },
  rootCommentContainer: {
    marginLeft: 2,
    padding: 5,
    borderBottomColor: '#4F4F4F',
    borderBottomWidth: 1,
  },
  commentContainer: {
    // borderBottomColor: '#4F4F4F',
    // borderBottomWidth: 1,
  }
});

export default MainPage;

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import useLemmyApi from "../hooks/useLemmyApi";
import Icon from "react-native-vector-icons/FontAwesome";
import { CommentView, GetPostResponse, Post, PostView } from "lemmy-js-client";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import Collapsible from "react-native-collapsible";
import { MainStackParamList } from "../navigation/StackNavigator";
import { styles } from "./MainPage";
import {
  HierarchicalCommentView,
  makeCommentsHierarchy,
} from "../utils/makeCommentsHierarchy";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type CommentPageNavigationProp = StackNavigationProp<
  MainStackParamList,
  "CommentPage"
>;
type CommentPageRouteProp = RouteProp<MainStackParamList, "CommentPage">;

const borderColors = {
  "6": "#FF3B30", // bright red
  "5": "#FF9500", // bright orange
  "4": "#FFCC00", // bright yellow
  "3": "#4CD964", // bright green
  "2": "#5AC8FA", // bright blue
  "1": "#007AFF", // deep blue
  "7": "#5856D6", // purple
  "8": "#FF2D55", // deep pink
  "9": "#E6C200", // gold
  "10": "#C69C6D", // copper
  "11": "#8E8E93", // cool gray
};

interface CommentPageProps {
  navigation: CommentPageNavigationProp;
  route: CommentPageRouteProp;
}
const Comment = React.memo(
  ({ comment, level }: { comment: HierarchicalCommentView; level: number }) => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = () => {
      setCollapsed(!collapsed);
    };

    const offset = useSharedValue(0); // initial offset for the animation

    const animatedStyles = useAnimatedStyle(() => {
      return {
        transform: [
          { translateX: withTiming(-offset.value, { duration: 300 }) },
        ],
      };
    });

    useEffect(() => {
      if (!collapsed) {
        offset.value = 0;
      } else {
        offset.value = 50 + level * 50;
      }
    }, [collapsed, level]);

    return (
      <View
        key={comment.comment.id}
        style={
          level === 0 ? styles.rootCommentContainer : styles.commentContainer
        }
      >
        <TouchableOpacity
          onPress={toggleCollapsed}
          activeOpacity={1}
          delayPressIn={0}
        >
          <View>
            <View
              style={{
                marginLeft: level <= 0 ? 0 : level * 5,
                paddingLeft: 5,
                borderLeftColor: borderColors[level],
                borderLeftWidth: level === 0 ? 0 : 3,
              }}
            >
              <View style={styles.commentBar}>
                {comment.creator.avatar && (
                  <Image
                    source={{ uri: comment.creator.avatar }}
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: 8,
                      marginRight: 5,
                    }}
                  />
                )}
                <Text style={styles.metaText}>{comment.creator.name}</Text>
              </View>
              <Text style={styles.commentText}>{comment.comment.content}</Text>
            </View>
            <Collapsible collapsed={collapsed}>
              <Animated.View style={animatedStyles}>
                {renderComments(comment.comments, level + 1)}
              </Animated.View>
            </Collapsible>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
);

// ... rest of your code ...

const renderComments = (
  comments: Array<HierarchicalCommentView>,
  level = 0
) => {
  return comments?.map((comment) => (
    <Comment comment={comment} level={level} />
  ));
};

const CommentPage = ({ navigation, route }: CommentPageProps) => {
  const { getPost, getComments } = useLemmyApi();
  const [post, setPost] = useState<null | PostView>(null);
  const [comments, setComments] = useState<null | CommentView[]>(null); // PostView[
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    setLoading(true);
    try {
      const fetchedPost = await getPost({ id: route.params.postId });
      setPost(fetchedPost.post_view);

      const fetchedComments = await getComments({
        post_id: route.params.postId,
        max_depth: 8,
      });
      const hierarchy = makeCommentsHierarchy(fetchedComments.comments);
      setComments(hierarchy);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !post) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.itemContainer}>
        {post.post.thumbnail_url && (
          <Image
            source={{ uri: post.post.thumbnail_url }}
            style={{
              width: "100%",
              aspectRatio: 1,
              resizeMode: "cover",
              marginBottom: 10,
            }}
          />
        )}
        <Text style={styles.itemText}>{post.post.name}</Text>
        <Text style={styles.itemText}>{post.post.body}</Text>
        <View style={styles.mainInfos}>
          {post.community.icon && (
            <Image
              source={{ uri: post.community.icon }}
              style={styles.communityIcon}
            />
          )}
          <Text style={styles.metaText}>{post.community.title}</Text>
        </View>
        <View style={styles.meta}>
          <View style={styles.iconContainer}>
            <Icon name="comment" size={15} color="#4F4F4F" />
            <Text style={styles.metaText}>{post.counts.comments}</Text>
          </View>

          <View style={styles.updownvotes}>
            <View style={styles.iconContainer}>
              <Icon name="arrow-up" size={15} color="#4F4F4F" />
              <Text style={styles.metaText}>{post.counts.upvotes}</Text>
            </View>

            <View style={styles.iconContainer}>
              <Icon name="arrow-down" size={15} color="#4F4F4F" />
              <Text style={styles.metaText}>{post.counts.downvotes}</Text>
            </View>
          </View>
        </View>
      </View>
      {renderComments(comments)}
    </ScrollView> // Closing ScrollView
  );
};

// You can use the same styles as in the MainPage component

export default CommentPage;

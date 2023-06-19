import { CommentView } from "lemmy-js-client";

export type HierarchicalCommentView = CommentView & {
  comments?: HierarchicalCommentView[];
};

export function makeCommentsHierarchy(
  comments: Array<CommentView>
): Array<HierarchicalCommentView> {
  // Build a map of ids to comment objects
  const commentMap: { [path: string]: HierarchicalCommentView } = {};
  for (const comment of comments) {
    commentMap[comment.comment.path] = { ...comment, comments: [] };
  }

  const roots: HierarchicalCommentView[] = [];

  // Iterate over comments again to build hierarchy
  for (const comment of comments) {
    const hierarchicalComment = commentMap[comment.comment.path];
    const parentPath = comment.comment.path.substring(
      0,
      comment.comment.path.lastIndexOf(".")
    );

    const parentComment = commentMap[parentPath];
    if (parentComment) {
      // If a parent exists, add this comment to its children
      parentComment.comments!.push(hierarchicalComment);
    } else {
      // If no parent exists, this comment is a root
      roots.push(hierarchicalComment);
    }
  }

  return roots;
}

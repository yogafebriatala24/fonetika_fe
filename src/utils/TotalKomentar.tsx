import { KomentarType } from "@/types/KomentarType";

export const TotalKomentar = (comments: KomentarType[]): number => {
  return comments.reduce((total, comment) => {
    let commentCount = 1;
    if (comment.child && comment.child.length > 0) {
      commentCount += TotalKomentar(comment.child);
    }

    return total + commentCount;
  }, 0);
};

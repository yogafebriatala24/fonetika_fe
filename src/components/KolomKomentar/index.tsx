"use client";
import { IconLine } from "@/app/assets/icons";
import { KomentarType } from "@/types/KomentarType";
import React, { useState } from "react";
import CommentItem from "./ItemKomentar";
import { TotalKomentar } from "@/utils/TotalKomentar";
import { fetchWithToken } from "@/service/fetchWithToken";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function KolomKomentar({
  listKomentar,
  artikelSlug,
}: {
  listKomentar: KomentarType[];
  artikelSlug: string;
}) {
  const [comments, setComments] = useState<KomentarType[]>(listKomentar);
  const [newCommentText, setNewCommentText] = useState("");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [visibleComments, setVisibleComments] = useState(5);
  const { data: session } = useSession();
  const router = useRouter();

  const createComment = async (formData: FormData): Promise<KomentarType> => {
    try {
      const response = await fetchWithToken("/komentar-create", {
        method: "POST",
        body: formData,
      });

      window.location.reload();

      return response;
    } catch (error) {
      console.error("Error creating comment:", error);
      throw error;
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent, parentId?: number) => {
    e.preventDefault();

    if (!session) {
      router.push("/signin");
      return;
    }

    if (isSubmitting) return;
    setIsSubmitting(true);

    let commentText = newCommentText.trim();
    if (!commentText) {
      alert("Komentar tidak boleh kosong!");
      setIsSubmitting(false);
      return;
    }

    if (parentId) {
      const parentComment = comments.find((c) => c.id === parentId);
      if (parentComment) {
        commentText = `@${parentComment.user.name} ${commentText}`;
      }
    }

    const formData = new FormData();
    formData.append("content", commentText);
    formData.append("artikel_slug", artikelSlug);
    if (parentId) {
      formData.append("parent_id", parentId.toString());
    }

    try {
      const newComment = await createComment(formData);

      setComments((prevComments) => {
        if (parentId) {
          return prevComments.map((comment) => {
            if (comment.id === parentId) {
              return {
                ...comment,
                child: comment.child
                  ? [...comment.child, newComment]
                  : [newComment],
              };
            }
            return comment;
          });
        }
        return [...prevComments, newComment];
      });

      setNewCommentText("");
      setReplyingTo(null);
    } catch (error) {
      alert("Gagal mengirim komentar. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const topLevelComments = comments.filter((comment) => !comment.parent_id);
  const totalCommentCount = TotalKomentar(topLevelComments);

  const handleLoadMoreComments = () => {
    setVisibleComments((prev) => prev + 5);
  };

  return (
    <div className="mt-4 mx-4 lg:mx-0" id="kolom-komentar">
      <div className="bg-slate-50 rounded p-4">
        <h2 className="font-semibold text-primary text-xl">
          {totalCommentCount} Komentar
        </h2>
        <IconLine />
        <div className="mt-4">
          <form onSubmit={(e) => handleCommentSubmit(e)}>
            <input
              type="text"
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              placeholder="Tulis komentar..."
              className="border w-full text-sm min-h-14 border-gray-300 px-4 py-2 focus:border-primary focus:outline-none"
              required
            />
            <div className="flex">
              <button
                type="submit"
                className="bg-primary text-white ms-auto text-sm px-4 mt-2 py-1"
              >
                Kirim
              </button>
            </div>
          </form>

          <div className="mt-4">
            {topLevelComments
              .slice(0, visibleComments)
              .map((comment, index) => (
                <CommentItem
                  key={index}
                  comment={comment}
                  onReply={(commentId) => {
                    setReplyingTo(commentId);
                  }}
                  onSubmitReply={async (parentId, replyText) => {
                    await handleCommentSubmit(
                      { preventDefault: () => {} } as React.FormEvent,
                      parentId
                    );
                  }}
                />
              ))}
            {topLevelComments.length > visibleComments && (
              <div className="flex justify-center">
                <button
                  onClick={handleLoadMoreComments}
                  className="text-primary  mt-2  mb-2 text-sm hover:underline"
                >
                  Lihat Komentar Lainnya
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

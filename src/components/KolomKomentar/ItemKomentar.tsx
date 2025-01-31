"use client";
import { KomentarType } from "@/types/KomentarType";
import { formatDateSecond } from "@/utils/FormatDate";
import Image from "next/image";
import React, { useState } from "react";

interface CommentItemProps {
  comment: KomentarType;
  onReply?: (commentId: number) => void;
  onSubmitReply?: (parentId: number, replyText: string) => Promise<void>;
}

export default function CommentItem({
  comment,
  onReply,
  onSubmitReply,
}: CommentItemProps) {
  const [showReplies, setShowReplies] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleReplyClick = () => {
    setIsReplying(true);
    onReply?.(comment.id);
  };

  const handleCancelReply = () => {
    setIsReplying(false);
    setReplyText("");
  };

  const handleSubmitReply = async () => {
    if (!onSubmitReply || !replyText.trim()) return;

    try {
      await onSubmitReply(comment.id, replyText);
      setIsReplying(false);
      setReplyText("");
    } catch (error) {
      console.error("Gagal mengirim balasan:", error);
    }
  };

  return (
    <div className="mt-4">
      <div className="flex mt-2 gap-2">
        <Image
          src={comment.user?.image_url || "/user.jpg"}
          width={100}
          height={100}
          alt={comment.user?.name || "User Avatar"}
          className={`${
            comment.parent_id ? "w-9 h-9" : "w-12 h-12"
          } rounded-full object-cover`}
        />

        <div className="w-full">
          <p
            className={`${
              comment.parent_id ? "text-xs" : "text-sm"
            } font-semibold`}
          >
            {comment.user?.name}
          </p>
          <p className={`${comment.parent_id ? "text-[11px]" : "text-xs"}`}>
            {comment.content}
          </p>

          <div className="flex items-center gap-2 text-[10px] font-medium mt-1 text-gray-400">
            <p>{formatDateSecond(comment.created_at)}</p>
            <p>
              ({comment.jumlah_like > 99 ? "99+" : comment.jumlah_like}) Suka
            </p>
            <button onClick={handleReplyClick} className="hover:underline">
              Balasan
            </button>
            <p>Laporkan</p>
          </div>

          {isReplying && (
            <div className="mt-2 ml-4">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Tulis balasan..."
                className="border w-full text-xs min-h-10 border-gray-300 px-2 py-1 focus:border-primary focus:outline-none"
              />
              <div className="flex gap-2 mt-1">
                <button
                  onClick={handleCancelReply}
                  className="text-xs text-gray-500 hover:underline"
                >
                  Batal
                </button>
                <button
                  onClick={handleSubmitReply}
                  className="bg-primary text-white text-xs px-2 py-1 rounded"
                  disabled={!replyText.trim()}
                >
                  Kirim
                </button>
              </div>
            </div>
          )}

          {comment.child && comment.child.length > 0 && (
            <div>
              {!showReplies && (
                <button
                  onClick={() => setShowReplies(true)}
                  className="text-primary text-xs font-medium mt-2 hover:underline"
                >
                  Lihat {comment.child.length} Balasan
                </button>
              )}

              {showReplies && (
                <>
                  <button
                    onClick={() => setShowReplies(false)}
                    className="text-primary text-xs font-medium mt-2 hover:underline"
                  >
                    Sembunyikan Balasan
                  </button>
                  <div className="ml-4 mt-2">
                    {comment.child.map((childComment) => (
                      <CommentItem
                        key={childComment.id}
                        comment={childComment}
                        onSubmitReply={onSubmitReply}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

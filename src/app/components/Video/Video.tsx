import React from "react";

export default function VideoContent({ listVideo }: { listVideo: string[] }) {
  const getVideoId = (url: string) => {
    let videoId = "";
    if (url.includes("youtu.be")) {
      // Handle short YouTube URL
      videoId = url.split("youtu.be/")[1]?.split("?")[0];
    } else if (url.includes("youtube.com")) {
      // Handle standard YouTube URL
      videoId = url.split("v=")[1]?.split("&")[0];
    }
    return videoId;
  };
  return (
    <>
      <div className="bg-gray-50 p-4 mt-4">
        <h1 className="font-bold text-xl text-primary">Video</h1>
        <div className="flex gap-3 overflow-x-auto scrollbar mt-4">
          {listVideo.map((link, index) => {
            const videoId = getVideoId(link);
            if (!videoId) return null;
            return (
              <iframe
                key={index}
                className="w-[400px] h-[200px] rounded-md"
                src={`https://www.youtube.com/embed/${videoId}`}
                title={`YouTube video ${index + 1}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

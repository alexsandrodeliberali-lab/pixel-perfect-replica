import { useState } from "react";
import { youtubeId } from "@/lib/landing";

/**
 * Interactive 16:9 VSL stage that renders the custom thumbnail as a single
 * accessible trigger and mounts the YouTube iframe only upon visitor action.
 */
export function VslPlayer({ url, thumbnail, onStart }: { url: string | null; thumbnail: string | null; onStart: () => void }) {
  const id = youtubeId(url);
  const [playing, setPlaying] = useState(false);

  const handleStart = () => {
    if (!id) return;
    setPlaying(true);
    onStart();
  };

  return (
    <div className="video-stage">
      {playing && id ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&playsinline=1&rel=0`}
          title="Inteligência Comportamental — vídeo de apresentação"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          className="video-trigger"
          disabled={!id}
          aria-label="Reproduzir vídeo de apresentação"
          onClick={handleStart}
        >
          {thumbnail && (
            <img
              className="video-thumbnail"
              src={thumbnail}
              alt=""
              width="1280"
              height="720"
              loading="eager"
              decoding="async"
            />
          )}
        </button>
      )}
    </div>
  );
}
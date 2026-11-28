import { useState } from "react";
import { Play } from "lucide-react";
import { youtubeId } from "@/lib/landing";

interface VslPlayerProps {
  url: string | null;
  thumbnail: string | null;
  hasEmbeddedPlayIcon?: boolean;
  onStart: () => void;
}

/**
 * Interactive 16:9 VSL stage that displays the thumbnail edge-to-edge without
 * pillarbox/letterbox gaps, shows a single centered play affordance when needed,
 * and mounts the YouTube iframe only after visitor interaction.
 */
export function VslPlayer({
  url,
  thumbnail,
  hasEmbeddedPlayIcon = false,
  onStart,
}: VslPlayerProps) {
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
          {!hasEmbeddedPlayIcon && (
            <span className="video-play-badge" aria-hidden="true">
              <Play size={22} strokeWidth={1.75} className="video-play-icon" />
            </span>
          )}
        </button>
      )}
    </div>
  );
}

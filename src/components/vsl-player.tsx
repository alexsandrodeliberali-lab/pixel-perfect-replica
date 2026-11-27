import { useState } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { youtubeId } from "@/lib/landing";

export function VslPlayer({ url, thumbnail, onStart }: { url: string | null; thumbnail: string | null; onStart: () => void }) {
  const id = youtubeId(url);
  const [playing, setPlaying] = useState(false);

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
        <>
          {thumbnail && <img className="video-thumbnail" src={thumbnail} alt="" width="480" height="360" />}
          <div className="video-cover">
            <Button variant="play" size="play" disabled={!id} aria-label="Reproduzir vídeo de apresentação" onClick={() => { setPlaying(true); onStart(); }}>
              <Play aria-hidden="true" className="fill-current" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
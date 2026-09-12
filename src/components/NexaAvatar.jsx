import { useEffect, useMemo, useState } from "react";

import idle from "../assets/nexa/nexa-idle.png";
import speak1 from "../assets/nexa/nexa-speak-1.png";
import speak2 from "../assets/nexa/nexa-speak-2.png";
import speak3 from "../assets/nexa/nexa-speak-3.png";

import listening from "../assets/nexa/nexa-listening.png";
import thinking from "../assets/nexa/nexa-thinking.png";
import happy from "../assets/nexa/nexa-happy.png";
import encourage from "../assets/nexa/nexa-encourage.png";
import celebrate from "../assets/nexa/nexa-celebrate.png";
import confused from "../assets/nexa/nexa-confused.png";

function NexaAvatar({
  state = "idle",
  className = "",
  alt = "Nexa",
}) {
  const speakingFrames = useMemo(
    () => [speak1, speak2, speak3, speak2],
    []
  );

  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    if (state !== "speaking") {
      setFrameIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setFrameIndex((currentIndex) =>
        (currentIndex + 1) % speakingFrames.length
      );
    }, 180);

    return () => clearInterval(interval);
  }, [state, speakingFrames]);

  const getImage = () => {
    switch (state) {
      case "speaking":
        return speakingFrames[frameIndex];

      case "listening":
        return listening;

      case "thinking":
        return thinking;

      case "happy":
        return happy;

      case "encourage":
        return encourage;

      case "celebrate":
        return celebrate;

      case "confused":
        return confused;

      case "idle":
      default:
        return idle;
    }
  };

  return (
    <img
      src={getImage()}
      alt={alt}
      className={className}
    />
  );
}

export default NexaAvatar;
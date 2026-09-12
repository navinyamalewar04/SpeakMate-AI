import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import NexaAvatar from "../components/NexaAvatar";
import "./Practice.css";

const challenges = {
  "Fun & Random": [
    "If you could have any superpower for one day, what would you choose and why?",
    "If animals could talk, which animal do you think would be the funniest?",
    "What would you do if you suddenly won one million dollars?",
    "If you could live inside any movie world, which one would you choose?",
    "What is the funniest thing that has happened to you recently?",
    "If you could swap lives with someone for one day, who would it be?",
  ],

  "Movies & TV": [
    "Tell me about a movie or TV show you really enjoyed. What made it interesting?",
    "Who is your favorite movie character and why?",
    "What movie could you watch again and again without getting bored?",
    "Do you prefer watching movies at home or in a cinema? Why?",
    "If you could change the ending of one movie, which movie would you choose?",
    "What makes a movie memorable for you?",
  ],

  "Coding & Tech": [
    "Tell me about a technology or programming language you find interesting and why.",
    "What programming language would you recommend to a beginner?",
    "How do you think artificial intelligence will change our daily lives?",
    "Tell me about a project you would like to build someday.",
    "What is one technology you use every day that you cannot live without?",
    "Do you think AI will create more jobs or replace more jobs? Explain your opinion.",
  ],

  Knowledge: [
    "Tell me about something interesting you learned recently.",
    "What is one fact that surprised you when you first learned it?",
    "Which subject do you enjoy learning the most and why?",
    "If you could become an expert in one field instantly, what would it be?",
    "What is one useful skill everyone should learn?",
    "Tell me about something you learned outside school or college.",
  ],

  "Life & Society": [
    "What is one small change that could make society better?",
    "Do you think social media has improved people's lives? Why or why not?",
    "What qualities make someone a good friend?",
    "What is one problem young people face today?",
    "Do you think people spend too much time on their phones?",
    "What is more important: success or happiness? Explain your opinion.",
  ],

  "Deep Talks": [
    "What does success mean to you, and do you think its meaning changes with time?",
    "Do you think failure is necessary for success?",
    "What is one lesson life has taught you so far?",
    "Do you think people can completely change their personality?",
    "What is more important in life: money, freedom, or peace?",
    "If you could give one piece of advice to your younger self, what would it be?",
  ],

  General: [
    "Tell me about something you enjoy doing in your free time.",
    "Describe your typical day.",
    "Tell me about someone you admire.",
    "What is one goal you want to achieve this year?",
    "Describe your favorite place.",
    "What is something you want to become better at?",
  ],
};

const surpriseChallenges =
  Object.values(challenges).flat();

function Practice() {
  const navigate = useNavigate();

  const level =
    localStorage.getItem("englishLevel") ||
    "Beginner";

  const topic =
    localStorage.getItem("practiceTopic") ||
    "General";

  const currentList =
    topic === "Surprise Me"
      ? surpriseChallenges
      : challenges[topic] || challenges.General;

  const [isListening, setIsListening] =
    useState(false);

  const [isSpeaking, setIsSpeaking] =
    useState(false);

  const [transcript, setTranscript] =
    useState("");

  const isCompareRetry =
    localStorage.getItem("retryForCompare") ===
    "true";

  const [challenge, setChallenge] =
    useState(() => {
      const wantsNewChallenge =
        localStorage.getItem(
          "requestNewChallenge"
        ) === "true";

      const retryChallenge =
        localStorage.getItem(
          "compareChallenge"
        );

      const lastChallenge =
        localStorage.getItem(
          "lastChallenge"
        );

      if (
        isCompareRetry &&
        retryChallenge
      ) {
        return retryChallenge;
      }

      if (wantsNewChallenge) {
        const availableChallenges =
          currentList.filter(
            (item) =>
              item !== lastChallenge
          );

        const listToUse =
          availableChallenges.length > 0
            ? availableChallenges
            : currentList;

        return listToUse[
          Math.floor(
            Math.random() *
              listToUse.length
          )
        ];
      }

      if (
        lastChallenge &&
        currentList.includes(
          lastChallenge
        )
      ) {
        return lastChallenge;
      }

      return currentList[0];
    });

  useEffect(() => {
    localStorage.removeItem(
      "requestNewChallenge"
    );
  }, []);

  const getPreferredVoice = () => {
    const voices =
      window.speechSynthesis.getVoices();

    if (!voices.length) {
      return null;
    }

    const preferredNames = [
      "Microsoft Aria",
      "Microsoft Jenny",
      "Microsoft Zira",
      "Google US English",
      "Samantha",
      "Karen",
      "Victoria",
    ];

    for (const name of preferredNames) {
      const voice = voices.find(
        (item) =>
          item.name
            .toLowerCase()
            .includes(
              name.toLowerCase()
            )
      );

      if (voice) {
        return voice;
      }
    }

    return (
      voices.find((voice) =>
        voice.lang
          .toLowerCase()
          .startsWith("en-us")
      ) ||
      voices.find((voice) =>
        voice.lang
          .toLowerCase()
          .startsWith("en")
      ) ||
      voices[0]
    );
  };

  const speakText = (text) => {
    if (
      !("speechSynthesis" in window)
    ) {
      alert(
        "Text-to-speech is not supported in this browser."
      );
      return;
    }

    window.speechSynthesis.cancel();

    const speech =
      new SpeechSynthesisUtterance(
        text
      );

    const selectedVoice =
      getPreferredVoice();

    if (selectedVoice) {
      speech.voice =
        selectedVoice;
    }

    speech.lang = "en-US";
    speech.rate = 0.92;
    speech.pitch = 1.12;
    speech.volume = 1;

    speech.onstart = () => {
      setIsSpeaking(true);
    };

    speech.onend = () => {
      setIsSpeaking(false);
    };

    speech.onerror = () => {
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(
      speech
    );
  };

  useEffect(() => {
    const loadVoices = () => {
      window.speechSynthesis.getVoices();
    };

    loadVoices();

    window.speechSynthesis.onvoiceschanged =
      loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged =
        null;
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      speakText(challenge);
    }, 700);

    return () => {
      clearTimeout(timer);

      window.speechSynthesis.cancel();
    };
  }, [challenge]);

  const startListening = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Speech recognition is not supported in this browser. Please use Chrome or Edge."
      );
      return;
    }

    const recognition =
      new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.interimResults =
      false;
    recognition.continuous = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (
      event
    ) => {
      const spokenText =
        event.results[0][0]
          .transcript;

      setTranscript(spokenText);
    };

    recognition.onerror = (
      event
    ) => {
      console.error(
        "Speech recognition error:",
        event.error
      );

      setIsListening(false);

      if (
        event.error !== "no-speech"
      ) {
        alert(
          "Something went wrong. Please try speaking again."
        );
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const retryAnswer = () => {
    setTranscript("");
    startListening();
  };

  const repeatChallenge = () => {
    speakText(challenge);
  };

  const getNextChallenge = () => {
    window.speechSynthesis.cancel();

    setIsSpeaking(false);
    setTranscript("");

    /*
      Leaving Compare Mode because the
      learner chose a different challenge.
    */
    localStorage.removeItem(
      "retryForCompare"
    );

    localStorage.removeItem(
      "compareChallenge"
    );

    localStorage.removeItem(
      "previousAnswer"
    );

    localStorage.removeItem(
      "previousFeedback"
    );

    if (currentList.length <= 1) {
      return;
    }

    const availableChallenges =
      currentList.filter(
        (item) =>
          item !== challenge
      );

    const nextChallenge =
      availableChallenges[
        Math.floor(
          Math.random() *
            availableChallenges.length
        )
      ];

    setChallenge(nextChallenge);
  };

  const handleFeedback = () => {
    if (!transcript.trim()) {
      alert(
        "Please answer Nexa's challenge first 🎤"
      );

      return;
    }

    localStorage.setItem(
      "lastAnswer",
      transcript.trim()
    );

    localStorage.setItem(
      "lastChallenge",
      challenge
    );

    /*
      If this attempt came from Retry &
      Compare, keep retryForCompare=true.

      Feedback.jsx will use it to compare
      this new attempt with the previous one.
    */

    navigate("/feedback");
  };

  const handleChangeTopic = () => {
    localStorage.removeItem(
      "retryForCompare"
    );

    localStorage.removeItem(
      "compareChallenge"
    );

    localStorage.removeItem(
      "previousAnswer"
    );

    localStorage.removeItem(
      "previousFeedback"
    );

    navigate("/topics");
  };

  let nexaState = "idle";

  if (isSpeaking) {
    nexaState = "speaking";
  } else if (isListening) {
    nexaState = "listening";
  }

  return (
    <div className="practice-page">
      <div className="practice-wrapper">

        <div className="practice-nexa-area">
          <NexaAvatar
            state={nexaState}
            className="practice-nexa"
          />
        </div>

        <div className="practice-card">

          <div className="practice-top">
            <h1>
              {isCompareRetry
                ? "Let's Try Again 🎯"
                : "Let's Practice 🎙️"}
            </h1>

            <p>
              {isCompareRetry
                ? "Try the same challenge again using Nexa's feedback. We'll compare your improvement."
                : "Speak naturally. Don't worry about mistakes — Nexa will help you improve."}
            </p>
          </div>

          <div className="practice-meta">
            <span className="practice-pill">
              🎯 {level}
            </span>

            <span className="practice-pill">
              💬 {topic}
            </span>

            {isCompareRetry && (
              <span className="practice-pill">
                📈 Improvement Attempt
              </span>
            )}
          </div>

          <div className="challenge-box">

            <div className="challenge-title">
              🐰 Nexa's Challenge
            </div>

            <p>{challenge}</p>

            <div className="challenge-actions">

              <button
                className="repeat-challenge-button"
                onClick={
                  repeatChallenge
                }
                disabled={
                  isSpeaking
                }
              >
                {isSpeaking
                  ? "🔊 Nexa is speaking..."
                  : "🔊 Hear Nexa"}
              </button>

              {!isCompareRetry && (
                <button
                  className="next-challenge-button"
                  onClick={
                    getNextChallenge
                  }
                  disabled={
                    isSpeaking
                  }
                >
                  🎲 Next Challenge
                </button>
              )}

            </div>

          </div>

          {isCompareRetry && (
            <div className="answer-box">
              <div className="answer-title">
                💡 Improve Your Previous Answer
              </div>

              <p>
                Use Nexa's corrections and try
                expressing the same idea more
                clearly and naturally.
              </p>
            </div>
          )}

          <button
            className="speak-button"
            onClick={
              startListening
            }
            disabled={
              isListening
            }
          >
            {isListening
              ? "🎧 Listening... Speak now"
              : isCompareRetry
              ? "🎤 Speak Again"
              : "🎤 Start Speaking"}
          </button>

          {isSpeaking && (
            <div className="listening-text">
              🔊 Nexa is speaking...
            </div>
          )}

          {isListening && (
            <div className="listening-text">
              🎧 Nexa is listening...
            </div>
          )}

          {transcript && (
            <div className="answer-box">

              <div className="answer-title">
                🗣️ Your Answer
              </div>

              <p>{transcript}</p>

            </div>
          )}

          {transcript && (
            <div className="practice-actions">

              <button
                className="retry-button"
                onClick={
                  retryAnswer
                }
              >
                🔄 Record Again
              </button>

              <button
                className="feedback-button"
                onClick={
                  handleFeedback
                }
              >
                {isCompareRetry
                  ? "✨ Compare My Improvement"
                  : "✨ Get AI Feedback"}
              </button>

            </div>
          )}

          <button
            className="change-topic"
            onClick={
              handleChangeTopic
            }
          >
            ← Change Topic
          </button>

        </div>

      </div>
    </div>
  );
}

export default Practice;
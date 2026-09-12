import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { supabase } from "../services/supabase";
import NexaAvatar from "../components/NexaAvatar";

import "./Feedback.css";

function Feedback() {
  const navigate = useNavigate();

  const answer =
    localStorage.getItem("lastAnswer") || "";

  const challenge =
    localStorage.getItem("lastChallenge") || "";

  const level =
    localStorage.getItem("englishLevel") || "Beginner";

  const topic =
    localStorage.getItem("practiceTopic") || "General";

  const isCompareRetry =
    localStorage.getItem("retryForCompare") === "true";

  const previousAnswer =
    localStorage.getItem("previousAnswer") || "";

  const previousFeedbackRaw =
    localStorage.getItem("previousFeedback");

  let previousFeedback = null;

  try {
    previousFeedback = previousFeedbackRaw
      ? JSON.parse(previousFeedbackRaw)
      : null;
  } catch {
    previousFeedback = null;
  }

  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);

  const hasSpokenFeedback = useRef(false);
  const hasStartedSaving = useRef(false);

  const getPreferredVoice = () => {
    if (!("speechSynthesis" in window)) {
      return null;
    }

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
      const voice = voices.find((item) =>
        item.name
          .toLowerCase()
          .includes(name.toLowerCase())
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

  const getImprovement = () => {
    if (
      !isCompareRetry ||
      !previousFeedback ||
      !feedback
    ) {
      return null;
    }

    const previousScore =
      previousFeedback.overallScore ?? 0;

    const currentScore =
      feedback.overallScore ?? 0;

    return currentScore - previousScore;
  };

  const speakFeedback = (feedbackData) => {
    if (
      !feedbackData ||
      !("speechSynthesis" in window)
    ) {
      return;
    }

    window.speechSynthesis.cancel();

    const score =
      feedbackData.overallScore || 0;

    let opening = "Good effort!";

    if (score >= 85) {
      opening = "Excellent work!";
    } else if (score >= 65) {
      opening = "Nice attempt!";
    }

    let comparisonText = "";

    if (
      isCompareRetry &&
      previousFeedback
    ) {
      const difference =
        score -
        (previousFeedback.overallScore || 0);

      if (difference > 0) {
        comparisonText =
          ` You improved by ${difference} points.`;
      } else if (difference === 0) {
        comparisonText =
          " Your score stayed the same, so keep refining your answer.";
      } else {
        comparisonText =
          " This attempt scored a little lower, but that's okay. Focus on Nexa's new feedback and try again.";
      }
    }

    const tip =
      feedbackData.nexaTip ||
      "Keep practicing and try to speak in complete sentences.";

    const speechText =
      `${opening} You scored ${score} out of 100.${comparisonText} ${tip}`;

    const speech =
      new SpeechSynthesisUtterance(
        speechText
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
      if ("speechSynthesis" in window) {
        window.speechSynthesis.getVoices();
      }
    };

    loadVoices();

    if ("speechSynthesis" in window) {
      window.speechSynthesis.onvoiceschanged =
        loadVoices;
    }

    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();

        window.speechSynthesis.onvoiceschanged =
          null;
      }
    };
  }, []);

  useEffect(() => {
    const getFeedback = async () => {
      if (!answer) {
        setErrorMessage(
          "No speaking answer was found. Please try a challenge first."
        );

        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setErrorMessage("");

        const { data, error } =
          await supabase.functions.invoke(
            "analyze-speech",
            {
              body: {
                transcript: answer,
                level,
                topic,
                challenge,
              },
            }
          );

        if (error) {
          console.error(
            "Supabase function error:",
            error
          );

          throw new Error(
            "Nexa couldn't analyze your answer right now."
          );
        }

        if (data?.error) {
          throw new Error(data.error);
        }

        setFeedback(data);
      } catch (error) {
        console.error(
          "AI feedback error:",
          error
        );

        setErrorMessage(
          "AI feedback is temporarily unavailable. Please try again in a moment."
        );
      } finally {
        setLoading(false);
      }
    };

    getFeedback();
  }, [answer, challenge, level, topic]);

  useEffect(() => {
    const savePracticeHistory = async () => {
      if (
        !feedback ||
        hasStartedSaving.current
      ) {
        return;
      }

      const feedbackSignature =
        `${challenge}|${answer}|${feedback.overallScore}`;

      const savedSignature =
        localStorage.getItem(
          "lastSavedFeedbackSignature"
        );

      const savingSignature =
        localStorage.getItem(
          "savingFeedbackSignature"
        );

      if (
        savedSignature === feedbackSignature ||
        savingSignature === feedbackSignature
      ) {
        return;
      }

      hasStartedSaving.current = true;

      localStorage.setItem(
        "savingFeedbackSignature",
        feedbackSignature
      );

      try {
        const {
          data: userData,
          error: userError,
        } =
          await supabase.auth.getUser();

        if (userError) {
          console.error(
            "User error:",
            userError
          );

          throw userError;
        }

        const user =
          userData?.user;

        if (!user) {
          console.log(
            "No logged-in user found. History was not saved."
          );

          localStorage.removeItem(
            "savingFeedbackSignature"
          );

          return;
        }

        const { error } =
          await supabase
            .from("practice_history")
            .insert({
              user_id: user.id,
              challenge,
              answer,
              topic,
              level,
              overall_score:
                feedback.overallScore ?? null,
              grammar_score:
                feedback.grammar?.score ?? null,
              vocabulary_score:
                feedback.vocabulary?.score ?? null,
              fluency_score:
                feedback.fluency?.score ?? null,
              clarity_score:
                feedback.clarity?.score ?? null,
              nexa_tip:
                feedback.nexaTip || null,
              better_answer:
                feedback.betterAnswer || null,
            });

        if (error) {
          console.error(
            "History save error:",
            error
          );

          localStorage.removeItem(
            "savingFeedbackSignature"
          );

          hasStartedSaving.current = false;
          return;
        }

        localStorage.setItem(
          "lastSavedFeedbackSignature",
          feedbackSignature
        );

        localStorage.removeItem(
          "savingFeedbackSignature"
        );

        console.log(
          "Practice history saved successfully."
        );
      } catch (error) {
        console.error(
          "Could not save practice history:",
          error
        );

        localStorage.removeItem(
          "savingFeedbackSignature"
        );

        hasStartedSaving.current = false;
      }
    };

    savePracticeHistory();
  }, [
    feedback,
    answer,
    challenge,
    level,
    topic,
  ]);

  useEffect(() => {
    if (
      feedback &&
      !loading &&
      !errorMessage &&
      !hasSpokenFeedback.current
    ) {
      hasSpokenFeedback.current = true;

      const timer = setTimeout(() => {
        speakFeedback(feedback);
      }, 700);

      return () =>
        clearTimeout(timer);
    }
  }, [
    feedback,
    loading,
    errorMessage,
  ]);

  const getNexaState = () => {
    if (loading) {
      return "thinking";
    }

    if (errorMessage) {
      return "confused";
    }

    if (isSpeaking) {
      return "speaking";
    }

    const score =
      feedback?.overallScore || 0;

    if (
      isCompareRetry &&
      previousFeedback &&
      score >
        (previousFeedback.overallScore || 0)
    ) {
      return "celebrate";
    }

    if (score >= 85) {
      return "celebrate";
    }

    if (score >= 65) {
      return "happy";
    }

    return "encourage";
  };

  const getHeading = () => {
    if (!feedback) {
      return "Let's see how you did!";
    }

    if (
      isCompareRetry &&
      previousFeedback
    ) {
      const difference =
        feedback.overallScore -
        previousFeedback.overallScore;

      if (difference > 0) {
        return `You improved by ${difference} points! 🎉`;
      }

      if (difference === 0) {
        return "Nice retry — keep refining! ✨";
      }

      return "Every retry teaches you something 💪";
    }

    const score =
      feedback.overallScore || 0;

    if (score >= 85) {
      return "Excellent work! 🎉";
    }

    if (score >= 65) {
      return "Nice attempt! ✨";
    }

    return "Good effort! Keep going 💪";
  };

  const prepareNextAttempt = () => {
    localStorage.removeItem(
      "lastSavedFeedbackSignature"
    );

    localStorage.removeItem(
      "savingFeedbackSignature"
    );
  };

  const clearCompareMode = () => {
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
  };

  const stopNexaSpeaking = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    setIsSpeaking(false);
  };

  const handleRetryAndCompare = () => {
    if (!feedback) {
      return;
    }

    stopNexaSpeaking();
    prepareNextAttempt();

    localStorage.setItem(
      "retryForCompare",
      "true"
    );

    localStorage.setItem(
      "compareChallenge",
      challenge
    );

    localStorage.setItem(
      "previousAnswer",
      answer
    );

    localStorage.setItem(
      "previousFeedback",
      JSON.stringify(feedback)
    );

    navigate("/practice");
  };

  const handleTryAgain = () => {
    stopNexaSpeaking();
    prepareNextAttempt();

    navigate("/practice");
  };

  const handleNewChallenge = () => {
    stopNexaSpeaking();
    prepareNextAttempt();
    clearCompareMode();

    localStorage.setItem(
      "requestNewChallenge",
      "true"
    );

    navigate("/practice");
  };

  const handleViewProgress = () => {
    stopNexaSpeaking();
    clearCompareMode();

    navigate("/progress");
  };

  const handleHearFeedback = () => {
    if (feedback) {
      speakFeedback(feedback);
    }
  };

  const improvement =
    getImprovement();

  if (loading) {
    return (
      <div className="feedback-page">
        <div className="feedback-wrapper">

          <div className="feedback-nexa-area">
            <NexaAvatar
              state="thinking"
              className="feedback-nexa"
            />
          </div>

          <div className="feedback-card">

            <div className="feedback-heading">
              <span className="feedback-label">
                ✨ Nexa's Feedback
              </span>

              <h1>
                Nexa is thinking... 🧠
              </h1>

              <p>
                I'm analyzing your grammar,
                vocabulary, fluency and clarity.
              </p>
            </div>

            <div className="feedback-section">
              <p className="waiting-text">
                Please wait a few seconds while
                Nexa prepares your feedback.
              </p>
            </div>

          </div>

        </div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="feedback-page">
        <div className="feedback-wrapper">

          <div className="feedback-nexa-area">
            <NexaAvatar
              state="confused"
              className="feedback-nexa"
            />
          </div>

          <div className="feedback-card">

            <div className="feedback-heading">
              <span className="feedback-label">
                🐰 Nexa
              </span>

              <h1>
                Oops, something went wrong
              </h1>

              <p>
                {errorMessage}
              </p>
            </div>

            <div className="feedback-actions">

              <button
                className="try-again-btn"
                onClick={handleTryAgain}
              >
                🔄 Try Again
              </button>

              <button
                className="new-topic-btn"
                onClick={handleNewChallenge}
              >
                🎲 New Challenge
              </button>

              <button
                className="progress-btn"
                onClick={handleViewProgress}
              >
                📊 View Progress
              </button>

            </div>

          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="feedback-page">

      <div className="feedback-wrapper">

        <div className="feedback-nexa-area">
          <NexaAvatar
            state={getNexaState()}
            className="feedback-nexa"
          />
        </div>

        <div className="feedback-card">

          <div className="feedback-heading">

            <span className="feedback-label">
              {isCompareRetry
                ? "📈 Retry & Compare"
                : "✨ Nexa's Feedback"}
            </span>

            <h1>
              {getHeading()}
            </h1>

            <p>
              {isCompareRetry
                ? "Here's how your new attempt compares with your previous one."
                : "Here's how you can make your English sound clearer and more natural."}
            </p>

          </div>

          <div className="feedback-meta">

            <span>
              🎯 {level}
            </span>

            <span>
              💬 {topic}
            </span>

            <span>
              ⭐ Overall:{" "}
              {feedback?.overallScore ?? "--"}
              /100
            </span>

            {isCompareRetry &&
              previousFeedback && (
                <span>
                  📈{" "}
                  {improvement > 0
                    ? `+${improvement} points`
                    : improvement === 0
                    ? "Same score"
                    : `${improvement} points`}
                </span>
              )}

          </div>

          {isCompareRetry &&
            previousFeedback && (
              <div className="feedback-section better-answer">

                <div className="section-title">
                  📊 Previous vs New Attempt
                </div>

                <div className="score-grid">

                  <div className="score-card">
                    <span>Previous</span>

                    <strong>
                      {previousFeedback.overallScore ?? "--"}
                    </strong>

                    <small>
                      Your first attempt
                    </small>
                  </div>

                  <div className="score-card">
                    <span>New Score</span>

                    <strong>
                      {feedback?.overallScore ?? "--"}
                    </strong>

                    <small>
                      Your retry result
                    </small>
                  </div>

                  <div className="score-card">
                    <span>Change</span>

                    <strong>
                      {improvement > 0
                        ? `+${improvement}`
                        : improvement}
                    </strong>

                    <small>
                      Score difference
                    </small>
                  </div>

                  <div className="score-card">
                    <span>Result</span>

                    <strong>
                      {improvement > 0
                        ? "↑"
                        : improvement === 0
                        ? "→"
                        : "↓"}
                    </strong>

                    <small>
                      {improvement > 0
                        ? "Improved"
                        : improvement === 0
                        ? "Stable"
                        : "Keep practicing"}
                    </small>
                  </div>

                </div>

                {previousAnswer && (
                  <div className="correction-item">
                    <p>
                      <strong>
                        🗣️ Previous:
                      </strong>{" "}
                      {previousAnswer}
                    </p>

                    <p>
                      <strong>
                        ✨ New:
                      </strong>{" "}
                      {answer}
                    </p>
                  </div>
                )}

              </div>
            )}

          <div className="feedback-section answer-section">

            <div className="section-title">
              🗣️ Your Answer
            </div>

            <p>
              {answer}
            </p>

          </div>

          <div className="score-grid">

            <div className="score-card">
              <span>Grammar</span>

              <strong>
                {feedback?.grammar?.score ?? "--"}
              </strong>

              <small>
                {feedback?.grammar?.feedback}
              </small>
            </div>

            <div className="score-card">
              <span>Vocabulary</span>

              <strong>
                {feedback?.vocabulary?.score ?? "--"}
              </strong>

              <small>
                {feedback?.vocabulary?.feedback}
              </small>
            </div>

            <div className="score-card">
              <span>Fluency</span>

              <strong>
                {feedback?.fluency?.score ?? "--"}
              </strong>

              <small>
                {feedback?.fluency?.feedback}
              </small>
            </div>

            <div className="score-card">
              <span>Clarity</span>

              <strong>
                {feedback?.clarity?.score ?? "--"}
              </strong>

              <small>
                {feedback?.clarity?.feedback}
              </small>
            </div>

          </div>

          <div className="feedback-section">

            <div className="section-title">
              🔍 Mistakes & Corrections
            </div>

            {feedback?.corrections?.length > 0 ? (
              feedback.corrections.map(
                (correction, index) => (
                  <div
                    className="correction-item"
                    key={index}
                  >
                    <p>
                      <strong>
                        ❌ You said:
                      </strong>{" "}
                      {correction.original}
                    </p>

                    <p>
                      <strong>
                        ✅ Better:
                      </strong>{" "}
                      {correction.better}
                    </p>

                    <p>
                      <strong>
                        💡 Why:
                      </strong>{" "}
                      {correction.reason}
                    </p>
                  </div>
                )
              )
            ) : (
              <p>
                Great! Nexa didn't find any
                major corrections in this
                answer. 🎉
              </p>
            )}

          </div>

          <div className="feedback-section better-answer">

            <div className="section-title">
              ✨ A Better Way to Say It
            </div>

            <p>
              {feedback?.betterAnswer ||
                "Your answer already sounds good."}
            </p>

          </div>

          <div className="feedback-section">

            <div className="section-title">
              📚 Words to Learn
            </div>

            {feedback?.newWords?.length > 0 ? (
              feedback.newWords.map(
                (item, index) => (
                  <div
                    className="vocabulary-item"
                    key={index}
                  >
                    <p>
                      <strong>
                        {item.word}
                      </strong>
                      {" — "}
                      {item.meaning}
                    </p>

                    <small>
                      Example: {item.example}
                    </small>
                  </div>
                )
              )
            ) : (
              <p>
                Keep practicing to discover
                more vocabulary.
              </p>
            )}

          </div>

          <div className="feedback-section">

            <div className="section-title">
              🐰 Nexa's Tip
            </div>

            <p>
              {feedback?.nexaTip ||
                "Keep speaking every day — confidence comes with practice!"}
            </p>

          </div>

          <button
            className="speak-button"
            onClick={handleHearFeedback}
            disabled={isSpeaking}
          >
            {isSpeaking
              ? "🔊 Nexa is speaking..."
              : "🔊 Hear Nexa's Feedback"}
          </button>

          <div className="feedback-actions">

            <button
              className="try-again-btn"
              onClick={handleRetryAndCompare}
            >
              📈 Retry & Compare
            </button>

            <button
              className="new-topic-btn"
              onClick={handleNewChallenge}
            >
              🎲 New Challenge
            </button>

            <button
              className="progress-btn"
              onClick={handleViewProgress}
            >
              📊 View Progress
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Feedback;

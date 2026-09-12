import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import NexaAvatar from "../components/NexaAvatar";

import "./MaturityChallenge.css";

const scenarios = [
  {
    id: 1,
    category: "Friendship",
    difficulty: "Hard",
    question:
      "Your closest friend gets an opportunity you badly wanted. You feel jealous, but they are genuinely excited and expect you to celebrate with them. How would you handle your emotions and the friendship?",
  },
  {
    id: 2,
    category: "Relationships",
    difficulty: "Hard",
    question:
      "Someone you deeply care about starts becoming distant without explaining why. You feel hurt and ignored. What would you do before deciding whether to continue the relationship?",
  },
  {
    id: 3,
    category: "Conflict",
    difficulty: "Hard",
    question:
      "During an argument, you realize that you are partly wrong, but the other person has also spoken disrespectfully to you. How would you respond?",
  },
  {
    id: 4,
    category: "Responsibility",
    difficulty: "Hard",
    question:
      "Your team makes a serious mistake in a project. You could stay silent and probably avoid blame, but you know one of your decisions contributed to the problem. What would you do?",
  },
  {
    id: 5,
    category: "Career",
    difficulty: "Hard",
    question:
      "You receive a high-paying job offer that you do not enjoy, while another opportunity pays much less but strongly matches your long-term goals. How would you make the decision?",
  },
  {
    id: 6,
    category: "Family",
    difficulty: "Hard",
    question:
      "Your family strongly disagrees with an important life decision that you have carefully thought about. You respect them, but you also believe the choice is yours. How would you handle the situation?",
  },
  {
    id: 7,
    category: "Integrity",
    difficulty: "Very Hard",
    question:
      "You discover that a close friend cheated to achieve something important. Reporting it could seriously affect their future, but staying silent feels dishonest. What would you do and why?",
  },
  {
    id: 8,
    category: "Forgiveness",
    difficulty: "Very Hard",
    question:
      "Someone sincerely apologizes for hurting you, but their actions changed how you see them permanently. Do you think forgiving someone means you must trust them again? Explain how you would handle it.",
  },
  {
    id: 9,
    category: "Leadership",
    difficulty: "Very Hard",
    question:
      "You are leading a group where everyone wants a different solution. Your own idea seems best to you, but most members disagree. How would you make the final decision?",
  },
  {
    id: 10,
    category: "Self-Awareness",
    difficulty: "Very Hard",
    question:
      "Someone gives you criticism that feels unfair and personally insulting, but part of what they said may actually be true. How would you decide what to accept and what to ignore?",
  },
  {
    id: 11,
    category: "Money",
    difficulty: "Hard",
    question:
      "A close friend asks to borrow a large amount of money because they are struggling. You can afford to help, but you doubt they will be able to repay you. How would you decide what to do?",
  },
  {
    id: 12,
    category: "Social Pressure",
    difficulty: "Hard",
    question:
      "Everyone in your friend group is making fun of someone who is not present. Staying silent keeps you accepted by the group, but joining them feels wrong. How would you respond?",
  },
  {
    id: 13,
    category: "Failure",
    difficulty: "Hard",
    question:
      "You worked extremely hard toward an important goal but still failed, while someone who seemed less prepared succeeded. How would you deal with your disappointment without becoming bitter?",
  },
  {
    id: 14,
    category: "Boundaries",
    difficulty: "Very Hard",
    question:
      "Someone you care about repeatedly asks for your help, but supporting them is beginning to negatively affect your own studies, work, or mental peace. How would you set a boundary without abandoning them?",
  },
  {
    id: 15,
    category: "Integrity",
    difficulty: "Very Hard",
    question:
      "You discover information that could protect your own reputation, but revealing it would unfairly damage someone else's reputation. What factors would you consider before deciding whether to share it?",
  },
  {
    id: 16,
    category: "College",
    difficulty: "Hard",
    question:
      "A teammate contributes very little to an important college project but expects the same credit as everyone else. They are also your friend. How would you handle the situation fairly?",
  },
  {
    id: 17,
    category: "Relationships",
    difficulty: "Very Hard",
    question:
      "You care deeply about someone, but you gradually realize that staying close to them may be preventing both of you from growing. How would you decide whether love or attachment is enough reason to stay?",
  },
  {
    id: 18,
    category: "Leadership",
    difficulty: "Very Hard",
    question:
      "As a leader, you make a decision that produces a bad result even though the decision seemed reasonable with the information you had at the time. How would you take responsibility?",
  },
  {
    id: 19,
    category: "Family",
    difficulty: "Very Hard",
    question:
      "Two people in your family are in serious conflict and both expect you to take their side. You care about both of them. How would you respond without simply avoiding the situation?",
  },
  {
    id: 20,
    category: "Self-Awareness",
    difficulty: "Very Hard",
    question:
      "You realize that a person you strongly dislike has qualities that are similar to some of your own weaknesses. How would that realization affect the way you judge them and yourself?",
  },
  {
    id: 21,
    category: "Career",
    difficulty: "Very Hard",
    question:
      "You have spent years preparing for a career, but you begin to realize that you may have chosen it mainly because other people expected it from you. What would you do next?",
  },
  {
    id: 22,
    category: "Conflict",
    difficulty: "Very Hard",
    question:
      "Someone publicly accuses you of something you believe is unfair. You can immediately embarrass them by revealing information that proves your point. Would you do it? Explain your approach.",
  },
  {
    id: 23,
    category: "Responsibility",
    difficulty: "Very Hard",
    question:
      "You promised someone that you would keep an important secret, but you later realize that keeping it could seriously hurt another person. How would you decide whether breaking the promise is justified?",
  },
  {
    id: 24,
    category: "Friendship",
    difficulty: "Very Hard",
    question:
      "A close friend is making a major decision that you strongly believe is a mistake. They have already rejected your advice several times. How would you balance respecting their choice with caring about them?",
  },
  {
    id: 25,
    category: "Forgiveness",
    difficulty: "Very Hard",
    question:
      "Someone who seriously hurt you years ago has genuinely changed and now wants another chance to be part of your life. What would you consider before deciding whether to let them return?",
  },
  {
    id: 26,
    category: "Ethics",
    difficulty: "Very Hard",
    question:
      "You can achieve something extremely important to you by doing something technically allowed but clearly unfair to another person. Nobody would punish you for it. What would you do and why?",
  },
  {
    id: 27,
    category: "Social Pressure",
    difficulty: "Very Hard",
    question:
      "You publicly supported an opinion for a long time, but new information makes you believe you were wrong. Changing your position may make people call you hypocritical. How would you handle it?",
  },
  {
    id: 28,
    category: "Success",
    difficulty: "Very Hard",
    question:
      "You become significantly more successful than the friends who started alongside you, and you notice jealousy beginning to affect those relationships. How would you respond without hiding your success or becoming arrogant?",
  },
  {
    id: 29,
    category: "Empathy",
    difficulty: "Very Hard",
    question:
      "Someone treats you badly because they are going through a very difficult period in their life. How would you balance understanding their pain with holding them responsible for how they treat you?",
  },
  {
    id: 30,
    category: "Self-Awareness",
    difficulty: "Very Hard",
    question:
      "You achieve a goal you believed would make you happy, but after achieving it you still feel unsatisfied. How would you understand what happened and decide what to pursue next?",
  },
];

function getRandomScenarioIndex(currentIndex = -1) {
  if (scenarios.length <= 1) {
    return 0;
  }

  let nextIndex = currentIndex;

  while (nextIndex === currentIndex) {
    nextIndex = Math.floor(Math.random() * scenarios.length);
  }

  return nextIndex;
}

function MaturityChallenge() {
  const navigate = useNavigate();

  const recognitionRef = useRef(null);
  const answerRef = useRef("");
  const readTimerRef = useRef(null);

  const [scenarioIndex, setScenarioIndex] = useState(() =>
    getRandomScenarioIndex()
  );

  const [answer, setAnswer] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isNexaSpeaking, setIsNexaSpeaking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);

  const [nexaState, setNexaState] = useState("idle");

  const [message, setMessage] = useState(
    "Take your time. There is no perfect answer — I want to understand how you think."
  );

  const scenario = useMemo(
    () => scenarios[scenarioIndex],
    [scenarioIndex]
  );

  useEffect(() => {
    answerRef.current = answer;
  }, [answer]);

  const stopNexaSpeech = () => {
    if (readTimerRef.current) {
      clearTimeout(readTimerRef.current);
      readTimerRef.current = null;
    }

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    setIsNexaSpeaking(false);
  };

  const readScenario = (scenarioToRead = scenario) => {
    if (
      !scenarioToRead ||
      !("speechSynthesis" in window)
    ) {
      setMessage(
        "Voice reading is not supported in this browser, but you can read the situation above."
      );
      return;
    }

    stopNexaSpeech();

    try {
      if (recognitionRef.current && isListening) {
        recognitionRef.current.stop();
      }
    } catch {
      // Recognition may already be stopped.
    }

    setIsListening(false);

    const speech = new SpeechSynthesisUtterance(
      `Here is your ${scenarioToRead.difficulty.toLowerCase()} ${scenarioToRead.category} challenge. ${scenarioToRead.question}`
    );

    speech.lang = "en-US";
    speech.rate = 0.92;
    speech.pitch = 1.05;
    speech.volume = 1;

    const voices = window.speechSynthesis.getVoices();

    const preferredVoice =
      voices.find(
        (voice) =>
          voice.lang.startsWith("en") &&
          /female|samantha|zira|aria|jenny|google us english/i.test(
            voice.name
          )
      ) ||
      voices.find((voice) =>
        voice.lang.startsWith("en")
      );

    if (preferredVoice) {
      speech.voice = preferredVoice;
    }

    speech.onstart = () => {
      setIsNexaSpeaking(true);
      setNexaState("speaking");

      setMessage(
        "Listen carefully to the situation. Think before you answer."
      );
    };

    speech.onend = () => {
      setIsNexaSpeaking(false);
      setNexaState("encourage");

      setMessage(
        "Now tell me what you would genuinely do and why."
      );
    };

    speech.onerror = (event) => {
      if (event.error === "canceled") {
        return;
      }

      setIsNexaSpeaking(false);
      setNexaState("idle");

      setMessage(
        "I couldn't read that aloud, but you can continue with the challenge."
      );
    };

    window.speechSynthesis.speak(speech);
  };

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechSupported(false);
      return undefined;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsListening(true);
      setNexaState("listening");

      setMessage(
        "I'm listening. Explain your thinking naturally."
      );
    };

    recognition.onresult = (event) => {
      let finalTranscript = "";
      let interimTranscript = "";

      for (
        let i = event.resultIndex;
        i < event.results.length;
        i++
      ) {
        const transcript =
          event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalTranscript += transcript + " ";
        } else {
          interimTranscript += transcript;
        }
      }

      if (finalTranscript) {
        setAnswer((previousAnswer) => {
          const spacing =
            previousAnswer &&
            !previousAnswer.endsWith(" ")
              ? " "
              : "";

          return (
            previousAnswer +
            spacing +
            finalTranscript.trim()
          ).trim();
        });
      }

      if (interimTranscript) {
        setMessage(
          `Listening: "${interimTranscript}"`
        );
      }
    };

    recognition.onerror = (event) => {
      console.error(
        "Speech recognition error:",
        event.error
      );

      setIsListening(false);
      setNexaState("encourage");

      if (event.error === "not-allowed") {
        setMessage(
          "Microphone permission is blocked. You can still type your answer below."
        );
      } else if (event.error === "network") {
        setMessage(
          "Voice recognition had a network problem. Try again or type your answer."
        );
      } else {
        setMessage(
          "I couldn't hear that clearly. Try again or type your answer."
        );
      }
    };

    recognition.onend = () => {
      setIsListening(false);

      setNexaState(
        answerRef.current.trim()
          ? "happy"
          : "encourage"
      );

      setMessage(
        answerRef.current.trim()
          ? "Good. You can add more to your answer or submit it when you're ready."
          : "Whenever you're ready, tell me what you would do."
      );
    };

    recognitionRef.current = recognition;

    return () => {
      try {
        recognition.stop();
      } catch {
        // Recognition may already be stopped.
      }

      recognitionRef.current = null;
    };
  }, []);

  useEffect(() => {
    readTimerRef.current = setTimeout(() => {
      readScenario(scenario);
    }, 550);

    return () => {
      if (readTimerRef.current) {
        clearTimeout(readTimerRef.current);
        readTimerRef.current = null;
      }

      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
    // Auto-read only when the selected scenario changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scenarioIndex]);

  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }

      try {
        recognitionRef.current?.stop();
      } catch {
        // Recognition may already be stopped.
      }
    };
  }, []);

  const startListening = () => {
    stopNexaSpeech();

    if (!speechSupported) {
      setMessage(
        "Speech recognition is not supported in this browser. Please type your answer."
      );

      return;
    }

    if (!recognitionRef.current) {
      return;
    }

    setNexaState("listening");

    try {
      recognitionRef.current.start();
    } catch {
      // Prevent duplicate start errors.
    }
  };

  const stopListening = () => {
    if (!recognitionRef.current) {
      return;
    }

    try {
      recognitionRef.current.stop();
    } catch {
      // Recognition may already be stopped.
    }

    setIsListening(false);
    setNexaState("happy");

    setMessage(
      "Nice. Review your answer before submitting it."
    );
  };

  const handleAnswerChange = (event) => {
    const value = event.target.value;

    setAnswer(value);

    if (value.trim()) {
      setNexaState("happy");
    } else if (!isNexaSpeaking) {
      setNexaState("encourage");
    }
  };

  const clearAnswer = () => {
    setAnswer("");
    setNexaState("encourage");

    setMessage(
      "Start again and explain what you would genuinely do."
    );
  };

  const nextScenario = () => {
    stopNexaSpeech();

    if (isListening) {
      try {
        recognitionRef.current?.stop();
      } catch {
        // Recognition may already be stopped.
      }
    }

    setIsListening(false);
    setAnswer("");

    const nextIndex =
      getRandomScenarioIndex(scenarioIndex);

    setScenarioIndex(nextIndex);

    setNexaState("idle");

    setMessage(
      "New situation coming up. Listen carefully."
    );
  };

  const handleSubmit = () => {
    stopNexaSpeech();

    const cleanAnswer = answer.trim();

    if (cleanAnswer.length < 20) {
      setNexaState("confused");

      setMessage(
        "Your answer is too short for a meaningful maturity analysis. Explain what you would do and why."
      );

      return;
    }

    localStorage.setItem(
      "maturityScenario",
      scenario.question
    );

    localStorage.setItem(
      "maturityCategory",
      scenario.category
    );

    localStorage.setItem(
      "maturityDifficulty",
      scenario.difficulty
    );

    localStorage.setItem(
      "maturityAnswer",
      cleanAnswer
    );

    navigate("/maturity-feedback");
  };

  return (
    <div className="maturity-page">
      <nav className="maturity-navbar">
        <div
          className="maturity-logo"
          onClick={() => {
            stopNexaSpeech();
            navigate("/dashboard");
          }}
        >
          SpeakMate AI
        </div>

        <button
          className="maturity-back-btn"
          onClick={() => {
            stopNexaSpeech();
            navigate("/dashboard");
          }}
        >
          ← Dashboard
        </button>
      </nav>

      <main className="maturity-container">
        <section className="maturity-intro">
          <span className="maturity-label">
            🧠 NEXA'S MATURITY CHALLENGE
          </span>

          <h1>
            How thoughtfully would
            <span> you respond?</span>
          </h1>

          <p>
            Answer difficult real-life situations
            in English. Nexa will analyze your
            emotional awareness, perspective,
            reasoning and communication.
          </p>

          <div className="maturity-note">
            <span>ℹ️</span>

            <p>
              This challenge is designed for
              self-reflection and entertainment.
              It is not a scientific or
              psychological assessment.
            </p>
          </div>
        </section>

        <section className="maturity-challenge-card">
          <div className="maturity-card-top">
            <div className="maturity-progress">
              <span>Challenge Bank</span>

              <strong>
                {scenarios.length} scenarios
              </strong>
            </div>

            <div className="maturity-tags">
              <span className="maturity-category">
                {scenario.category}
              </span>

              <span
                className={`maturity-difficulty ${
                  scenario.difficulty ===
                  "Very Hard"
                    ? "very-hard"
                    : ""
                }`}
              >
                🔥 {scenario.difficulty}
              </span>
            </div>
          </div>

          <div className="scenario-box">
            <span className="scenario-title">
              THE SITUATION
            </span>

            <h2>{scenario.question}</h2>
          </div>

          <div className="maturity-nexa-section">
            <div className="maturity-nexa-image-wrap">
              <NexaAvatar
                state={nexaState}
                className="maturity-nexa-image"
              />
            </div>

            <div className="maturity-nexa-message">
              <strong>Nexa</strong>

              <p>{message}</p>

              <button
                type="button"
                onClick={() => readScenario(scenario)}
                disabled={isNexaSpeaking}
                style={{
                  marginTop: "10px",
                  border: "none",
                  background: "transparent",
                  padding: "0",
                  color: "#6744e7",
                  fontWeight: "700",
                  fontSize: "12px",
                  cursor: isNexaSpeaking
                    ? "default"
                    : "pointer",
                  opacity: isNexaSpeaking
                    ? 0.55
                    : 1,
                }}
              >
                {isNexaSpeaking
                  ? "🔊 Nexa is reading..."
                  : "🔊 Read Again"}
              </button>
            </div>
          </div>

          <div className="maturity-thinking-guide">
            <span>
              💭 Before answering, think about:
            </span>

            <div className="thinking-points">
              <div>Your emotions</div>

              <div>
                The other person's perspective
              </div>

              <div>
                Long-term consequences
              </div>

              <div>
                Why you chose your response
              </div>
            </div>
          </div>

          <div className="maturity-answer-section">
            <div className="answer-heading">
              <div>
                <span>YOUR RESPONSE</span>

                <p>
                  Speak naturally or type your
                  complete answer.
                </p>
              </div>

              <span className="answer-count">
                {answer.trim().length} characters
              </span>
            </div>

            <textarea
              value={answer}
              onChange={handleAnswerChange}
              placeholder="For example: First, I would try to understand why I feel this way..."
              rows={7}
            />

            <div className="maturity-mic-controls">
              {!isListening ? (
                <button
                  className="maturity-mic-btn"
                  onClick={startListening}
                >
                  🎙️ Start Speaking
                </button>
              ) : (
                <button
                  className="maturity-stop-btn"
                  onClick={stopListening}
                >
                  ⏹ Stop Listening
                </button>
              )}

              <button
                className="maturity-clear-btn"
                onClick={clearAnswer}
                disabled={!answer}
              >
                Clear
              </button>
            </div>

            {!speechSupported && (
              <p className="speech-warning">
                Voice recognition is not supported
                in this browser. You can type your
                answer instead.
              </p>
            )}
          </div>

          <div className="maturity-actions">
            <button
              className="different-scenario-btn"
              onClick={nextScenario}
            >
              🔄 Different Situation
            </button>

            <button
              className="analyze-maturity-btn"
              onClick={handleSubmit}
              disabled={!answer.trim()}
            >
              Analyze My Response
              <span>→</span>
            </button>
          </div>
        </section>

        <section className="maturity-score-preview">
          <div>
            <span>Nexa will evaluate</span>

            <h3>
              Your response across 4 areas
            </h3>
          </div>

          <div className="maturity-score-categories">
            <div>
              <span>❤️</span>
              <strong>
                Emotional Awareness
              </strong>
              <small>/25</small>
            </div>

            <div>
              <span>👥</span>
              <strong>Perspective</strong>
              <small>/25</small>
            </div>

            <div>
              <span>🧠</span>
              <strong>Reasoning</strong>
              <small>/25</small>
            </div>

            <div>
              <span>💬</span>
              <strong>Communication</strong>
              <small>/25</small>
            </div>
          </div>

          <p className="maturity-score-warning">
            70+ is difficult. Strong scores require
            balanced thinking, emotional awareness,
            clear reasoning and thoughtful
            communication.
          </p>
        </section>
      </main>
    </div>
  );
}

export default MaturityChallenge;
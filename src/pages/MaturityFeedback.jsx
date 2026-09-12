import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { supabase } from "../services/supabase";
import NexaAvatar from "../components/NexaAvatar";

import "./MaturityFeedback.css";

function MaturityFeedback() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState(null);
  const [error, setError] = useState("");

  const scenario =
    localStorage.getItem("maturityScenario") || "";

  const category =
    localStorage.getItem("maturityCategory") || "";

  const difficulty =
    localStorage.getItem("maturityDifficulty") || "";

  const answer =
    localStorage.getItem("maturityAnswer") || "";

  useEffect(() => {
    const analyzeResponse = async () => {
      if (!scenario || !answer) {
        setError(
          "Your maturity challenge answer could not be found."
        );
        setLoading(false);
        return;
      }

      try {
        const { data, error: functionError } =
          await supabase.functions.invoke(
            "analyze-maturity",
            {
              body: {
                answer,
                scenario,
                category,
                difficulty,
              },
            }
          );

        if (functionError) {
          throw functionError;
        }

        if (data?.error) {
          throw new Error(data.error);
        }

        setFeedback(data);
      } catch (analysisError) {
        console.error(
          "Maturity analysis error:",
          analysisError
        );

        setError(
          "Nexa couldn't analyze your response right now. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    analyzeResponse();
  }, [answer, scenario, category, difficulty]);

  const handleTryAnother = () => {
    localStorage.removeItem("maturityScenario");
    localStorage.removeItem("maturityCategory");
    localStorage.removeItem("maturityDifficulty");
    localStorage.removeItem("maturityAnswer");

    navigate("/maturity");
  };

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  if (loading) {
    return (
      <div className="maturity-feedback-page">
        <div className="maturity-feedback-loading">
          <NexaAvatar
            state="thinking"
            className="maturity-feedback-nexa"
          />

          <span className="feedback-loading-label">
            NEXA IS THINKING
          </span>

          <h1>
            Analyzing your response...
          </h1>

          <p>
            I'm looking at your emotional awareness,
            perspective, reasoning and communication.
          </p>

          <div className="thinking-dots">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    );
  }

  if (error || !feedback) {
    return (
      <div className="maturity-feedback-page">
        <div className="maturity-feedback-error">
          <NexaAvatar
            state="confused"
            className="maturity-feedback-nexa"
          />

          <h1>
            Something went wrong
          </h1>

          <p>
            {error ||
              "Nexa couldn't analyze this response."}
          </p>

          <button onClick={handleTryAnother}>
            ← Try Again
          </button>
        </div>
      </div>
    );
  }

  const score = Number(feedback.overallScore) || 0;

  const getNexaState = () => {
    if (score >= 80) {
      return "celebrate";
    }

    if (score >= 70) {
      return "happy";
    }

    if (score >= 55) {
      return "encourage";
    }

    return "thinking";
  };

  const getScoreMessage = () => {
    if (score >= 90) {
      return "That was an unusually thoughtful and balanced response.";
    }

    if (score >= 80) {
      return "You showed strong judgment and impressive self-awareness.";
    }

    if (score >= 70) {
      return "Strong response. You considered the situation from more than one angle.";
    }

    if (score >= 55) {
      return "You showed thoughtful reasoning, but there are still important angles to explore.";
    }

    if (score >= 40) {
      return "There are some good instincts here, but your reasoning can go deeper.";
    }

    return "This situation exposed some useful areas for reflection and growth.";
  };

  const categories = [
    {
      icon: "❤️",
      title: "Emotional Awareness",
      score:
        feedback.emotionalAwareness?.score ?? 0,
      feedback:
        feedback.emotionalAwareness?.feedback ||
        "",
    },
    {
      icon: "👥",
      title: "Perspective",
      score:
        feedback.perspective?.score ?? 0,
      feedback:
        feedback.perspective?.feedback ||
        "",
    },
    {
      icon: "🧠",
      title: "Reasoning",
      score:
        feedback.reasoning?.score ?? 0,
      feedback:
        feedback.reasoning?.feedback ||
        "",
    },
    {
      icon: "💬",
      title: "Communication",
      score:
        feedback.communication?.score ?? 0,
      feedback:
        feedback.communication?.feedback ||
        "",
    },
  ];

  return (
    <div className="maturity-feedback-page">

      <nav className="maturity-feedback-navbar">
        <div
          className="maturity-feedback-logo"
          onClick={handleDashboard}
        >
          SpeakMate AI
        </div>

        <button onClick={handleDashboard}>
          Dashboard
        </button>
      </nav>

      <main className="maturity-feedback-container">

        <section className="maturity-result-hero">

          <div className="result-nexa-wrap">
            <NexaAvatar
              state={getNexaState()}
              className="result-nexa"
            />
          </div>

          <div className="result-heading">

            <span className="result-label">
              🧠 MATURITY CHALLENGE RESULT
            </span>

            <h1>
              {feedback.scoreLabel ||
                "Your Reflection"}
            </h1>

            <p>
              {getScoreMessage()}
            </p>

          </div>

          <div className="overall-score-circle">
            <strong>
              {score}
            </strong>

            <span>
              /100
            </span>
          </div>

        </section>

        <section className="result-context-card">

          <div className="result-context-top">
            <span>
              {category}
            </span>

            <strong>
              🔥 {difficulty}
            </strong>
          </div>

          <h3>
            Situation
          </h3>

          <p>
            {scenario}
          </p>

          <div className="your-response-box">
            <span>
              YOUR RESPONSE
            </span>

            <p>
              {answer}
            </p>
          </div>

        </section>

        <section className="maturity-breakdown-section">

          <div className="result-section-heading">
            <span>
              SCORE BREAKDOWN
            </span>

            <h2>
              Where your score came from
            </h2>
          </div>

          <div className="maturity-breakdown-grid">

            {categories.map((item) => (
              <div
                className="maturity-breakdown-card"
                key={item.title}
              >
                <div className="breakdown-card-top">

                  <span className="breakdown-icon">
                    {item.icon}
                  </span>

                  <div className="breakdown-score">
                    <strong>
                      {item.score}
                    </strong>

                    <span>
                      /25
                    </span>
                  </div>

                </div>

                <h3>
                  {item.title}
                </h3>

                <div className="breakdown-bar">
                  <div
                    className="breakdown-fill"
                    style={{
                      width: `${Math.min(
                        100,
                        Math.max(
                          0,
                          (Number(item.score) /
                            25) *
                            100
                        )
                      )}%`,
                    }}
                  />
                </div>

                <p>
                  {item.feedback}
                </p>

              </div>
            ))}

          </div>

        </section>

        <section className="reflection-grid">

          <div className="reflection-card strengths-card">

            <span className="reflection-icon">
              ✨
            </span>

            <h2>
              What you did well
            </h2>

            <div className="reflection-list">
              {(feedback.strengths || []).map(
                (strength, index) => (
                  <div
                    className="reflection-list-item"
                    key={`${strength}-${index}`}
                  >
                    <span>✓</span>
                    <p>{strength}</p>
                  </div>
                )
              )}
            </div>

          </div>

          <div className="reflection-card blindspots-card">

            <span className="reflection-icon">
              🔍
            </span>

            <h2>
              Your blind spots
            </h2>

            <div className="reflection-list">
              {(feedback.blindSpots || []).map(
                (blindSpot, index) => (
                  <div
                    className="reflection-list-item"
                    key={`${blindSpot}-${index}`}
                  >
                    <span>→</span>
                    <p>{blindSpot}</p>
                  </div>
                )
              )}
            </div>

          </div>

        </section>

        <section className="nexa-reflection-card">

          <div className="nexa-reflection-header">

            <NexaAvatar
              state="happy"
              className="reflection-nexa"
            />

            <div>
              <span>
                NEXA'S REFLECTION
              </span>

              <h2>
                Here's what I noticed
              </h2>
            </div>

          </div>

          <p>
            {feedback.nexaReflection}
          </p>

        </section>

        <section className="stronger-approach-card">

          <span className="result-small-label">
            💡 A MORE BALANCED APPROACH
          </span>

          <h2>
            How you could think about it differently
          </h2>

          <p>
            {feedback.strongerApproach}
          </p>

        </section>

        <section className="maturity-english-section">

          <div className="result-section-heading">
            <span>
              ENGLISH COACHING
            </span>

            <h2>
              Your thinking and your English are
              scored separately
            </h2>

            <p>
              Your maturity score is about the
              quality of your reasoning. These
              suggestions focus only on how you
              expressed it in English.
            </p>
          </div>

          <div className="english-feedback-grid">

            <div>
              <span>
                📝 Grammar
              </span>

              <p>
                {feedback.englishFeedback
                  ?.grammar ||
                  "No feedback available."}
              </p>
            </div>

            <div>
              <span>
                📚 Vocabulary
              </span>

              <p>
                {feedback.englishFeedback
                  ?.vocabulary ||
                  "No feedback available."}
              </p>
            </div>

            <div>
              <span>
                ✨ Clarity
              </span>

              <p>
                {feedback.englishFeedback
                  ?.clarity ||
                  "No feedback available."}
              </p>
            </div>

          </div>

          <div className="better-maturity-answer">

            <span>
              A CLEARER ENGLISH VERSION
            </span>

            <p>
              {feedback.englishFeedback
                ?.betterVersion ||
                answer}
            </p>

          </div>

        </section>

        <section className="maturity-disclaimer">
          <span>
            ℹ️
          </span>

          <p>
            This score is an AI-generated
            self-reflection exercise, not a
            scientific or psychological assessment.
            Different situations can reveal different
            perspectives.
          </p>
        </section>

        <div className="maturity-result-actions">

          <button
            className="another-maturity-btn"
            onClick={handleTryAnother}
          >
            🧠 Try Another Challenge
          </button>

          <button
            className="maturity-dashboard-btn"
            onClick={handleDashboard}
          >
            Back to Dashboard
          </button>

        </div>

      </main>

    </div>
  );
}

export default MaturityFeedback;
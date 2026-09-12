import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { supabase } from "../services/supabase";
import NexaAvatar from "../components/NexaAvatar";

import "./Progress.css";

function Progress() {
  const navigate = useNavigate();

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadHistory = async () => {
      try {
        setLoading(true);
        setErrorMessage("");

        const {
          data: userData,
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) {
          throw userError;
        }

        const user = userData?.user;

        if (!user) {
          setErrorMessage(
            "Please login to view your progress."
          );

          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from("practice_history")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", {
            ascending: false,
          });

        if (error) {
          throw error;
        }

        setHistory(data || []);
      } catch (error) {
        console.error(
          "Progress loading error:",
          error
        );

        setErrorMessage(
          "Nexa couldn't load your practice history right now."
        );
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);

  const stats = useMemo(() => {
    if (!history.length) {
      return {
        totalPractice: 0,
        averageScore: 0,
        bestScore: 0,
        latestScore: 0,
      };
    }

    const scores = history
      .map((item) => item.overall_score)
      .filter(
        (score) =>
          typeof score === "number"
      );

    const total =
      scores.reduce(
        (sum, score) => sum + score,
        0
      );

    const average =
      scores.length > 0
        ? Math.round(total / scores.length)
        : 0;

    const best =
      scores.length > 0
        ? Math.max(...scores)
        : 0;

    return {
      totalPractice: history.length,
      averageScore: average,
      bestScore: best,
      latestScore:
        history[0]?.overall_score || 0,
    };
  }, [history]);

  const getNexaState = () => {
    if (loading) {
      return "thinking";
    }

    if (errorMessage) {
      return "confused";
    }

    if (stats.averageScore >= 85) {
      return "celebrate";
    }

    if (stats.averageScore >= 65) {
      return "happy";
    }

    return "encourage";
  };

  const formatDate = (dateValue) => {
    if (!dateValue) {
      return "";
    }

    const date =
      new Date(dateValue);

    return date.toLocaleString(
      undefined,
      {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }
    );
  };

  if (loading) {
    return (
      <div className="progress-page">

        <div className="progress-wrapper">

          <div className="progress-nexa-area">

            <NexaAvatar
              state="thinking"
              className="progress-nexa"
            />

          </div>

          <div className="progress-main-card">

            <div className="progress-header">

              <span className="progress-label">
                📊 Your Progress
              </span>

              <h1>
                Nexa is checking your journey...
              </h1>

              <p>
                Loading your speaking history
                and scores.
              </p>

            </div>

            <div className="progress-loading">
              Preparing your progress dashboard...
            </div>

          </div>

        </div>

      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="progress-page">

        <div className="progress-wrapper">

          <div className="progress-nexa-area">

            <NexaAvatar
              state="confused"
              className="progress-nexa"
            />

          </div>

          <div className="progress-main-card">

            <div className="progress-header">

              <span className="progress-label">
                🐰 Nexa
              </span>

              <h1>
                Couldn't load progress
              </h1>

              <p>
                {errorMessage}
              </p>

            </div>

            <button
              className="progress-primary-button"
              onClick={() =>
                navigate("/login")
              }
            >
              Go to Login
            </button>

          </div>

        </div>

      </div>
    );
  }

  return (
    <div className="progress-page">

      <div className="progress-wrapper">

        <div className="progress-nexa-area">

          <NexaAvatar
            state={getNexaState()}
            className="progress-nexa"
          />

        </div>

        <div className="progress-main-card">

          <div className="progress-top-row">

            <div className="progress-header">

              <span className="progress-label">
                📊 Your Progress
              </span>

              <h1>
                Your Speaking Journey
              </h1>

              <p>
                See how your English is improving
                with every challenge.
              </p>

            </div>

            <button
              className="progress-practice-button"
              onClick={() =>
                navigate("/practice")
              }
            >
              🎤 Practice Again
            </button>

          </div>

          <div className="progress-stats-grid">

            <div className="progress-stat-card">

              <span>
                Practice Sessions
              </span>

              <strong>
                {stats.totalPractice}
              </strong>

              <small>
                completed challenges
              </small>

            </div>

            <div className="progress-stat-card">

              <span>
                Average Score
              </span>

              <strong>
                {stats.averageScore}
              </strong>

              <small>
                out of 100
              </small>

            </div>

            <div className="progress-stat-card">

              <span>
                Best Score
              </span>

              <strong>
                {stats.bestScore}
              </strong>

              <small>
                personal best
              </small>

            </div>

            <div className="progress-stat-card">

              <span>
                Latest Score
              </span>

              <strong>
                {stats.latestScore}
              </strong>

              <small>
                latest challenge
              </small>

            </div>

          </div>

          {history.length === 0 ? (
            <div className="progress-empty">

              <h2>
                Your journey starts here 🌱
              </h2>

              <p>
                Complete your first speaking
                challenge and Nexa will start
                tracking your progress.
              </p>

              <button
                className="progress-primary-button"
                onClick={() =>
                  navigate("/practice")
                }
              >
                Start Practicing
              </button>

            </div>
          ) : (
            <>

              <div className="history-heading">

                <div>

                  <h2>
                    Practice History
                  </h2>

                  <p>
                    Your latest attempts appear
                    first.
                  </p>

                </div>

              </div>

              <div className="history-list">

                {history.map(
                  (item) => (
                    <div
                      className="history-card"
                      key={item.id}
                    >

                      <div className="history-card-top">

                        <div>

                          <div className="history-topic">
                            💬{" "}
                            {item.topic ||
                              "General"}
                          </div>

                          <h3>
                            {item.challenge ||
                              "Speaking Challenge"}
                          </h3>

                        </div>

                        <div className="history-score">

                          <strong>
                            {item.overall_score ??
                              "--"}
                          </strong>

                          <span>
                            /100
                          </span>

                        </div>

                      </div>

                      <p className="history-date">
                        {formatDate(
                          item.created_at
                        )}
                      </p>

                      <div className="history-answer">

                        <span>
                          🗣️ Your Answer
                        </span>

                        <p>
                          {item.answer}
                        </p>

                      </div>

                      <div className="history-score-grid">

                        <div>
                          <span>
                            Grammar
                          </span>

                          <strong>
                            {item.grammar_score ??
                              "--"}
                          </strong>
                        </div>

                        <div>
                          <span>
                            Vocabulary
                          </span>

                          <strong>
                            {item.vocabulary_score ??
                              "--"}
                          </strong>
                        </div>

                        <div>
                          <span>
                            Fluency
                          </span>

                          <strong>
                            {item.fluency_score ??
                              "--"}
                          </strong>
                        </div>

                        <div>
                          <span>
                            Clarity
                          </span>

                          <strong>
                            {item.clarity_score ??
                              "--"}
                          </strong>
                        </div>

                      </div>

                      {item.better_answer && (
                        <div className="history-feedback-box">

                          <span>
                            ✨ Better Way to Say It
                          </span>

                          <p>
                            {item.better_answer}
                          </p>

                        </div>
                      )}

                      {item.nexa_tip && (
                        <div className="history-nexa-tip">

                          <span>
                            🐰 Nexa's Tip
                          </span>

                          <p>
                            {item.nexa_tip}
                          </p>

                        </div>
                      )}

                    </div>
                  )
                )}

              </div>

            </>
          )}

          <button
            className="progress-change-topic"
            onClick={() =>
              navigate("/topics")
            }
          >
            ← Choose Another Topic
          </button>

        </div>

      </div>

    </div>
  );
}

export default Progress;
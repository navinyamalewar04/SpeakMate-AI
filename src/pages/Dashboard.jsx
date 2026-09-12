import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { supabase } from "../services/supabase";
import NexaAvatar from "../components/NexaAvatar";

import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("Learner");
  const [loading, setLoading] = useState(true);
  const [latestScore, setLatestScore] = useState(null);
  const [totalSessions, setTotalSessions] = useState(0);
  const [averageScore, setAverageScore] = useState(null);
  const [latestTip, setLatestTip] = useState("");

  const level =
    localStorage.getItem("englishLevel") || "Not selected";

  const topic =
    localStorage.getItem("practiceTopic") || "Not selected";

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const {
          data: userData,
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) {
          throw userError;
        }

        const user = userData?.user;

        if (!user) {
          navigate("/login");
          return;
        }

        const rawName =
          user.user_metadata?.name ||
          user.email?.split("@")[0] ||
          "Learner";

        const formattedName =
          rawName.charAt(0).toUpperCase() +
          rawName.slice(1);

        setUserName(formattedName);

        const { data, error } = await supabase
          .from("practice_history")
          .select(
            "overall_score, nexa_tip, created_at"
          )
          .eq("user_id", user.id)
          .order("created_at", {
            ascending: false,
          });

        if (error) {
          throw error;
        }

        const history = data || [];

        setTotalSessions(history.length);

        if (history.length > 0) {
          setLatestScore(
            history[0]?.overall_score ?? null
          );

          setLatestTip(
            history[0]?.nexa_tip || ""
          );

          const validScores = history
            .map((item) => item.overall_score)
            .filter(
              (score) =>
                typeof score === "number"
            );

          if (validScores.length > 0) {
            const total = validScores.reduce(
              (sum, score) => sum + score,
              0
            );

            setAverageScore(
              Math.round(
                total / validScores.length
              )
            );
          }
        }
      } catch (error) {
        console.error(
          "Dashboard loading error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [navigate]);

  const handleStartPractice = () => {
    if (level === "Not selected") {
      navigate("/level");
      return;
    }

    if (topic === "Not selected") {
      navigate("/topics");
      return;
    }

    navigate("/practice");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="dashboard-page">

      {/* TOP NAVIGATION */}

      <nav className="product-navbar">

        <div
          className="product-logo"
          onClick={() =>
            navigate("/dashboard")
          }
        >
          SpeakMate AI
        </div>

        <div className="product-nav-links">

          <button className="nav-active">
            Home
          </button>

          <button
            onClick={handleStartPractice}
          >
            Practice
          </button>

          <button
            onClick={() =>
              navigate("/topics")
            }
          >
            Topics
          </button>

          <button
            onClick={() =>
              navigate("/progress")
            }
          >
            Progress
          </button>

        </div>

        <div className="product-nav-actions">

          <button
            className="level-badge"
            onClick={() =>
              navigate("/level")
            }
          >
            🎯 {level}
          </button>

          <div className="profile-circle">
            {userName.charAt(0)}
          </div>

          <button
            className="navbar-logout"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </nav>

      {loading ? (
        <div className="dashboard-loading">
          <NexaAvatar
            state="thinking"
            className="loading-nexa"
          />

          <p>
            Nexa is preparing your practice...
          </p>
        </div>
      ) : (
        <main className="product-dashboard">

          {/* HERO */}

          <section className="coach-hero">

            <div className="coach-content">

              <span className="coach-label">
                ✨ YOUR AI SPEAKING COACH
              </span>

              <h1>
                Hi {userName} 👋
              </h1>

              <h2>
                Ready to speak a little
                <span> better today?</span>
              </h2>

              <p>
                Small conversations every day can
                build real confidence. Nexa has
                your next speaking challenge ready.
              </p>

              <div className="coach-actions">

                <button
                  className="continue-practice-btn"
                  onClick={handleStartPractice}
                >
                  🎙️ Continue Practice
                  <span>→</span>
                </button>

                <button
                  className="choose-topic-btn"
                  onClick={() =>
                    navigate("/topics")
                  }
                >
                  Choose Topic
                </button>

              </div>

            </div>

            <div className="coach-nexa">

              <div className="nexa-glow" />

              <NexaAvatar
                state="happy"
                className="coach-nexa-image"
              />

              <div className="coach-speech">

                <strong>
                  Nexa
                </strong>

                <p>
                  {latestTip ||
                    "Let's practice one conversation today! ✨"}
                </p>

              </div>

            </div>

          </section>

          {/* TODAY */}

          <section className="today-section">

            <div className="section-heading">

              <div>
                <span>
                  TODAY
                </span>

                <h2>
                  Your practice at a glance
                </h2>
              </div>

              <button
                onClick={() =>
                  navigate("/progress")
                }
              >
                View full progress →
              </button>

            </div>

            <div className="today-grid">

              <div className="today-main-card">

                <div className="today-icon">
                  🎙️
                </div>

                <div className="today-card-content">

                  <span className="small-title">
                    CURRENT PRACTICE
                  </span>

                  <h3>
                    {topic === "Not selected"
                      ? "Choose your first topic"
                      : topic}
                  </h3>

                  <p>
                    Level: {level}
                  </p>

                </div>

                <button
                  onClick={handleStartPractice}
                >
                  Start →
                </button>

              </div>

              <div className="mini-progress-card">

                <span className="mini-icon">
                  🔥
                </span>

                <div>
                  <strong>
                    {totalSessions}
                  </strong>

                  <span>
                    Sessions
                  </span>
                </div>

              </div>

              <div className="mini-progress-card">

                <span className="mini-icon">
                  ⭐
                </span>

                <div>
                  <strong>
                    {latestScore ?? "--"}
                  </strong>

                  <span>
                    Latest Score
                  </span>
                </div>

              </div>

              <div className="mini-progress-card">

                <span className="mini-icon">
                  📈
                </span>

                <div>
                  <strong>
                    {averageScore ?? "--"}
                  </strong>

                  <span>
                    Average Score
                  </span>
                </div>

              </div>

            </div>

          </section>

          {/* PRACTICE MODES */}

          <section className="practice-modes-section">

            <div className="section-heading">

              <div>
                <span>
                  EXPLORE
                </span>

                <h2>
                  Practice your way
                </h2>
              </div>

            </div>

            <div className="practice-modes">

              <button
                className="mode-card active-mode"
                onClick={handleStartPractice}
              >

                <div className="mode-icon">
                  🎤
                </div>

                <span className="mode-status">
                  AVAILABLE
                </span>

                <h3>
                  Speaking Challenge
                </h3>

                <p>
                  Answer a question and get
                  instant AI feedback from Nexa.
                </p>

                <div className="mode-link">
                  Start practicing →
                </div>

              </button>

              <div className="mode-card">

                <div className="mode-icon">
                  💬
                </div>

                <span className="coming-label">
                  COMING SOON
                </span>

                <h3>
                  Talk with Nexa
                </h3>

                <p>
                  Have natural back-and-forth
                  English conversations.
                </p>

              </div>

              <div className="mode-card">

                <div className="mode-icon">
                  💼
                </div>

                <span className="coming-label">
                  COMING SOON
                </span>

                <h3>
                  Interview Mode
                </h3>

                <p>
                  Practice answering realistic
                  interview questions confidently.
                </p>

              </div>

              <button
                className="mode-card active-mode"
                onClick={() =>
                  navigate("/maturity")
                }
              >

                <div className="mode-icon">
                  🧠
                </div>

                <span className="mode-status">
                  AVAILABLE
                </span>

                <h3>
                  Maturity Challenge
                </h3>

                <p>
                  Face difficult real-life situations
                  and test how thoughtfully you respond.
                </p>

                <div className="mode-link">
                  Take the challenge →
                </div>

              </button>

            </div>

          </section>

          {/* NEXA COACHING */}

          <section className="nexa-coaching-card">

            <div className="coaching-icon">
              🐰
            </div>

            <div className="coaching-content">

              <span>
                NEXA'S COACHING TIP
              </span>

              <h3>
                One small improvement at a time.
              </h3>

              <p>
                {latestTip ||
                  "Don't try to speak perfectly. Focus on expressing your idea clearly, then improve it with feedback."}
              </p>

            </div>

            <button
              onClick={handleStartPractice}
            >
              Practice now
            </button>

          </section>

        </main>
      )}

    </div>
  );
}

export default Dashboard;
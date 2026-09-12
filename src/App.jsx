import "./App.css";
import nexa from "./assets/nexa.png";

import {
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LevelSelection from "./pages/LevelSelection";
import TopicSelection from "./pages/TopicSelection";
import Practice from "./pages/Practice";
import Feedback from "./pages/Feedback";
import Progress from "./pages/Progress";
import Dashboard from "./pages/Dashboard";
import MaturityChallenge from "./pages/MaturityChallenge";
import MaturityFeedback from "./pages/MaturityFeedback";
import PrivacyPolicy from "./pages/PrivacyPolicy";

function Home() {
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div
          className="logo"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
        >
          SpeakMate AI
        </div>

        <div className="nav-links">
          <button
            className="nav-text-btn"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
          >
            Home
          </button>

          <button
            className="nav-text-btn"
            onClick={() =>
              scrollToSection("how-it-works")
            }
          >
            How it Works
          </button>

          <button
            className="nav-text-btn"
            onClick={() =>
              scrollToSection("about-nexa")
            }
          >
            About Nexa
          </button>

          <button
            className="login-btn"
            onClick={() =>
              navigate("/login")
            }
          >
            Login
          </button>
        </div>
      </nav>

      <main className="hero">
        <div className="hero-text">
          <span className="badge">
            AI-Powered English Speaking Coach
          </span>

          <h1>
            Speak English.
            <br />

            <span>
              Build Confidence.
            </span>
          </h1>

          <p>
            Practice real conversations, get
            instant AI feedback and improve your
            fluency with Nexa — your personal
            speaking companion.
          </p>

          <div className="hero-buttons">
            <button
              className="primary-btn"
              onClick={() =>
                navigate("/signup")
              }
            >
              Start Speaking
            </button>

            <button
              className="secondary-btn"
              onClick={() =>
                scrollToSection("about-nexa")
              }
            >
              Meet Nexa
            </button>
          </div>

          <div className="stats">
            <div>
              <strong>24/7</strong>
              <span>Practice anytime</span>
            </div>

            <div>
              <strong>AI</strong>
              <span>Instant feedback</span>
            </div>

            <div>
              <strong>∞</strong>
              <span>Speaking topics</span>
            </div>
          </div>
        </div>

        <div className="nexa-card">
          <div className="nexa-placeholder">
            <img
              src={nexa}
              alt="Nexa - SpeakMate AI Coach"
              className="nexa-image"
            />
          </div>

          <div className="speech-bubble">
            <p>Hi! I'm Nexa 👋</p>

            <span>
              Ready to improve your English?
            </span>
          </div>
        </div>
      </main>

      <section
        className="how-section"
        id="how-it-works"
      >
        <div className="section-heading">
          <span className="section-tag">
            HOW IT WORKS
          </span>

          <h2>
            Your English practice,
            <br />
            made simple.
          </h2>

          <p>
            No complicated lessons. Just speak,
            learn from your mistakes and keep
            improving.
          </p>
        </div>

        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">
              01
            </div>

            <div className="step-icon">
              🎯
            </div>

            <h3>
              Choose Your Practice
            </h3>

            <p>
              Select your English level and topics
              you actually enjoy talking about.
            </p>
          </div>

          <div className="step-card featured-step">
            <div className="step-number">
              02
            </div>

            <div className="step-icon">
              🎙️
            </div>

            <h3>
              Speak with Nexa
            </h3>

            <p>
              Answer real speaking challenges using
              your voice while Nexa listens.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">
              03
            </div>

            <div className="step-icon">
              ✨
            </div>

            <h3>
              Get Smarter Feedback
            </h3>

            <p>
              See grammar, vocabulary, fluency and
              clarity feedback, then retry and
              improve.
            </p>
          </div>
        </div>
      </section>

      <section
        className="about-nexa-section"
        id="about-nexa"
      >
        <div className="about-nexa-visual">
          <div className="about-nexa-glow" />

          <img
            src={nexa}
            alt="Meet Nexa"
            className="about-nexa-image"
          />

          <div className="nexa-online-badge">
            <span />
            Nexa is ready
          </div>
        </div>

        <div className="about-nexa-content">
          <span className="section-tag">
            MEET YOUR AI COACH
          </span>

          <h2>
            Hi, I'm Nexa.
            <br />
            Let's get you talking.
          </h2>

          <p className="about-description">
            Nexa is your AI speaking companion
            inside SpeakMate AI. She's here to make
            English practice feel more like a real
            conversation and less like studying
            from a textbook.
          </p>

          <div className="nexa-features">
            <div className="nexa-feature">
              <span>🎙️</span>

              <div>
                <h3>Speaking Challenges</h3>
                <p>
                  Practice English with interesting
                  questions and topics.
                </p>
              </div>
            </div>

            <div className="nexa-feature">
              <span>🧠</span>

              <div>
                <h3>AI Feedback</h3>
                <p>
                  Understand your mistakes and see
                  how you can answer better.
                </p>
              </div>
            </div>

            <div className="nexa-feature">
              <span>📈</span>

              <div>
                <h3>Track Improvement</h3>
                <p>
                  Review your practice history,
                  scores and progress over time.
                </p>
              </div>
            </div>

            <div className="nexa-feature">
              <span>💭</span>

              <div>
                <h3>Maturity Challenge</h3>
                <p>
                  Explore difficult situations and
                  practice expressing thoughtful
                  answers in English.
                </p>
              </div>
            </div>
          </div>

          <button
            className="primary-btn about-start-btn"
            onClick={() =>
              navigate("/signup")
            }
          >
            Start Practicing with Nexa →
          </button>
        </div>
      </section>

      <section className="home-cta">
        <div>
          <span className="section-tag">
            READY TO SPEAK?
          </span>

          <h2>
            Confidence starts with
            one conversation.
          </h2>

          <p>
            Start practicing English with Nexa and
            turn every mistake into progress.
          </p>

          <button
            className="primary-btn"
            onClick={() =>
              navigate("/signup")
            }
          >
            Start Speaking Free
          </button>
        </div>
      </section>

      <footer className="home-footer">
        <div className="footer-logo">
          SpeakMate AI
        </div>

        <p>
          Practice. Speak. Improve.
        </p>

        <span>
          Built with AI to make English practice
          easier.
        </span>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />

      <Route
        path="/dashboard"
        element={<Dashboard />}
      />

      <Route
        path="/level"
        element={<LevelSelection />}
      />

      <Route
        path="/topics"
        element={<TopicSelection />}
      />

      <Route
        path="/practice"
        element={<Practice />}
      />

      <Route
        path="/feedback"
        element={<Feedback />}
      />

      <Route
        path="/progress"
        element={<Progress />}
      />

      <Route
        path="/maturity"
        element={<MaturityChallenge />}
      />

      <Route
        path="/maturity-feedback"
        element={<MaturityFeedback />}
      />

      <Route
        path="/privacy-policy"
        element={<PrivacyPolicy />}
      />
    </Routes>
  );
}

export default App;
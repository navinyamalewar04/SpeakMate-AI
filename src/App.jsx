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

      {/* Decorative background */}
      <div className="page-grid" />

      {/* NAVBAR */}
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
          <div className="logo-mark">
            S
          </div>

          <div className="logo-copy">
            <strong>SpeakMate</strong>
            <span>AI</span>
          </div>
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
            Meet Nexa
          </button>

          <button
            className="login-btn"
            onClick={() =>
              navigate("/login")
            }
          >
            Log in
          </button>
        </div>
      </nav>

      {/* HERO */}
      <main className="hero">

        <div className="hero-text">

          <div className="lab-label">
            <span className="lab-dot" />
            NEXA SPEAK LAB
          </div>

          <h1>
            Don't just learn
            <br />
            English.
            <span className="hero-highlight">
              {" "}Speak it.
            </span>
          </h1>

          <p>
            Your judgment-free space to practice
            real English conversations, make
            mistakes and get better with Nexa.
          </p>

          <div className="hero-buttons">
            <button
              className="primary-btn"
              onClick={() =>
                navigate("/signup")
              }
            >
              Start a conversation
              <span>→</span>
            </button>

            <button
              className="secondary-btn"
              onClick={() =>
                scrollToSection("about-nexa")
              }
            >
              Meet your coach
            </button>
          </div>

          <div className="hero-proof">
            <div className="proof-item">
              <span className="proof-icon">
                🎙
              </span>
              <div>
                <strong>Speak naturally</strong>
                <small>
                  No textbook answers
                </small>
              </div>
            </div>

            <div className="proof-divider" />

            <div className="proof-item">
              <span className="proof-icon">
                ✦
              </span>
              <div>
                <strong>Learn instantly</strong>
                <small>
                  Feedback after you speak
                </small>
              </div>
            </div>
          </div>

        </div>

        {/* NEXA LAB VISUAL */}
        <div className="nexa-lab">

          <div className="lab-orbit orbit-one" />
          <div className="lab-orbit orbit-two" />

          <div className="floating-note note-one">
            <span>01</span>
            Speak freely
          </div>

          <div className="floating-note note-two">
            <span>02</span>
            Get feedback
          </div>

          <div className="voice-chip">
            <span className="voice-dot" />

            <div className="voice-bars">
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>

            Listening
          </div>

          <div className="nexa-stage">
            <div className="nexa-sun" />

            <img
              src={nexa}
              alt="Nexa - SpeakMate AI Coach"
              className="nexa-image"
            />
          </div>

          <div className="speech-bubble">
            <span className="bubble-label">
              NEXA
            </span>

            <p>
              Say it your way.
            </p>

            <span>
              I'll help you make it better.
            </span>
          </div>

        </div>
      </main>

      {/* MARQUEE / BRAND STRIP */}
      <div className="practice-strip">
        <div>
          <span>REAL CONVERSATIONS</span>
          <b>✦</b>
          <span>INSTANT FEEDBACK</span>
          <b>✦</b>
          <span>YOUR OWN PACE</span>
          <b>✦</b>
          <span>BUILD CONFIDENCE</span>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section
        className="how-section"
        id="how-it-works"
      >
        <div className="section-intro">

          <div>
            <span className="section-index">
              01 / THE PRACTICE LOOP
            </span>

            <h2>
              Less studying.
              <br />
              More speaking.
            </h2>
          </div>

          <p>
            You don't improve speaking by only
            reading about English. Speak, understand
            what went wrong, then try again.
          </p>

        </div>

        <div className="practice-journey">

          <article className="journey-card choose-card">
            <div className="journey-top">
              <span>STEP 01</span>
              <div className="journey-symbol">
                #
              </div>
            </div>

            <h3>
              Pick something
              <br />
              worth talking about.
            </h3>

            <p>
              Choose your level and a topic you
              actually want to discuss.
            </p>

            <div className="topic-pills">
              <span>Movies</span>
              <span>Funny</span>
              <span>Coding</span>
              <span>Knowledge</span>
            </div>
          </article>

          <article className="journey-card speak-card">
            <div className="journey-top">
              <span>STEP 02</span>
              <div className="journey-symbol">
                ◉
              </div>
            </div>

            <h3>
              Stop thinking.
              <br />
              Start speaking.
            </h3>

            <p>
              Answer Nexa's challenge using your
              voice. No perfect answer required.
            </p>

            <div className="mini-wave">
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
          </article>

          <article className="journey-card improve-card">
            <div className="journey-top">
              <span>STEP 03</span>
              <div className="journey-symbol">
                ↗
              </div>
            </div>

            <h3>
              See exactly where
              <br />
              you can improve.
            </h3>

            <p>
              Get useful feedback on grammar,
              vocabulary, fluency and clarity.
            </p>

            <div className="score-preview">
              <div>
                <span>Fluency</span>
                <strong>82</strong>
              </div>

              <div>
                <span>Clarity</span>
                <strong>88</strong>
              </div>
            </div>
          </article>

        </div>
      </section>

      {/* NEXA SECTION */}
      <section
        className="about-nexa-section"
        id="about-nexa"
      >

        <div className="about-nexa-visual">

          <div className="nexa-poster">

            <div className="poster-top">
              <span>
                YOUR SPEAKING COMPANION
              </span>
              <strong>02</strong>
            </div>

            <div className="poster-circle" />

            <img
              src={nexa}
              alt="Meet Nexa"
              className="about-nexa-image"
            />

            <div className="poster-caption">
              <strong>NEXA</strong>
              <span>
                AI speaking companion
              </span>
            </div>

          </div>

        </div>

        <div className="about-nexa-content">

          <span className="section-index">
            02 / MEET NEXA
          </span>

          <h2>
            A coach that
            <br />
            lets you mess up.
          </h2>

          <p className="about-description">
            Nexa isn't here to judge your English.
            She's here to keep the conversation
            going, show you what can be improved
            and help you become more confident
            every time you speak.
          </p>

          <div className="nexa-feature-list">

            <div className="nexa-feature">
              <span>01</span>

              <div>
                <h3>
                  Real speaking challenges
                </h3>

                <p>
                  Questions designed to make you
                  actually talk, not memorize.
                </p>
              </div>
            </div>

            <div className="nexa-feature">
              <span>02</span>

              <div>
                <h3>
                  Feedback you can use
                </h3>

                <p>
                  Understand mistakes and discover
                  a clearer way to express yourself.
                </p>
              </div>
            </div>

            <div className="nexa-feature">
              <span>03</span>

              <div>
                <h3>
                  Progress that feels real
                </h3>

                <p>
                  Look back at your sessions,
                  scores and improvement.
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
            Practice with Nexa
            <span>→</span>
          </button>

        </div>
      </section>

      {/* MATURITY CHALLENGE TEASER */}
      <section className="maturity-home-section">

        <div className="maturity-copy">
          <span className="section-index light-index">
            03 / NOT JUST ENGLISH
          </span>

          <h2>
            How would you
            <br />
            handle this?
          </h2>

          <p>
            SpeakMate AI also challenges how you
            communicate your thoughts in difficult
            situations.
          </p>

          <button
            onClick={() =>
              navigate("/signup")
            }
            className="maturity-btn"
          >
            Try Maturity Challenge →
          </button>
        </div>

        <div className="scenario-card">
          <div className="scenario-meta">
            <span>SITUATION 07</span>
            <span>THINK • SPEAK • REFLECT</span>
          </div>

          <p>
            “Your close friend made a mistake that
            affected your team. Everyone is blaming
            them. What would you do?”
          </p>

          <div className="scenario-footer">
            <span>
              There is no perfect answer.
            </span>

            <div>
              YOUR TURN
              <span>→</span>
            </div>
          </div>
        </div>

      </section>

      {/* FINAL CTA */}
      <section className="home-cta">

        <span className="cta-small">
          YOUR NEXT CONVERSATION
        </span>

        <h2>
          You already know
          <br />
          more English than
          <br />
          you speak.
        </h2>

        <p>
          Let's change that.
        </p>

        <button
          className="primary-btn"
          onClick={() =>
            navigate("/signup")
          }
        >
          Start speaking free
          <span>→</span>
        </button>

      </section>

      {/* FOOTER */}
      <footer className="home-footer">

        <div className="footer-brand">
          <div className="logo-mark">
            S
          </div>

          <div>
            <strong>SpeakMate AI</strong>
            <span>
              Practice. Speak. Improve.
            </span>
          </div>
        </div>

        <p>
          Built around one simple idea:
          <br />
          confidence comes from practice.
        </p>

        <span className="footer-year">
          © 2026 SpeakMate AI
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
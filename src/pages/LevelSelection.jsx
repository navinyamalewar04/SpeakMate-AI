import { useState } from "react";
import { useNavigate } from "react-router-dom";

import nexa from "../assets/nexa.png";
import "./Onboarding.css";

function LevelSelection() {
  const navigate = useNavigate();

  const [selectedLevel, setSelectedLevel] = useState(
    localStorage.getItem("englishLevel") || ""
  );

  const levels = [
    {
      name: "Beginner",
      icon: "🌱",
      description:
        "I know basic English and want to build speaking confidence.",
    },
    {
      name: "Intermediate",
      icon: "🚀",
      description:
        "I can speak English but want better fluency and fewer mistakes.",
    },
    {
      name: "Advanced",
      icon: "⚡",
      description:
        "I speak comfortably and want to sound more natural and confident.",
    },
  ];

  const handleContinue = () => {
    if (!selectedLevel) return;

    localStorage.setItem(
      "englishLevel",
      selectedLevel
    );

    navigate("/topics");
  };

  return (
    <div className="onboarding-page">

      <div className="onboarding-wrapper">

        <div className="nexa-peek-area">
          <img
            src={nexa}
            alt="Nexa"
            className="onboarding-nexa"
          />
        </div>

        <div className="onboarding-card">

          <span className="step-label">
            Step 1 of 2
          </span>

          <h1>Choose Your Level</h1>

          <p className="onboarding-subtitle">
            Tell Nexa your current English level so your
            practice can match your confidence.
          </p>

          <div className="level-options">

            {levels.map((level) => (
              <button
                key={level.name}
                className={`selection-card ${
                  selectedLevel === level.name
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  setSelectedLevel(level.name)
                }
              >

                <div className="selection-icon">
                  {level.icon}
                </div>

                <div className="selection-info">
                  <h3>{level.name}</h3>
                  <p>{level.description}</p>
                </div>

                <div className="selection-radio" />

              </button>
            ))}

          </div>

          <button
            className="onboarding-main-button"
            disabled={!selectedLevel}
            onClick={handleContinue}
          >
            Continue →
          </button>

          <p className="onboarding-note">
            You can change your level later.
          </p>

        </div>

      </div>

    </div>
  );
}

export default LevelSelection;
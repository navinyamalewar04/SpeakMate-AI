import { useState } from "react";
import { useNavigate } from "react-router-dom";

import nexa from "../assets/nexa.png";
import "./Onboarding.css";

function TopicSelection() {
  const navigate = useNavigate();

  const [selectedTopic, setSelectedTopic] = useState(
    localStorage.getItem("practiceTopic") || ""
  );

  const topics = [
    {
      name: "Fun & Random",
      icon: "😄",
      description: "Light and fun conversations",
    },
    {
      name: "Movies & TV",
      icon: "🎬",
      description: "Talk about your favorite movies and shows",
    },
    {
      name: "Coding & Tech",
      icon: "💻",
      description: "Discuss technology, coding and innovation",
    },
    {
      name: "Knowledge",
      icon: "🧠",
      description: "Share interesting things you learn",
    },
    {
      name: "Life & Society",
      icon: "🌍",
      description: "Talk about real-life topics and ideas",
    },
    {
      name: "Deep Talks",
      icon: "💭",
      description: "Thoughtful and meaningful conversations",
    },
    {
      name: "Surprise Me",
      icon: "🎲",
      description: "Let Nexa choose something unexpected",
    },
  ];

  const handleContinue = () => {
    if (!selectedTopic) return;

    localStorage.setItem(
      "practiceTopic",
      selectedTopic
    );

    navigate("/dashboard");
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
            Step 2 of 2
          </span>

          <h1>
            What do you want to practice?
          </h1>

          <p className="onboarding-subtitle">
            Pick something you enjoy. Nexa will use it to prepare
            your speaking challenges.
          </p>

          <div className="topic-grid">

            {topics.map((topic) => (
              <button
                key={topic.name}
                className={`selection-card topic-card ${
                  selectedTopic === topic.name
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  setSelectedTopic(topic.name)
                }
              >

                <div className="selection-icon">
                  {topic.icon}
                </div>

                <div className="selection-info">
                  <h3>{topic.name}</h3>
                  <p>{topic.description}</p>
                </div>

                <div className="selection-radio" />

              </button>
            ))}

          </div>

          <button
            className="onboarding-main-button"
            disabled={!selectedTopic}
            onClick={handleContinue}
          >
            Continue to Dashboard →
          </button>

          <p className="onboarding-note">
            You can change your topic anytime from your dashboard.
          </p>

        </div>

      </div>
    </div>
  );
}

export default TopicSelection;
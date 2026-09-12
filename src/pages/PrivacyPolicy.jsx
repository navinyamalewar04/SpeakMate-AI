import React from "react";

function PrivacyPolicy() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8f9ff",
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
        color: "#222",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          background: "#fff",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
        }}
      >
        <h1 style={{ marginBottom: "10px" }}>
          Privacy Policy
        </h1>

        <p style={{ color: "#777", marginBottom: "30px" }}>
          Last updated: September 2026
        </p>

        <p>
          Welcome to SpeakMate AI. This Privacy Policy explains how we
          collect, use, and protect information when you use our website.
        </p>

        <h2>1. Information We Collect</h2>

        <p>
          When you sign in to SpeakMate AI using Google or email, we may
          receive basic account information such as your name, email address,
          and profile information provided by the authentication provider.
        </p>

        <p>
          SpeakMate AI may also store your practice history, speaking scores,
          feedback, selected English level, and progress information so that
          you can track your learning.
        </p>

        <h2>2. How We Use Your Information</h2>

        <p>
          Your information is used only to provide and improve SpeakMate AI
          features, including authentication, speaking practice, AI feedback,
          maturity challenges, and progress tracking.
        </p>

        <h2>3. Google Sign-In</h2>

        <p>
          SpeakMate AI uses Google OAuth for secure sign-in. We only request
          basic authentication information required to create and access your
          account. We do not access your Google password.
        </p>

        <h2>4. Data Storage</h2>

        <p>
          Authentication and application data may be securely stored using
          third-party cloud services such as Supabase.
        </p>

        <h2>5. Microphone and Speech</h2>

        <p>
          SpeakMate AI may request microphone access when you use speaking
          practice features. Microphone access is used only when you choose to
          practice speaking.
        </p>

        <h2>6. Data Sharing</h2>

        <p>
          We do not sell your personal information. Information may only be
          processed by services required to operate SpeakMate AI.
        </p>

        <h2>7. Security</h2>

        <p>
          We take reasonable steps to protect user information, but no online
          service can guarantee absolute security.
        </p>

        <h2>8. User Choice</h2>

        <p>
          You may stop using SpeakMate AI at any time. If you would like your
          stored account information removed, you may contact the developer.
        </p>

        <h2>9. Changes to This Policy</h2>

        <p>
          This Privacy Policy may be updated as SpeakMate AI develops. Any
          updates will be reflected on this page.
        </p>

        <h2>10. Contact</h2>

        <p>
          If you have questions regarding this Privacy Policy, please contact
          the SpeakMate AI developer through the contact information provided
          with the application.
        </p>

        <p
          style={{
            marginTop: "40px",
            color: "#777",
            fontSize: "14px",
          }}
        >
          © 2026 SpeakMate AI
        </p>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
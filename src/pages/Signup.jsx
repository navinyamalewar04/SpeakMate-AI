import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { supabase } from "../services/supabase";

import "./Login.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async () => {
    const cleanName = name.trim();
    const cleanEmail = email.trim();

    if (!cleanName || !cleanEmail || !password) {
      alert("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const { data, error } =
        await supabase.auth.signUp({
          email: cleanEmail,
          password,
          options: {
            data: {
              name: cleanName,
            },
          },
        });

      if (error) {
        alert(error.message);
        return;
      }

      if (data?.session) {
        alert("Account created successfully! 🎉");

        navigate("/level");
        return;
      }

      alert(
        "Account created! Please check your email and confirm your account before logging in."
      );

      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);

      alert(
        "Something went wrong while creating your account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSignup();
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Create Account 🚀</h1>

        <p>
          Join SpeakMate AI and start practicing with Nexa.
        </p>

        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(event) =>
            setName(event.target.value)
          }
          onKeyDown={handleKeyDown}
          disabled={loading}
        />

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) =>
            setEmail(event.target.value)
          }
          onKeyDown={handleKeyDown}
          disabled={loading}
        />

        <input
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(event) =>
            setPassword(event.target.value)
          }
          onKeyDown={handleKeyDown}
          disabled={loading}
        />

        <button
          onClick={handleSignup}
          disabled={loading}
        >
          {loading
            ? "Creating Account..."
            : "Create Account"}
        </button>

        <p className="auth-switch">
          Already have an account?{" "}
          <span
            onClick={() =>
              navigate("/login")
            }
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
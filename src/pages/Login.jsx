import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { supabase } from "../services/supabase";

import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Email + Password Login
  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      alert("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const { data, error } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

      if (error) {
        alert(error.message);
        return;
      }

      if (!data?.user) {
        alert("Login failed. Please try again.");
        return;
      }

      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);

      alert(
        "Something went wrong while logging in. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) {
        console.error("Google login error:", error);
        alert(error.message);
      }
    } catch (error) {
      console.error("Google login error:", error);

      alert(
        "Something went wrong with Google login. Please try again."
      );
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <h1>
          Welcome Back 👋
        </h1>

        <p>
          Login to continue practicing with Nexa.
        </p>

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
          placeholder="Enter your password"
          value={password}
          onChange={(event) =>
            setPassword(event.target.value)
          }
          onKeyDown={handleKeyDown}
          disabled={loading}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>

        <div className="auth-divider">
          <span>OR</span>
        </div>

        <button
          className="google-login-btn"
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          Continue with Google
        </button>

        <p className="auth-switch">
          Don't have an account?{" "}

          <span
            onClick={() =>
              navigate("/signup")
            }
          >
            Sign up
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;
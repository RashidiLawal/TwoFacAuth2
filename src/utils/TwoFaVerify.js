import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const TwoFactorVerify = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const verify2FA = async () => {
        const response = await fetch("http://localhost:5000/2fa/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ code }),
        });
    
        const data = await response.json();
        if (data.success) {
          alert("2FA Verified!");
          navigate("/dashboard");
        } else {
          alert("Invalid 2FA Code.");
        }
      };
      verify2FA();
    } catch (error) {
      setError("An error occurred while verifying code.");
    }
  };

  return (
    <div className="two-fa-verify">
      <h2>Verify Two-Factor Authentication</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="error-message">{error}</div>}
        <div className="form-group">
          <label htmlFor="code">Enter Verification Code</label>
          <input
            type="text"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter 6-digit code"
            required
          />
        </div>
        <button type="submit">Verify</button>
      </form>
    </div>
  );
};

export default TwoFactorVerify;

import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const TwoFactorSetup = () => {
  const [qrCode, setQrCode] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const setup2FA = async () => {
      try {
        fetch("http://localhost:5000/2fa/setup", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
          .then((res) => res.json())
          .then((data) => setQrCode(data.qrCode));
          navigate("/dashboard");
      } catch (error) {
        console.error('Error setting up 2FA:', error);
      } finally {
        setLoading(false);
      }
    };
    setup2FA();
  }, [navigate]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="two-fa-setup">
      <h2>Scan this QR code with Google Authenticator</h2>
      {qrCode & (
        <div className="qr-code">
        <img src={qrCode} alt="2FA QR Code" />
      </div>
      )}
    </div>
  );
};

export default TwoFactorSetup;

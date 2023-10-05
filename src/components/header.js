import React, { useState, useEffect } from "react";
import { Link, navigate, } from "gatsby";
import Modal from "react-modal";

import Input from "./input";
import Button from "./button";
import Logo from "../images/logos/logo-light.svg";

Modal.setAppElement(`#___gatsby`);

const modalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.58)",
  },
  content: {
    position: "relative",
    top: "auto",
    left: "auto",
    right: "auto",
    bottom: "auto",
    maxWidth: "960px",
    margin: "32px auto",
    padding: 0,
    border: 0,
  },
};

const Header = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const modalCloseTimeout = 300;
  const closeModal = () => {
    setModalOpen(false);
    setTimeout(() => navigate(`/`), modalCloseTimeout);
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Load token from localStorage on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async (e) => {
    try {
      const response = await fetch("https://api.palia.trade/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '* ',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      console.log("data ==>", data);

      if (data.success) {
        // Save token to localStorage
        localStorage.setItem("token", data.token);
        setIsLoggedIn(true);
        closeModal();
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <header className="relative">
      <div className="container mx-auto">
        <div className="flex py-6 justify-between items-center">
          <div className="flex flex-row gap-8 items-center">
            <Link to="/">
              <img className="h-8 w-auto" src={Logo} alt="Logo" />
            </Link>
          </div>
          <div className="flex flex-row gap-4">
            <Button onClick={() => {
              setModalOpen(true)
            }}
              label="Login"
            />
            {isLoggedIn && (
              <Button onClick={handleLogout}
                label="Logout"
              />
            )}
            <Modal
              isOpen={modalOpen}
              onRequestClose={closeModal}
              style={modalStyles}
              contentLabel="Modal"
              closeTimeoutMS={modalCloseTimeout}
            >
              <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="modal-container bg-white w-96 mx-auto p-8 rounded shadow-lg">
                  <h2 className="text-2xl font-semibold mb-4">Login</h2>
                  <form onSubmit={handleLogin}>
                    {/* Add your login form fields here */}
                    <Input
                      label="Username"
                      type="text"
                      placeholder="Enter your username"
                      value={username}
                      onChange={setUsername}
                    />
                    <Input
                      label="Password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={setPassword}
                    />
                    <div className="w-full flex flex-row justify-between">
                      <Button
                        type="submit"
                        label="Login"
                      />
                      <Button
                      className="!bg-red-600"
                        onClick={() => { setModalOpen(false) }}
                        label="Close"
                      />
                    </div>
                  </form>
                </div>
              </div>

            </Modal>
          </div>
        </div >
      </div >
    </header >
  );
};

export default Header;

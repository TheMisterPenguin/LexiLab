import React, { useState, ChangeEvent } from "react";
import { Button, Form, Modal } from "semantic-ui-react";
import database from './firebase.config.js';

interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
}

function Login({ isOpen, onClose }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    const dbRef = database.ref("users");
    dbRef.push({ email, password });
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Modal.Header>Se connecter</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>Nom d'utilisateur</label>
            <input
              name="email"
              required
              type="email"
              className="form-control"
              value={email}
              onChange={handleEmailChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Mot de passe</label>
            <input
              name="pwd"
              required
              type="password"
              className="form-control"
              value={password}
              onChange={handlePasswordChange}
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={onClose}>Annuler</Button>
        <Button
          style={{ backgroundColor: "#FFB155", color: "white" }}
          onClick={handleLogin}
        >
          Se connecter
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default Login;

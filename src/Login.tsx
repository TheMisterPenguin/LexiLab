// Login.tsx

import React from "react";
import { Button, Form, Modal } from "semantic-ui-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const Login = ({ isOpen, onClose }: Props) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Modal.Header>Se connecter</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>Nom d'utilisateur</label>
            <input placeholder="Nom d'utilisateur" />
          </Form.Field>
          <Form.Field>
            <label>Mot de passe</label>
            <input type="password" placeholder="Mot de passe" />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={onClose}>Annuler</Button>
        <Button style={{ backgroundColor: "#FFB155", color: "white" }} >Se connecter</Button>
      </Modal.Actions>
    </Modal>
  );
};

export default Login;

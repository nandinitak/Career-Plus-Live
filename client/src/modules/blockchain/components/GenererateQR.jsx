import React, { Component } from "react";
import QRCode from "qrcode";
import "./Modals.css";
import { Button, Header, Modal } from "semantic-ui-react";
import Web3 from "web3";
export default class GenererateQR extends Component {
  state = {
    qr: "",
  };

  componentDidMount = async () => {
    const web3 = new Web3(window.ethereum);;
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    try {
      const res = await QRCode.toDataURL(accounts[0]);
      this.setState({ qr: res });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <Modal size="tiny" className="modal-des" open={this.props.isOpen}>
        <Header
          className="modal-heading"
          icon="qrcode"
          content="Scan or Download"
          as="h2"
        />
        <Modal.Content className="modal-content pos-middle-qr">
          <a href={this.state.qr} download>
            <img src={this.state.qr} alt="qr"></img>
          </a>
        </Modal.Content>
        <Modal.Actions className="modal-actions">
          <Button
            className="close-button"
            type="button"
            color="red"
            icon="times"
            content="Close"
            onClick={() => this.props.closeQRModal()}
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

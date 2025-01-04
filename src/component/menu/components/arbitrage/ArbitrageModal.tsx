import React from "react";
import { Modal, Button } from "react-bootstrap";

export const ArbitrageModal: React.FC<any> = (props: any) => {
  return (
    <Modal
      className="modal-lg"
      show={props.showVideo}
      onHide={props.handleClose}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Arbitrage Model Video</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="video-container">
          <iframe
            width="100%"
            height="786"
            src="mobicryp-buddy/assets/arbitrage-video.mp4" // Replace with your video URL
            title="Arbitrage Model Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

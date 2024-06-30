import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';

function Room({ room, fromdate, todate }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="row bs">
            <div className="col-md-4">
                <img src={room.imageurls[0]} alt={room.name} className="img-fluid" />
            </div>
            <div className="col-md-7 text-left">
                <h1>{room.name}</h1>
                <b>
                    <p>Max Count: {room.maxCount}</p>
                    <p>Rent Per Day: {room.rentperday}</p>
                    <p>Type: {room.type}</p>
                    <p>Description: {room.description}</p>
                </b>
                <div style={{ float: 'right' }}>
                    {(fromdate && todate) && (
                        <Link to={`/bookingscreen/${room._id}?fromdate=${fromdate}&todate=${todate}`}>
                        <button className='btn btn-primary'>Book Now</button>
                    </Link>
                    )}
                    <button className="btn btn-primary" onClick={handleShow}>View Details</button>
                </div>
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>{room.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Carousel data-bs-theme="dark">
                        {room.imageurls.map((url, index) => (
                            <Carousel.Item key={index}>
                                <img
                                    className="d-block w-100 bigimg"
                                    src={url}
                                    alt={`Slide ${index}`}
                                />
                                <p>{room.description}</p>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Room;

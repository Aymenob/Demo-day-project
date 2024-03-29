import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
const Modals= ({handleSubmit,handleNumber,handleUrl,handleClose,handleShow,show}) => {
     
  return (
    
    <>
    <Button style={{marginLeft:"4cm"}} variant="primary" onClick={handleShow}>
        Add Trailer
    </Button>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Add Trailer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form style={{minWidth:"8cm"}}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>anime Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder=""
                        autoFocus
                        onChange={handleNumber}
                        name="animeName"
                        
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>animePicture</Form.Label>
                    <Form.Control
                        type="url"
                        placeholder=""
                       
                        onChange={handleUrl}
                        name="animePicture"
                    /> 
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>season</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder=""
                        
                        onChange={handleUrl}
                        name="season"
                        min="1"
                    /> 
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>trailer</Form.Label>
                    <Form.Control
                        type="url"
                        placeholder=""
                        
                        onChange={handleUrl}
                        name="trailer"
                    /> 
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>animeDescription</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder=""
                        
                        onChange={handleNumber}
                        name="animeDescription"
                        
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>genre</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder=""
                        
                        onChange={handleNumber}
                        name="genre"
                        
                    />
                </Form.Group>
                
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="success" onClick={handleSubmit}>
                Save Changes
            </Button>
        </Modal.Footer>
    </Modal>
</>
  )
}

export default Modals
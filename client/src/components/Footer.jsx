import React from 'react'
import { Container, Row, Col } from 'reactstrap';

function Footer() {
    return (
        <Container className="position-absolute footer">
            <Row>
                <Col>
                    <p className="text-center">Website by @hadron43</p>
                </Col>
            </Row>
        </Container>
    )
}

export default Footer;
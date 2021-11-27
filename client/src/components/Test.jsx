import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Input, Button, Progress } from 'reactstrap';

// const base = 'https://emoji-pred-backend.herokuapp.com/'
const base = 'http://127.0.0.1:5000/'

function Test({ automatic = false }) {
    const [loading, setLoading] = useState(false)
    const [errMessage, setErrMessage] = useState('')
    const [emojis, setEmojis] = useState([])
    const [confidence, setConfidence] = useState([])
    const [text, setText] = useState('')
    const [lastText, setLastText] = useState('')
    const [lang, setLang] = useState('English')

    const [count, setCount] = useState(0)

    const fetch_emojis = (forced = false) => {
        if(loading || lastText === text || (!automatic && !forced) || !text)
            return
        setLoading(true)

        const textToBeFetched = text.slice()
        setLastText(textToBeFetched)
        setEmojis([])
        console.log(textToBeFetched)

        fetch(base + lang.toLocaleLowerCase() + '/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: textToBeFetched
            })
        })
        .then(response => {
            if(!response.ok)
                throw Error("Unable to reach the server!");
            return response;
        })
        .then(response => response.json())
        .then(({confidence, emoji}) => {
            setEmojis(emoji)
            setConfidence(confidence)
            setErrMessage('')
            setLoading(false)
        })
        .catch(err => {
            setEmojis([])
            setConfidence([])
            console.log(err);
            setErrMessage(err.message)
            setLoading(false)
        });
    }

    useEffect(() => {
        const timer = setTimeout(() => automatic && setCount(count+1), 2000)
        fetch_emojis()
        return () => clearTimeout(timer)
    })

    return (
        <Container className="mt-5">
            <Row>
                <h3>Test Our Model</h3>
            </Row>

            <Row className="my-4">
                <Col>
                <span className="md-2">Language</span>
                <Input
                    id="language"
                    name="language"
                    type="select"
                    value={lang}
                    className="background-light-white text-white"
                    onChange={(e) => setLang(e.target.value)}
                >
                {
                    ['English', 'Hindi', 'Bengali', 'Telegu'].map((item) => {
                        return (
                            <option>{item}</option>
                        )
                    })
                }
                </Input>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Input type="textarea"
                        placeholder="Enter your text message"
                        bsSize="lg"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="background-light-white text-light"/>
                </Col>
            </Row>

            <Row className="mt-3">
                <Col xs={12} className="d-flex">
                    <Button
                        color="success"
                        disabled={loading}
                        size="lg"
                        className="rounded-pill d-flex m-auto px-5"
                        onClick={() => fetch_emojis(true)}
                    >
                        Test
                    </Button>
                </Col>
                <Col xs={12}>
                    <h4 className="text-danger text-center my-2">{errMessage}</h4>
                </Col>
            </Row>

            <Row className="mt-5">
                <Col></Col>
                <Col></Col>
                {
                    emojis.map((emo) => {
                        return (
                            <Col className="text-center">
                            <Button outline color="warning" className="mx-3 mb-3 rounded-pill" size="lg"
                                onClick={() => setText(text + emo)}>
                                <p className="h2 d-flex m-auto">{emo}</p>
                            </Button>
                            <Progress color="success" value={parseInt(parseFloat(confidence[emojis.indexOf(emo)] * 100))} />
                            </Col>
                        )
                    })
                }
                <Col></Col>
                <Col></Col>
            </Row>
        </Container>
    );
}

export default Test;
import React from 'react'
import { Container, Row } from 'reactstrap';

function Description() {
    return (
        <Container className="mt-5">
            <Row>
                <h3>Abstract</h3>
            </Row>
            <Row>
                <p className="text-justify">
                    With the growth of social media and text messaging platforms, emojis are becoming increasingly popular to express emotions. But, very few keyboards have been developed and deployed which help users choose emojis while typing. Moreover, to the best of our knowledge, no such recommendation system has been developed for Indian languages. In this paper, we propose a deep learning based emoji recommendation system – EmojiPred, which can be used for on-the-fly prediction of emojis while typing words from English and a few Indian languages including Hindi, Bengali and Telugu. EmojiPred leverages a combination of both token embeddings and contextual sentence embeddings to appropriately capture semantics and context, for achieving best results. Extensive experiments demonstrate the performance of our model.
                </p>
            </Row>
        </Container>
    );
}

export default Description;
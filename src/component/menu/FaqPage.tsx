import React from 'react';
import { Accordion, Container } from 'react-bootstrap';
import './styles/Faq.css'; // Include custom styles for impressive UI

const FaqPage: React.FC = () => {

    const faqItems = [{
        question: "What is Mobicryp?",
        answer: "Mobicryp is a cryptocurrency platform focused on USDT minting and arbitrage trading. It allows users to earn daily returns by leveraging price differences between markets, such as buying USDT at lower prices in Dubai and selling it at higher prices in India. The platform emphasizes transparency, real-time transactions, and scalability, providing users with passive income opportunities. Mobicryp is backed by a global network and has a strong collaboration with a leading USDT minting company in Hong Kong."
    }]

    return (
        <Container className="my-5 faq-container">
            <h1 className="text-center mb-4">Frequently Asked Questions</h1>
            {
                faqItems.map((item, index) => (
                    <Accordion defaultActiveKey="0" className="faq-accordion" key={index}>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>
                                <h5>{item.question}</h5>
                            </Accordion.Header>
                            <Accordion.Body className="faq-body">
                                <p>
                                    {item.answer}
                                </p>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                ))
            }
        </Container>
    );
};

export default FaqPage;

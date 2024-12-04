import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card } from 'react-bootstrap';

const UsdtPrice = () => {
    const [price, setPrice] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsdtPrice = async () => {
            setPrice(84.09);
            // try {
            //     const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=inr');
            //     setPrice(response.data.tether.inr);
            // } catch (err) {
            //     setError('83.99 USDT');
            // }
        };

        fetchUsdtPrice();
        // Optional: Fetch price every 60 seconds
        const interval = setInterval(fetchUsdtPrice, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Container className="mt-4 ">
            <Card>
                <Card.Body>
                    <Card.Title>Current USDT Price(Public) in India</Card.Title>
                    {error ? (
                        <Card.Text>{error}</Card.Text>
                    ) : (
                        <Card.Text>{price !== null ? `₹${price.toFixed(2)}` : 'Loading...'}</Card.Text>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default UsdtPrice;

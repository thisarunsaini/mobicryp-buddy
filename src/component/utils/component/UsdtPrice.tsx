import { useEffect, useState } from "react";

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
    <h6>
      USDT's Public Price in India &nbsp;
      {error ? (
        <>{error}</>
      ) : (
        <>{price !== null ? `₹${price.toFixed(2)}` : "Loading..."}</>
      )}
    </h6>
  );
};

export default UsdtPrice;

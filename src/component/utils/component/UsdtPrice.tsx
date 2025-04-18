import { useEffect, useState } from "react";

const UsdtPrice = () => {
  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    const fetchUsdtPrice = async () => {
      setPrice(84.09);
    };

    fetchUsdtPrice();
    // Optional: Fetch price every 60 seconds
    const interval = setInterval(fetchUsdtPrice, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <h6>
      USDT's Public Price in India &nbsp;

        <>{price !== null ? `₹${price.toFixed(2)}` : "Loading..."}</>
    </h6>
  );
};

export default UsdtPrice;

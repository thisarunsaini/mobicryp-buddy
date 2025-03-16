import React, { useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May"],
  datasets: [
    {
      label: "Earnings",
      data: [500, 700, 900, 1200, 1500],
      borderColor: "blue",
      backgroundColor: "rgba(0, 123, 255, 0.5)",
    },
  ],
};

const options: any = {
  responsive: true,
  scales: {
    x: {
      type: "category",
      title: {
        display: true,
        text: "Months",
      },
    },
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: "Earnings",
      },
    },
  },
};

const EarningsChart: React.FC = () => {
  const chartRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      // Destroy the chart instance on unmount to prevent canvas reuse issues
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return <Line ref={chartRef} data={data} options={options} />;
};

export default EarningsChart;

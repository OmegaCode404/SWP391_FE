import React, { useState } from "react";
import { Form, DatePicker, Button, Card, message } from "antd";
import axios from "axios";
import useAuth from "./Hooks/useAuth"; // Adjust the import based on your auth implementation
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const { RangePicker } = DatePicker;

const Revenue = () => {
  const { auth } = useAuth(); // Adjust this according to your auth implementation
  const [loading, setLoading] = useState(false);
  const [revenueData, setRevenueData] = useState([]);
  const [year, setYear] = useState(null);
  const userId = auth.id; // Assuming you have userId in your auth object

  const fetchRevenueData = async (url) => {
    setLoading(true);
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`, // Adjust this according to your auth implementation
        },
      });
      setRevenueData(response.data);
    } catch (error) {
      message.error("Failed to fetch revenue data");
      console.error("Failed to fetch revenue data", error);
    } finally {
      setLoading(false);
    }
  };

  const handleYearlyRevenue = () => {
    fetchRevenueData(`http://localhost:8080/api/v1/revenue/yearly/${userId}`);
  };

  const handleMonthlyRevenue = () => {
    if (year) {
      fetchRevenueData(
        `http://localhost:8080/api/v1/revenue/monthly/${year}/${userId}`
      );
    } else {
      message.error("Please select a year");
    }
  };

  const handleDateRangeRevenue = (dates) => {
    if (dates.length === 2) {
      const startDate = dates[0].format("YYYY-MM-DD");
      const endDate = dates[1].format("YYYY-MM-DD");
      fetchRevenueData(
        `http://localhost:8080/api/v1/revenue/range?startDate=${startDate}&endDate=${endDate}&userId=${userId}`
      );
    } else {
      message.error("Please select a valid date range");
    }
  };

  const formatRevenueData = (data) => {
    return Object.entries(data)
      .map(([key, value]) => ({
        period: key,
        revenue: value,
      }))
      .sort((a, b) => {
        const aPeriod = a.period.split(" ");
        const bPeriod = b.period.split(" ");
        if (aPeriod[0] === "Start" || aPeriod[0] === "End") {
          return new Date(a.period) - new Date(b.period);
        }
        const aValue = parseInt(aPeriod[1], 10);
        const bValue = parseInt(bPeriod[1], 10);
        if (aPeriod[0] === bPeriod[0]) {
          return aValue - bValue;
        }
        return aPeriod[0] === "Year" ? -1 : 1;
      });
  };

  const chartData = formatRevenueData(revenueData);

  return (
    <div style={{ padding: "20px" }}>
      <Card title="Revenue Dashboard" bordered>
        <Form layout="inline" style={{ marginBottom: "20px" }}>
          <Form.Item>
            <Button
              type="primary"
              onClick={handleYearlyRevenue}
              loading={loading}
            >
              Yearly Revenue
            </Button>
          </Form.Item>
          <Form.Item>
            <DatePicker
              picker="year"
              onChange={(date) => setYear(date ? date.year() : null)}
              placeholder="Select Year"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              onClick={handleMonthlyRevenue}
              loading={loading}
            >
              Monthly Revenue
            </Button>
          </Form.Item>
          <Form.Item>
            <RangePicker onChange={handleDateRangeRevenue} />
          </Form.Item>
        </Form>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default Revenue;

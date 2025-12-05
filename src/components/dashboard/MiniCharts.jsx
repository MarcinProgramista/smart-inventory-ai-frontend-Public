import styled from "styled-components";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const ChartWrapper = styled.div`
  margin-top: 3rem;
  padding: 2rem;
  border-radius: 14px;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #9deaff;
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  color: #9deaff;
`;

const data = [
  { day: "Mon", incoming: 12, outgoing: 5 },
  { day: "Tue", incoming: 18, outgoing: 11 },
  { day: "Wed", incoming: 9, outgoing: 6 },
  { day: "Thu", incoming: 15, outgoing: 12 },
  { day: "Fri", incoming: 22, outgoing: 19 },
  { day: "Sat", incoming: 8, outgoing: 7 },
  { day: "Sun", incoming: 11, outgoing: 9 },
];

export default function MiniCharts() {
  return (
    <ChartWrapper>
      <Title>Stock Movement (Last 7 Days)</Title>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="day" stroke="#9deaff" />
          <YAxis stroke="#9deaff" />
          <Tooltip
            contentStyle={{
              background: "rgba(0,0,0,0.7)",
              border: "1px solid #9deaff",
              color: "#9deaff",
            }}
          />

          {/* Neon lines */}
          <Line
            type="monotone"
            dataKey="incoming"
            stroke="#00eaff"
            strokeWidth={3}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="outgoing"
            stroke="#ff4f81"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}

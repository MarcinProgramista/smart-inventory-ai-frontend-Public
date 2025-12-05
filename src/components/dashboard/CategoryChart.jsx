import styled from "styled-components";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

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

const COLORS = ["#00eaff", "#ffca28", "#d500f9", "#00e676"];

const data = [
  { name: "Electronics", value: 35 },
  { name: "Tools", value: 25 },
  { name: "Hardware", value: 20 },
  { name: "Office", value: 20 },
];

export default function CategoryChart() {
  return (
    <ChartWrapper>
      <Title>Category Distribution</Title>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={90}
            dataKey="value"
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i]} />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              background: "rgba(0,0,0,0.7)",
              border: "1px solid #9deaff",
              color: "#9deaff",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}

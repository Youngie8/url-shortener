
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


export default function Location({stats}) {
    const cityCount = stats.reduce((acc, item) => {
        acc[item.city] = 1;
    }, {})
  return (
    <div style={{width:'100%', height: 300}}>
        <ResponsiveContainer>
        <LineChart width={700} height={300} data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip labelStyle={{color: 'green'}}/>
            <Legend />
            <Line
                type="monotone"
                dataKey="pv"
                stroke="#8884d8"
            />
        </LineChart>
        </ResponsiveContainer>
    </div>
  );
}

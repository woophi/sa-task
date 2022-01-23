import { GraphModel } from '@core/models';
import { getGraphData } from '@core/operations/graph';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: {
      display: true,
      text: 'U.S population',
    },
  },
};

const shapeData = ({ data }: GraphModel) => ({
  labels: data.map(v => v['ID Year']),
  datasets: [
    {
      label: 'Population (millions)',
      data: data.map(v => v.Population),
      backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9', '#c45850', '#CD5C5C', '#40E0D0'],
    },
  ],
});

export const PopulationGraph = () => {
  const [data, setData] = useState<GraphModel>({ data: [], source: [] });

  useEffect(() => {
    getGraphData()
      .then(r => setData({ ...r.result, data: r.result.data.reverse() }))
      .catch(console.error);
  }, []);
  return <Bar options={options} data={shapeData(data)} />;
};

export default PopulationGraph;

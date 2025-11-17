import { useApp } from '@/contexts/AppContext';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

export const AnalyticsSection = () => {
  const { pockets } = useApp();

  const data = pockets.map((pocket) => ({
    name: pocket.name,
    value: pocket.balance,
    color: pocket.color,
  }));

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-foreground">Pocket Distribution</h3>
      <div className="bg-card rounded-2xl p-6 shadow-card">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 space-y-2">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-foreground">{item.name}</span>
              </div>
              <span className="text-sm font-medium text-foreground">
                {total > 0 ? ((item.value / total) * 100).toFixed(1) : 0}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

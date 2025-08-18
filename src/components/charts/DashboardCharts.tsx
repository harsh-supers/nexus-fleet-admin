import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, PieChart, Pie, Cell, Area, AreaChart, ResponsiveContainer } from "recharts";

// Mock data for charts
const tripsData = [
  { name: "Mon", trips: 45 },
  { name: "Tue", trips: 38 },
  { name: "Wed", trips: 52 },
  { name: "Thu", trips: 41 },
  { name: "Fri", trips: 67 },
  { name: "Sat", trips: 29 },
  { name: "Sun", trips: 23 },
];

const slaBreachData = [
  { month: "Jan", breaches: 12 },
  { month: "Feb", breaches: 8 },
  { month: "Mar", breaches: 15 },
  { month: "Apr", breaches: 6 },
  { month: "May", breaches: 4 },
  { month: "Jun", breaches: 3 },
];

const utilizationData = [
  { name: "Active", value: 78, fill: "hsl(var(--success))" },
  { name: "Idle", value: 15, fill: "hsl(var(--warning))" },
  { name: "Maintenance", value: 7, fill: "hsl(var(--info))" },
];

const topDriversData = [
  { name: "John Smith", score: 98 },
  { name: "Sarah Jones", score: 95 },
  { name: "Mike Wilson", score: 89 },
  { name: "Lisa Brown", score: 87 },
  { name: "Tom Anderson", score: 84 },
];

const incidentData = [
  { name: "Mechanical", value: 35, fill: "hsl(var(--destructive))" },
  { name: "Traffic", value: 28, fill: "hsl(var(--warning))" },
  { name: "Weather", value: 20, fill: "hsl(var(--info))" },
  { name: "Other", value: 17, fill: "hsl(var(--muted))" },
];

const orderVolumeData = [
  { client: "TechCorp", orders: 145 },
  { client: "GlobalLog", orders: 128 },
  { client: "RetailPlus", orders: 89 },
  { client: "MedSupply", orders: 67 },
  { client: "FoodDist", orders: 54 },
];

const chartConfig = {
  trips: {
    label: "Trips",
    color: "hsl(var(--primary))",
  },
  breaches: {
    label: "SLA Breaches",
    color: "hsl(var(--destructive))",
  },
  score: {
    label: "Performance Score",
    color: "hsl(var(--success))",
  },
  orders: {
    label: "Orders",
    color: "hsl(var(--info))",
  },
};

export function TripsCompletedChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Trips Completed - This Week</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={tripsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="trips" fill="var(--color-trips)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function SLABreachesChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>SLA Breaches Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={slaBreachData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area 
                type="monotone" 
                dataKey="breaches" 
                stroke="var(--color-breaches)" 
                fill="var(--color-breaches)"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function VehicleUtilizationChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vehicle Utilization Rate</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={utilizationData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {utilizationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function TopDriversChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top 5 Drivers by Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topDriversData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[80, 100]} />
              <YAxis dataKey="name" type="category" width={100} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="score" fill="var(--color-score)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function IncidentDistributionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Incident Distribution by Type</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={incidentData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {incidentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function OrderVolumeChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Volume by Client</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={orderVolumeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="client" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="orders" fill="var(--color-orders)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
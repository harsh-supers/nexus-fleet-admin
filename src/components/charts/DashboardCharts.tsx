import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, PieChart, Pie, Cell, Area, AreaChart, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { Calendar, Filter } from "lucide-react";

// Enhanced mock data with more realistic values
const tripsData = [
  { name: "Mon", trips: 45, completed: 42, cancelled: 3 },
  { name: "Tue", trips: 38, completed: 36, cancelled: 2 },
  { name: "Wed", trips: 52, completed: 48, cancelled: 4 },
  { name: "Thu", trips: 41, completed: 39, cancelled: 2 },
  { name: "Fri", trips: 67, completed: 62, cancelled: 5 },
  { name: "Sat", trips: 29, completed: 27, cancelled: 2 },
  { name: "Sun", trips: 23, completed: 22, cancelled: 1 },
];

const slaBreachData = [
  { month: "Jan", breaches: 12, percentage: 2.4 },
  { month: "Feb", breaches: 8, percentage: 1.6 },
  { month: "Mar", breaches: 15, percentage: 3.1 },
  { month: "Apr", breaches: 6, percentage: 1.2 },
  { month: "May", breaches: 4, percentage: 0.8 },
  { month: "Jun", breaches: 3, percentage: 0.6 },
];

const utilizationData = [
  { name: "Active", value: 78, count: 122 },
  { name: "Idle", value: 15, count: 23 },
  { name: "Maintenance", value: 7, count: 11 },
];

const topDriversData = [
  { name: "John Smith", score: 98, trips: 156 },
  { name: "Sarah Jones", score: 95, trips: 143 },
  { name: "Mike Wilson", score: 89, trips: 134 },
  { name: "Lisa Brown", score: 87, trips: 128 },
  { name: "Tom Anderson", score: 84, trips: 119 },
];

const incidentData = [
  { name: "Mechanical", value: 35, count: 14 },
  { name: "Traffic", value: 28, count: 11 },
  { name: "Weather", value: 20, count: 8 },
  { name: "Other", value: 17, count: 7 },
];

const orderVolumeData = [
  { client: "TechCorp", orders: 145, revenue: 12400 },
  { client: "GlobalLog", orders: 128, revenue: 10800 },
  { client: "RetailPlus", orders: 89, revenue: 7600 },
  { client: "MedSupply", orders: 67, revenue: 5900 },
  { client: "FoodDist", orders: 54, revenue: 4800 },
];

// Enhanced chart configuration with proper colors
const chartConfig = {
  trips: {
    label: "Total Trips",
    color: "hsl(var(--primary))",
  },
  completed: {
    label: "Completed",
    color: "hsl(var(--success))",
  },
  cancelled: {
    label: "Cancelled",
    color: "hsl(var(--destructive))",
  },
  breaches: {
    label: "SLA Breaches",
    color: "hsl(var(--destructive))",
  },
  percentage: {
    label: "Breach Rate %",
    color: "hsl(var(--warning))",
  },
  score: {
    label: "Performance Score",
    color: "hsl(var(--success))",
  },
  orders: {
    label: "Orders",
    color: "hsl(var(--info))",
  },
  revenue: {
    label: "Revenue ($)",
    color: "hsl(var(--primary))",
  },
};

// Custom colors for pie charts
const COLORS = {
  active: "hsl(var(--success))",
  idle: "hsl(var(--warning))",
  maintenance: "hsl(var(--info))",
  mechanical: "hsl(var(--destructive))",
  traffic: "hsl(var(--warning))",
  weather: "hsl(var(--info))",
  other: "hsl(var(--muted))",
};

export function TripsCompletedChart() {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-base font-semibold">Trips Completed - This Week</CardTitle>
          <p className="text-sm text-muted-foreground">Daily trip completion overview</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8">
            <Calendar className="w-3 h-3 mr-1" />
            Week
          </Button>
          <Button variant="ghost" size="sm" className="h-8">
            <Filter className="w-3 h-3" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <ChartContainer config={chartConfig} className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={tripsData} margin={{ top: 10, right: 10, left: 10, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" opacity={0.3} />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                axisLine={{ stroke: "hsl(var(--muted))" }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                axisLine={{ stroke: "hsl(var(--muted))" }}
                label={{ value: 'Trips', angle: -90, position: 'insideLeft' }}
              />
              <ChartTooltip 
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-background border rounded-lg p-3 shadow-lg">
                        <p className="font-medium">{label}</p>
                        {payload.map((entry, index) => (
                          <p key={index} className="text-sm" style={{ color: entry.color }}>
                            {entry.dataKey}: {entry.value}
                          </p>
                        ))}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="completed" fill="var(--color-completed)" radius={[2, 2, 0, 0]} />
              <Bar dataKey="cancelled" fill="var(--color-cancelled)" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function SLABreachesChart() {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-base font-semibold">SLA Breaches Over Time</CardTitle>
          <p className="text-sm text-muted-foreground">Monitor service level agreement performance</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8">
            <Calendar className="w-3 h-3 mr-1" />
            6M
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <ChartContainer config={chartConfig} className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={slaBreachData} margin={{ top: 10, right: 10, left: 10, bottom: 40 }}>
              <defs>
                <linearGradient id="colorBreaches" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" opacity={0.3} />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                axisLine={{ stroke: "hsl(var(--muted))" }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                axisLine={{ stroke: "hsl(var(--muted))" }}
                label={{ value: 'Breaches', angle: -90, position: 'insideLeft' }}
              />
              <ChartTooltip 
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-background border rounded-lg p-3 shadow-lg">
                        <p className="font-medium">{label}</p>
                        <p className="text-sm text-destructive">
                          Breaches: {payload[0]?.value}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Rate: {payload[0]?.payload?.percentage}%
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area 
                type="monotone" 
                dataKey="breaches" 
                stroke="hsl(var(--destructive))" 
                strokeWidth={2}
                fill="url(#colorBreaches)"
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
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Vehicle Utilization Rate</CardTitle>
        <p className="text-sm text-muted-foreground">Current fleet status distribution</p>
      </CardHeader>
      <CardContent className="pt-2">
        <ChartContainer config={{}} className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={utilizationData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {utilizationData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={
                      entry.name === "Active" ? COLORS.active :
                      entry.name === "Idle" ? COLORS.idle :
                      COLORS.maintenance
                    } 
                  />
                ))}
              </Pie>
              <ChartTooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-background border rounded-lg p-3 shadow-lg">
                        <p className="font-medium">{data.name}</p>
                        <p className="text-sm">Percentage: {data.value}%</p>
                        <p className="text-sm">Vehicles: {data.count}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <ChartLegend 
                content={({ payload }) => (
                  <div className="flex justify-center gap-4 mt-4">
                    {payload?.map((entry, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-sm text-muted-foreground">{entry.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function TopDriversChart() {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Top 5 Drivers by Performance</CardTitle>
        <p className="text-sm text-muted-foreground">Best performing drivers this month</p>
      </CardHeader>
      <CardContent className="pt-2">
        <ChartContainer config={chartConfig} className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={topDriversData} 
              layout="horizontal"
              margin={{ top: 10, right: 20, left: 80, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" opacity={0.3} />
              <XAxis 
                type="number" 
                domain={[80, 100]} 
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                axisLine={{ stroke: "hsl(var(--muted))" }}
                label={{ value: 'Performance Score', position: 'insideBottom', offset: -10 }}
              />
              <YAxis 
                dataKey="name" 
                type="category" 
                width={80}
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                axisLine={{ stroke: "hsl(var(--muted))" }}
              />
              <ChartTooltip 
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-background border rounded-lg p-3 shadow-lg">
                        <p className="font-medium">{label}</p>
                        <p className="text-sm text-success">Score: {data.score}</p>
                        <p className="text-sm text-muted-foreground">Trips: {data.trips}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar 
                dataKey="score" 
                fill="hsl(var(--success))" 
                radius={[0, 4, 4, 0]}
                stroke="hsl(var(--success))"
                strokeWidth={1}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function IncidentDistributionChart() {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Incident Distribution by Type</CardTitle>
        <p className="text-sm text-muted-foreground">Breakdown of incident categories</p>
      </CardHeader>
      <CardContent className="pt-2">
        <ChartContainer config={{}} className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={incidentData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
                labelLine={false}
              >
                {incidentData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={
                      entry.name === "Mechanical" ? COLORS.mechanical :
                      entry.name === "Traffic" ? COLORS.traffic :
                      entry.name === "Weather" ? COLORS.weather :
                      COLORS.other
                    } 
                  />
                ))}
              </Pie>
              <ChartTooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-background border rounded-lg p-3 shadow-lg">
                        <p className="font-medium">{data.name}</p>
                        <p className="text-sm">Percentage: {data.value}%</p>
                        <p className="text-sm">Count: {data.count} incidents</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function OrderVolumeChart() {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-base font-semibold">Order Volume by Client</CardTitle>
          <p className="text-sm text-muted-foreground">Top client orders this month</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8">
            <Calendar className="w-3 h-3 mr-1" />
            Month
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <ChartContainer config={chartConfig} className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={orderVolumeData}
              margin={{ top: 10, right: 10, left: 10, bottom: 40 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" opacity={0.3} />
              <XAxis 
                dataKey="client" 
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                axisLine={{ stroke: "hsl(var(--muted))" }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                axisLine={{ stroke: "hsl(var(--muted))" }}
                label={{ value: 'Orders', angle: -90, position: 'insideLeft' }}
              />
              <ChartTooltip 
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-background border rounded-lg p-3 shadow-lg">
                        <p className="font-medium">{label}</p>
                        <p className="text-sm text-info">Orders: {data.orders}</p>
                        <p className="text-sm text-muted-foreground">Revenue: ${data.revenue.toLocaleString()}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar 
                dataKey="orders" 
                fill="hsl(var(--info))" 
                radius={[4, 4, 0, 0]}
                stroke="hsl(var(--info))"
                strokeWidth={1}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
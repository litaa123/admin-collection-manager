import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PlusCircle, FileText, Edit, Users, Video, Music, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart";
import { 
  Bar, 
  BarChart,
  Line, 
  LineChart, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer 
} from "recharts";
import { useCollectionStore } from "@/lib/store";

const Index = () => {
  const collections = useCollectionStore((state) => state.collections);
  
  // Count collections by category
  const videosCount = collections.filter(c => c.category === "video").length;
  const audioCount = collections.filter(c => c.category === "audio").length;
  const hadistCount = collections.filter(c => c.category === "hadist").length;

  // Mock visitor data for statistics
  const visitorData = [
    { name: "Sen", visitors: 120 },
    { name: "Sel", visitors: 230 },
    { name: "Rab", visitors: 310 },
    { name: "Kam", visitors: 270 },
    { name: "Jum", visitors: 350 },
    { name: "Sab", visitors: 410 },
    { name: "Ming", visitors: 320 }
  ];

  const monthlyData = [
    { name: "Jan", visitors: 1200 },
    { name: "Feb", visitors: 1900 },
    { name: "Mar", visitors: 2100 },
    { name: "Apr", visitors: 2400 },
    { name: "Mei", visitors: 1800 },
    { name: "Jun", visitors: 2800 }
  ];

  // Prepare data for collection type chart
  const collectionTypeData = [
    { name: "Video", value: videosCount, fill: "#3b82f6" },
    { name: "Audio", value: audioCount, fill: "#8b5cf6" },
    { name: "Hadist", value: hadistCount, fill: "#22c55e" }
  ];

  const features = [
    {
      title: "Tambah Koleksi",
      description: "Menambahkan koleksi baru untuk konten video, audio, dan hadist.",
      icon: PlusCircle,
      color: "bg-blue-500",
      link: "/create",
    },
    {
      title: "Lihat Koleksi",
      description: "Melihat semua koleksi yang telah ditambahkan.",
      icon: FileText,
      color: "bg-indigo-500",
      link: "/collections",
    },
    {
      title: "Edit Koleksi",
      description: "Mengedit koleksi yang sudah ada.",
      icon: Edit,
      color: "bg-violet-500",
      link: "/collections",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 px-4 pt-16 pb-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <span className="text-2xl font-semibold text-purple-700">Daarul Ilmi</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl"
          >
            <span className="block">Panel Admin</span>
            <span className="block text-blue-600 mt-2">Pengelolaan Konten</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 max-w-lg mx-auto text-xl text-gray-500"
          >
            Kelola semua konten video, audio, dan hadist dengan mudah
          </motion.p>
        </div>

        {/* Statistics Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium">Pengunjung Hari Ini</CardTitle>
                <Users className="h-5 w-5 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">320</div>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  +14% dari kemarin
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium">Total Koleksi</CardTitle>
                <FileText className="h-5 w-5 text-indigo-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{collections.length}</div>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                    <span className="text-xs">{videosCount} Video</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                    <span className="text-xs">{audioCount} Audio</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span className="text-xs">{hadistCount} Hadist</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium">Pengunjung Bulan Ini</CardTitle>
                <Users className="h-5 w-5 text-violet-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">10,245</div>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  +23% dari bulan lalu
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Kunjungan Mingguan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ChartContainer 
                    config={{
                      visitors: {
                        label: "Pengunjung",
                        color: "#4f46e5"
                      }
                    }}
                  >
                    <BarChart data={visitorData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip 
                        content={<ChartTooltipContent />} 
                        cursor={{fill: 'rgba(200, 200, 200, 0.1)'}} 
                      />
                      <Bar 
                        dataKey="visitors" 
                        name="visitors" 
                        fill="var(--color-visitors, #4f46e5)" 
                        radius={[4, 4, 0, 0]} 
                      />
                    </BarChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Tren Kunjungan Bulanan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ChartContainer 
                    config={{
                      visitors: {
                        label: "Pengunjung",
                        color: "#8b5cf6"
                      }
                    }}
                  >
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip 
                        content={<ChartTooltipContent />} 
                        cursor={{fill: 'rgba(200, 200, 200, 0.1)'}} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="visitors" 
                        name="visitors" 
                        stroke="var(--color-visitors, #8b5cf6)" 
                        strokeWidth={2} 
                        dot={{ r: 4 }} 
                        activeDot={{ r: 6 }} 
                      />
                    </LineChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
            >
              <Link to={feature.link} className="block">
                <div className="glass-card rounded-xl p-6 h-full hover-lift transition-all overflow-hidden group">
                  <div
                    className={`${feature.color} rounded-full p-3 inline-flex mb-5 text-white shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    <feature.icon size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500">{feature.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;

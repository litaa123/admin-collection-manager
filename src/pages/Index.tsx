
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PlusCircle, FileText, Edit, Users, Video, Music, BookOpen, Bell, Mail, LogOut } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
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
  const navigate = useNavigate();
  
  // Count collections by category
  const videosCount = collections.filter(c => c.category === "video").length;
  const audioCount = collections.filter(c => c.category === "audio").length;
  const hadistCount = collections.filter(c => c.category === "hadist").length;

  const handleLogout = () => {
    // In a real application, this would clear authentication state
    toast.success("Anda berhasil logout", {
      description: "Terima kasih telah menggunakan Admin Daarul Ilmi"
    });
    
    // Redirect to home page after logout
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

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
      color: "bg-yellow-500",
      link: "/create",
    },
    {
      title: "Lihat Koleksi",
      description: "Melihat semua koleksi yang telah ditambahkan.",
      icon: FileText,
      color: "bg-purple-500",
      link: "/collections",
    },
    {
      title: "Edit Koleksi",
      description: "Mengedit koleksi yang sudah ada.",
      icon: Edit,
      color: "bg-pink-500",
      link: "/collections",
    },
  ];

  // Stats cards for the dashboard
  const statsCards = [
    {
      title: "Koleksi Video",
      value: videosCount,
      color: "bg-yellow-400",
      percent: "83%",
      icon: Video
    },
    {
      title: "Koleksi Audio",
      value: audioCount,
      color: "bg-purple-500",
      percent: "77%",
      icon: Music
    },
    {
      title: "Koleksi Hadist",
      value: hadistCount,
      color: "bg-pink-500",
      percent: "91%",
      icon: BookOpen
    },
    {
      title: "Total Pengunjung",
      value: "126",
      color: "bg-purple-300",
      percent: "",
      icon: Users
    }
  ];

  return (
    <div className="min-h-screen bg-yellow-100 px-4 pt-10 pb-16">
      <div className="max-w-7xl mx-auto">
        {/* Header with user welcome message */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <span className="bg-purple-600 text-white p-2 rounded-lg font-bold">Admin</span>
            <span className="font-bold text-xl text-purple-800">Daarul Ilmi</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full bg-white/80 hover:bg-white">
              <Mail size={20} className="text-gray-600" />
            </button>
            <button className="p-2 rounded-full bg-white/80 hover:bg-white">
              <Bell size={20} className="text-gray-600" />
            </button>
            <div className="flex items-center gap-2 bg-purple-200 p-1 pl-2 pr-3 rounded-full">
              <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
                A
              </div>
              <span className="text-sm font-medium text-purple-900">Admin</span>
            </div>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleLogout}
              className="flex items-center gap-1.5 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>

        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-purple-200 rounded-xl p-6 mb-8 relative overflow-hidden"
        >
          <div className="flex flex-col md:flex-row gap-6 justify-between">
            <div className="z-10 md:w-full">
              <h1 className="text-3xl font-bold text-purple-900">Hi, Admin</h1>
              <p className="mt-2 text-purple-800">
                Siap untuk mengelola konten Daarul Ilmi hari ini?
              </p>
              <Link to="/create" className="mt-4 inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-medium py-2 px-4 rounded-lg transition-colors">
                <PlusCircle size={18} />
                Tambah Koleksi Baru
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {statsCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className={`${stat.color} border-none shadow-md hover:shadow-lg transition-shadow`}>
                <CardContent className="p-4 flex flex-col">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-white/90 font-medium">{stat.title}</div>
                    <stat.icon className="text-white/80" size={18} />
                  </div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  {stat.percent && (
                    <div className="text-sm text-white/90 mt-1">{stat.percent} Selesai</div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Feature Cards Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-xl font-bold text-purple-900 mb-4">Kelola Konten</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Link to={feature.link} className="block">
                  <div className="bg-white rounded-xl p-6 h-full transition-all overflow-hidden group border border-transparent hover:border-purple-200 shadow-sm hover:shadow-md">
                    <div
                      className={`${feature.color} rounded-full p-3 inline-flex mb-4 text-white shadow-md`}
                    >
                      <feature.icon size={24} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Content Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-purple-900">Konten Terbaru</h2>
            <Link to="/collections" className="text-purple-600 hover:text-purple-800 text-sm font-medium">
              Lihat Semua
            </Link>
          </div>
          
          {collections.length > 0 ? (
            <div className="space-y-4">
              {collections.slice(0, 3).map((collection) => (
                <div key={collection.id} className="bg-white rounded-lg shadow-sm hover:shadow-md p-4 transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                      <img 
                        src={collection.coverImage} 
                        alt={collection.title} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://via.placeholder.com/80";
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{collection.title}</h3>
                      <p className="text-sm text-gray-500 line-clamp-1">{collection.summary}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`inline-block w-2 h-2 rounded-full ${
                          collection.category === 'video' ? 'bg-yellow-500' : 
                          collection.category === 'audio' ? 'bg-purple-500' : 'bg-pink-500'
                        }`}></span>
                        <span className="text-xs capitalize text-gray-600">{collection.category}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link 
                        to={`/edit/${collection.id}`} 
                        className="p-2 text-gray-500 hover:text-purple-600 rounded-full hover:bg-purple-50"
                      >
                        <Edit size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg p-8 text-center">
              <div className="text-gray-500">Belum ada koleksi yang ditambahkan</div>
              <Link 
                to="/create"
                className="mt-4 inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                <PlusCircle size={18} />
                Tambah Koleksi
              </Link>
            </div>
          )}
        </motion.div>

        {/* Statistics Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-purple-900">Statistik Kunjungan</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-gray-900">Kunjungan Mingguan</CardTitle>
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
                    <BarChart data={visitorData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip 
                        content={<ChartTooltipContent />} 
                        cursor={{fill: 'rgba(139, 92, 246, 0.1)'}} 
                      />
                      <Bar 
                        dataKey="visitors" 
                        name="visitors" 
                        fill="var(--color-visitors, #8b5cf6)" 
                        radius={[4, 4, 0, 0]} 
                      />
                    </BarChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-gray-900">Tren Kunjungan Bulanan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ChartContainer 
                    config={{
                      visitors: {
                        label: "Pengunjung",
                        color: "#ec4899"
                      }
                    }}
                  >
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip 
                        content={<ChartTooltipContent />} 
                        cursor={{fill: 'rgba(236, 72, 153, 0.1)'}} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="visitors" 
                        name="visitors" 
                        stroke="var(--color-visitors, #ec4899)" 
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
      </div>
    </div>
  );
};

export default Index;

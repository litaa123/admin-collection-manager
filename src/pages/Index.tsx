
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PlusCircle, FileText, Edit } from "lucide-react";

const Index = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 px-4 pt-24 pb-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
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
            className="mt-6 max-w-lg mx-auto text-xl text-gray-500"
          >
            Kelola semua konten video, audio, dan hadist dengan mudah
          </motion.p>
        </div>

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

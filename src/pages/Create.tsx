
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCollectionStore } from "@/lib/store";
import { Category, CollectionFormData } from "@/lib/types";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Check, Film, Music, Book, ImagePlus, Link, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const initialFormData: CollectionFormData = {
  title: "",
  category: "video",
  link: "",
  summary: "",
  coverImage: "",
  speaker: "",
};

const Create = () => {
  const navigate = useNavigate();
  const addCollection = useCollectionStore((state) => state.addCollection);
  const [formData, setFormData] = useState<CollectionFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Set image preview when coverImage URL changes
    if (name === "coverImage" && value) {
      setImagePreview(value);
    }
  };

  const handleCategoryChange = (value: Category) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simple validation
    if (!formData.title || !formData.link || !formData.coverImage || !formData.speaker) {
      toast.error("Mohon lengkapi semua field yang diperlukan");
      setIsSubmitting(false);
      return;
    }

    try {
      addCollection(formData);
      toast.success("Koleksi berhasil ditambahkan!");
      navigate("/collections");
    } catch (error) {
      console.error("Error adding collection:", error);
      toast.error("Terjadi kesalahan saat menambahkan koleksi");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };

  return (
    <Layout
      title="Tambah Koleksi Baru"
      subtitle="Tambahkan konten baru ke dalam sistem perpustakaan digital Anda"
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Form Column */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            custom={0}
            className="flex flex-col space-y-6"
          >
            <Card className="glass-card border-none shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-4 border-b border-blue-200">
                <h3 className="text-lg font-semibold text-blue-800">Detail Koleksi</h3>
              </div>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <motion.div className="space-y-2" variants={fadeIn} custom={1}>
                    <Label htmlFor="title" className="text-sm font-medium">
                      Judul
                    </Label>
                    <div className="relative">
                      <Input
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Masukkan judul konten"
                        className="pl-9 transition-all focus:ring-2 focus:ring-blue-500"
                        required
                      />
                      <span className="absolute left-3 top-2.5 text-blue-500">
                        <Book className="h-4 w-4" />
                      </span>
                    </div>
                  </motion.div>

                  <motion.div className="space-y-2" variants={fadeIn} custom={2}>
                    <Label className="text-sm font-medium">Kategori</Label>
                    <ToggleGroup
                      type="single"
                      value={formData.category}
                      onValueChange={(value) => handleCategoryChange(value as Category)}
                      className="grid grid-cols-3 gap-2"
                    >
                      <ToggleGroupItem 
                        value="video" 
                        aria-label="Video"
                        className={`flex items-center justify-center py-2 ${formData.category === 'video' ? 'bg-blue-100 text-blue-700' : ''}`}
                      >
                        <Film className="h-4 w-4 mr-2" />
                        <span>Video</span>
                      </ToggleGroupItem>
                      
                      <ToggleGroupItem 
                        value="audio" 
                        aria-label="Audio"
                        className={`flex items-center justify-center py-2 ${formData.category === 'audio' ? 'bg-purple-100 text-purple-700' : ''}`}
                      >
                        <Music className="h-4 w-4 mr-2" />
                        <span>Audio</span>
                      </ToggleGroupItem>
                      
                      <ToggleGroupItem 
                        value="hadist" 
                        aria-label="Hadist"
                        className={`flex items-center justify-center py-2 ${formData.category === 'hadist' ? 'bg-green-100 text-green-700' : ''}`}
                      >
                        <Book className="h-4 w-4 mr-2" />
                        <span>Hadist</span>
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </motion.div>

                  <motion.div className="space-y-2" variants={fadeIn} custom={3}>
                    <Label htmlFor="link" className="text-sm font-medium">
                      Link Tautan
                    </Label>
                    <div className="relative">
                      <Input
                        id="link"
                        name="link"
                        value={formData.link}
                        onChange={handleChange}
                        placeholder="https://example.com/video"
                        className="pl-9 transition-all focus:ring-2 focus:ring-blue-500"
                        required
                      />
                      <span className="absolute left-3 top-2.5 text-blue-500">
                        <Link className="h-4 w-4" />
                      </span>
                    </div>
                  </motion.div>

                  <motion.div className="space-y-2" variants={fadeIn} custom={4}>
                    <Label htmlFor="summary" className="text-sm font-medium">
                      Rangkuman
                    </Label>
                    <Textarea
                      id="summary"
                      name="summary"
                      value={formData.summary}
                      onChange={handleChange}
                      placeholder="Masukkan rangkuman konten"
                      className="resize-none h-24 transition-all focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </motion.div>

                  <motion.div className="space-y-2" variants={fadeIn} custom={5}>
                    <Label htmlFor="speaker" className="text-sm font-medium">
                      Pemateri
                    </Label>
                    <div className="relative">
                      <Input
                        id="speaker"
                        name="speaker"
                        value={formData.speaker}
                        onChange={handleChange}
                        placeholder="Nama pemateri"
                        className="pl-9 transition-all focus:ring-2 focus:ring-blue-500"
                        required
                      />
                      <span className="absolute left-3 top-2.5 text-blue-500">
                        <User className="h-4 w-4" />
                      </span>
                    </div>
                  </motion.div>

                  <motion.div className="pt-2" variants={fadeIn} custom={6}>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-2 transition-all hover:shadow-lg flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        "Menyimpan..."
                      ) : (
                        <>
                          <Check className="h-4 w-4" /> Simpan Koleksi
                        </>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Preview Column */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            custom={1}
            className="flex flex-col space-y-6"
          >
            <Card className="glass-card border-none shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 border-b border-purple-200">
                <h3 className="text-lg font-semibold text-purple-800">Pratinjau Gambar</h3>
              </div>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <Label htmlFor="coverImage" className="text-sm font-medium">
                    URL Gambar Cover
                  </Label>
                  <div className="relative">
                    <Input
                      id="coverImage"
                      name="coverImage"
                      value={formData.coverImage}
                      onChange={handleChange}
                      placeholder="https://example.com/image.jpg"
                      className="pl-9 transition-all focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <span className="absolute left-3 top-2.5 text-blue-500">
                      <ImagePlus className="h-4 w-4" />
                    </span>
                  </div>

                  <div className="mt-4 bg-gray-50 rounded-lg p-4">
                    <Label className="text-sm font-medium mb-2 block">Pratinjau Gambar</Label>
                    <div className="aspect-video relative rounded-lg overflow-hidden border-2 border-dashed border-gray-300 bg-gray-100 flex items-center justify-center">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                          onError={() => setImagePreview(null)}
                        />
                      ) : (
                        <div className="text-center p-4">
                          <ImagePlus className="h-12 w-12 mx-auto text-gray-400" />
                          <p className="text-sm text-gray-500 mt-2">
                            Masukkan URL gambar untuk melihat pratinjau
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 bg-blue-50 rounded-lg p-4">
                    <h4 className="font-medium text-blue-700 mb-2">Tips Menambahkan Koleksi</h4>
                    <ul className="text-sm text-blue-600 space-y-2">
                      <li className="flex items-start">
                        <Check className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                        Pastikan judul ringkas namun menjelaskan isi konten
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                        Gunakan URL gambar yang valid dan beresolusi tinggi
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                        Tambahkan rangkuman yang informatif tentang konten
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Create;

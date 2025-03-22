
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCollectionStore } from "@/lib/store";
import { Category, CollectionFormData } from "@/lib/types";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Check, Film, Music, Book, ImagePlus, Link as LinkIcon, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const Edit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const getCollection = useCollectionStore((state) => state.getCollection);
  const updateCollection = useCollectionStore((state) => state.updateCollection);
  
  const [formData, setFormData] = useState<CollectionFormData>({
    title: "",
    category: "video",
    link: "",
    summary: "",
    coverImage: "",
    speaker: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const collection = getCollection(id);
      if (collection) {
        setFormData({
          title: collection.title,
          category: collection.category,
          link: collection.link,
          summary: collection.summary,
          coverImage: collection.coverImage,
          speaker: collection.speaker,
        });
        setImagePreview(collection.coverImage);
      } else {
        toast.error("Koleksi tidak ditemukan");
        navigate("/collections");
      }
    }
  }, [id, getCollection, navigate]);

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
      if (id) {
        updateCollection(id, formData);
        toast.success("Koleksi berhasil diperbarui");
        navigate("/collections");
      }
    } catch (error) {
      console.error("Error updating collection:", error);
      toast.error("Terjadi kesalahan saat memperbarui koleksi");
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
      title="Edit Koleksi"
      subtitle="Perbarui informasi koleksi yang telah ada"
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
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 border-b border-purple-200">
                <h3 className="text-lg font-semibold text-purple-800">Detail Koleksi</h3>
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
                        className="pl-9 transition-all focus:ring-2 focus:ring-purple-500"
                        required
                      />
                      <span className="absolute left-3 top-2.5 text-purple-500">
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
                        className={`flex items-center justify-center py-2 ${formData.category === 'video' ? 'bg-yellow-100 text-yellow-700' : ''}`}
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
                        className={`flex items-center justify-center py-2 ${formData.category === 'hadist' ? 'bg-pink-100 text-pink-700' : ''}`}
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
                        className="pl-9 transition-all focus:ring-2 focus:ring-purple-500"
                        required
                      />
                      <span className="absolute left-3 top-2.5 text-purple-500">
                        <LinkIcon className="h-4 w-4" />
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
                      className="resize-none h-24 transition-all focus:ring-2 focus:ring-purple-500"
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
                        className="pl-9 transition-all focus:ring-2 focus:ring-purple-500"
                        required
                      />
                      <span className="absolute left-3 top-2.5 text-purple-500">
                        <User className="h-4 w-4" />
                      </span>
                    </div>
                  </motion.div>

                  <motion.div className="pt-2" variants={fadeIn} custom={6}>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white py-2 transition-all hover:shadow-lg flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        "Menyimpan..."
                      ) : (
                        <>
                          <Check className="h-4 w-4" /> Perbarui Koleksi
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
              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-4 border-b border-yellow-200">
                <h3 className="text-lg font-semibold text-yellow-800">Pratinjau Gambar</h3>
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
                      className="pl-9 transition-all focus:ring-2 focus:ring-yellow-500"
                      required
                    />
                    <span className="absolute left-3 top-2.5 text-yellow-500">
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

                  <div className="mt-6 bg-purple-50 rounded-lg p-4">
                    <h4 className="font-medium text-purple-700 mb-2">Tips Mengedit Koleksi</h4>
                    <ul className="text-sm text-purple-600 space-y-2">
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

export default Edit;

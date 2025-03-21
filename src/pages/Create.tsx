
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCollectionStore } from "@/lib/store";
import { Category, CollectionFormData } from "@/lib/types";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      navigate("/collections");
    } catch (error) {
      console.error("Error adding collection:", error);
      toast.error("Terjadi kesalahan saat menambahkan koleksi");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout
      title="Tambah Koleksi Baru"
      subtitle="Tambahkan konten baru ke dalam sistem"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <Card className="glass-card border-none shadow-md">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium">
                  Judul
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Masukkan judul konten"
                  className="transition-all focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Kategori</Label>
                <RadioGroup
                  value={formData.category}
                  onValueChange={(value) => handleCategoryChange(value as Category)}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="video"
                      id="video"
                      className="text-blue-500"
                    />
                    <Label htmlFor="video">Video</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="audio"
                      id="audio"
                      className="text-blue-500"
                    />
                    <Label htmlFor="audio">Audio</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="hadist"
                      id="hadist"
                      className="text-blue-500"
                    />
                    <Label htmlFor="hadist">Hadist</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="link" className="text-sm font-medium">
                  Link Tautan
                </Label>
                <Input
                  id="link"
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  placeholder="https://example.com/video"
                  className="transition-all focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="space-y-2">
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="coverImage" className="text-sm font-medium">
                  URL Gambar Cover
                </Label>
                <Input
                  id="coverImage"
                  name="coverImage"
                  value={formData.coverImage}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="transition-all focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="speaker" className="text-sm font-medium">
                  Pemateri
                </Label>
                <Input
                  id="speaker"
                  name="speaker"
                  value={formData.speaker}
                  onChange={handleChange}
                  placeholder="Nama pemateri"
                  className="transition-all focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 transition-all hover:shadow-lg"
                >
                  {isSubmitting ? "Menyimpan..." : "Simpan Koleksi"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </Layout>
  );
};

export default Create;

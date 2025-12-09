import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Heart, X, Plus, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Memory {
  id: string;
  imageUrl: string;
  caption: string;
  date: string;
}

const defaultMemories: Memory[] = [
  {
    id: "1",
    imageUrl: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&h=400&fit=crop",
    caption: "Our love story begins here",
    date: "2024-01-01",
  },
  {
    id: "2", 
    imageUrl: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=400&fit=crop",
    caption: "Beautiful moments together",
    date: "2024-02-14",
  },
  {
    id: "3",
    imageUrl: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=400&h=400&fit=crop",
    caption: "Adventures await us",
    date: "2024-03-20",
  },
];

const Gallery = () => {
  const [memories, setMemories] = useState<Memory[]>(() => {
    const saved = localStorage.getItem("photo-memories");
    return saved ? JSON.parse(saved) : defaultMemories;
  });
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [newMemory, setNewMemory] = useState({ imageUrl: "", caption: "" });
  const [isAddOpen, setIsAddOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("photo-memories", JSON.stringify(memories));
  }, [memories]);

  const addMemory = () => {
    if (!newMemory.imageUrl || !newMemory.caption) return;
    
    const memory: Memory = {
      id: Date.now().toString(),
      imageUrl: newMemory.imageUrl,
      caption: newMemory.caption,
      date: new Date().toISOString().split("T")[0],
    };
    
    setMemories([memory, ...memories]);
    setNewMemory({ imageUrl: "", caption: "" });
    setIsAddOpen(false);
  };

  const deleteMemory = (id: string) => {
    setMemories(memories.filter(m => m.id !== id));
    setSelectedMemory(null);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="Our Memories" subtitle="Moments we cherish" />

      <main className="px-4 py-6 max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground">{memories.length} memories</span>
          </div>
          
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button size="sm" data-testid="button-add-memory">
                <Plus className="w-4 h-4 mr-1" /> Add Memory
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add a New Memory</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Image URL</label>
                  <Input
                    placeholder="https://..."
                    value={newMemory.imageUrl}
                    onChange={(e) => setNewMemory({ ...newMemory, imageUrl: e.target.value })}
                    data-testid="input-image-url"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Caption</label>
                  <Textarea
                    placeholder="What makes this moment special?"
                    value={newMemory.caption}
                    onChange={(e) => setNewMemory({ ...newMemory, caption: e.target.value })}
                    data-testid="input-caption"
                    className="mt-1 resize-none"
                  />
                </div>
                <Button onClick={addMemory} className="w-full" data-testid="button-save-memory">
                  Save Memory
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {memories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <ImageIcon className="w-16 h-16 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No memories yet</p>
            <p className="text-sm text-muted-foreground">Add your first photo memory!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {memories.map((memory, index) => (
              <motion.div
                key={memory.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedMemory(memory)}
                className="relative aspect-square rounded-xl overflow-hidden shadow-soft cursor-pointer group"
                data-testid={`card-memory-${memory.id}`}
              >
                <img
                  src={memory.imageUrl}
                  alt={memory.caption}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=400&fit=crop";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-white text-xs line-clamp-2">{memory.caption}</p>
                  </div>
                </div>
                <Heart className="absolute top-2 right-2 w-4 h-4 text-white drop-shadow-lg" fill="currentColor" />
              </motion.div>
            ))}
          </div>
        )}

        <AnimatePresence>
          {selectedMemory && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              onClick={() => setSelectedMemory(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="relative max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedMemory(null)}
                  className="absolute -top-12 right-0 p-2 text-white"
                  data-testid="button-close-memory"
                >
                  <X className="w-6 h-6" />
                </button>
                <img
                  src={selectedMemory.imageUrl}
                  alt={selectedMemory.caption}
                  className="w-full rounded-xl"
                />
                <div className="mt-4 text-center">
                  <p className="text-white text-lg">{selectedMemory.caption}</p>
                  <p className="text-white/60 text-sm mt-1">
                    {new Date(selectedMemory.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteMemory(selectedMemory.id)}
                    className="mt-4"
                    data-testid="button-delete-memory"
                  >
                    Delete Memory
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Gallery;

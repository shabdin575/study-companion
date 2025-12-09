import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Plus, Trash2, Save, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { subjects } from "@/data/scheduleData";
import { cn } from "@/lib/utils";

interface Note {
  id: string;
  subjectCode: string;
  title: string;
  content: string;
  createdAt: string;
}

const courseColors: Record<string, string> = {
  math: "bg-blue-500",
  physics: "bg-red-500",
  biology: "bg-green-500",
  chemistry: "bg-yellow-500",
  computing: "bg-purple-500",
  communication: "bg-orange-500",
};

const Notes = () => {
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem("study-notes");
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newNote, setNewNote] = useState({ title: "", content: "" });

  useEffect(() => {
    localStorage.setItem("study-notes", JSON.stringify(notes));
  }, [notes]);

  const filteredNotes = selectedSubject
    ? notes.filter((n) => n.subjectCode === selectedSubject)
    : notes;

  const addNote = () => {
    if (!selectedSubject || !newNote.title || !newNote.content) return;

    const note: Note = {
      id: Date.now().toString(),
      subjectCode: selectedSubject,
      title: newNote.title,
      content: newNote.content,
      createdAt: new Date().toISOString(),
    };

    setNotes([note, ...notes]);
    setNewNote({ title: "", content: "" });
    setIsAdding(false);
  };

  const updateNote = () => {
    if (!editingNote) return;
    setNotes(notes.map((n) => (n.id === editingNote.id ? editingNote : n)));
    setEditingNote(null);
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((n) => n.id !== id));
    setEditingNote(null);
  };

  const getSubjectInfo = (code: string) => {
    return subjects.find((s) => s.code === code);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="Study Notes" subtitle="Capture your thoughts" />

      <main className="px-4 py-6 max-w-lg mx-auto">
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 -mx-4 px-4">
          <Button
            variant={selectedSubject === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedSubject(null)}
            data-testid="button-filter-all"
            className="shrink-0"
          >
            All
          </Button>
          {subjects.map((subject) => (
            <Button
              key={subject.code}
              variant={selectedSubject === subject.code ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSubject(subject.code)}
              data-testid={`button-filter-${subject.code}`}
              className="shrink-0"
            >
              <div
                className={cn(
                  "w-2 h-2 rounded-full mr-2",
                  courseColors[subject.course]
                )}
              />
              {subject.code}
            </Button>
          ))}
        </div>

        {selectedSubject && !isAdding && !editingNote && (
          <Button
            onClick={() => setIsAdding(true)}
            className="w-full mb-6"
            data-testid="button-add-note"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Note for {selectedSubject}
          </Button>
        )}

        <AnimatePresence>
          {isAdding && selectedSubject && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-4 bg-card rounded-xl shadow-soft mb-6"
            >
              <h3 className="font-medium text-foreground mb-4">
                New Note for {getSubjectInfo(selectedSubject)?.name}
              </h3>
              <Input
                placeholder="Note title..."
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                data-testid="input-note-title"
                className="mb-3"
              />
              <Textarea
                placeholder="Write your notes here..."
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                data-testid="input-note-content"
                className="mb-4 min-h-[120px] resize-none"
              />
              <div className="flex gap-2">
                <Button onClick={addNote} data-testid="button-save-note">
                  <Save className="w-4 h-4 mr-2" /> Save
                </Button>
                <Button variant="outline" onClick={() => setIsAdding(false)}>
                  Cancel
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {editingNote && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-card rounded-xl shadow-soft mb-6"
          >
            <h3 className="font-medium text-foreground mb-4">Edit Note</h3>
            <Input
              value={editingNote.title}
              onChange={(e) =>
                setEditingNote({ ...editingNote, title: e.target.value })
              }
              data-testid="input-edit-title"
              className="mb-3"
            />
            <Textarea
              value={editingNote.content}
              onChange={(e) =>
                setEditingNote({ ...editingNote, content: e.target.value })
              }
              data-testid="input-edit-content"
              className="mb-4 min-h-[120px] resize-none"
            />
            <div className="flex gap-2">
              <Button onClick={updateNote} data-testid="button-update-note">
                <Save className="w-4 h-4 mr-2" /> Update
              </Button>
              <Button variant="outline" onClick={() => setEditingNote(null)}>
                Cancel
              </Button>
            </div>
          </motion.div>
        )}

        {filteredNotes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <FileText className="w-16 h-16 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No notes yet</p>
            <p className="text-sm text-muted-foreground">
              {selectedSubject
                ? `Select "${selectedSubject}" and add your first note!`
                : "Select a subject to start taking notes"}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredNotes.map((note, index) => {
              const subjectInfo = getSubjectInfo(note.subjectCode);
              return (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 bg-card rounded-xl shadow-soft"
                  data-testid={`card-note-${note.id}`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          "w-2 h-2 rounded-full",
                          courseColors[subjectInfo?.course || "math"]
                        )}
                      />
                      <span className="text-xs text-muted-foreground">
                        {note.subjectCode}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setEditingNote(note)}
                        data-testid={`button-edit-note-${note.id}`}
                      >
                        <BookOpen className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => deleteNote(note.id)}
                        data-testid={`button-delete-note-${note.id}`}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                  <h4 className="font-medium text-foreground mb-1">{note.title}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {note.content}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {new Date(note.createdAt).toLocaleDateString()}
                  </p>
                </motion.div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default Notes;

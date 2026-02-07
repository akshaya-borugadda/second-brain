"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type KnowledgeItem = {
  id: string;
  title: string;
  content: string;
  type: string;
  summary: string | null;
  created_at: string;
};

export default function Home() {
  const [items, setItems] = useState<KnowledgeItem[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("note");
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");

  // FETCH
  const fetchItems = async () => {
    const { data, error } = await supabase
      .from("knowledge_items")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // INSERT + UPDATE (AI FALLBACK)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const summary =
      content.length > 120 ? content.slice(0, 120) + "..." : content;

    if (editingId) {
      await supabase
        .from("knowledge_items")
        .update({ title, content, type, summary })
        .eq("id", editingId);
      setEditingId(null);
    } else {
      await supabase.from("knowledge_items").insert([
        { title, content, type, summary },
      ]);
    }

    setTitle("");
    setContent("");
    setType("note");
    setLoading(false);
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    await supabase.from("knowledge_items").delete().eq("id", id);
    fetchItems();
  };

  const filteredItems = items.filter((item) => {
    const text = `${item.title} ${item.content} ${item.summary ?? ""}`.toLowerCase();
    return (
      text.includes(search.toLowerCase()) &&
      (filterType === "all" || item.type === filterType)
    );
  });

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        {/* HEADER */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-1">
          Second Brain
        </h1>
        <p className="text-gray-600 mb-8">
          Capture your thoughts, ideas, and insights — organized & summarized
        </p>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border rounded-xl shadow-sm p-6 space-y-4 mb-8"
        >
          <input
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black focus:outline-none"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            className="w-full border border-gray-300 rounded-lg p-3 h-32 focus:ring-2 focus:ring-black focus:outline-none"
            placeholder="Write your note..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />

          <select
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black focus:outline-none"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="note">Note</option>
            <option value="link">Link</option>
            <option value="insight">Insight</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white px-6 py-2.5 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? "Saving..." : editingId ? "Update Note" : "Save Note"}
          </button>
        </form>

        {/* SEARCH + FILTER */}
        <div className="bg-white border rounded-xl shadow-sm p-4 flex gap-4 mb-6">
          <input
            className="flex-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-black focus:outline-none"
            placeholder="Search your brain..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="border border-gray-300 rounded-lg p-2"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All</option>
            <option value="note">Notes</option>
            <option value="link">Links</option>
            <option value="insight">Insights</option>
          </select>
        </div>

        {/* LIST */}
        <section className="space-y-4">
          {filteredItems.length === 0 && (
            <p className="text-center text-gray-500 py-10">
              No notes yet. Start writing ✍️
            </p>
          )}

          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white border rounded-xl shadow-sm p-5 hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold text-gray-900">
                {item.title}
              </h2>

              <p className="text-xs text-gray-500 mb-2">
                {item.type} • {new Date(item.created_at).toLocaleString()}
              </p>

              <p className="text-gray-700">{item.content}</p>

              {item.summary && (
                <div className="mt-3 bg-blue-50 text-blue-700 p-3 rounded-lg text-sm">
                   <span className="font-medium">AI Summary:</span>{" "}
                  {item.summary}
                </div>
              )}

              <div className="mt-4 flex gap-4">
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => {
                    setEditingId(item.id);
                    setTitle(item.title);
                    setContent(item.content);
                    setType(item.type);
                  }}
                >
                  Edit
                </button>

                <button
                  className="text-red-600 hover:underline"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}

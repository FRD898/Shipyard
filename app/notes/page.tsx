import { Notes } from "@/features/notes";

export default function NotesPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-8">
      <div className="mx-auto max-w-3xl rounded-lg border border-zinc-800/50 bg-zinc-900">
        <Notes />
      </div>
    </main>
  );
}

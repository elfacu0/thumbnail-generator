import { Canvas } from "@/components/Canvas";

export default function HomePage() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-3xl font-bold mb-8">Fabric Canvas Example</h1>
      <Canvas />
    </main>
  );
}

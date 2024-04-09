import Image from "next/image";
import EmojiPicker from "@/components/EmojiPicker";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <EmojiPicker>
        <p>Beyond all Heights</p>
      </EmojiPicker>
    </main>
  );
}

import Desktop from "@/components/os/Desktop";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();
  return <Desktop initialPosts={posts} />;
}

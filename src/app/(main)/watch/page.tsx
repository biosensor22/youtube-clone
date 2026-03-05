import { redirect } from "next/navigation";

type WatchQueryPageProps = {
  searchParams: Promise<{
    v?: string | string[];
    videoId?: string | string[];
  }>;
};

export default async function WatchQueryPage({
  searchParams,
}: WatchQueryPageProps) {
  const params = await searchParams;
  const rawVideoId = params.v ?? params.videoId;
  const videoId = Array.isArray(rawVideoId) ? rawVideoId[0] : rawVideoId;

  redirect(`/watch/${videoId}`);
}

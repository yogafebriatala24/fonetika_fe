import { fetchBeritaList } from "@/service/ApiDetailBerita";
import Search from "@/components/Search";

type SearchPageProps = {
  searchParams: Promise<{ query?: string }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedSearchParams = await searchParams;

  const query = resolvedSearchParams.query || "";
  const searchList = await fetchBeritaList(query);

  return (
    <div>
      <Search searchList={searchList} query={query} />
    </div>
  );
}

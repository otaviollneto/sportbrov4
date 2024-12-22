import { useSearchParams } from "react-router-dom";

export const usePagination = (totalPages: number) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("pagina") || "1", 10);

  const handlePageChange = (newPage: number) => {
    setSearchParams({ pagina: newPage.toString() });
  };

  const getVisiblePages = () => {
    const maxVisible = 5;
    let start = Math.max(1, page - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return { page, handlePageChange, getVisiblePages };
};

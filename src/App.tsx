import { useState, useEffect } from "react";
import { Movie, searchMovies, getPopularMovies } from "@/lib/omdb";
import { MovieCard } from "@/components/MovieCard";
import { MovieDetailsDialog } from "@/components/MovieDetails";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2, Film } from "lucide-react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { useDebounce } from "@/hooks/use-debounce";
import { ThemeToggle } from "@/components/ThemeToggle";

function MovieSearch() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const debouncedSearch = useDebounce(searchQuery, 500);

  const loadMovies = async (pageNum: number) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPopularMovies(pageNum);
      if (data.Response === "True") {
        if (pageNum === 1) {
          setMovies(data.Search || []);
        } else {
          setMovies((prev) => [...prev, ...(data.Search || [])]);
        }
        setTotalResults(parseInt(data.totalResults));
      } else {
        setError(data.Error || "No se encontraron películas.");
        setMovies([]);
        setTotalResults(0);
      }
    } catch (err) {
      setError("Error al cargar las películas. Por favor, intenta de nuevo.");
      setMovies([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string, pageNum: number) => {
    if (!query.trim()) {
      loadMovies(1);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await searchMovies(query, pageNum);
      if (data.Response === "True") {
        if (pageNum === 1) {
          setMovies(data.Search);
        } else {
          setMovies((prev) => [...prev, ...data.Search]);
        }
        setTotalResults(parseInt(data.totalResults));
      } else {
        setError(data.Error || "No se encontraron películas.");
        setMovies([]);
        setTotalResults(0);
      }
    } catch (err) {
      setError("Error al buscar películas. Por favor, intenta de nuevo.");
      setMovies([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    if (debouncedSearch) {
      handleSearch(debouncedSearch, 1);
    } else {
      loadMovies(1);
    }
  }, [debouncedSearch]);

  const canLoadMore = movies.length < totalResults;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Film className="h-8 w-8 text-primary" />
              <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                MovieFinder
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="search-container flex-1 max-w-xl">
                <Search className="search-icon h-5 w-5" />
                <Input
                  type="search"
                  placeholder="Buscar películas..."
                  className="search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {error ? (
          <div className="text-center text-red-500 bg-red-500/10 rounded-lg p-4">
            {error}
          </div>
        ) : loading && movies.length === 0 ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.imdbID}
                  movie={movie}
                  onSelect={setSelectedMovie}
                />
              ))}
            </div>

            {canLoadMore && (
              <div className="mt-8 text-center">
                <Button
                  onClick={() => {
                    const nextPage = page + 1;
                    setPage(nextPage);
                    if (searchQuery) {
                      handleSearch(searchQuery, nextPage);
                    } else {
                      loadMovies(nextPage);
                    }
                  }}
                  disabled={loading}
                  className="px-8"
                >
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Cargar más películas
                </Button>
              </div>
            )}
          </>
        )}

        <MovieDetailsDialog
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      </main>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <MovieSearch />
    </ErrorBoundary>
  );
}

export default App;

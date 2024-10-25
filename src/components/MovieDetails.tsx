import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogOverlay,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Movie, MovieDetails as MovieDetailsType } from "@/lib/omdb";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Star, Calendar, Clock, Award } from "lucide-react";

interface MovieDetailsProps {
  movie: Movie | null;
  onClose: () => void;
}

export function MovieDetailsDialog({ movie, onClose }: MovieDetailsProps) {
  const [details, setDetails] = useState<MovieDetailsType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMovieDetails() {
      if (!movie?.imdbID) return;

      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=4046b94d&i=${movie.imdbID}&plot=full`
        );
        const data = await response.json();
        if (data.Response === "True") {
          setDetails(data);
        } else {
          setError(data.Error || "No se pudieron cargar los detalles.");
        }
      } catch (err) {
        setError("Error al cargar los detalles. Por favor, intenta de nuevo.");
      } finally {
        setLoading(false);
      }
    }

    if (movie) {
      fetchMovieDetails();
    } else {
      setDetails(null);
      setError(null);
    }
  }, [movie]);

  if (!movie) return null;

  return (
    <Dialog open={!!movie} onOpenChange={() => onClose()}>
      <DialogOverlay className="dialog-overlay" />
      <DialogContent className="dialog-content">
        <div className="dialog-content-inner">
          <DialogHeader className="dialog-header pb-8">
            <DialogTitle className="text-2xl font-bold">
              {movie.Title} {movie.Year && `(${movie.Year})`}
            </DialogTitle>
          </DialogHeader>

          <div className="dialog-body">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : error ? (
              <div className="text-center text-red-500 bg-red-500/10 rounded-lg p-4">
                {error}
              </div>
            ) : (
              details && (
                <div className="grid grid-cols-1 md:grid-cols-[minmax(200px,300px),1fr] gap-6">
                  <div className="aspect-[2/3] relative rounded-lg overflow-hidden">
                    <img
                      src={
                        details.Poster !== "N/A"
                          ? details.Poster
                          : "https://placehold.co/300x450/gray/white?text=No+Poster"
                      }
                      alt={`Póster de ${details.Title}`}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  <div className="space-y-6 overflow-y-auto pr-2">
                    <div className="flex flex-wrap gap-2">
                      {details.Genre?.split(",").map((genre) => (
                        <Badge key={genre} variant="secondary">
                          {genre.trim()}
                        </Badge>
                      ))}
                    </div>

                    <DialogDescription className="text-base leading-relaxed">
                      {details.Plot}
                    </DialogDescription>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {details.imdbRating !== "N/A" && (
                        <div className="flex items-center gap-2">
                          <Star className="h-5 w-5 text-yellow-500" />
                          <span>
                            {details.imdbRating}/10 ({details.imdbVotes} votos)
                          </span>
                        </div>
                      )}
                      {details.Runtime !== "N/A" && (
                        <div className="flex items-center gap-2">
                          <Clock className="h-5 w-5" />
                          <span>{details.Runtime}</span>
                        </div>
                      )}
                      {details.Released !== "N/A" && (
                        <div className="flex items-center gap-2">
                          <Calendar className="h-5 w-5" />
                          <span>{details.Released}</span>
                        </div>
                      )}
                      {details.Awards !== "N/A" && (
                        <div className="flex items-center gap-2">
                          <Award className="h-5 w-5" />
                          <span>{details.Awards}</span>
                        </div>
                      )}
                    </div>

                    {details.Director !== "N/A" && (
                      <div>
                        <h3 className="font-semibold mb-1">Director</h3>
                        <p>{details.Director}</p>
                      </div>
                    )}

                    {details.Actors !== "N/A" && (
                      <div>
                        <h3 className="font-semibold mb-1">Reparto</h3>
                        <p>{details.Actors}</p>
                      </div>
                    )}

                    {details.Writer !== "N/A" && (
                      <div>
                        <h3 className="font-semibold mb-1">Guionistas</h3>
                        <p>{details.Writer}</p>
                      </div>
                    )}
                  </div>
                </div>
              )
            )}
          </div>

          <DialogFooter className="dialog-footer">
            <div className="flex flex-wrap gap-2">
              {details && (
                <Button
                  variant="outline"
                  onClick={() =>
                    window.open(
                      `https://www.imdb.com/title/${details.imdbID}`,
                      "_blank"
                    )
                  }
                >
                  Ver en IMDB
                </Button>
              )}
              <Button variant="outline" onClick={onClose}>
                Cerrar
              </Button>
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}

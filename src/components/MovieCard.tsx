import { Movie } from '@/lib/omdb';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface MovieCardProps {
  movie: Movie;
  onSelect: (movie: Movie) => void;
}

export function MovieCard({ movie, onSelect }: MovieCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:scale-105">
      <CardContent className="p-0 relative">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}
          alt={movie.Title}
          className="w-full h-[400px] object-cover"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <h3 className="text-lg font-semibold text-white mb-2">{movie.Title}</h3>
          <div className="flex items-center justify-between">
            <span className="text-white">{movie.Year}</span>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onSelect(movie)}
            >
              Ver más
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
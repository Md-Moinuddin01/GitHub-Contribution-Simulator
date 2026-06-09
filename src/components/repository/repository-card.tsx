import Link from "next/link";
import { ExternalLink, GitFork, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";
import type { Repository } from "@/types";

export function RepositoryCard({ repository }: { repository: Repository }) {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <CardTitle>{repository.name}</CardTitle>
          <Badge variant={repository.difficulty === "Advanced" ? "purple" : repository.difficulty === "Intermediate" ? "blue" : "default"}>
            {repository.difficulty}
          </Badge>
        </div>
        <p className="text-sm text-zinc-400">{repository.description}</p>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          {repository.techStack.slice(0, 4).map((tech) => (
            <Badge key={tech} variant="zinc">
              {tech}
            </Badge>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between text-sm text-zinc-400">
          <span className="flex items-center gap-1">
            <Star className="h-4 w-4" /> {formatNumber(repository.fakeStars)}
          </span>
          <span className="flex items-center gap-1">
            <GitFork className="h-4 w-4" /> {formatNumber(repository.fakeForks)}
          </span>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          <Button asChild variant="secondary">
            <Link href={`/repositories/${repository.slug}`}>Open repository</Link>
          </Button>
          <Button asChild variant="outline">
            <a href={repository.githubUrl} target="_blank" rel="noreferrer">
              <ExternalLink className="h-4 w-4" />
              GitHub
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function FacultyListSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="institutional-card p-8 space-y-6 animate-pulse">
          <div className="flex items-start justify-between">
            <div className="space-y-3">
              <div className="h-6 w-32 bg-muted rounded"></div>
              <div className="h-4 w-24 bg-muted rounded"></div>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-muted"></div>
          </div>
          <div className="space-y-2">
            <div className="h-3 w-full bg-muted rounded"></div>
            <div className="h-3 w-3/4 bg-muted rounded"></div>
          </div>
          <div className="flex gap-2">
            <div className="h-6 w-20 bg-muted rounded-full"></div>
            <div className="h-6 w-20 bg-muted rounded-full"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

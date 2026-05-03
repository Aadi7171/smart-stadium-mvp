import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="min-h-screen p-24 bg-background text-foreground flex flex-col items-center justify-center space-y-8">
      <div className="text-center space-y-4">
        <h1 className="font-display text-4xl font-bold tracking-wider text-primary">
          SYSTEM ONLINE
        </h1>
        <p className="font-mono text-muted-foreground">
          [STATUS: NOMINAL] Initialization complete.
        </p>
      </div>

      <Card className="w-[450px] border-border bg-card">
        <CardHeader>
          <CardTitle className="font-display tracking-widest text-accent-foreground">CONTROL NODE ALPHA</CardTitle>
          <CardDescription className="font-mono text-muted-foreground">
            Awaiting operator input...
          </CardDescription>
        </CardHeader>
        <CardContent className="font-mono text-sm space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">THROUGHPUT:</span>
            <span className="text-state-clear">450 / MIN</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">SYSTEM LOAD:</span>
            <span className="text-state-moderate">42%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">ACTIVE ALERTS:</span>
            <span className="text-state-critical">0</span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button variant="default" className="font-mono font-bold bg-primary text-primary-foreground hover:bg-primary/90">
            ACKNOWLEDGE
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}

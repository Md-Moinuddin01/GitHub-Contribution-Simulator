import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function StatCard({ label, value, detail }: { label: string; value: string | number; detail?: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm text-zinc-400">{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-semibold text-white">{value}</div>
        {detail ? <p className="mt-1 text-sm text-zinc-500">{detail}</p> : null}
      </CardContent>
    </Card>
  );
}

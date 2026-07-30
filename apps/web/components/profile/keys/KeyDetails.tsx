import { ApiKeyType } from "@workspace/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Skeleton } from "@workspace/ui/components/skeleton";

function KeyDetailsCard({
  title,
  value,
  loading,
}: {
  title: string;
  value: string;
  loading: boolean;
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-8 w-1/2" />
        ) : (
          <p className="text-3xl font-bold">{value}</p>
        )}
      </CardContent>
    </Card>
  );
}

export function KeyDetails({
  loading,
  keys,
}: {
  loading: boolean;
  keys: ApiKeyType[] | [];
}) {
  const activeKeys = keys.filter((key) => key.isActive).length;
  // const totalRequests = keys.reduce((acc, key) => acc + key.requests, 0);
  // const rateLimit = keys.map((key) => key.rateLimit);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <KeyDetailsCard
        title="Active Keys"
        value={activeKeys.toString()}
        loading={loading}
      />
      <KeyDetailsCard title="Total Requests" value="444" loading={loading} />
      <KeyDetailsCard title="Rate Limit" value="100/min" loading={loading} />
    </div>
  );
}

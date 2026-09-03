import { Button } from "@workspace/ui/components/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Copy, ShieldOff } from "lucide-react";
import { WarningModal } from "@/components/common";
import { copyToClipboard } from "@/utils";
import { Badge } from "@workspace/ui/components/badge";
import { ApiKeyType } from "@workspace/types";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { format } from "date-fns";
import { useDisableApiKey } from "@/hooks";

function Row({ data }: { data: ApiKeyType }) {
  const { mutateAsync } = useDisableApiKey();

  const handleDisable = async () => {
    await mutateAsync({ id: data.id });
  };

  return (
    <TableRow>
      <TableCell className="font-medium">{data.name}</TableCell>
      <TableCell className="font-mono">{data.key}</TableCell>
      <TableCell>{format(new Date(data.created_at), "MMM d, yyyy")}</TableCell>
      <TableCell>{format(new Date(data.updated_at), "MMM d, yyyy")}</TableCell>
      <TableCell>
        <Badge
          variant="outline"
          className={data.isActive ? "bg-success/70" : "bg-destructive/70"}
        >
          {data.isActive ? "Active" : "Inactive"}
        </Badge>
      </TableCell>
      <TableCell className="font-mono">147/300</TableCell>

      <TableCell className="text-right">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => copyToClipboard(data.key)}
          disabled={!data.isActive}
        >
          <Copy className="h-4 w-4" />
        </Button>

        <WarningModal
          title={`Revoke Key "${data.name}"`}
          onClick={handleDisable}
        >
          <Button
            variant="outline"
            size="icon"
            className="text-destructive"
            disabled={!data.isActive}
          >
            <ShieldOff className="h-4 w-4" />
          </Button>
        </WarningModal>
      </TableCell>
    </TableRow>
  );
}

function RowSkeleton() {
  return (
    <TableRow>
      <TableCell>
        <Skeleton className="h-5 w-28" />
      </TableCell>

      <TableCell>
        <Skeleton className="h-5 w-64" />
      </TableCell>

      <TableCell>
        <Skeleton className="h-5 w-24" />
      </TableCell>

      <TableCell>
        <Skeleton className="h-5 w-24" />
      </TableCell>

      <TableCell>
        <Skeleton className="h-7 w-16 rounded-full" />
      </TableCell>

      <TableCell>
        <Skeleton className="h-5 w-16" />
      </TableCell>

      <TableCell>
        <div className="flex justify-end gap-2">
          <Skeleton className="h-9 w-9 rounded-md" />
          <Skeleton className="h-9 w-9 rounded-md" />
        </div>
      </TableCell>
    </TableRow>
  );
}

export function ActiveKeys({
  keys,
  loading,
  isError,
  error,
}: {
  keys: ApiKeyType[] | [];
  loading: boolean;
  isError: boolean;
  error: unknown;
}) {
  console.log(error);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your API Keys</CardTitle>
        <CardDescription>
          Manage existing keys or revoke access.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Key</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Usage</TableHead>
              <TableHead className="w-32 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading &&
              Array.from({ length: 5 }).map((_, index) => (
                <RowSkeleton key={index} />
              ))}

            {!loading && isError && (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-24 text-center text-destructive"
                >
                  {(error as { response?: { data?: { message?: string } } })
                    ?.response?.data?.message || "Something went wrong"}
                </TableCell>
              </TableRow>
            )}

            {!loading && !isError && keys.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No API keys found.
                </TableCell>
              </TableRow>
            ) : (
              keys.map((item) => <Row key={item.id} data={item} />)
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

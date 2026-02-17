import { Badge } from "@/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";

export default function TasksOverview({
  data,
  type,
  colors,
}: {
  data: any;
  type: string;
  colors: any;
}) {
  const keys = Object.keys(data);
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{type.charAt(0).toUpperCase() + type.slice(1)}</CardTitle>
      </CardHeader>
      <CardContent>
        {keys.map((type) => (
          <div key={type} className="flex justify-between mb-5">
            <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
            <Badge className={`${colors[type]} text-md font-bold`}>
              {data[type]}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

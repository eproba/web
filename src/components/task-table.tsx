import { Worksheet } from "@/types/worksheet";

export function TaskTable({
  worksheet,
  variant,
}: {
  worksheet: Worksheet;
  variant: "user" | "managed" | "shared";
}) {
  return (
    <div className="overflow-hidden bg-card">
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">
              Zadanie
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {worksheet.tasks.map((task) => (
            <tr key={task.id} className="border-b">
              <td className="px-4 py-2">
                {task.name}
                {task.description && (
                  <p className="text-sm text-muted-foreground">
                    {task.description}
                  </p>
                )}
              </td>
              <td className="px-4 py-2">{task.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

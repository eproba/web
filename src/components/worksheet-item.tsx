import { Worksheet } from "@/types/worksheet";
import { TaskTable } from "@/components/task-table";
// import { TaskTable } from './TaskTable';
// import { WorksheetActions } from './WorksheetActions';
// import { QrModal } from './QrModal';
// import { useToast } from '@/components/ui/use-toast';

export const WorksheetItem = ({
  worksheet,
  variant = "user",
}: {
  worksheet: Worksheet;
  variant?: "user" | "managed" | "shared";
}) => {
  return (
    <div className="bg-card rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-semibold">{worksheet.name}</h2>
          {worksheet.description && (
            <p className="text-sm text-muted-foreground">
              {worksheet.description}
            </p>
          )}
          {worksheet.supervisor && (
            <p className="text-sm text-muted-foreground">
              Opiekun:{" "}
              <a href={`/profile/${worksheet.supervisor}`}>
                {worksheet.supervisorName}
              </a>
            </p>
          )}
        </div>

        {/* Header content */}
        {/*<WorksheetActions*/}
        {/*  worksheet={worksheet}*/}
        {/*  isManager={isManager}*/}
        {/*  onQrOpen={() => setQrOpen(true)}*/}
        {/*  onPrint={handlePrint}*/}
        {/*/>*/}
      </div>

      <TaskTable worksheet={worksheet} variant={variant} />
    </div>
  );
};

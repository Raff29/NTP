import { FC } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";

const Dashboard: FC = () => {
  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    { field: "category", headerName: "Category", flex: 1 },
  ];

  const rows = [
    {
      id: 1,
      name: "Placeholder Item 1",
      status: "Active",
      category: "General",
    },
    {
      id: 2,
      name: "Placeholder Item 2",
      status: "Pending",
      category: "Finance",
    },
    {
      id: 3,
      name: "Placeholder Item 3",
      status: "Completed",
      category: "Support",
    },
  ];

  return (
    <div className="container pt-16 bg-white">
      <Typography variant="h6" noWrap>
        Dashboard
      </Typography>
      <div className="h-[400px] w-full">
        <DataGrid columns={columns} rows={rows} />
      </div>
    </div>
  );
};

export default Dashboard;

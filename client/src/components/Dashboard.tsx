import { FC, useEffect, useState } from "react";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const Dashboard: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // const [dataRows, setDataRows] = useState([]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRowClick = () => {
    setIsModalOpen(true);
  };

  // const fetchRows = async () => {
  //   const response = await fetch("/instruction_logs", {
  //     method: "GET",
  //     headers: { "Content-Type": "application/json" },
  //     credentials: "include",
  //   });

  //   const data = await response.json();
  //   setDataRows(data);
  //   console.log(data);
  // };

  // useEffect(() => {
  //   fetchRows();
  // }, []);

  const handleArchive = async (id: number, event: React.MouseEvent) => {
    event.stopPropagation();
    await fetch(`/instruction_logs/archive/${id}`, {
      method: "POST",
      credentials: "include",
    });
    // fetchRows();
  };

  const rows = [
    {
      id: 1,
      filename: "file1",
      instructions: "instructions1",
      timestamp: "timestamp1",
    },
    {
      id: 2,
      filename: "file2",
      instructions: "instructions2",
      timestamp: "timestamp2",
    },
    {
      id: 3,
      filename: "file3",
      instructions: "instructions3",
      timestamp: "timestamp3",
    },
  ];

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "filename", headerName: "Name", flex: 1 },
    { field: "instructions", headerName: "Instructions", flex: 1 },
    {
      field: "timestamp",
      headerName: "Timestamp",
      flex: 1,
    },
  ];

  return (
    <div className="bg-gray-100 flex justify-center h-screen p-16 font-sans">
      <div className="h-[400px] w-full mx-auto space-y-4">
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          className="text-gray-900 font-bold font-sans"
        >
          Dashboard
        </Typography>
        <DataGrid
          columns={columns}
          rows={rows}
          pageSizeOptions={[25]}
          onRowClick={handleRowClick}
          className="bg-white shadow-md rounded-lg p-4"
        />
        <Modal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          className="fixed inset-0 flex items-center justify-center p-6"
        >
          <div className="whitespace-normal p-4 bg-gray-100 text-center w-1/2 rounded-lg overflow-auto max-h-[80vh]">
            <h2 className="text-gray-700 text-2xl mb-2">hi</h2>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
              aperiam totam eligendi, perferendis saepe soluta atque? Unde nihil
              in incidunt placeat ut delectus tenetur dolor exercitationem?
              Autem earum iusto quam.lorem Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Ullam quidem perspiciatis in eum
              placeat, quam officiis ratione, minima sint reprehenderit
              reiciendis dolorem. Accusamus libero, fuga possimus rerum sint nam
              nihil? Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Minima repellat neque dolorum minus beatae vitae similique enim,
              ratione deserunt optio recusandae quaerat voluptates facere
              eveniet, adipisci dignissimos quo explicabo a? Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Fugiat, voluptates. Labore
              obcaecati debitis, quam esse error consequuntur fuga voluptatibus
              doloremque molorem aperiam totam eligendi, perferendis saepe
              soluta atque? Unde nihil in incidunt placeat ut delectus tenetur
              dolor exercitationem? Autem earum iusto quam.lorem Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Ullam quidem
              perspiciatis in eum placeat, quam officiis ratione, minima sint
              reprehenderit reiciendis dolorem. Accusamus libero, fuga possimus
              rerum sint nam nihil? Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Minima repellat neque dolorum minus beatae vitae
              similique enim, ratione deserunt optio recusandae quaerat
              voluptates facere eveniet, adipisci dignissimos quo explicabo a?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat,
              voluptates. Labore obcaecati debitis, quam esse error consequuntur
              fuga voluptatibus doloremque olorem aperiam totam eligendi,
              perferendis saepe soluta atque? Unde nihil in incidunt placeat ut
              delectus tenetur dolor exercitationem? Autem earum iusto
              quam.lorem Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Ullam quidem perspiciatis in eum placeat, quam officiis
              ratione, minima sint reprehenderit reiciendis dolorem. Accusamus
              libero, fuga possimus rerum sint nam nihil? Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Minima repellat neque dolorum
              minus beatae vitae similique enim, ratione deserunt optio
              recusandae quaerat voluptates facere eveniet, adipisci dignissimos
              quo explicabo a? Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Fugiat, voluptates. Labore obcaecati debitis,
              quam esse error consequuntur fuga voluptatibus doloremque olorem
              aperiam totam eligendi, perferendis saepe soluta atque? Unde nihil
              in incidunt placeat ut delectus tenetur dolor exercitationem?
              Autem earum iusto quam.lorem Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Ullam quidem perspiciatis in eum
              placeat, quam officiis ratione, minima sint reprehenderit
              reiciendis dolorem. Accusamus libero, fuga possimus rerum sint nam
              nihil? Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Minima repellat neque dolorum minus beatae vitae similique enim,
              ratione deserunt optio recusandae quaerat voluptates facere
              eveniet, adipisci dignissimos quo explicabo a? Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Fugiat, voluptates. Labore
              obcaecati debitis, quam esse error consequuntur fuga voluptatibus
              doloremque olorem aperiam totam eligendi, perferendis saepe soluta
              atque? Unde nihil in incidunt placeat ut delectus tenetur dolor
              exercitationem? Autem earum iusto quam.lorem Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Ullam quidem perspiciatis in
              eum placeat, quam officiis ratione, minima sint reprehenderit
              reiciendis dolorem. Accusamus libero, fuga possimus rerum sint nam
              nihil? Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Minima repellat neque dolorum minus beatae vitae similique enim,
              ratione deserunt optio recusandae quaerat voluptates facere
              eveniet, adipisci dignissimos quo explicabo a? Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Fugiat, voluptates. Labore
              obcaecati debitis, quam esse error consequuntur fuga voluptatibus
              doloremque olorem aperiam totam eligendi, perferendis saepe soluta
              atque? Unde nihil in incidunt placeat ut delectus tenetur dolor
              exercitationem? Autem earum iusto quam.lorem Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Ullam quidem perspiciatis in
              eum placeat, quam officiis ratione, minima sint reprehenderit
              reiciendis dolorem. Accusamus libero, fuga possimus rerum sint nam
              nihil? Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Minima repellat neque dolorum minus beatae vitae similique enim,
              ratione deserunt optio recusandae quaerat voluptates facere
              eveniet, adipisci dignissimos quo explicabo a? Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Fugiat, voluptates. Labore
              obcaecati debitis, quam esse error consequuntur fuga voluptatibus
              doloremque olorem aperiam totam eligendi, perferendis saepe soluta
              atque? Unde nihil in incidunt placeat ut delectus tenetur dolor
              exercitationem? Autem earum iusto quam.lorem Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Ullam quidem perspiciatis in
              eum placeat, quam officiis ratione, minima sint reprehenderit
              reiciendis dolorem. Accusamus libero, fuga possimus rerum sint nam
              nihil? Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Minima repellat neque dolorum minus beatae vitae similique enim,
              ratione deserunt optio recusandae quaerat voluptates facere
              eveniet, adipisci dignissimos quo explicabo a? Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Fugiat, voluptates. Labore
              obcaecati debitis, quam esse error consequuntur fuga voluptatibus
              doloremque olorem aperiam totam eligendi, perferendis saepe soluta
              atque? Unde nihil in incidunt placeat ut delectus tenetur dolor
              exercitationem? Autem earum iusto quam.lorem Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Ullam quidem perspiciatis in
              eum placeat, quam officiis ratione, minima sint reprehenderit
              reiciendis dolorem. Accusamus libero, fuga possimus rerum sint nam
              nihil? Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Minima repellat neque dolorum minus beatae vitae similique enim,
              ratione deserunt optio recusandae quaerat voluptates facere
              eveniet, adipisci dignissimos quo explicabo a? Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Fugiat, voluptates. Labore
              obcaecati debitis, quam esse error consequuntur fuga voluptatibus
              doloremque olorem aperiam totam eligendi, perferendis saepe soluta
              atque? Unde nihil in incidunt placeat ut delectus tenetur dolor
              exercitationem? Autem earum iusto quam.lorem Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Ullam quidem perspiciatis in
              eum placeat, quam officiis ratione, minima sint reprehenderit
              reiciendis dolorem. Accusamus libero, fuga possimus rerum sint nam
              nihil? Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Minima repellat neque dolorum minus beatae vitae similique enim,
              ratione deserunt optio recusandae quaerat voluptates facere
              eveniet, adipisci dignissimos quo explicabo a? Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Fugiat, voluptates. Labore
              obcaecati debitis, quam esse error consequuntur fuga voluptatibus
              doloremque olorem aperiam totam eligendi, perferendis saepe soluta
              atque? Unde nihil in incidunt placeat ut delectus tenetur dolor
              exercitationem? Autem earum iusto quam.lorem Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Ullam quidem perspiciatis in
              eum placeat, quam officiis ratione, minima sint reprehenderit
              reiciendis dolorem. Accusamus libero, fuga possimus rerum sint nam
              nihil? Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Minima repellat neque dolorum minus beatae vitae similique enim,
              ratione deserunt optio recusandae quaerat voluptates facere
              eveniet, adipisci dignissimos quo explicabo a? Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Fugiat, voluptates. Labore
              obcaecati debitis, quam esse error consequuntur fuga voluptatibus
              doloremque olorem aperiam totam eligendi, perferendis saepe soluta
              atque? Unde nihil in incidunt placeat ut delectus tenetur dolor
              exercitationem? Autem earum iusto quam.lorem Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Ullam quidem perspiciatis in
              eum placeat, quam officiis ratione, minima sint reprehenderit
              reiciendis dolorem. Accusamus libero, fuga possimus rerum sint nam
              nihil? Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Minima repellat neque dolorum minus beatae vitae similique enim,
              ratione deserunt optio recusandae quaerat voluptates facere
              eveniet, adipisci dignissimos quo explicabo a? Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Fugiat, voluptates. Labore
              obcaecati debitis, quam esse error consequuntur fuga voluptatibus
              doloremque olorem aperiam totam eligendi, perferendis saepe soluta
              atque? Unde nihil in incidunt placeat ut delectus tenetur dolor
              exercitationem? Autem earum iusto quam.lorem Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Ullam quidem perspiciatis in
              eum placeat, quam officiis ratione, minima sint reprehenderit
              reiciendis dolorem. Accusamus libero, fuga possimus rerum sint nam
              nihil? Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Minima repellat neque dolorum minus beatae vitae similique enim,
              ratione deserunt optio recusandae quaerat voluptates facere
              eveniet, adipisci dignissimos quo explicabo a? Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Fugiat, voluptates. Labore
              obcaecati debitis, quam esse error consequuntur fuga voluptatibus
              doloremque axime asperiores odit, facilis praesentium inventore
              eveniet quas sequi aut?
            </p>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Dashboard;

import {
  getKeyValue,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { LucideSearch } from "lucide-react";
import { Key, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";

import { User } from "@/types";

const ViewUsers = () => {
  const navigate = useNavigate();

  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const { data: users } = useSWR<User[]>("/users");

  useEffect(() => {
    if (!users) return;
    setFilteredUsers(users);
  }, [users]);

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    if (!users) return;

    const filtered = users.filter((user) =>
      user.email.toLowerCase().includes(value),
    );

    setFilteredUsers(filtered);
  };

  const handleRowAction = (key: Key) => {
    navigate(`/dashboard/users/${key.toString()}`);
  };

  const columns = [
    {
      key: "name",
      label: "Display Name",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "roles",
      label: "Roles",
    },
    {
      key: "updatedAt",
      label: "Updated At",
    },
  ];

  const rows = filteredUsers.map((user) => {
    return {
      email: user.email,
      key: user.id,
      name: user.displayName,
      roles: user.roles ? user.roles.join(", ") : "Yok",
      updatedAt: new Date(user.updatedAt).toLocaleDateString(),
    };
  });

  return (
    <section className="grid gap-5">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div className="flex items-end justify-start gap-3">
          <h2 className="text-2xl font-bold">Users</h2>
          <span className="text-sm text-gray-500">
            ({filteredUsers.length}/{users?.length})
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-3">
          <Input
            className="max-w-xs"
            endContent={<LucideSearch />}
            onChange={handleFilter}
            placeholder="Search..."
            variant="faded"
          />
        </div>
      </div>

      <Table
        aria-label="Example table with dynamic content"
        isStriped
        onRowAction={handleRowAction}
        selectionMode="single"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={rows}>
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </section>
  );
};

export default ViewUsers;

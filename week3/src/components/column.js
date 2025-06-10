export const columns = [
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Role",
    accessorKey: "role",
  },
  {
  header: "Status",
  accessorKey: "status",
  cell: ({ getValue }) => {
    const value = getValue();
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs ${
          value === "Active"
            ? "bg-green-200 text-green-800"
            : "bg-yellow-200 text-yellow-800"
        }`}
      >
        {value}
      </span>
    );
  },
}
];

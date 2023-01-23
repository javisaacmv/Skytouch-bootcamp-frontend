import {
  createStyles,
  Table,
  ScrollArea,
  Group,
  Text,
  TextInput,
  ActionIcon,
} from "@mantine/core";
import { IconSearch, IconPencil, IconTrash } from "@tabler/icons";
import { Paginate } from "../Pagination";

const useStyles = createStyles((theme) => ({
  th: {
    padding: "0 !important",
  },

  control: {
    width: "100%",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
  },

  icon: {
    width: 21,
    height: 21,
    borderRadius: 21,
  },
}));

interface RowData {
  name: string;
  address: string;
  rating: string;
  amenities: string;
  id: string;
}

interface TableSortProps {
  data: RowData[];
  deleteHotel: (id: string) => void;
  pageInfo: PaginationInfo;
  setPageInfo: (page: PaginationInfo) => void;
  setSearchString: (searchString: string) => void;
  goToEdit: (id: string) => void;
  searchString: string;
}

interface PaginationInfo {
  page: number;
  totalPages: number;
}

interface ThProps {
  children: React.ReactNode;
}

function Th({ children }: ThProps) {
  const { classes } = useStyles();

  return (
    <th className={classes.th}>
      <Group position="apart">
        <Text weight={500} size="sm">
          {children}
        </Text>
      </Group>
    </th>
  );
}

export function TableHotels({
  data,
  deleteHotel,
  pageInfo,
  setPageInfo,
  setSearchString,
  searchString,
  goToEdit,
}: TableSortProps) {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearchString(value);
  };

  const actions = (id: string) => (
    <Group position="center" spacing="md">
      <ActionIcon
        size="lg"
        variant="gradient"
        data-testid={`edit-btn-${id}`}
        gradient={{ from: "indigo", to: "cyan" }}
        onClick={() => goToEdit(id)}
      >
        <IconPencil size={20} />
      </ActionIcon>
      <ActionIcon
        size="lg"
        variant="gradient"
        data-testid={`delete-btn-${id}`}
        gradient={{ from: "orange", to: "red" }}
        onClick={() => deleteHotel(id)}
      >
        <IconTrash size={20} />
      </ActionIcon>
    </Group>
  );

  const rows = data.map((row) => (
    <tr key={row.id}>
      <td>{row.name}</td>
      <td>{row.address}</td>
      <td>{row.amenities}</td>
      <td>{row.rating}</td>
      <td>{actions(row.id)}</td>
    </tr>
  ));

  return (
    <ScrollArea>
      <TextInput
        placeholder="Search by name"
        mb="md"
        icon={<IconSearch size={14} stroke={1.5} />}
        value={searchString}
        onChange={handleSearchChange}
      />
      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        sx={{ tableLayout: "fixed", minWidth: 700 }}
      >
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Address</Th>
            <Th>Amenities</Th>
            <Th>Rating</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <tr>
              <td>
                <Text weight={500} align="center">
                  Nothing found
                </Text>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <Paginate pageInfo={pageInfo} setPageInfo={setPageInfo} />
    </ScrollArea>
  );
}

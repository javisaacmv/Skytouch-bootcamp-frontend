import { useState } from "react";
import { Pagination } from "@mantine/core";

interface PaginationInfo {
  page: number;
  totalPages: number;
}

interface PaginationProps {
  pageInfo: PaginationInfo;
  setPageInfo: (page: PaginationInfo) => void;
}

export function Paginate({ pageInfo, setPageInfo }: PaginationProps) {
  return (
    <Pagination
      page={pageInfo?.page || 1}
      onChange={(newPage) => setPageInfo({ ...pageInfo, page: newPage })}
      total={pageInfo?.totalPages}
      color="cyan"
    />
  );
}

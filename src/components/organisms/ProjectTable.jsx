import React, { useState } from 'react';
import useStore from '../../zustand/store';
import LoadingSpinner from '../atoms/LoadingSpinner';
import PaginationComponent from '../molecules/PaginationComponent';
import TableActions from '../molecules/TableAcion';
import { useSnackbar } from 'notistack';
import TableComponent from '../molecules/TableComponent';

const ProjectTable = () => {
  const { projects, loading, error, selectedAccount } = useStore();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { enqueueSnackbar } = useSnackbar();

  if (loading) return <LoadingSpinner />;
  if (error) return enqueueSnackbar(error, { variant: 'error' });
  if (!projects) return <p>No projects available</p>;

  const filteredProjects = selectedAccount
    ? {
        ...projects,
        account_name: projects.account_name.filter((_, index) => projects.account_name[index] === selectedAccount),
        project_name: projects.project_name.filter((_, index) => projects.account_name[index] === selectedAccount),
        bhu_name: projects.bhu_name.filter((_, index) => projects.account_name[index] === selectedAccount),
        dd_name: projects.dd_name.filter((_, index) => projects.account_name[index] === selectedAccount),
      }
    : projects;

  const rowCount = Math.min(
    filteredProjects?.account_name?.length || 0,
    filteredProjects?.project_name?.length || 0,
    filteredProjects?.bhu_name?.length || 0,
    filteredProjects?.dd_name?.length || 0
  );

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, rowCount);

  const paginatedProjects = {
    account_name: filteredProjects.account_name.slice(startIndex, endIndex),
    project_name: filteredProjects.project_name.slice(startIndex, endIndex),
    bhu_name: filteredProjects.bhu_name.slice(startIndex, endIndex),
    dd_name: filteredProjects.dd_name.slice(startIndex, endIndex),
  };

  const columns = [
    { headerName: 'Account Name', field: 'account_name' },
    { headerName: 'Project Name', field: 'project_name' },
    { headerName: 'BUH Name', field: 'bhu_name' },
    { headerName: 'DD Name', field: 'dd_name' }
  ];

  const paginatedData = columns.reduce((acc, col) => {
    acc[col.field] = paginatedProjects[col.field] || [];
    return acc;
  }, []);

  const formattedData = paginatedData.account_name.map((_, index) => ({
    account_name: paginatedData.account_name[index],
    project_name: paginatedData.project_name[index],
    bhu_name: paginatedData.bhu_name[index],
    dd_name: paginatedData.dd_name[index],
  }));

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(1);
  };

  return (
    <>
      <TableComponent columns={columns} data={formattedData} />
      <PaginationComponent
        page={page}
        rowCount={rowCount}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleRowsPerPageChange={handleRowsPerPageChange}
      />
      <TableActions />
    </>
  );
};

export default ProjectTable;

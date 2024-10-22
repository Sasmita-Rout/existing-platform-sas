const useTableHook = ({ filters = {}, searchText = '', tableData = [] }) => {

  const { buhName, ddNmae, projectName, accountName } = filters;

  const filteredListData = (tableData.data || []).filter(item => 
    (!buhName || item?.buh_name?.includes(buhName)) &&
    (!ddNmae || item?.dd_name?.includes(ddNmae)) &&
    (!projectName || item?.project_name?.includes(projectName)) &&
    (!accountName || item?.account_name?.includes(accountName))
  );

  return filteredListData;
};



export default useTableHook;
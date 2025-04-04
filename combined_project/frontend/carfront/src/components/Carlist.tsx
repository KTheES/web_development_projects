import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCars, deleteCar } from "../api/carapi";
import { DataGrid , GridCellParams, GridColDef} from "@mui/x-data-grid";
// DataGrid : data를 격자 형식으로 표현해줍니다.

function Carlist() {
  const queryClient = useQueryClient();
  // useQueryClient()의 실행값을 queryClient에 저장
  const { data, error, isSuccess } = useQuery({
    queryKey: ["cars"],
    queryFn: getCars
  });

  const { mutate } = useMutation(deleteCar, {
    onSuccess: () => {
      // 자동차 삭제가 되고 난 이후에 실행되는 로직
      queryClient.invalidateQueries({queryKey: ['cars']});
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const columns: GridColDef[] = [
    {field: 'brand', headerName: "Brand", width: 200},
    {field: 'model', headerName: "Model", width: 200},
    {field: 'color', headerName: "Color", width: 200},
    {field: 'registrationNumber', headerName: "Reg.n", width: 150},
    {field: 'modelYear', headerName: "Model Year", width: 150},
    {field: 'price', headerName: "Price", width: 200},
    {
      field: 'edit',
      headerName: '',
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => 
        <button 
          onClick={() => mutate(params.row._links.car.href)}
        >
          삭제
        </button>
    }
  ]

  if(!isSuccess) {
    return <span>Loading 중... 👾</span>
  }else if(error) {
    return <span>자동차 데이터 가져오기 중 오류 발생 😢</span>
  }else {
    return(
      <DataGrid
        rows={data}
        columns={columns}
        getRowId={row => row._links.self.href}
        // disableRowSelectionOnClick={true}
      />
    );
  }
}

export default Carlist;
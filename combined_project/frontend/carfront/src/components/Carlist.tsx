import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCars, deleteCar } from "../api/carapi";
import { DataGrid , GridCellParams, GridColDef, GridToolbar} from "@mui/x-data-grid";
import { Snackbar } from "@mui/material";
import IconButton  from "@mui/material/IconButton";   // 작성법 바뀌어서 수정하였습니다.
import DeleteIcon from "@mui/icons-material/Delete";   // 작성법 바뀌어서 수정하였습니다.
import AddCar from "./AddCar";
import EditCar from "./EditCar";
// DataGrid : data를 격자 형식으로 표현해줍니다.

function Carlist() {

  const [open, setOpen] = useState(false);    // toast message를 띄우기 위해 선언했습니다.
  const queryClient = useQueryClient();
  // useQueryClient()의 실행값을 queryClient에 저장
  const { data, error, isSuccess } = useQuery({
    queryKey: ["cars"],
    queryFn: getCars
  });

  const { mutate } = useMutation(deleteCar, {
    onSuccess: () => {
      // 자동차 삭제가 되고 난 이후에 실행되는 로직
      setOpen(true);
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
    {field: 'registrationNumber', headerName: "Reg.nr", width: 150},
    {field: 'modelYear', headerName: "Model Year", width: 150},
    {field: 'price', headerName: "Price", width: 200},
    {
      field: 'edit',
      headerName: '',
      width: 90,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) =>
        <EditCar cardata={params.row}/>   // EditCar의 setCar부분 : cardata = row return 
    },//gridful definition
    {
      field: 'delete',
      headerName: '',
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => 
        <IconButton aria-label='delete' size='small'
          onClick={() => {
            if (window.confirm(`${params.row.brand}의 ${params.row.model}을 삭제하시겠습니까?`)) 
                    mutate(params.row._links.car.href)
          }}>
            // 여기 부분이 조금 달라졌습니다.
            <DeleteIcon fontSize='small' />
          </IconButton>

        // <button 
        //   onClick={() => {
        //     // js의 `` 사용했습니다.
        //     if(window.confirm(`${params.row.brand}의 ${params.row.model}을 삭제하시겠습니까?`)) { // 기본 윈도우 알림창을 사용합니다.
        //       mutate(params.row._links.car.href)}}    // 그렇다면 지웁니다.
        //     }
        // >
        //   삭제
        // </button>
    }
  ]

  if(!isSuccess) {
    return <span>Loading 중... 👾</span>
  }else if(error) {
    return <span>자동차 데이터 가져오기 중 오류 발생 😢</span>
  } else {
    return(<>
      <AddCar />
        <DataGrid
          rows={data}
          columns={columns}
          getRowId={row => row._links.self.href}
          disableRowSelectionOnClick={true}
          slots={{toolbar: GridToolbar}}
        />

        <Snackbar
          open={open}// 객체 속성값들 넣어줍니다
          autoHideDuration={2000} // 지속 시간
          onClose={() => setOpen(false)} // 어떤 상황에서 끌거냐?
          message="자동차가 삭제되었습니다."
        />
      </>
    );
  }
}

export default Carlist;
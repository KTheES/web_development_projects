import { CarResponse } from "../types"
import { useState } from "react";
import { Dialog,DialogTitle,DialogActions, Button } from "@mui/material";
import CarDialogContent from "./CarDialogContent";
import { updateCar } from "../api/carapi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CarEntry } from "../types";
import IconButton from "@mui/material/IconButton";   // 작성법 바뀌어서 수정하였습니다.
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
// import { ToolTip } from "@mui/material";


type FormProps = {
    cardata: CarResponse
}

function EditCar({ cardata } : FormProps) {
    const [ open, setOpen ] = useState(false);
    const [ car, setCar ] = useState<Car>({
        brand: '',
        model: '',
        color: '',
        registrationNumber: '',
        modelYear: 0,
        price: 0,
    });

    const queryClient = useQueryClient();
    const { mutate } = useMutation(updateCar, {
        onSuccess: () => {
            queryClient.invalidateQueries(["cars"]);
        },
        onError: (err) => {
            console.log(err);
        }
    });

    const handleClickOpen = () => {     // 저장하시겠어요 취소하시겠어요?
        setCar({        // click 했을 때 setCar가 되어가지고 값을 가져옴.
            brand: cardata.brand,
            model: cardata.model,
            color: cardata.color,
            registrationNumber: cardata.registrationNumber,
            modelYear: cardata.modelYear,
            price: cardata.price,
        })

        setOpen(true);
    }

    const handleClose = () => {     // 취소되었을 때
        setOpen(false);
    }

    const handleSave = () => {      // 저장되었을 때
        const url = cardata._links.self.href;
        const carEntry : CarEntry = {car, url}  // 구조분해로 쓰임
        mutate(carEntry);
        setCar({
            brand: '',
            model: '',
            color: '',
            registrationNumber: '',
            modelYear: 0,
            price: 0,
        })
        setOpen(false);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCar({...car, [event.target.name]: event.target.value});
    }

    return (
        <>
            <Tooltip title="Edit Car">
                <IconButton aria-label="edit" size="small"
                    onClick={handleClickOpen}>
                    <EditIcon fontSize="small" />
                </IconButton>

            </Tooltip>


            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit car</DialogTitle>
                <CarDialogContent car={car} handleChange={handleChange}/>
                <DialogActions>
                    <Button onClick={handleClose}>취소</Button>
                    <Button onClick={handleSave}>저장</Button>
                </DialogActions>
            </Dialog>
        </>
    );
} 

export default EditCar;
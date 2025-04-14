import { CarResponse } from "../types"
import { useState } from "react";
import { Dialog,DialogTitle,DialogActions } from "@mui/material";
import CarDialogContent from "./CarDialogContent";
import { updateCar } from "../api/carapi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CarEntry } from "../types";

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
            <button onClick={handleClickOpen}>
                수정 ✨
            </button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit car</DialogTitle>
                <CarDialogContent car={car} handleChange={handleChange}/>
                <DialogActions>
                    <button onClick={handleClose}>취소</button>
                    <button onClick={handleSave}>저장</button>
                </DialogActions>
            </Dialog>
        </>
    );
} 

export default EditCar;
import Swal from "sweetalert2";


export const alertSuccess = (text) => Swal.fire({
    title: "Success",
    text: text,
    icon: "success",
});
export const alertError = (text) => Swal.fire({
    title: "Error",
    text: text,
    icon: "failure",
});

export const alertConfirm = (text) => Swal.fire({
    title: "Are you sure?",
    text: text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes"
});
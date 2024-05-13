import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { DataResponse } from "../../auth/interfaces/login-response.interface";

export const bodegaGuard=()=>{
    let dataUser:DataResponse={} as DataResponse

    const router = inject(Router)
    if (localStorage.getItem("userdata")) {
        dataUser=JSON.parse(localStorage.getItem("userdata")!)
        if (dataUser.tipousuario===1) {
            return true;
        }
        router.navigate(['notfound'])
        return false
    }
    router.navigate(['/'])
    return false;
}
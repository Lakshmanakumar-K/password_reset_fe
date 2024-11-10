import axios from "axios"

const apiInstance = axios.create({
    baseURL: import.meta.env.VITE_BE_URL,
    timeout: 20000
});

export const signUpAPI = async (userDetails) => {
    try {
        const response = await apiInstance.post("/auth", userDetails);
        return (response.data);
    }
    catch (e) {
        const { response } = e;
        const { msg } = response.data;
        throw new Error(msg);
    }
}

export const verifyAccountAPI = async (tokenDetails) => {
    try {
        const response = await apiInstance.post("/auth/verifyaccount", tokenDetails);
        return response.data;
    }
    catch (e) {
        const { response } = e;
        const { msg } = response.data;
        throw new Error(msg);
    }
}

export const emailVeriicationAPI = async (email) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BE_URL}/auth/verifyemail`, {
            body: JSON.stringify({ email }),
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
        });
        if(response.status === 200){
        return await response.json();
        }
        else{
            const er = await response.json();
            throw er;
        }
    }
    catch (e) {
        throw new Error(e.msg);
    }
}

export const getOTPAPI = async (email) => {
    try{
    const response = await fetch(`${import.meta.env.VITE_BE_URL}/auth/getotp`,{
        body: JSON.stringify({ email }),
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
    });
    if(response.status === 200){
    return await response.json();
    }
    else{
        const er = await response.json();
        throw er; 
    }
}
catch(e){
    throw new Error(e);
}
}

export const updateOTPAPI = async (email) => {
    try{
    const response = await apiInstance.post("/auth/updateotp",{email});
    console.log(response.data);
    return response.data;
    }
    catch(e){
        const { response } = e;
        const { msg } = response.data;
        throw new Error(msg);
    }
    }

    export const alterPassworAPI = async (details) => {
        try{
        const response = await apiInstance.post("/auth/updatepassword",details);
        return response.data;
        }
        catch(e){
            const { response } = e;
            const { msg } = response.data;
            throw new Error(msg);
        }
        }

    export const passwordValidaionAPI = async (details) => {
        try{
            const response = await apiInstance.post("/auth/validatepassword",details);
            return response.data;
            }
            catch(e){
                const { response } = e;
                const { msg } = response.data;
                throw new Error(msg);
            }
            }

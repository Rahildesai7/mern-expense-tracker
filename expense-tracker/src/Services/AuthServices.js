import axios from 'axios';

const userAuth =  {
    login : async user =>{
        console.log(user);
        const res = await axios.post('http://localhost:5000/users/login',user)
        if (res.status !== 401)
            return res.json().then(data => data);
        else
            return { isAuthenticated: false, user: { username: "", role: "" } };
    },
    register : async user =>{
        console.log(user);
        const res = axios.post('http://localhost:5000/users/add',user)
        const data = await res.json();
        return data;
    },
    isAuthenticated : async ()=>{
        const res = await fetch('/user/authenticated');
        if (res.status !== 401)
            return res.json().then(data => data);

        else
            return { isAuthenticated: false, user: { username: "", role: "" } };
    },
    logout : async ()=>{
        const res = await fetch('/user/logout');
        const data = await res.json();
        return data;
    },
}

export default userAuth;
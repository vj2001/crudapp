import { useDispatch,useSelector } from "react-redux"
import UserService from "../../Services/UserService";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
     const dispatch = useDispatch();
     const navigate = useNavigate();

     const {email,password,isLogged} = useSelector((state)=>state);

     useEffect(()=>{
        const localData = localStorage.getItem("token");
        if(localData)
        {
            navigate("/list");
        }
     },[]);

    const emailChangeHandler=(e)=>{
       dispatch({type:"email",value:e.target.value})        
    }

    const passwordChangeHandler=(e)=>{
        dispatch({type:"password",value:e.target.value})  
    }

    const loginHandler = (e) => {
           e.preventDefault();

           UserService.loginUser({email:email,password:password}).then((res)=>{
            if(res.data != "")
            {
            localStorage.setItem("token",res.data.token);
            dispatch({type:"logged", value:true});
            navigate("/list");
            } else {
            dispatch({type:"logged", value:false});    
            }
        })
    }

    return (
        <div className="container mt-3">
            {
                isLogged===false?(
                    <div className="aler alert-danger">
                        <strong>Error: </strong> Login Credentials failed !
                    </div>
                ):(
                  ""
                )
            }
            <form onSubmit={loginHandler}>
                <div className="mb-3 mt-3">
                       <label htmlFor="email">Email</label>
                       <input
                       type="email"
                       name="email"
                       id="email"
                       className="form-control"
                       placeholder="Enter Email"
                       onChange={emailChangeHandler}
                       />
                </div>
                <div className="mb-3 mt-3">
                       <label htmlFor="password">Password</label>
                       <input
                       type="password"
                       name="password"
                       id="password"
                       className="form-control"
                       placeholder="Enter Password"
                       onChange={passwordChangeHandler}
                       />
                </div>

                <button type="submit" className="btn btn-primary"> 
                    Login
                    </button>
            </form>
        </div>
    )
}
export default Login
import { useState } from "react";
import {useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {

const navigate = useNavigate();
const [formData, setFormData] = useState({
name: "",
email:  "",
password: "",
});

const handleChange = (e) => {
setFormData({
...formData,
[e.target.name]: e.target.value,
});
};

const handleSubmit = async (e) => {
e.preventDefault();

try {
const res = await API.post(
"/auth/register",
formData
);

localStorage.setItem(
"token",
res.data.token
);

navigate("/dashboard");
}
catch (error) {
console.log(error);
alert("Registration Failed");
}
};

return (
<div>
<h1>Register</h1>
<form onSubmit={handleSubmit}>
<input type="name" name="name" placeholder="Name" onChange={handleChange} />
<br/><br/>
<input type="email" name="email" placeholder="Email" onChange={handleChange} />
<br/><br/>
<input type="password" name="password" placeholder="Password" onChange={handleChange} />
<br/><br/>

<button type="submit">Register</button>
</form>
</div>
);
} 

export default Register;



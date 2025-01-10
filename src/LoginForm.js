



function LoginForm() {

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        console.log(email, password);


        try{
            const response = await fetch('http://127.0.0.1:3000/api/auth/connexion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if(response.ok){
                const data = await response.json();
                console.log(data);
            }else{
                console.log('Login failed');
            }
        }
        catch(error){
            console.error('Login failed', error);
        }
    }
  return (
    <div>
      <h1>Login Form</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
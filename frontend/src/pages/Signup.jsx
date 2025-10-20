import { useState } from "react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(email, password); // TODO: don't log password
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>

      <label>Email address:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)} // save to input email variable
        value={email} // vice versa: change to email in case it changes
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)} // save to input password variable
        value={password} // vice versa: change to password in case it changes
      />

      <button>Sign up</button>
    </form>
  );
};

export default Signup;

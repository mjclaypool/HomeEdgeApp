import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const defaultUsername = "username";
    const defaultPassword = "password";

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value)
        setUsernameError(false)
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
        setPasswordError(false)
    }

    const handleClick = () => {
        if (username == defaultUsername && password == defaultPassword) {
            navigate('/dashboard')
        } else if (username != defaultUsername && password != defaultPassword) {
            setUsernameError(true)
            setPasswordError(true)
        } else if (username != defaultUsername) {
            setUsernameError(true)
        } else if (password != defaultPassword) {
            setPasswordError(true)
        }
    }

    return (
        <div className="relative flex-col w-full h-full text-cc-offw text-center text-cc-offw">
            <h1 className="text-[28px] font-bold pt-[160px]">Welcome to Home Edge!</h1>
            <h2 className="text-[16px] px-16">Helping you keep your home systems happy and healthy.</h2>
            <div className="text-left px-16 pt-[126px]">
                <h3 className="text-[16px] font-medium">Username:</h3>
                <input className="w-full h-[40px] bg-cc-offw rounded-lg text-[14px] text-cc-prim p-3"
                    type="text"
                    id="username-input"
                    value={username}
                    onChange={handleUsernameChange}
                    placeholder="Enter your username"
                />
                {usernameError && <p className="text-[12px] text-cc-red font-medium">Incorrect username</p>}
                <h3 className="text-[16px] font-medium pt-[10px]">Password:</h3>
                <input className="w-full h-[40px] bg-cc-offw rounded-lg text-[14px] text-cc-prim p-3"
                    type="text"
                    id="password-input"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Enter your password"
                />
                {passwordError && <p className="text-[12px] text-cc-red font-medium">Incorrect password</p>}
            </div>
            <div className="pt-[28px]">
                <button className="bg-cc-tert text-cc-offw font-bold px-[55px] py-[8px] rounded-lg"
                    type="button"
                    onClick={handleClick}
                >
                    Login
                </button>
            </div>
            <p className="absolute w-full bottom-[54px] text-[16px]">
                Having trouble? <a className="font-medium text-cc-tert" href="mailto:mallory.claypool@gmail.com">Contact the Developer</a>.
            </p>
        </div>
    )
}
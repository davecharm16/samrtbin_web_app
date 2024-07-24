import { useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

export default function PasswordInput({ name, password, onChange, placeholder }) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="input input-bordered w-full max-w-md flex items-center">
            <input
                name={name}
                value={password}
                onChange={onChange}
                type={showPassword ? 'text' : 'password'}
                className="flex-1 border-0 fs-5 outline-0"
                placeholder={placeholder ? placeholder : 'Password must be at least 6 characters'}
                required
            />
            <button type="button" className="flex-none border-0" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <BsEyeSlash size={30} /> : <BsEye size={30} />}
            </button>
        </div>
    );
}

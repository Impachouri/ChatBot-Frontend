import { AiOutlineFilePdf } from "react-icons/ai";
import Logo from "./Logo";

const Navbar = ({ file, handleFileChange }) => {
    return (
        <nav className="w-screen flex justify-between items-center p-5 shadow-md">
            <div className="logo">
                <Logo />
            </div>
            <div className="flex items-center font-bold gap-3">
                {file && (
                    <>
                        <AiOutlineFilePdf className="text-3xl text-green-500" />
                        <span className="text-green-500">{file.name}</span>
                    </>
                )}
                <label
                    className="border border-black px-10 py-2 rounded-md flex items-center justify-center gap-4 font-semibold cursor-pointer"
                    onClick={() => document.getElementById('file-input').click()}
                >
                    <span className="w-6 h-6 flex items-center justify-center border rounded-full border-black">
                        <span className="text-base font-bold">+</span>
                    </span>
                    Upload PDF
                </label>
                <input
                    id="file-input"
                    type="file"
                    className="hidden"
                    accept=".pdf"
                    onChange={handleFileChange}
                />
            </div>
        </nav>
    );
}

export default Navbar;

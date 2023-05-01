import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const ProfileDropdown = () => {
    const { user, getUser, logout, updateProfilePicture } = useContext(AuthContext);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpdateProfilePicture = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('profilePicture', selectedFile);

            await updateProfilePicture(formData);

            setSelectedFile("")
        } else {
            console.error('Please select a file to update your profile picture.');
        }
    };

    useEffect(() => {
        const handleUser = async (e) => {
            if (e) e.preventDefault();

            getUser();
        };

        handleUser();
    }, [getUser]);

    return (
        <div className="profile-dropdown">
            <img
                src={user.profilePicture ? `/backend/${user.profilePicture}` : "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tfGVufDB8fDB8fA%3D%3D&w=1000&q=80"}
                alt="Profile"
                className="profile-picture"
            />

            <div className="dropdown-content">
                <div className="user-details">
                    <p><strong>{user.username}</strong></p>
                    <p>{user.email}</p>
                </div>
                <form>
                    <div className="form-group">
                        <input
                            type="file"
                            className="form-control-file"
                            onChange={handleFileChange}
                        />
                    </div>
                    <button onClick={handleUpdateProfilePicture} type="button" className="btn btn-primary">
                        Update Profile Picture
                    </button>
                </form>
                <Link className='nav-link' onClick={logout}>Logout</Link>
            </div>
        </div>
    )
};

export default ProfileDropdown;

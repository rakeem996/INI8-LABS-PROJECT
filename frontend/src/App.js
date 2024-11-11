import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        dob: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const response = await fetch('http://localhost:5000/users');
        const data = await response.json();
        setUsers(data);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (isEditing) {
            // Update user data in the database
            const response = await fetch(`http://localhost:5000/update/${users[editIndex].id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('User updated successfully!');
                fetchUsers();  // Refresh the user list
            } else {
                alert('Failed to update user');
            }

            setIsEditing(false);
            setEditIndex(null);
        } else {
            // Register new user
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('User registered successfully!');
                fetchUsers();  // Refresh the user list
            } else {
                alert('Failed to register user');
            }
        }

        setFormData({
            name: '',
            email: '',
            phone: '',
            dob: ''
        });
    };

    const handleDelete = async (id) => {
        const response = await fetch(`http://localhost:5000/delete/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('User deleted successfully!');
            fetchUsers();  // Refresh the user list
        } else {
            alert('Failed to delete user');
        }
    };

    const handleEdit = (index) => {
        setFormData(users[index]);
        setIsEditing(true);
        setEditIndex(index);
    };

    return (
        <div className="App">
            <div className="form-container">
                <div className="form-box">
                    <h1>{isEditing ? 'Update User' : 'Register User'}</h1>
                    <form onSubmit={handleFormSubmit}>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Full Name"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Email"
                            required
                        />
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Phone Number"
                            required
                        />
                        <input
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleInputChange}
                            required
                        />
                        <button type="submit">{isEditing ? 'Update' : 'Register'}</button>
                    </form>
                </div>
            </div>

            <div className="users-list-container">
                <h2>Registered Users</h2>
                <ul>
                    {users.map((user, index) => (
                        <li key={user.id}>
                            <div>
                                <p><strong>Name:</strong> {user.name}</p>
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>Phone:</strong> {user.phone}</p>
                                <p><strong>DOB:</strong> {user.dob}</p>
                            </div>
                            <div className="action-buttons">
                                <button onClick={() => handleEdit(index)} className="edit-btn">Edit</button>
                                <button onClick={() => handleDelete(user.id)} className="delete-btn">Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;

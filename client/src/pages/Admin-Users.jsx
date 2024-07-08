import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../components/store/useAuth";
import {NavLink} from "react-router-dom";

export const AdminUsers = () => {
    const {authorizationToken} = useAuth();
    const[users, setUsers] = useState([]);
    const getAllUsersData = useCallback(async() => {
        try {
                const response = await fetch("http://localhost:5000/api/admin/users", {
                    method: "GET",
                    headers:{
                        Authorization: authorizationToken
                    },
                });
                const data = await response.json();
                //console.log(`users ${data}`);
                setUsers(data);
                // setUsers(Array.isArray(data) ? data : []);

                if (Array.isArray(data)) {
                    setUsers(data);
                } else {
                    console.error('Expected an array but got:', data);
                    setUsers([]); // Set to empty array to avoid further issues
                }
        } catch (error) {
            console.log(error);
        }
    },[authorizationToken]);

    // delete the user on delete button
    const deleteUser = async(id) => {
        try {
                const response = await fetch(`http://localhost:5000/api/admin/users/delete/${id}`, {
                    method: "DELETE",
                    headers:{
                        Authorization: authorizationToken
                    },
                });

                const data = await response.json();
                console.log(`users after delete: ${data}`);

                if(response.ok){
                    getAllUsersData();
                }

        } catch (error) {
            console.log(error);      
        }
    }

    useEffect(() => {
        getAllUsersData();
    }, [getAllUsersData]);

    // useEffect(() => {
    //     console.log('Users state updated:', users); // Log users state whenever it updates
    // }, [users]);

    return (
        <>
            <section className="admin-users-section">
                <div className="container">
                    <h1>Admin Users Data</h1>
                </div>
                <div className="container admin-users">
                    <table>
                        <thead>
                            <tr>
                                <th>PRN</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                        {users.map((curUser, index) => {
                            return (
                            <tr key={index}>
                                <td>{curUser.prn}</td>
                                <td>{curUser.studentName}</td>
                                <td>{curUser.email}</td>
                                <td>{curUser.phone}</td>
                                <td>
                                    <NavLink to={`/admin/users/${curUser._id}/edit`}>Edit</NavLink>
                                </td>
                                <td>
                                    {curUser.isAdmin === "true" ? (
                                                "Admin"
                                            ) : (
                                                <button onClick={() => deleteUser(curUser._id)}>Delete</button>
                                            )}
                                </td>
                            </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
};
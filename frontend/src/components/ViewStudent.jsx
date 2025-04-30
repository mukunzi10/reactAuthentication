//api/students
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Table } from 'flowbite-react';
import { AuthContext } from '../context/AuthContext';
export default function ViewStudent() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }

                const response = await axios.get('http://localhost:5000/api/students', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching students:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, [navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

  return (
    <div className="container mx-auto mt-4">
      <h1 className="text-2xl font-bold mb-4">Student List</h1>
      <Table striped={true}>
        <Table.Head>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Age</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {students.map((student) => (
            <Table.Row key={student.id} className="bg-white dark:bg-gray-800">
              <Table.Cell>{student.name}</Table.Cell>
              <Table.Cell>{student.email}</Table.Cell>
              <Table.Cell>{student.age}</Table.Cell>
              <Table.Cell>
                {/* Add action buttons here */}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );


}

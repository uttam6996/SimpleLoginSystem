import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom"; 

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const navigate = useNavigate(); 
 
useEffect(()=>{
    setTimeout(()=>{

        localStorage.clear()   
    },50000)
})

  useEffect(() => {
    // Check if user is authenticated (based on localStorage item)
    if (!localStorage.getItem("Authintication")) {
      navigate("/"); // Redirect to login if user is not authenticated
      return;
    }
    axios.get("https://jsonplaceholder.typicode.com/posts")
    .then((response) => {
    const paginatedPosts :any = paginate(response.data, currentPage, postsPerPage);
      setPosts(paginatedPosts);   
     })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}, [navigate, currentPage, postsPerPage]);

    // Axios interceptor for global error handling
    axios.interceptors.response.use(
        (response) => response,
        (error) => {
          console.error("Axios error interceptor:", error);
          navigate("/apiError"); 

          return Promise.reject(error);
        }
      );

      const paginate = (array: string | any[], currentPage: number, postsPerPage: number) => {
        const startIndex = (currentPage - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        return array.slice(startIndex, endIndex);
      };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };
  const logoutHandler = () =>{
    localStorage.clear()
    navigate("/"); 
  }
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={logoutHandler}>LogOut</button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Body</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post:any) => (
              <TableRow key={post.id}>
                <TableCell>{post.id}</TableCell>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.body}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
        Previous
      </button>
      <button onClick={handleNextPage}>Next</button>

    </div>
  );
};

export default Dashboard;

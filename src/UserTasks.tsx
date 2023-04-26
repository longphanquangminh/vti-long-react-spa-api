import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import BackPageButton from "./BackPageButton";
import { useState, useEffect } from "react"
import { useParams, Link } from 'react-router-dom';
import axios from 'axios'
import Loading from "./Loading";
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
  function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
  ) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

function UserTasks() {
    const { id } = useParams<{ id: string }>(); // get the 'id' parameter from the route
    const [loading, setLoading] = useState(false);
    const [userTask, setUserTask] = useState<any>()
    const [render, setRender] = useState(false)
    useEffect(() => {
        axios
            .get(`https://jsonplaceholder.typicode.com/users/${id}/todos`)
            .then((res) => {
                setUserTask(res.data)
            })
            .catch((err) => {
                console.warn(err)
            })
    }, [id])

    const markDone = (taskId: any) => {
        axios
            .patch(`https://jsonplaceholder.typicode.com/todos/${taskId}`, {
                completed: true
            })
            .then((response) => {
                userTask.find((item: any) => item.id == taskId).completed = response.data.completed
                setLoading(false)
                setRender(!render)
            });
    }
    if (!userTask) return <Loading />

    return (
        <>
        <div className="fixed top-20 left-5 z-50">
            <BackPageButton id={id} />
        </div>
            <div className="m-10">
            {userTask.length == 0 ? (
                <p>No tasks found!</p>
            ) : (
                <>
                    <h1>User Detailed Tasks:</h1>
                <p>Done {[].concat(...userTask).filter((item: any) => item.completed == true).length} / {[].concat(...userTask).length} tasks</p>
                <br />
                <h2>Undone Tasks:</h2>
                <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Order</StyledTableCell>
            <StyledTableCell align="left">ID</StyledTableCell>
            <StyledTableCell align="left">Undone Task Name</StyledTableCell>
            <StyledTableCell align="left" sx={{ width: 150 }}>Mark Done</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {userTask.filter((item: any) => item.completed == false).map((task: any, index: any) => {
                    return (
                            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {index + 1}
              </StyledTableCell>
              <StyledTableCell align="left">{task.id}</StyledTableCell>
              <StyledTableCell align="left">{task.title}</StyledTableCell>
              <StyledTableCell align="left"><LoadingButton
          size="small"
          color="secondary"
          onClick={() => {markDone(task.id); setLoading(true)}}
          loading={loading}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="contained"
        >
          <span>Save</span>
        </LoadingButton></StyledTableCell>
            </StyledTableRow>
                    )
                })}
        </TableBody>
      </Table>
    </TableContainer>
                
                <br />
                <h2>Done Tasks:</h2>
                <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Order</StyledTableCell>
            <StyledTableCell align="left">ID</StyledTableCell>
            <StyledTableCell align="left">Done Task Name</StyledTableCell>
            <StyledTableCell align="left" sx={{ width: 150 }}>Mark Undone</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {userTask.filter((item: any) => item.completed == true).map((task: any, index: any) => {
                    return (
                            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {index + 1}
              </StyledTableCell>
              <StyledTableCell align="left">{task.id}</StyledTableCell>
              <StyledTableCell align="left">{task.title}</StyledTableCell>
              <StyledTableCell align="left"><LoadingButton
          size="small"
          color="secondary"
          onClick={() => {markDone(task.id); setLoading(true)}}
          loading={loading}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="contained"
        >
          <span>Save</span>
        </LoadingButton></StyledTableCell>
            </StyledTableRow>
                    )
                })}
        </TableBody>
      </Table>
    </TableContainer>
                {/* <Link to={`/`}>Back to Homepage</Link> */}
                </>
            )}
            </div>
        </>
    )
}

export default UserTasks

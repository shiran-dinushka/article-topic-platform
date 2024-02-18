import { Container, Input, Paper, Typography } from '@mui/material';
import Navbar from '../../components/Navbar';
import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import axios from 'axios';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';
import Iconbutton from '@mui/material/IconButton';

const columns = [
    { id: 'name', label: 'User Name', minWidth: 135 },
    { id: 'email', label: 'Email', minWidth: 135 },
    {id: 'savedAt', label: 'Joined at', minWidth: 135},
];


function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


const domData = [300, 100, 240, 400, 150, 250, 300];

const xLabelsUser = [
    'Readers',
    'Writers',
];

const xLabelsDomain = [
    'Technical',
    'Health',
    'Science',
    'Entertainment',
    'Sports',
    'Politics',
    'Business',
];



function Reports() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [usersCount, setUsersCount] = React.useState([0, 0]);
    const [writers, setWriters] = React.useState([]);
    const [readers, setReaders] = React.useState([]);

    React.useEffect(() => {
        //get users count
        const userRes = axios.get('http://localhost:3001/api/user/count').then((res) => {
            setUsersCount(res.data);
        }).catch((error) => {
            console.log(error);
        });

        //get all writers details
        const writerRes = axios.get('http://localhost:3001/api/user/get-writers').then((res) => {
            setWriters(res.data);
        }).catch((error) => {
            console.log(error);
        });

        //get all readers details
        const readerRes = axios.get('http://localhost:3001/api/user/get-readers').then((res) => {
            setReaders(res.data);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

         
        

    return (
        <>
            <Navbar>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Graphs" {...a11yProps(0)} />
                            <Tab label="Tabular Reports" {...a11yProps(1)} />
                            <Tab label="Item Three" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <Container maxWidth="xl" sx={{ display: "flex" }}>
                            <Paper elevation={3} style={{ width: 300, padding: '20px', marginTop: '20px', marginRight: "40px" }}>
                                <Typography variant="h5" gutterBottom>User Details</Typography>
                                <BarChart
                                    width={250}
                                    height={300}
                                    series={[
                                        {
                                            data: usersCount,
                                            label: 'No of users',
                                            id: 'pvId',
                                            yAxisKey: 'leftAxisId',
                                        }
                                    ]}
                                    xAxis={[
                                        { data: xLabelsUser, scaleType: 'band' },
                                    ]}
                                    yAxis={[{ id: 'leftAxisId' }]}

                                />
                            </Paper>
                            <Paper elevation={3} style={{ width: 800, padding: '20px', marginTop: '20px', marginRight: "40px" }}>
                                <Typography variant="h5" gutterBottom>Domain Popularity</Typography>
                                <BarChart
                                    width={750}
                                    height={300}
                                    series={[
                                        {
                                            data: domData,
                                            label: 'No of Articles',
                                            id: 'pvId',
                                            yAxisKey: 'leftAxisId',
                                            color: '#3f51b5'
                                        }
                                    ]}
                                    xAxis={[{ data: xLabelsDomain, scaleType: 'band' }]}
                                    yAxis={[{ id: 'leftAxisId' }]}
                                />
                            </Paper>
                        </Container>
                        <Container maxWidth="xl" sx={{ display: "flex" }}>
                            <Paper elevation={3} style={{ height: 400, width: 450, padding: '20px', marginTop: '20px' }}>
                                <Typography variant="h5" gutterBottom>Writer Popularity</Typography>
                                <PieChart
                                    series={[
                                        {
                                            data: [{ label: 'Anuja', value: 30, color: 'green' }, { label: 'Shiran', value: 40, color: 'blue' }, { label: 'Chamodya', value: 50, color: 'yellow' }, { label: 'Upeksha', value: 60, color: 'red' }],
                                            innerRadius: 50,
                                            outerRadius: 95,
                                            paddingAngle: 4,
                                            cornerRadius: 8,
                                            startAngle: -180,
                                            endAngle: 180,
                                            cx: 125,
                                            cy: 130,
                                        }
                                    ]}
                                // slotProps={{ legend: { hidden: true } }}
                                />
                            </Paper>

                        </Container>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <Container maxWidth="md">
                        <Typography marginBottom={1}>User Details</Typography>
                        <Box display="flex" justifyContent="space-between" marginY={2}>
                            <Typography >Writer Details</Typography>
                            <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-search">Search</InputLabel>
                                <OutlinedInput
                                    id="writer-search"
                                    type="text"
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <Iconbutton>
                                                <SearchIcon />
                                            </Iconbutton>
                                        </InputAdornment>
                                    }
                                    label="Search"
                                />
                            </FormControl>
                        </Box>
                        <Paper sx={{ width: '100%', overflow: 'hidden' }} elevation={3}>
                            <TableContainer sx={{ maxHeight: 440 }}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            {columns.map((column) => (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    style={{ minWidth: column.minWidth, backgroundColor: '#0080FE', color: '#FFFFFF', fontWeight: 'bold'}}
                                                >
                                                    {column.label}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {writers
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row) => {
                                                return (
                                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.userId}>
                                                      {/* {columns.map((column) => {
                                                            const value = row[column.id];
                                                            return (
                                                                <TableCell key={column.id} align={column.align}>
                                                                    {typeof value === 'Date' ? column.format(value.toDateString()) : value}
                                                                </TableCell>
                                                            );
                                                        })} */}
                                                        <TableCell>{row.name}</TableCell>
                                                        <TableCell>{row.email}</TableCell>
                                                        <TableCell>{new Date (row.savedAt).toDateString()}</TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[10, 25, 100]}
                                component="div"
                                count={writers.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />                            
                        </Paper>
                        <Box display="flex" justifyContent="space-between" marginY={2}>
                            <Typography marginY={2}>Reader Details</Typography>
                            <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-search">Search</InputLabel>
                                <OutlinedInput
                                    id="reader-search"
                                    type="text"
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <Iconbutton>
                                                <SearchIcon />
                                            </Iconbutton>
                                        </InputAdornment>
                                    }
                                    label="Search"
                                />
                            </FormControl>
                        </Box>
                        <Paper sx={{ width: '100%', overflow: 'hidden' }} elevation={3}>
                            <TableContainer sx={{ maxHeight: 440 }}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            {columns.map((column) => (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    style={{ minWidth: column.minWidth, backgroundColor: '#0080FE', color: '#FFFFFF', fontWeight: 'bold' }}
                                                >
                                                    {column.label}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {readers
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row) => {
                                                return (
                                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.userId}>
                                                        {/* {columns.map((column) => {
                                                            const value = row[column.id];
                                                            return (
                                                                <TableCell key={column.id} align={column.align}>
                                                                    {typeof value === 'Date' ? column.format(value.toDateString()) : value}
                                                                </TableCell>
                                                            );
                                                        })} */}
                                                        <TableCell>{row.name}</TableCell>
                                                        <TableCell>{row.email}</TableCell>
                                                        <TableCell>{new Date (row.savedAt).toDateString()}</TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[10, 25, 100]}
                                component="div"
                                count={readers.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>
                        </Container>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        Item Three
                    </CustomTabPanel>
                </Box>
            </Navbar>
        </>
    );
}
export default Reports;
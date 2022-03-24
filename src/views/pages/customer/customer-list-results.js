import { useState, useEffect } from 'react';
import axios from 'axios';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Avatar, Box, Card, Checkbox, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import getInitials from '../../../utils/get-initials';

const CustomerListResults = () => {
    const [selected, setSelected] = useState([]);
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(0);
    const [customer, setCustomer] = useState([]);

    const handleSelectAll = (event) => {
        if (event.target.checked) {
            const newSelecteds = customer.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleSelectOne = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }

        setSelected(newSelected);
    };

    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    useEffect(() => {
        const customerInfo = async () => {
            await axios.post('https://demo1779595.mockable.io/companies').then((response) => setCustomer(response.data.companiesList));
        };
        customerInfo();
    }, []);
    console.log(customer);

    return (
        <Card>
            <PerfectScrollbar>
                <Box sx={{ minWidth: 1050 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={selected.length === customer.length}
                                        color="primary"
                                        indeterminate={selected.length > 0 && selected.length < customer.length}
                                        onChange={handleSelectAll}
                                    />
                                </TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Company</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Verified</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {customer?.slice(page * limit, page * limit + limit).map((customer) => (
                                <TableRow hover key={customer.name} selected={selected.indexOf(customer.name) !== -1}>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={selected.indexOf(customer.name) !== -1}
                                            onChange={(event) => handleSelectOne(event, customer.name)}
                                            value="true"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Box
                                            sx={{
                                                alignItems: 'center',
                                                display: 'flex'
                                            }}
                                        >
                                            <Avatar src={customer.avatarUrl} sx={{ mr: 2 }}>
                                                {getInitials(customer.name)}
                                            </Avatar>
                                            <Typography color="textPrimary" variant="body1">
                                                {customer.name}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>{customer.company}</TableCell>
                                    <TableCell>{customer.role}</TableCell>
                                    <TableCell>{customer.verified === true ? 'Yes' : 'No'}</TableCell>
                                    <TableCell>{customer.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </PerfectScrollbar>
            <TablePagination
                component="div"
                count={customer.length}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 20]}
            />
        </Card>
    );
};

// CustomerListResults.propTypes = {
//     customer: PropTypes.array.isRequired
// };

export default CustomerListResults;

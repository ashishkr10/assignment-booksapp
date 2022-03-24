import { Box, Container } from '@mui/material';
import CustomerListResults from './customer-list-results';
import CustomerListToolbar from './customer-list-toolbar';

const Customers = () => (
    <>
        <Box
            component="main"
            sx={{
                flexGrow: 1
            }}
        >
            <Container maxWidth={false}>
                <CustomerListToolbar />
                <Box sx={{ mt: 3 }}>
                    <CustomerListResults />
                </Box>
            </Container>
        </Box>
    </>
);

export default Customers;

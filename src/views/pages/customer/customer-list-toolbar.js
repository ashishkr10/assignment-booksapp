import { Box, Button, Card, CardContent, TextField, InputAdornment, SvgIcon, Typography } from '@mui/material';
import Search from '../../../icons/search';
import Upload from '../../../icons/upload';
import Download from '../../../icons/download';

const CustomerListToolbar = (props) => (
    <Box {...props}>
        <Box
            sx={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                m: -1
            }}
        >
            <Typography sx={{ m: 1 }} variant="h2">
                Customers
            </Typography>
            <Box sx={{ m: 1 }}>
                <Button startIcon={<Upload fontSize="small" />} sx={{ mr: 1 }}>
                    Import
                </Button>
                <Button startIcon={<Download fontSize="small" />} sx={{ mr: 1 }}>
                    Export
                </Button>
                <Button color="primary" variant="contained">
                    Add Customers
                </Button>
            </Box>
        </Box>
        <Box sx={{ mt: 3 }}>
            <Card>
                <CardContent>
                    <Box sx={{ maxWidth: 500 }}>
                        <TextField
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SvgIcon color="action" fontSize="small">
                                            <Search />
                                        </SvgIcon>
                                    </InputAdornment>
                                )
                            }}
                            placeholder="Search customer"
                            variant="outlined"
                        />
                    </Box>
                </CardContent>
            </Card>
        </Box>
    </Box>
);

export default CustomerListToolbar;

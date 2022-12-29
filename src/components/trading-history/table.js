import {curr_user, is_logged} from "../userForm/userFormLogin";
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Grid,
    Typography,
    TablePagination,
    TableFooter
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 50,
        minHeight: 300
    },
    tableContainer: {
        position: "relative",
        left: "-300px",
        borderRadius: 5,
        margin: '-380px 10px',
        maxWidth: 650,
        maxHeight: 300
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: "rgba(51, 51, 255, 0.5)",
        color: theme.palette.getContrastText(theme.palette.primary.dark)
    },
    avatar: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.getContrastText(theme.palette.primary.light)
    },
    name: {
        fontWeight: 'bold',
        color: theme.palette.secondary.dark
    },
    status: {
        fontWeight: 'bold',
        fontSize: '0.75rem',
        color: 'white',
        backgroundColor: 'grey',
        borderRadius: 8,
        padding: '3px 10px',
        display: 'inline-block'
    }
}));

function MTable() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(2);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    if(is_logged){
        return (
            <TableContainer component={Paper} className={classes.tableContainer}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableHeaderCell}>Date</TableCell>
                            <TableCell className={classes.tableHeaderCell}>Stock</TableCell>
                            <TableCell className={classes.tableHeaderCell}>Price</TableCell>
                            <TableCell className={classes.tableHeaderCell}>Quantity</TableCell>
                            <TableCell className={classes.tableHeaderCell}>Profit/Loss</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {curr_user.trading_history.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <TableRow key={row.name}>
                                <TableCell>
                                    {row['date']}
                                </TableCell>
                                <TableCell>
                                    <Typography color="primary" variant="subtitle2">{row['stock']}</Typography>
                                </TableCell>
                                <TableCell>{row['price']}</TableCell>
                                <TableCell>
                                    <Typography>{row['qt']}</Typography></TableCell>
                                <TableCell>{row['price']*row['qt']}</TableCell>
                            </TableRow>

                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[2, 4, 6, { label: 'All', value: -1 }]}
                                colSpan={3}
                                count={curr_user.trading_history.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: {
                                        'aria-label': 'rows per page',
                                    },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        );
    }
    else{
        return(
            <div>

            </div>
        )
    }
}

export default MTable;
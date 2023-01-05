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
        minWidth: 590,
        minHeight: 200
    },
    tableContainer: {
        position: "relative",
        left: "-300px",
        borderRadius: 5,
        margin: '-780px 28px',
        maxWidth: 650,
        maxHeight: 730
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: "rgb(0,128,255)",
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
    let curr_user = null;
    let is_logged = (JSON.parse(localStorage.getItem("is_logged")));
    if(is_logged){
        curr_user = (JSON.parse(localStorage.getItem("curr_user")));
    }
    let lst = [{'date':'00/00/0000, 0:00:00', 'stock':'AAPL', 'price':111.11, 'qt':1,}]
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    if(is_logged){
        lst = curr_user.trading_history.reverse()
    }

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
                    {lst.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
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
                            rowsPerPageOptions={[10]}
                            colSpan={3}
                            count={lst.length}
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

export default MTable;
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
        minWidth: 360,
        minHeight: 200
    },
    tableContainer: {
        position: "relative",
        left: "+300px",
        borderRadius: 5,
        top: '-788px',
        maxWidth: 400,
        maxHeight: 350
    },
    tableContainerMinimized: {
        position: "relative",
        left: "+300px",
        borderRadius: 5,
        top: '-1118px',
        maxWidth: 400,
        maxHeight: 350
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

function Holdings() {
    let lst = [{'StockTIKR':'AAPL', 'Amount':'Amount', 'Price':111.11,}]
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
        lst = [...curr_user.holdings];
        lst.sort(function(a,b){
            return b.Amount - a.Amount;
        })
    }

    return (
        <TableContainer component={Paper} className={is_logged ? curr_user.holdings.length > 0 ? classes.tableContainer : classes.tableContainerMinimized : classes.tableContainerMinimized}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.tableHeaderCell}>Stock</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Price</TableCell>
                        <TableCell className={classes.tableHeaderCell} sortDirection={'desc'}>Quantity</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {lst.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                        <TableRow key={row.name}>
                            <TableCell>
                                <Typography color="primary" variant="subtitle2">{row['StockTIKR']}</Typography>
                            </TableCell>
                            <TableCell>
                                {row['Price']}
                            </TableCell>
                            <TableCell>{row['Amount']}</TableCell>
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

export default Holdings;
import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import uuid from 'react-uuid';

import {
    Button,
    Card,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, Typography,
} from '@material-ui/core';

import cellValidator from '../../utils/cellValidator';
import { cellDelimeter, rowDelimeter } from '../../constans';
import duplicateIds from '../../utils/duplicateIds';

import useStyles from './styles';

const MaterialTable = () => {
    const classes = useStyles();

    const [ columns, setColumns ] = useState([]);
    const [ rows, setRows ] = useState([]);
    const [ isValidTable, setIsValidTable ] = useState(true);
    const [ errorReadFile, setErrorReadFile ] = useState('');

    // process CSV data
    const processData = dataString => {
        const parsedRows = dataString.split(rowDelimeter);
        const headers = parsedRows[0].split(cellDelimeter);

        const rows = parsedRows
            .slice(1)
            .filter(row => row.trim().length > 0)
            .map((row, index, array) => {
                let valueId = index + 1;
                const parsedRow = row
                    .trim()
                    .split(cellDelimeter)
                    .map((cell, cellIndex) => {
                        return {
                            type: headers[cellIndex],
                            value: cell.trim()
                        };
                    });

                const validateRow = parsedRow.map((cell) => {
                    return {
                        type: cell.type,
                        value: cell.value,
                        isValid: cellValidator(parsedRow, cell.type, cell.value)
                    };
                });

                return [
                    {
                        type: 'ID',
                        value: valueId,
                        isValid: true,
                    },
                    ...validateRow,
                    {
                        type: 'Duplicate with',
                        value: duplicateIds(parsedRow, index, array),
                        isValid: true
                    }
                ];
            });


        // prepare columns list from headers and remove the blank rows
        let noEmptyStringsHeaders = headers.filter(str => str.trim().length > 0);

        const newHeaders = [ 'ID', ...noEmptyStringsHeaders, 'Duplicate with' ];

        const columns = newHeaders.map(cell => ({
            name: cell,
            label: cell
        }));

        const isValidTable = !rows.map((row) => {
                const invalidCells = row.filter(cell => {
                    if (cell.type === 'Full Name' || cell.type === 'Email' || cell.type === 'Phone') {
                        return cell.value === '';
                    }
                    return false;
                });

                return invalidCells.length;
            }
        )
            .some(invalidRowsLengths => invalidRowsLengths > 0);

        setIsValidTable(isValidTable);

        // create rows and columns
        setRows(rows);
        setColumns(columns);
    };


    // handle file upload
    const handleFileUpload = e => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            /* Parse data */
            const bstr = event.target.result;
            const wb = XLSX.read(bstr, { type: 'binary' });
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_csv(ws, {
                header: 1,
                RS: rowDelimeter,
                FS: cellDelimeter
            });

            processData(data);
        };

        reader.onerror = () => {
            console.error('Failed to read file!' + reader.error);
            // alert to window
            setErrorReadFile(`Error occurred reading file: ${reader.error}`);
        };

        reader.readAsBinaryString(file);
    };

    return (
        <div className={classes.root} >
            <Typography variant="h3" component="h1" className={classes.title} >
                Upload and read CSV files in React.js
            </Typography >
            <Button
                variant="contained"
                component="label"
                className={classes.btn}
            >
                Import users
                <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    hidden
                />
            </Button >
            {!isValidTable && <div className={classes.errorFile} >
                File format is not correct!
            </div >
            }
            {errorReadFile && <div className={classes.errorFile} >
                {errorReadFile}
            </div >
            }

            {isValidTable && <Card className={classes.card} >
                <TableContainer component={Paper} >
                    <Table stickyHeader aria-label="sticky table" >

                        <TableHead >
                            <TableRow >
                                {columns.map((column, index) => (
                                    <TableCell
                                        key={uuid()}
                                        align={index > 0 && index === columns.length ? 'right' : 'center'}
                                        className={classes.tableCell}
                                    >
                                        {column.label}
                                    </TableCell >
                                ))}
                            </TableRow >
                        </TableHead >

                        <TableBody >
                            {rows.map((row, index) => {
                                return (
                                    <TableRow hover role="checkbox" key={uuid()} >
                                        {
                                            row.map((column) => {
                                                return (
                                                    <TableCell
                                                        key={uuid()}
                                                        align={index > 0 && index === row.length ? 'right' : 'center'}
                                                        className={!column.isValid ? classes.tableCellError : ''}
                                                    >
                                                        {column.value}
                                                    </TableCell >
                                                );
                                            })
                                        }
                                    </TableRow >
                                );
                            })}

                        </TableBody >
                    </Table >
                </TableContainer >
            </Card >
            }
        </div >
    );
};

export default MaterialTable;

import { cellDelimeter } from '../constans';
import {changingValuesPhone} from "./changingValuesForOutput";

const duplicateIds = (currentRow, currentRowIndex, rows) => {
    return rows
        .map((row, index) => {
            if (index !== currentRowIndex) {

                const idDuplicateRow = index + 1;
                const parsedRow = row.split(cellDelimeter);
                const phoneIndex = currentRow.findIndex(cell => cell.type.toLowerCase() === 'phone');
                const emailIndex = currentRow.findIndex(cell => cell.type.toLowerCase() === 'email');
                const currentValuePhone = changingValuesPhone(currentRow[phoneIndex].value);
                const parsedRowValuePhone = changingValuesPhone(parsedRow[phoneIndex]);

                if (currentValuePhone === parsedRowValuePhone ||
                    currentRow[emailIndex].value.toLowerCase() === parsedRow[emailIndex].toLowerCase()) {

                    return idDuplicateRow;
                }

                return null;
            }

            return null;
        })
        .filter(id => id !== null)
        .join('. ');
};

export default duplicateIds;

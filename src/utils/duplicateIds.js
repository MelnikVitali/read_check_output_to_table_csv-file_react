import { cellDelimeter } from '../constans';

const duplicateIds = (currentRow, currentRowIndex, rows) => {
    return rows
        .map((row, index) => {
            if (index !== currentRowIndex) {
                const parsedRow = row.split(cellDelimeter);

                const phoneIndex = currentRow.findIndex(cell => cell.type === 'Phone');
                const emailIndex = currentRow.findIndex(cell => cell.type === 'Email');

                if (currentRow[phoneIndex].value === parsedRow[phoneIndex] || currentRow[emailIndex].value === parsedRow[emailIndex]) {
                    return index;
                }

                return null;
            }

            return null;
        })
        .filter(id => id !== null)
        .join('. ');
};

export default duplicateIds;

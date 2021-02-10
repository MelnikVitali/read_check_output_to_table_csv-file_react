const changingValuesPhone = (phone) => {
    if (phone.length === 10) {
        return `+1${phone}`;
    } else if (phone.length === 11 && phone.substring(0, 1)) {
        return `+${phone}`;
    } else {
        return phone;
    }
};

const changingValuesYearlyIncome = (yearlyIncome) => {
    const isInteger = yearlyIncome === '' || Number.isInteger(parseFloat(yearlyIncome));

    return isInteger ? Number(yearlyIncome) : parseFloat(yearlyIncome).toFixed(2);
};

const changingLicenseStates = (licenseStates) => {
    if (licenseStates.length > 2 && licenseStates.includes('|')) {
        const arrLicenseStates = licenseStates.split('|');
        const newArr = arrLicenseStates.map(elem => {
            return String(elem).slice(0, 2).toUpperCase();
        });

        return newArr.join('|');
    } else {
        return String(licenseStates).slice(0, 2).toUpperCase();
    }
};

const changingValuesForOutput = (type, value) => {
    switch (type) {
        case 'PHONE':
            return changingValuesPhone(value);

        case 'YEARLY INCOME':
            return changingValuesYearlyIncome(value);

        case 'LICENSE STATES' :
            return changingLicenseStates(value);

        default:
            return value;
    }
};

export default changingValuesForOutput;
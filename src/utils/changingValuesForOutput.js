export const changingValuesPhone = (phone) => {
    console.log('phone', phone.length);
    if (phone.length === 10) {
        return `+1${phone}`;
    } else if (phone.length === 11 && phone.trim().slice(0,1) === '1') {
        console.log('phone', phone);
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
    const re =/^(\w+)$/;

    if (licenseStates.includes('|')) {
        const arrLicenseStates = licenseStates.split('|');

        const newArr = arrLicenseStates.map(elem => {
            return String(elem).slice(0, 2).toUpperCase();
        });

        return newArr.join('|');
    } else if(re.test(licenseStates) && licenseStates.includes(',')){

        return String(licenseStates).slice(0, 2).toUpperCase();
    }else{

        return licenseStates;
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
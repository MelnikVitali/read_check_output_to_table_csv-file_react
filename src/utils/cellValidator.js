import { parse } from 'date-fns';

const isValidEmail = (email) => {
    const re = /^[0-9a-zA-Z._%+-]+@[0-9a-zA-Z-]+.+.[a-zA-Z]{2,4}$/i;

    return re.test(email);
};

const isValidPhone = (phone) => {
    const re = /^\+?1?(\d{10})$/;

    return re.test(phone);
};

const isValidYearlyIncome = (yearlyIncome) => {
    const parseYearlyIncome = Number(yearlyIncome);

    return parseYearlyIncome < 1000000 && parseYearlyIncome >= 0;
};

const isValidAge = (age) => {
    const parsedAge = Number(age);

    return Number.isInteger(parsedAge) && parsedAge >= 21;
};

const isValidExperience = (experience, age) => {
    const parsedExperience = Number.parseFloat(experience);
    const parsedAge = Number.parseFloat(age);

    return parsedExperience && parsedExperience >= 0 && parsedExperience <= parsedAge;
};

const isValidHasChildren = (hasChildren) => {
    const lowerValue = hasChildren.toLowerCase();

    return (lowerValue === 'true' || lowerValue === 'false' || lowerValue === '');
};

const isValidExpirationDate = (expirationDate) => {
    const reFirst = new RegExp('^((0?[1-9]|1[012])[/](0?[1-9]|[12][0-9]|3[01])[/](19|20)?[0-9]{2})*$'); // format MM/DD/YYYY
    const reSecond = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/; // format YYYY-MM-DD

    const firstStringDate = reFirst.test(expirationDate);
    const secondStringDate = reSecond.test(expirationDate);
    const currentData = new Date().getTime();

    if (firstStringDate) {
        const firstFormatData = parse(expirationDate, 'MM/dd/yyyy', new Date()).getTime();

        return firstFormatData > currentData;
    } else if (secondStringDate) {
        const secondFormatData = parse(expirationDate, 'yyyy-MM-dd', new Date()).getTime();

        return secondFormatData >= currentData;
    } else {
        return false;
    }
};

const isValidLicenseStates = (licenseStates) => {
    const re = /^[0-9a-zA-Z|0-9a-zA-Z]*$/gim;

    return re.test(licenseStates);
};

const isValidLicenseNumber = (licenseNumber) => {
    const re = /^[0-9a-zA-Z]{6}$/gim;

    return re.test(licenseNumber);
};

const cellValidator = (row, type, value) => {
    const age = row.find(cell => cell.type === 'Age');
    const typeToUppercase = type.toUpperCase();

    switch (typeToUppercase) {
        case 'EMAIL':
            return isValidEmail(value);

        case 'PHONE':
            return isValidPhone(value);

        case 'AGE':
            return isValidAge(value);

        case 'EXPERIENCE':
            return isValidExperience(value, age.value);

        case 'YEARLY INCOME':
            return isValidYearlyIncome(value);

        case 'EXPIRATION DATE':
            return isValidExpirationDate(value);

        case 'LICENSE NUMBER' :
            return isValidLicenseNumber(value);

        case 'LICENSE STATES' :
            return isValidLicenseStates(value);

        case 'HAS CHILDREN' :
            return isValidHasChildren(value);

        default:
            return true;
    }
};

export default cellValidator;

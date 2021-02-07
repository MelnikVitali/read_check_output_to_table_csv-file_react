const isValidEmail = (email) => {
    const re = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;

    return re.test(email);
};

const isValidPhone = (phone) => {
    const re = /^\+?1?(\d{10})$/;

    return re.test(phone);
};

const isValidAge = (age) => {
    return Number.parseInt(age) && parseInt(age) >= 21;
};

const isValidExpirience = (experience, age) => {
    const parsedExperience = Number.parseFloat(experience);
    const parsedAge = Number.parseFloat(age);

    return parsedExperience && parsedExperience <= parsedAge;
};

const cellValidator = (row, type, value) => {

    const age = row.find(cell => cell.type === 'Age');

    switch (type) {
        case 'Email':
            return isValidEmail(value);

        case 'Phone':
            return isValidPhone(value);

        case 'Age':
            return isValidAge(value);

        case 'Experience':
            return isValidExpirience(value, age.value);

        default:
            return true;
    }
};

export default cellValidator;

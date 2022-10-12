export default function printMe() {
    // eslint-disable-next-line no-console
    console.log('I get called from modules.js!');
}

const test = val => {
    // eslint-disable-next-line no-console
    console.log(val);
};

test('test function is working');

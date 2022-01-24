import fs from 'fs';

export default () => {
    let json: string;
    let data: {[key: string]: any} = {};

    try {
        json = fs.readFileSync('./settings.json', 'utf8');
        data = JSON.parse(json);
    } catch (e) {
        return data;
    }

    return data;
}
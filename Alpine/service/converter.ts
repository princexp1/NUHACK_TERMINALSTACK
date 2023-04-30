const json2xml = require('json2xml');
var convert = require('xml-js');

const xmlToJson = (xml:any) => {
    var result = convert.xml2json(xml, {compact: true, spaces: 4});
    return result;
};

const jsonToXml = (json:any)=>{
    console.log({json})
    const xml = json2xml(json, { header: true, attributes_key: '@' });
    return xml;
}
module.exports = {xmlToJson, jsonToXml}
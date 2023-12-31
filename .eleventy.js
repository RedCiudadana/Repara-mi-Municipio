const moment = require("moment");
const MarkdownIt = require('markdown-it');
const now = new Date();
const rmj = require('render-markdown-js')

module.exports = function (eleventyConfig) {
    let md = new MarkdownIt();

    eleventyConfig.setTemplateFormats("njk,md");
    
    eleventyConfig.addPassthroughCopy('src');
    eleventyConfig.addPassthroughCopy('css');
    eleventyConfig.addPassthroughCopy('js');
    eleventyConfig.addPassthroughCopy('fonts');
    eleventyConfig.addPassthroughCopy('images');

    eleventyConfig.addDataExtension('json', (contents) => {
        return JSON.parse(contents);
    });

    eleventyConfig.addNunjucksFilter("mdIt", function(content) {
        return md.render(content);
    });

    eleventyConfig.addNunjucksFilter("rmj", function(content) {
        return rmj(content);
    });

    eleventyConfig.addNunjucksFilter("limit", function (array, limit) {
        return array.slice(0, limit);
    });

    eleventyConfig.addNunjucksFilter("limitPart", function(array, limit1, limit2) {
        return array.slice(limit1, limit2);
    });

    eleventyConfig.addFilter("dateFormat", function(date, format) {
        return moment(date).format(format);
    });

}

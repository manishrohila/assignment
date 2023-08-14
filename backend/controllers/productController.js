const Product = require("../models/productModel");
const axios = require('axios');
const cheerio = require('cheerio');

// create Product
const scrapeAndSave = async (req, res) => {
    try {
        const { email } = req.body;
        const response = await axios.get(process.env.flipkart_url);
        const $ = cheerio.load(response.data);

        const title = $("span.B_NuCI").text();
        const price = parseFloat($("div._30jeq3._16Jk6d").text().substring(1).replace(',', ''));
        const descriptionElement = $('div._1mXcCf.RmoJUa p');
        const description = descriptionElement.text().trim();
        const reviews = parseInt($('span._2_R_DZ').text().split(' ')[4]);
        const ratings = parseFloat($('div._3LWZlK').text());
        const mediaCount = $('div.yjhgk+l').length || 7;

        // Use Mongoose's create() method to store data in the database
        await Product.create({
            email: email,
            title,
            price,
            description,
            reviews,
            ratings,
            mediaCount
            //  media_count: mediaCount,
        });

        res.json({ success: true, message: 'Product data scraped and saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred' });
    }
};

module.exports = { scrapeAndSave };
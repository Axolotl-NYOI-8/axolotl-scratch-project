// title:  'Superfood Gentle Antioxidant Refillable Cleanser' ,
// brand:  'Youth To The People' ,
// skin:  `<b>What it is:  </b>A pH-balanced, non-drying face cleanser formulated with antioxidants to gently yet effectively remove makeup, SPF, and excess oils that can clog pores.<br><br><b>Skin Type:</b> Normal, Dry, Combination, and Oily <br><br><b>Skincare Concerns:</b> Pores, Acne and Blemishes, and Oiliness<br><br><b>Highlighted Ingredients:<br></b>- Kale: Rich in phytonutrients and vitamins C and E to leave skin visibly glowing.<br>- Spinach: Lightweight skin soother with cooling properties and essential fatty acids. <br>- Green Tea: Antioxidant-rich powerhouse that fights visible signs of aging.<br><b><br>Ingredient Callouts:</b> This product is vegan, cruelty-free, and comes in recyclable packaging.<br><br><b>What Else You Need to Know:</b> Healthy-looking skin starts with clean skin. This daily, gel-to-foam face cleanser removes makeup, SPF, and buildup in 30 seconds. It leaves skin looking soft, balanced, and glowing. The formula is suitable for single or double cleansing, for combination, acne-prone, and oily skin.<br><br><b>Clean + Planet Positive at Sephora<br></b>When you see our Clean + Planet Positive seal, this brand's products are formulated without certain ingredients that are potentially harmful to human health and environment. They also address ingredients clients are concerned about, including phthalates, formaldehyde or formaldehyde releasers, oxybenzone and octinoxate, hydroquinone, triclosan, coal tar, methylisothiazolinone and methylchloroisothiazolinone, insoluble plastic microbeads, and more: For the full list, check out the Ingredients tab. <br>On top of meeting the Clean at Sephora formulated without list, these brands are on a mission to do right by your routine and the planet by making climate commitments and focusing on sustainable sourcing, responsible packaging, and environmental giving.`,
// rawDescription:  `-Kale: Rich in phytonutrients and vitamins C and E
// to leave skin visibly glowing.<br>-Spinach: Lightweight skin soother with
// cooling properties and essential fatty acids. <br>-Green Tea: Antioxidant-rich
//  powerhouse that fights visible signs of
//  aging.<br><br>Water/Aqua/Eau, Cocamidopropyl Hydroxysultaine, Sodium Cocoyl Glutamate, Sorbeth-230 Tetraoleate, Polysorbate 20, Sodium Chloride, Aloe Barbadensis Leaf (Aloe Vera) Juice Powder, Brassica Oleracea Acephala (Kale) Leaf Extract, Spinacia Oleracea (Spinach) Leaf Extract, Camellia Sinensis (Green Tea) Leaf Extract, Medicago Sativa (Alfalfa) Extract, Chamomilla Recutita (Matricaria) Flower Extract, Tetrahexyldecyl Ascorbate (Vitamin C), Glycerin, Panthenol (Vitamin B5), Tocopheryl Acetate (Vitamin E), Decyl Glucoside, Sorbitan Laurate, Tetrasodium Glutamate Diacetate, Gluconolactone, Ethylhexylglycerin, Maltodextrin, Citric Acid, Phenoxyethanol, Potassium Sorbate, Sodium Benzoate, Gardenia Jasminoides (Jasmine) Fruit Extract, Fragrance/Parfum, Sodium Hydroxide, Sodium Glycolate, Sodium Formate, Hexyl Cinnamal, Linalool, Limonene, Chlorophyllin-Copper Complex (CI 75810).<br><br><b>Clean at Sephora products are formulated without the following banned or restricted ingredients (please see Clean at Sephora landing page for full list of specific restrictions and allowances by category&mdash;this is not an exhaustive list): <br></b>Acrylates, Aluminum Salts, Animal Musks/Fats/Oils, Benzophenones and related compounds, Butoxyethanol, Butylated hydroxyanisole (BHA), Butylated hydroxytoluene (BHT) under 0.1%, Carbon Black or Black 2, Coal Tar, Ethanolamines, Formaldehyde and Formaldehyde Releasing Agents, Hydroquinone, Lead and Lead Acetate, Mercury + Mercury Compounds (Thimerisol), Methoxyethanol, Methyl Cellosolve, Methylchloroisothiazolinone and Methylisothiazolinone, Mineral Oil, Nanomaterials (restrictions for specific nanomaterials only), Oxybenzone, Parabens, Petrolatum and Paraffin (USP grade only), Phenoxyethanol under 1%, Phthalates, Plastic Microbeads, Polyacrylamide & Acrylamide, Resorcinol, Retinyl Palmitate, Styrene, Sulfates, Talc (no detection of asbestos), Toluene, Triclosan and Triclocarban, Undisclosed Synthetic Fragrance (under 1% and formulated without Acetaldehyde, Acetone, Acetonitrile, Benzalkonium chloride, BPA, EDTA, Methylene chloride, PTFE, PFOA), 1,4-Dioxane (ingredients must comply with impurity thresholds), Octinoxate, PFAS compounds, Nitromusks and Polycyclic Musks, Ethoxylated Ingredients (including PEGS or polyethylene glycol must meet contamination limits for 1,4-Dioxane and ethylene oxide), Cyclic Silicones, EDTA and derivatives (allowed if no technical substitute under 0.2%).`

const fs = require("fs");
const path = require("path");
// const axios = require("axios");
const testScrape = fs.readFileSync(
  path.resolve(__dirname, "./cleanserScrape.json")
);

const parser = {
  ingredientParse: (str) => {
    if (str === undefined) return "";
    const lineBreak = "<br><br>";

    let idx = str.indexOf(lineBreak) + lineBreak.length;
    let subString = str.slice(idx);
    let ingredients = subString.slice(0, subString.indexOf("<"));

    return ingredients.split(", ");
  },

  skinTypeParse: (str) => {
    if (str === undefined) return "";
    const skinType = "Skin Type:";
    let idx = str.indexOf(skinType) + skinType.length;
    let subString = str.slice(idx);
    subString = subString.slice(subString.indexOf(">") + 1);

    return subString.slice(0, subString.indexOf("<"));
  },

  skinConcernParse: (str) => {
    if (str === undefined) return "";
    const skinConcern = "Skincare Concerns:";
    let idx = str.indexOf(skinConcern) + skinConcern.length;
    let subString = str.slice(idx);
    subString = subString.slice(subString.indexOf(">") + 1);

    return subString.slice(0, subString.indexOf("<"));
  },

  skuParser: (str) => {
    ///product/kale-spinach-green-tea-age-prevention-cleanser-P411387?skuId=1863588
    const skuStr = "skuId=";
    const idx = str.indexOf(skuStr) + skuStr.length;

    return str.slice(idx);
  },
};

// const skinExample = `"<b>What it is:  </b>A pH-balanced, non-drying face cleanser formulated with antioxidants to gently yet effectively remove makeup, SPF, and excess oils that can clog pores.<br><br><b>Skin Type:</b> Normal, Dry, Combination, and Oily <br><br><b>Skincare Concerns:</b> Pores, Acne and Blemishes, and Oiliness<br><br><b>Highlighted Ingredients:<br></b>- Kale: Rich in phytonutrients and vitamins C and E to leave skin visibly glowing.<br>- Spinach: Lightweight skin soother with cooling properties and essential fatty acids. <br>- Green Tea: Antioxidant-rich powerhouse that fights visible signs of aging.<br><b><br>Ingredient Callouts:</b> This product is vegan, cruelty-free, and comes in recyclable packaging.<br><br><b>What Else You Need to Know:</b> Healthy-looking skin starts with clean skin. This daily, gel-to-foam face cleanser removes makeup, SPF, and buildup in 30 seconds. It leaves skin looking soft, balanced, and glowing. The formula is suitable for single or double cleansing, for combination, acne-prone, and oily skin.<br><br><b>Clean + Planet Positive at Sephora<br></b>When you see our Clean + Planet Positive seal, this brand's products are formulated without certain ingredients that are potentially harmful to human health and environment. They also address ingredients clients are concerned about, including phthalates, formaldehyde or formaldehyde releasers, oxybenzone and octinoxate, hydroquinone, triclosan, coal tar, methylisothiazolinone and methylchloroisothiazolinone, insoluble plastic microbeads, and more: For the full list, check out the Ingredients tab. <br>On top of meeting the Clean at Sephora formulated without list, these brands are on a mission to do right by your routine and the planet by making climate commitments and focusing on sustainable sourcing, responsible packaging, and environmental giving."`;
// const ingredientExample = `"-Blend of Japanese Algae: Leaves skin feeling soft, comforted, and nourished.<br>-Hyaluronic Acid: Helps skin look smooth and plump with hydration.<br>-Tatcha's Signature Hadasei-3: Restores a visibly healthy-, youthful-looking radiance.<br><br>Aqua/Water/Eau, Microcrystalline Cellulose, Propanediol, Sodium Cocoyl Glutamate, Glycerin, Acrylates Copolymer, Sodium Caproyl Methyltaurate, Coco-Betaine, Parfum/Fragrance, Saccharomyces/Camellia Sinensis Leaf/Cladosiphon Okamuranus/Rice Ferment Filtrate*, Oryza Sativa (Rice) Powder, Chondrus Crispus Extract, Sodium Hyaluronate, Betaphycus Gelatinum Extract, Lauryl Glucoside, Potassium Hydroxide, Polyquaternium-39, Disodium Edta, Phenoxyethanol, Ethylhexylglycerin, Sodium Benzoate, Sodium Carbonate, Alcohol.<Br><br>*Hadasei-3.<br><br><b>Clean at Sephora products are formulated without the following banned or restricted ingredients (please see Clean at Sephora landing page for full list of specific restrictions and allowances by category – this is not an exhaustive list): </b><br>\nAcrylates, Aluminum Salts, Animal Musks/Fats/Oils, Benzophenones and related compounds, Butoxyethanol, Butylated hydroxyanisole (BHA), Butylated hydroxytulolene (BHT) under 0.1% , Carbon Black or Black 2, Coal Tar, Ethanolamines, Formaldehyde and Formaldehyde Releasing Agents, Hydroquinone, Lead and Lead Acetate, Mercury + Mercury Compounds (Thimerisol), Methoxyethanol, Methyl Cellosolve, Methylchloroisothiazolinone and Methylisothiazolinone, Mineral Oil, Nanomaterials (restrictions for specific nanomaterials only), Oxybenzone, Parabens, Petrolatum and Parrafin (USP grade only), Phenoxyethanol under 1%, Phthalates, Plastic Microbeads, Polyacrylamide & Acrylamide, Resorcinol, Retinyl Palmitate, Styrene, Sulfates, Talc (no detection of asbestos) , Toluene, Triclosan and Triclocarban, Undisclosed Synthetic Fragrance (under 1% and formulated without Acetaldehyde, Acetone, Acetonitrile, Benzalkonium chloride, BPA, EDTA, Methylene chloride, PTFE, PFOA), 1, 4, Dioxane (ingredients must comply with impurity thresholds), Octinoxate, PFAS compounds, Nitromusks and Polycyclic Musks, Ethoxylated Ingredients (including PEGS or polyethylene glycol must meet contamination limits for 1’4 Dioxane and ethylene oxide), Cyclic Silicones, EDTA and derivatives (allowed if no technical substitute under 0.2%)"`;

// console.log(skinTypeParse(skinExample));
// console.log(skinConcernParse(skinExample));
// console.log(ingredientParse(ingredientExample));

module.exports = parser;

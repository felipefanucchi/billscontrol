// BUDGET CONTROLLER
var budgetController = (function() {
    var Expense = function(id, description, value, percentage) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function(totalInc) {
        if(totalInc > 0) {
            this.percentage = Math.round((this.value / totalInc) * 100);
        } else {
            this.percentage = -1;
        }
    };

    Expense.prototype.getPercentage = function() {
        return this.percentage;
    };

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        localItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };

    var calculateTotal = function(type){
        var sum;
        sum = 0;

        data.allItems[type].forEach(function(curr) {
            sum += curr.value;
        });

        data.totals[type] = sum;

        /*
            Incomes[100, 200, 300]
            sum = 0;
            sum = 0 + 100;
            sum = 100 + 200;
            sum = 300 + 300;
            sum = 600
        */
    };

    let countries = {
        "AD": {
            "value": "AD",
            "names": [
                "Andorre",
                "Andorra"
            ],
            "region": "Europe",
            "subregion": "Southern Europe",
            "currency": "EUR",
        },
        "AE": {
            "value": "AE",
            "names": [
                "United Arab Emirates",
                "Vereinigte Arabische Emirate",
                "Émirats Arabes Unis",
                "Emiratos Árabes Unidos"
            ],
            "region": "Asia",
            "subregion": "Western Asia",
            "currency": "AED",
        },
        "AF": {
            "value": "AF",
            "names": [
                "Afghanistan",
                "Afganistán"
            ],
            "region": "Asia",
            "subregion": "Southern Asia",
            "currency": "AFN",
        },
        "AG": {
            "value": "AG",
            "names": [
                "Antigua and Barbuda",
                "Antigua und Barbuda",
                "Antigua et Barbuda",
                "Antigua y Barbuda"
            ],
            "region": "Americas",
            "subregion": "Caribbean",
            "currency": "XCD",
        },
        "AI": {
            "value": "AI",
            "names": [
                "Anguilla"
            ],
            "region": "Americas",
            "subregion": "Caribbean",
            "currency": "XCD",
        },
        "AL": {
            "value": "AL",
            "names": [
                "Albania",
                "Albanien",
                "Albanie"
            ],
            "region": "Europe",
            "subregion": "Southern Europe",
            "currency": "ALL",
        },
        "AM": {
            "value": "AM",
            "names": [
                "Armenia",
                "Armenien",
                "Arménie"
            ],
            "region": "Asia",
            "subregion": "Western Asia",
            "currency": "AMD",
        },
        "AN": {
            "value": "AN",
            "names": [
                "Netherlands Antilles",
                "Niederländische Antillen",
                "Antilles néerlandaises",
                "Antillas Holandesas"
            ],
            "region": "Americas",
            "subregion": "Caribbean",
            "currency": "ANG",
        },
        "AO": {
            "value": "AO",
            "names": [
                "Angola"
            ],
            "region": "Africa",
            "subregion": "Middle Africa",
            "currency": "AOA",
        },
        "AQ": {
            "value": "AQ",
            "names": [
                "Antarctica",
                "Antarktis",
                "Antarctique",
                "Antártida"
            ],
            "region": "",
            "subregion": "",
            "currency": null,
        },
        "AR": {
            "value": "AR",
            "names": [
                "Argentina",
                "Argentinien",
                "Argentine"
            ],
            "region": "Americas",
            "subregion": "South America",
            "currency": "ARS",
        },
        "AS": {
            "value": "AS",
            "names": [
                "American Samoa",
                "Amerikanisch-Samoa",
                "Samoa américaines",
                "Samoa Americana"
            ],
            "region": "Oceania",
            "subregion": "Polynesia",
            "currency": "USD",
        },
        "AT": {
            "value": "AT",
            "names": [
                "Österreich",
                "Autriche",
                "Austria"
            ],
            "region": "Europe",
            "subregion": "Western Europe",
            "currency": "EUR",
        },
        "AU": {
            "value": "AU",
            "names": [
                "Australien",
                "Australie",
                "Australia"
            ],
            "region": "Oceania",
            "subregion": "Australia and New Zealand",
            "currency": "AUD",
        },
        "AW": {
            "value": "AW",
            "names": [
                "Aruba"
            ],
            "region": "Americas",
            "subregion": "Caribbean",
            "currency": "AWG",
        },
        "AX": {
            "value": "AX",
            "names": [
                "Åland Islands"
            ],
            "region": "Europe",
            "subregion": "Northern Europe",
            "currency": null,
        },
        "AZ": {
            "value": "AZ",
            "names": [
                "Azerbaijan",
                "Aserbaidschan",
                "Azerbaïdjan",
                "Azerbaiyán"
            ],
            "region": "Asia",
            "subregion": "Western Asia",
            "currency": "AZN",
        },
        "BA": {
            "value": "BA",
            "names": [
                "Bosnia and Herzegovina",
                "Bosnien und Herzegowina",
                "Bosnie et Herzégovine",
                "Bosnia y Herzegovina"
            ],
            "region": "Europe",
            "subregion": "Southern Europe",
            "currency": "BAM",
        },
        "BB": {
            "value": "BB",
            "names": [
                "Barbade",
                "Barbados"
            ],
            "region": "Americas",
            "subregion": "Caribbean",
            "currency": "BBD",
        },
        "BD": {
            "value": "BD",
            "names": [
                "Bangladesh",
                "Bangladesch"
            ],
            "region": "Asia",
            "subregion": "Southern Asia",
            "currency": "BTD",
        },
        "BE": {
            "value": "BE",
            "names": [
                "Belgium",
                "Belgien",
                "Belgique",
                "Bélgica"
            ],
            "region": "Europe",
            "subregion": "Western Europe",
            "currency": "EUR",
        },
        "BF": {
            "value": "BF",
            "names": [
                "Burkina Faso"
            ],
            "region": "Africa",
            "subregion": "Western Africa",
            "currency": "XOF",
        },
        "BG": {
            "value": "BG",
            "names": [
                "Bulgaria",
                "Bulgarien",
                "Bulgarie"
            ],
            "region": "Europe",
            "subregion": "Eastern Europe",
            "currency": "BGN",
        },
        "BH": {
            "value": "BH",
            "names": [
                "Bahrain",
                "Bahreïn",
                "Bahrein"
            ],
            "region": "Asia",
            "subregion": "Western Asia",
            "currency": "BHD",
        },
        "BI": {
            "value": "BI",
            "names": [
                "Burundi"
            ],
            "region": "Africa",
            "subregion": "Eastern Africa",
            "currency": "BIF",
        },
        "BJ": {
            "value": "BJ",
            "names": [
                "Benin",
                "Bénin"
            ],
            "region": "Africa",
            "subregion": "Western Africa",
            "currency": "XOF",
        },
        "BL": {
            "value": "BL",
            "names": [
                "Saint Barthélemy"
            ],
            "region": "Americas",
            "subregion": "Caribbean",
            "currency": null,
        },
        "BM": {
            "value": "BM",
            "names": [
                "Bermuda",
                "Bermudes",
                "Bermudas"
            ],
            "region": "Americas",
            "subregion": "Northern America",
            "currency": "BMD",
        },
        "BN": {
            "value": "BN",
            "names": [
                "Brunei",
                "Brunei Darussalam"
            ],
            "region": "Asia",
            "subregion": "South-Eastern Asia",
            "currency": "BND",
        },
        "BO": {
            "value": "BO",
            "names": [
                "Bolivia",
                "Bolivien",
                "Bolivie"
            ],
            "region": "Americas",
            "subregion": "South America",
            "currency": "BOB",
        },
        "BR": {
            "value": "BR",
            "names": [
                "Brazil",
                "Brasilien",
                "Brésil",
                "Brasil"
            ],
            "region": "Americas",
            "subregion": "South America",
            "currency": "BRL",
        },
        "BS": {
            "value": "BS",
            "names": [
                "Bahamas"
            ],
            "region": "Americas",
            "subregion": "Caribbean",
            "currency": "BSD",
        },
        "BT": {
            "value": "BT",
            "names": [
                "Bhutan",
                "Bhoutan",
                "Bután"
            ],
            "region": "Asia",
            "subregion": "Southern Asia",
            "currency": "BTN",
        },
        "BV": {
            "value": "BV",
            "names": [
                "Bouvet Island"
            ],
            "region": "",
            "subregion": "",
            "currency": "NOK",
        },
        "BW": {
            "value": "BW",
            "names": [
                "Botswana"
            ],
            "region": "Africa",
            "subregion": "Southern Africa",
            "currency": "BWP",
        },
        "BY": {
            "value": "BY",
            "names": [
                "Belarus",
                "Weißrussland",
                "Biélorussie",
                "Bielorrusia"
            ],
            "region": "Europe",
            "subregion": "Eastern Europe",
            "currency": "BYR",
        },
        "BZ": {
            "value": "BZ",
            "names": [
                "Belize",
                "Belice"
            ],
            "region": "Americas",
            "subregion": "Central America",
            "currency": "BZD",
        },
        "CA": {
            "value": "CA",
            "names": [
                "Canada",
                "Kanada",
                "Canadá"
            ],
            "region": "Americas",
            "subregion": "Northern America",
            "currency": "CAD",
        },
        "CC": {
            "value": "CC",
            "names": [
                "Cocos (Keeling) Islands"
            ],
            "region": "Oceania",
            "subregion": "Australia and New Zealand",
            "currency": "AUD",
        },
        "CD": {
            "value": "CD",
            "name": "Congo, The Democratic Republic Of The",
            "names": [
                "Congo, The Democratic Republic Of The",
                "Congo (Dem. Rep.)",
                "Kongo (Dem. Rep.)",
                "Congo (Rep. Dem.)",
                "Congo (Rep. Dem.)"
            ],
            "region": "Africa",
            "subregion": "Middle Africa",
            "currency": null,
        },
        "CF": {
            "value": "CF",
            "names": [
                "Central African Republic",
                "Zentralafrikanische Republik",
                "République Centrafricaine",
                "República Centroafricana"
            ],
            "region": "Africa",
            "subregion": "Middle Africa",
            "currency": "XAF",
        },
        "CG": {
            "value": "CG",
            "names": [
                "Congo",
                "Kongo"
            ],
            "region": "Africa",
            "subregion": "Middle Africa",
            "currency": null,
        },
        "CH": {
            "value": "CH",
            "names": [
                "Switzerland",
                "Schweiz",
                "Suisse",
                "Suiza"
            ],
            "region": "Europe",
            "subregion": "Western Europe",
            "currency": "CHF",
        },
        "CI": {
            "value": "CI",
            "names": [
                "Côte D'Ivoire"
            ],
            "region": "Africa",
            "subregion": "Western Africa",
            "currency": "XOF",
        },
        "CK": {
            "value": "CK",
            "names": [
                "Cook Islands",
                "Cookinseln",
                "Îles Cook",
                "Islas Cook"
            ],
            "region": "Oceania",
            "subregion": "Polynesia",
            "currency": "NZD",
        },
        "CL": {
            "value": "CL",
            "names": [
                "Chile"
            ],
            "region": "Americas",
            "subregion": "South America",
            "currency": "CLP",
        },
        "CM": {
            "value": "CM",
            "names": [
                "Cameroon",
                "Kamerun",
                "Cameroun",
                "Camerún"
            ],
            "region": "Africa",
            "subregion": "Middle Africa",
            "currency": "XAF",
        },
        "CN": {
            "value": "CN",
            "names": [
                "China",
                "Chine"
            ],
            "region": "Asia",
            "subregion": "Eastern Asia",
            "currency": "CNY",
        },
        "CO": {
            "value": "CO",
            "names": [
                "Colombia",
                "Kolumbien",
                "Colombie"
            ],
            "region": "Americas",
            "subregion": "South America",
            "currency": "COP",
        },
        "CR": {
            "value": "CR",
            "names": [
                "Costa Rica"
            ],
            "region": "Americas",
            "subregion": "Central America",
            "currency": "CRC",
        },
        "CU": {
            "value": "CU",
            "names": [
                "Cuba",
                "Kuba"
            ],
            "region": "Americas",
            "subregion": "Caribbean",
            "currency": "CUP",
        },
        "CV": {
            "value": "CV",
            "names": [
                "Cape Verde",
                "Kap Verde",
                "Cap Vert",
                "Cabo Verde"
            ],
            "region": "Africa",
            "subregion": "Western Africa",
            "currency": "CVE",
        },
        "CX": {
            "value": "CX",
            "names": [
                "Christmas Island"
            ],
            "region": "Oceania",
            "subregion": "Australia and New Zealand",
            "currency": "AUD",
        },
        "CY": {
            "value": "CY",
            "name": "Cyprus",
            "names": [
                "Cyprus",
                "Zypern",
                "Chypre",
                "Chipre"
            ],
            "region": "Asia",
            "subregion": "Western Asia",
            "currency": "EUR",
        },
        "CZ": {
            "value": "CZ",
            "names": [
                "Czech Republic",
                "Tschechische Republik",
                "République Tchèque",
                "República Checa"
            ],
            "region": "Europe",
            "subregion": "Eastern Europe",
            "currency": "CZK",
        },
        "DE": {
            "value": "DE",
            "names": [
                "Germany",
                "Deutschland",
                "Allemagne",
                "Alemania"
            ],
            "region": "Europe",
            "subregion": "Western Europe",
            "currency": "EUR",
        },
        "DJ": {
            "value": "DJ",
            "names": [
                "Djibouti"
            ],
            "region": "Africa",
            "subregion": "Eastern Africa",
            "currency": "DJF",
        },
        "DK": {
            "value": "DK",
            "names": [
                "Denmark",
                "Dänemark",
                "Danemark",
                "Dinamarca"
            ],
            "region": "Europe",
            "subregion": "Northern Europe",
            "currency": "DKK",
        },
        "DM": {
            "value": "DM",
            "names": [
                "Dominica"
            ],
            "region": "Americas",
            "subregion": "Caribbean",
            "currency": "XCD",
        },
        "DO": {
            "value": "DO",
            "names": [
                "Dominican Republic",
                "Dominikanische Republik",
                "République Dominicaine",
                "República Dominicana"
            ],
            "region": "Americas",
            "subregion": "Caribbean",
            "currency": "DOP",
        },
        "DZ": {
            "value": "DZ",
            "names": [
                "Algeria",
                "Algerien",
                "Algérie",
                "Argelia"
            ],
            "region": "Africa",
            "subregion": "Northern Africa",
            "currency": "DZD",
        },
        "EC": {
            "value": "EC",
            "names": [
                "Équateur",
                "Ecuador"
            ],
            "region": "Americas",
            "subregion": "South America",
            "currency": "USD",
        },
        "EE": {
            "value": "EE",
            "names": [
                "Estland",
                "Estonie",
                "Estonia"
            ],
            "region": "Europe",
            "subregion": "Northern Europe",
            "currency": "EEK",
        },
        "EG": {
            "value": "EG",
            "names": [
                "Egypt",
                "Ägypten",
                "Égypte",
                "Egipto"
            ],
            "region": "Africa",
            "subregion": "Northern Africa",
            "currency": "EGP",
        },
        "EH": {
            "value": "EH",
            "names": [
                "Western Sahara",
                "Westsahara",
                "Sahara Occidental",
                "Sahara Occidental"
            ],
            "region": "Africa",
            "subregion": "Northern Africa",
            "currency": "MAD",
        },
        "ER": {
            "value": "ER",
            "names": [
                "Érythrée",
                "Eritrea"
            ],
            "region": "Africa",
            "subregion": "Eastern Africa",
            "currency": "ETB",
        },
        "ES": {
            "value": "ES",
            "names": [
                "Spain",
                "Spanien",
                "Espagne",
                "España"
            ],
            "region": "Europe",
            "subregion": "Southern Europe",
            "currency": "EUR",
        },
        "ET": {
            "value": "ET",
            "name": "Ethiopia",
            "names": [
                "Ethiopia",
                "Äthiopien",
                "Éthiopie",
                "Etiopía"
            ],
            "region": "Africa",
            "subregion": "Eastern Africa",
            "currency": "ETB",
        },
        "FI": {
            "value": "FI",
            "names": [
                "Finland",
                "Finnland",
                "Finlande",
                "Finlandia"
            ],
            "region": "Europe",
            "subregion": "Northern Europe",
            "currency": "EUR",
        },
        "FJ": {
            "value": "FJ",
            "names": [
                "Fiji",
                "Fidschi",
                "Fidji"
            ],
            "region": "Oceania",
            "subregion": "Melanesia",
            "currency": "USD",
        },
        "FK": {
            "value": "FK",
            "names": [
                "Falkland Islands (Malvinas)",
                "Falkland Islands",
                "Falklandinseln",
                "Îles Malouines",
                "Islas Malvinas"
            ],
            "region": "Americas",
            "subregion": "South America",
            "currency": "FKP",
        },
        "FM": {
            "value": "FM",
            "names": [
                "Micronesia, Federated States Of",
                "Micronesia",
                "Mikronesien",
                "Micronésie",
                "Micronesia"
            ],
            "region": "Oceania",
            "subregion": "Micronesia",
            "currency": "USD",
        },
        "FO": {
            "value": "FO",
            "names": [
                "Faroe Islands",
                "Färöer-Inseln",
                "Îles Féroé",
                "Islas Faroe"
            ],
            "region": "Europe",
            "subregion": "Northern Europe",
            "currency": "DKK",
        },
        "FR": {
            "value": "FR",
            "names": [
                "France",
                "Frankreich",
                "Francia",
                "the French Republic"
            ],
            "region": "Europe",
            "subregion": "Western Europe",
            "currency": "EUR",
        },
        "GA": {
            "value": "GA",
            "names": [
                "Gabon",
                "Gabun",
                "Gabón"
            ],
            "region": "Africa",
            "subregion": "Middle Africa",
            "currency": "XAF",
        },
        "GB": {
            "value": "GB",
            "names": [
                "United Kingdom",
                "GroÃÂbritannien",
                "Royaume-Uni",
                "Reino Unido"
            ],
            "region": "Europe",
            "subregion": "Northern Europe",
            "currency": "GBP",
        },
        "GD": {
            "value": "GD",
            "names": [
                "Grenada"
            ],
            "region": "Americas",
            "subregion": "Caribbean",
            "currency": "XCD",
        },
        "GE": {
            "value": "GE",
            "names": [
                "Georgien",
                "Géorgie",
                "Georgia"
            ],
            "region": "Asia",
            "subregion": "Western Asia",
            "currency": "GEL",
        },
        "GF": {
            "value": "GF",
            "names": [
                "French Guiana",
                "Französisch Guyana",
                "Guyane française",
                "Guayana Francesa"
            ],
            "region": "Americas",
            "subregion": "South America",
            "currency": "EUR",
        },
        "GG": {
            "value": "GG",
            "names": [
                "Guernsey",
                "Guernsey and Alderney",
                "Guernsey und Alderney",
                "Guernsey et Alderney",
                "Guernsey y Alderney"
            ],
            "region": "Europe",
            "subregion": "Northern Europe",
            "currency": "GGP",
        },
        "GH": {
            "value": "GH",
            "names": [
                "Ghana"
            ],
            "region": "Africa",
            "subregion": "Western Africa",
            "currency": "GHS",
        },
        "GI": {
            "value": "GI",
            "names": [
                "Gibraltar"
            ],
            "region": "Europe",
            "subregion": "Southern Europe",
            "currency": "GIP",
        },
        "GL": {
            "value": "GL",
            "names": [
                "Greenland",
                "Grönland",
                "Groenland",
                "Groenlandia"
            ],
            "region": "Americas",
            "subregion": "Northern America",
            "currency": "DKK",
        },
        "GM": {
            "value": "GM",
            "names": [
                "Gambia"
            ],
            "region": "Africa",
            "subregion": "Western Africa",
            "currency": "GMD",
        },
        "GN": {
            "value": "GN",
            "name": "Guinea",
            "names": [
                "Guinea",
                "Guinea",
                "Guinée",
                "Guinea"
            ],
            "region": "Africa",
            "subregion": "Western Africa",
            "currency": "GNF",
        },
        "GP": {
            "value": "GP",
            "names": [
                "Guadeloupe",
                "Guadalupe"
            ],
            "region": "Americas",
            "subregion": "Caribbean",
            "currency": "EUR",
        },
        "GQ": {
            "value": "GQ",
            "names": [
                "Equatorial Guinea",
                "Äquatorial-Guinea",
                "Guinée Équatoriale",
                "Guinea Ecuatorial"
            ],
            "region": "Africa",
            "subregion": "Middle Africa",
            "currency": null,
        },
        "GR": {
            "value": "GR",
            "names": [
                "Greece",
                "Griechenland",
                "Grèce",
                "Grecia"
            ],
            "region": "Europe",
            "subregion": "Southern Europe",
            "currency": "EUR",
        },
        "GS": {
            "value": "GS",
            "names": [
                "South Georgia and the South Sandwich Islands"
            ],
            "region": "Americas",
            "subregion": "South America",
            "currency": null,
        },
        "GT": {
            "value": "GT",
            "names": [
                "Guatemala"
            ],
            "region": "Americas",
            "subregion": "Central America",
            "currency": "GTQ",
        },
        "GU": {
            "value": "GU",
            "names": [
                "Guam"
            ],
            "region": "Oceania",
            "subregion": "Micronesia",
            "currency": "USD",
        },
        "GW": {
            "value": "GW",
            "names": [
                "Guinea-Bissau",
                "Guinée-Bissau"
            ],
            "region": "Africa",
            "subregion": "Western Africa",
            "currency": "XOF",
        },
        "GY": {
            "value": "GY",
            "names": [
                "Guyana"
            ],
            "region": "Americas",
            "subregion": "South America",
            "currency": "GYD",
        },
        "HK": {
            "value": "HK",
            "names": [
                "Hong Kong"
            ],
            "region": "Asia",
            "subregion": "Eastern Asia",
            "currency": "HKD",
        },
        "HM": {
            "value": "HM",
            "names": [
                "Heard and McDonald Islands"
            ],
            "region": "",
            "subregion": "",
            "currency": "AUD",
        },
        "HN": {
            "value": "HN",
            "names": [
                "Honduras"
            ],
            "region": "Americas",
            "subregion": "Central America",
            "currency": "HNL",
        },
        "HR": {
            "value": "HR",
            "names": [
                "Croatia",
                "Kroatien",
                "Croatie",
                "Croacia"
            ],
            "region": "Europe",
            "subregion": "Southern Europe",
            "currency": "HRK",
        },
        "HT": {
            "value": "HT",
            "names": [
                "Haiti"
            ],
            "region": "Americas",
            "subregion": "Caribbean",
            "currency": "USD",
        },
        "HU": {
            "value": "HU",
            "names": [
                "Hungary",
                "Ungarn",
                "Hongrie",
                "Hungría"
            ],
            "region": "Europe",
            "subregion": "Eastern Europe",
            "currency": "HUF",
        },
        "ID": {
            "value": "ID",
            "names": [
                "Indonesia",
                "Indonesien",
                "Indonésie"
            ],
            "region": "Asia",
            "subregion": "South-Eastern Asia",
            "currency": "IDR",
        },
        "IE": {
            "value": "IE",
            "names": [
                "Ireland",
                "Irland",
                "Irlande",
                "Irlanda"
            ],
            "region": "Europe",
            "subregion": "Northern Europe",
            "currency": "EUR",
        },
        "IL": {
            "value": "IL",
            "names": [
                "Israël",
                "Israel"
            ],
            "region": "Asia",
            "subregion": "Western Asia",
            "currency": "ILS",
        },
        "IM": {
            "value": "IM",
            "names": [
                "Isle of Man",
                "Man",
                "Île de Man",
                "Isla de Man"
            ],
            "region": "Europe",
            "subregion": "Northern Europe",
            "currency": "IMP",
        },
        "IN": {
            "value": "IN",
            "names": [
                "India",
                "Indien",
                "Inde"
            ],
            "region": "Asia",
            "subregion": "Southern Asia",
            "currency": "INR",
        },
        "IO": {
            "value": "IO",
            "names": [
                "British Indian Ocean Territory"
            ],
            "region": "Africa",
            "subregion": "Eastern Africa",
            "currency": "USD",
        },
        "IQ": {
            "value": "IQ",
            "names": [
                "Iraq",
                "Irak"
            ],
            "region": "Asia",
            "subregion": "Western Asia",
            "currency": "IQD",
        },
        "IR": {
            "value": "IR",
            "names": [
                "Iran, Islamic Republic Of",
                "Iran",
                "Irán"
            ],
            "region": "Asia",
            "subregion": "Southern Asia",
            "currency": "IRR",
        },
        "IS": {
            "value": "IS",
            "names": [
                "Iceland",
                "Island",
                "Islande",
                "Islandia"
            ],
            "region": "Europe",
            "subregion": "Northern Europe",
            "currency": "ISK",
        },
        "IT": {
            "value": "IT",
            "names": [
                "Italy",
                "Italien",
                "Italie",
                "Italia"
            ],
            "region": "Europe",
            "subregion": "Southern Europe",
            "currency": "EUR",
        },
        "JE": {
            "value": "JE",
            "names": [
                "Jersey"
            ],
            "region": "Europe",
            "subregion": "Northern Europe",
            "currency": "JEP",
        },
        "JM": {
            "value": "JM",
            "names": [
                "Jamaica",
                "Jamaika",
                "Jamaïque"
            ],
            "region": "Americas",
            "subregion": "Caribbean",
            "currency": "JMD",
        },
        "JO": {
            "value": "JO",
            "names": [
                "Jordan",
                "Jordanien",
                "Jordanie",
                "Jordania"
            ],
            "region": "Asia",
            "subregion": "Western Asia",
            "currency": "JOD",
        },
        "JP": {
            "value": "JP",
            "names": [
                "Japan",
                "Japan",
                "Japon",
                "Japón"
            ],
            "region": "Asia",
            "subregion": "Eastern Asia",
            "currency": "JPY",
        },
        "KE": {
            "value": "KE",
            "names": [
                "Kenya",
                "Kenia",
                "Kenya",
                "Kenia"
            ],
            "region": "Africa",
            "subregion": "Eastern Africa",
            "currency": "KES",
        },
        "KG": {
            "value": "KG",
            "names": [
                "Kyrgyzstan",
                "Kirgisistan",
                "Kirghizistan",
                "Kirguizistán"
            ],
            "region": "Asia",
            "subregion": "Central Asia",
            "currency": "KGS",
        },
        "KH": {
            "value": "KH",
            "names": [
                "Cambodia",
                "Kambodscha",
                "Cambodge",
                "Camboya"
            ],
            "region": "Asia",
            "subregion": "South-Eastern Asia",
            "currency": "KHR",
        },
        "KI": {
            "value": "KI",
            "names": [
                "Kiribati",
                "Kiribati",
                "Kiribati",
                "Kiribati"
            ],
            "region": "Oceania",
            "subregion": "Micronesia",
            "currency": "AUD",
        },
        "KM": {
            "value": "KM",
            "names": [
                "Comoros",
                "Komoren",
                "Comores"
            ],
            "region": "Africa",
            "subregion": "Eastern Africa",
            "currency": "KMF",
        },
        "KN": {
            "value": "KN",
            "names": [
                "Saint Kitts And Nevis",
                "Saint Kitts and Nevis",
                "Saint Kitts et Nevis",
                "Saint Kitts y Nevis"
            ],
            "region": "Americas",
            "subregion": "Caribbean",
            "currency": "XCD",
        },
        "KP": {
            "value": "KP",
            "names": [
                "Korea, Democratic People's Republic Of",
                "Korea (North)",
                "Nordkorea",
                "Corée du Nord",
                "Corea del Norte"
            ],
            "region": "Asia",
            "subregion": "Eastern Asia",
            "currency": "KPW",
        },
        "KR": {
            "value": "KR",
            "names": [
                "Korea, Republic of",
                "Korea (South)",
                "Südkorea",
                "Corée du Sud",
                "Corea del Sur"
            ],
            "region": "Asia",
            "subregion": "Eastern Asia",
            "currency": "KRW",
        },
        "KW": {
            "value": "KW",
            "names": [
                "Koweït",
                "Kuwait"
            ],
            "region": "Asia",
            "subregion": "Western Asia",
            "currency": "KWD",
        },
        "KY": {
            "value": "KY",
            "names": [
                "Cayman Islands",
                "Cayman-Inseln",
                "Îles Caïmans",
                "Islas Caimán"
            ],
            "region": "Americas",
            "subregion": "Caribbean",
            "currency": "KYD",
        },
        "KZ": {
            "value": "KZ",
            "names": [
                "Kazakhstan",
                "Kasachstan",
                "Kazakhstan",
                "Kazajistán"
            ],
            "region": "Asia",
            "subregion": "Central Asia",
            "currency": "KZT",
        },
        "LA": {
            "value": "LA",
            "names": [
                "Lao People's Democratic Republic",
                "Laos",
                "Laos",
                "Laos",
                "Laos"
            ],
            "region": "Asia",
            "subregion": "South-Eastern Asia",
            "currency": "LAK",
        },
        "LB": {
            "value": "LB",
            "names": [
                "Lebanon",
                "Libanon",
                "Liban",
                "Líbano"
            ],
            "region": "Asia",
            "subregion": "Western Asia",
            "currency": "LBP",
        },
        "LC": {
            "value": "LC",
            "names": [
                "Saint Lucia",
                "Saint-Lucie",
                "Santa Lucía"
            ],
            "region": "Americas",
            "subregion": "Caribbean",
            "currency": "XCD",
        },
        "LI": {
            "value": "LI",
            "names": [
                "Liechtenstein"
            ],
            "region": "Europe",
            "subregion": "Western Europe",
            "currency": "CHF",
        },
        "LK": {
            "value": "LK",
            "names": [
                "Sri Lanka"
            ],
            "region": "Asia",
            "subregion": "Southern Asia",
            "currency": "LKR",
        },
        "LR": {
            "value": "LR",
            "names": [
                "Liberia",
                "Liberia",
                "Liberia",
                "Liberia"
            ],
            "region": "Africa",
            "subregion": "Western Africa",
            "currency": "LRD",
        },
        "LS": {
            "value": "LS",
            "names": [
                "Lesotho",
                "Lesotho",
                "Lesotho",
                "Lesotho"
            ],
            "region": "Africa",
            "subregion": "Southern Africa",
            "currency": "LSL",
        },
        "LT": {
            "value": "LT",
            "names": [
                "Lithuania",
                "Litauen",
                "Lituanie",
                "Lituania"
            ],
            "region": "Europe",
            "subregion": "Northern Europe",
            "currency": "LTL",
        },
        "LU": {
            "value": "LU",
            "names": [
                "Luxembourg",
                "Luxemburg",
                "Luxembourg",
                "Luxemburgo"
            ],
            "region": "Europe",
            "subregion": "Western Europe",
            "currency": "EUR",
        },
        "LV": {
            "value": "LV",
            "names": [
                "Latvia",
                "Lettland",
                "Lettonie",
                "Letonia"
            ],
            "region": "Europe",
            "subregion": "Northern Europe",
            "currency": "LVL",
        },
        "LY": {
            "value": "LY",
            "names": [
                "Libyan Arab Jamahiriya",
                "Libya",
                "Libyen",
                "Libye",
                "Libia"
            ],
            "region": "Africa",
            "subregion": "Northern Africa",
            "currency": "LYD",
        },
        "MA": {
            "value": "MA",
            "name": "Morocco",
            "names": [
                "Morocco",
                "Marokko",
                "Maroc",
                "Marruecos"
            ],
            "region": "Africa",
            "subregion": "Northern Africa",
            "currency": "MAD",
            "alpha2": "MA",
            "alpha3": "MAR",
            "ioc": "MAR",
            "number": "504",
            "tel": "212",
            "latitude": "32 00 N",
            "longitude": "5 00 W",
            "un": "MA"
        },
        "MC": {
            "value": "MC",
            "name": "Monaco",
            "names": [
                "Monaco",
                "Mónaco"
            ],
            "region": "Europe",
            "subregion": "Western Europe",
            "currency": "EUR",
            "alpha2": "MC",
            "alpha3": "MCO",
            "ioc": "MON",
            "number": "492",
            "tel": "377",
            "latitude": "43 44 N",
            "longitude": "7 24 E",
            "un": "MC"
        },
        "MD": {
            "value": "MD",
            "name": "Moldova, Republic of",
            "names": [
                "Moldova",
                "Moldawien",
                "Moldavie",
                "Moldavia",
                "the Republic of Moldova"
            ],
            "region": "Europe",
            "subregion": "Eastern Europe",
            "currency": "MDL",
            "alpha2": "MD",
            "alpha3": "MDA",
            "ioc": "MDA",
            "number": "498",
            "tel": "373",
            "latitude": "47 00 N",
            "longitude": "29 00 E",
            "un": "MD"
        },
        "ME": {
            "value": "ME",
            "name": "Montenegro",
            "names": [
                "Crna Gora",
                "Montenegro"
            ],
            "region": "Europe",
            "subregion": "Southern Europe",
            "currency": "EUR",
            "alpha2": "ME",
            "alpha3": "MNE",
            "ioc": "MNE",
            "number": "499",
            "tel": "382",
            "latitude": "42 30 N",
            "longitude": "19 18 E",
            "un": "ME"
        },
        "MF": {
            "value": "MF",
            "name": "Saint Martin",
            "names": [
                "Saint Martin"
            ],
            "region": "Americas",
            "subregion": "Caribbean",
            "currency": "EUR",
            "alpha2": "MF",
            "alpha3": "MAF",
            "ioc": null,
            "number": "663",
            "tel": "590",
            "latitude": "18 05 N",
            "longitude": "63 57 W",
            "un": null
        },
        "MG": {
            "value": "MG",
            "name": "Madagascar",
            "names": [
                "Madagascar",
                "Madagaskar",
                "the Republic of Madagascar"
            ],
            "region": "Africa",
            "subregion": "Eastern Africa",
            "currency": null,
            "alpha2": "MG",
            "alpha3": "MDG",
            "ioc": "MAD",
            "number": "450",
            "tel": "261",
            "latitude": "20 00 S",
            "longitude": "47 00 E",
            "un": "MG"
        },
        "MH": {
            "value": "MH",
            "name": "Marshall Islands",
            "names": [
                "Marshall Islands",
                "Marshall-Inseln",
                "Îles Marshall",
                "Islas Marshall"
            ],
            "region": "Oceania",
            "subregion": "Micronesia",
            "currency": "USD",
            "alpha2": "MH",
            "alpha3": "MHL",
            "ioc": "MHL",
            "number": "584",
            "tel": "692",
            "latitude": "9 00 N",
            "longitude": "168 00 E",
            "un": "MH"
        },
        "MK": {
            "value": "MK",
            "name": "Macedonia, the Former Yugoslav Republic Of",
            "names": [
                "Macedonia",
                "Mazedonien",
                "Macédoine",
                "Macedonia"
            ],
            "region": "Europe",
            "subregion": "Southern Europe",
            "currency": null,
            "alpha2": "MK",
            "alpha3": "MKD",
            "ioc": "MKD",
            "number": "807",
            "tel": "389",
            "latitude": "41 50 N",
            "longitude": "22 00 E",
            "un": "MK"
        },
        "ML": {
            "value": "ML",
            "name": "Mali",
            "names": [
                "Mali"
            ],
            "region": "Africa",
            "subregion": "Western Africa",
            "currency": "XOF",
            "alpha2": "ML",
            "alpha3": "MLI",
            "ioc": "MLI",
            "number": "466",
            "tel": "223",
            "latitude": "17 00 N",
            "longitude": "4 00 W",
            "un": "ML"
        },
        "MM": {
            "value": "MM",
            "name": "Myanmar",
            "names": [
                "Myanmar",
                "Myanmar",
                "Myanmar",
                "Myanmar"
            ],
            "region": "Asia",
            "subregion": "South-Eastern Asia",
            "currency": "MNK",
            "alpha2": "MM",
            "alpha3": "MMR",
            "ioc": "MYA",
            "number": "104",
            "tel": "95",
            "latitude": "22 00 N",
            "longitude": "98 00 E",
            "un": "MM"
        },
        "MN": {
            "value": "MN",
            "name": "Mongolia",
            "names": [
                "Mongolei",
                "Mongolie",
                "Mongolia"
            ],
            "region": "Asia",
            "subregion": "Eastern Asia",
            "currency": "MNT",
            "alpha2": "MN",
            "alpha3": "MNG",
            "ioc": "MGL",
            "number": "496",
            "tel": "976",
            "latitude": "46 00 N",
            "longitude": "105 00 E",
            "un": "MN"
        },
        "MO": {
            "value": "MO",
            "name": "Macao",
            "names": [
                "Macao"
            ],
            "region": "Asia",
            "subregion": "Eastern Asia",
            "currency": "MOP",
            "alpha2": "MO",
            "alpha3": "MAC",
            "ioc": null,
            "number": "446",
            "tel": "853",
            "latitude": "22 10 N",
            "longitude": "113 33 E",
            "un": "MO"
        },
        "MP": {
            "value": "MP",
            "name": "Northern Mariana Islands",
            "names": [
                "Northern Mariana Islands",
                "Nördliche Marianen",
                "Mariannes du Nord",
                "Islas Marianas del Norte"
            ],
            "region": "Oceania",
            "subregion": "Micronesia",
            "currency": "USD",
            "alpha2": "MP",
            "alpha3": "MNP",
            "ioc": null,
            "number": "580",
            "tel": "1",
            "latitude": "15 12 N",
            "longitude": "145 45 E",
            "un": "MP"
        },
        "MQ": {
            "value": "MQ",
            "name": "Martinique",
            "names": [
                "Martinique",
                "Martinique",
                "Martinique",
                "Martinica"
            ],
            "region": "Americas",
            "subregion": "Caribbean",
            "currency": "EUR",
            "alpha2": "MQ",
            "alpha3": "MTQ",
            "ioc": null,
            "number": "474",
            "tel": "596",
            "latitude": "",
            "longitude": "",
            "un": "MQ"
        },
        "MR": {
            "value": "MR",
            "name": "Mauritania",
            "names": [
                "Mauritania",
                "Mauretanien",
                "Mauritanie",
                "Mauritania"
            ],
            "region": "Africa",
            "subregion": "Western Africa",
            "currency": "MRO",
            "alpha2": "MR",
            "alpha3": "MRT",
            "ioc": "MTN",
            "number": "478",
            "tel": "222",
            "latitude": "20 00 N",
            "longitude": "12 00 W",
            "un": "MR"
        },
        "MS": {
            "value": "MS",
            "name": "Montserrat",
            "names": [
                "Montserrat",
                "Montserrat",
                "Montserrat",
                "Montserrat"
            ],
            "region": "Americas",
            "subregion": "Caribbean",
            "currency": "XCD",
            "alpha2": "MS",
            "alpha3": "MSR",
            "ioc": null,
            "number": "500",
            "tel": "1",
            "latitude": "16 45 N",
            "longitude": "62 12 W",
            "un": "MS"
        },
        "MT": {
            "value": "MT",
            "name": "Malta",
            "names": [
                "Malta",
                "Malta",
                "Malte",
                "Malta"
            ],
            "region": "Europe",
            "subregion": "Southern Europe",
            "currency": "EUR",
            "alpha2": "MT",
            "alpha3": "MLT",
            "ioc": "MLT",
            "number": "470",
            "tel": "356",
            "latitude": "35 50 N",
            "longitude": "14 35 E",
            "un": "MT"
        },
        "MU": {
            "value": "MU",
            "name": "Mauritius",
            "names": [
                "Mauritius",
                "Mauritius",
                "Île Maurice",
                "Mauricio"
            ],
            "region": "Africa",
            "subregion": "Eastern Africa",
            "currency": "MUR",
            "alpha2": "MU",
            "alpha3": "MUS",
            "ioc": "MRI",
            "number": "480",
            "tel": "230",
            "latitude": "20 17 S",
            "longitude": "57 33 E",
            "un": "MU"
        },
        "MV": {
            "value": "MV",
            "name": "Maldives",
            "names": [
                "Maldives",
                "Malediven",
                "Maldivas"
            ],
            "region": "Asia",
            "subregion": "Southern Asia",
            "currency": "MVR",
            "alpha2": "MV",
            "alpha3": "MDV",
            "ioc": "MDV",
            "number": "462",
            "tel": "960",
            "latitude": "3 15 N",
            "longitude": "73 00 E",
            "un": "MV"
        },
        "MW": {
            "value": "MW",
            "name": "Malawi",
            "names": [
                "Malawi"
            ],
            "region": "Africa",
            "subregion": "Eastern Africa",
            "currency": "MWK",
            "alpha2": "MW",
            "alpha3": "MWI",
            "ioc": "MAW",
            "number": "454",
            "tel": "265",
            "latitude": "13 30 S",
            "longitude": "34 00 E",
            "un": "MW"
        },
        "MX": {
            "value": "MX",
            "name": "Mexico",
            "names": [
                "Mexico",
                "Mexiko",
                "Mexique",
                "México"
            ],
            "region": "Americas",
            "subregion": "Central America",
            "currency": "MXN",
            "alpha2": "MX",
            "alpha3": "MEX",
            "ioc": "MEX",
            "number": "484",
            "tel": "52",
            "latitude": "23 00 N",
            "longitude": "102 00 W",
            "un": "MX"
        },
        "MY": {
            "value": "MY",
            "name": "Malaysia",
            "names": [
                "Malaysia",
                "Malaisie",
                "Malasia"
            ],
            "region": "Asia",
            "subregion": "South-Eastern Asia",
            "currency": "MYR",
            "alpha2": "MY",
            "alpha3": "MYS",
            "ioc": "MAS",
            "number": "458",
            "tel": "60",
            "latitude": "2 30 N",
            "longitude": "112 30 E",
            "un": "MY"
        },
        "MZ": {
            "value": "MZ",
            "name": "Mozambique",
            "names": [
                "Mozambique",
                "Mosambik",
                "Mozambique",
                "Mozambique"
            ],
            "region": "Africa",
            "subregion": "Eastern Africa",
            "currency": "MZN",
            "alpha2": "MZ",
            "alpha3": "MOZ",
            "ioc": "MOZ",
            "number": "508",
            "tel": "258",
            "latitude": "18 15 S",
            "longitude": "35 00 E",
            "un": "MZ"
        },
        "NA": {
            "value": "NA",
            "name": "Namibia",
            "names": [
                "Namibia",
                "Namibia",
                "Namibie",
                "Namibia"
            ],
            "region": "Africa",
            "subregion": "Southern Africa",
            "currency": "NAD",
            "alpha2": "NA",
            "alpha3": "NAM",
            "ioc": "NAM",
            "number": "516",
            "tel": "264",
            "latitude": "22 00 S",
            "longitude": "17 00 E",
            "un": "NA"
        },
        "NC": {
            "value": "NC",
            "name": "New Caledonia",
            "names": [
                "New Caledonia",
                "Neukaledonien",
                "Nouvelle Calédonie",
                "Nueva Caledonia"
            ],
            "region": "Oceania",
            "subregion": "Melanesia",
            "currency": "XPF",
            "alpha2": "NC",
            "alpha3": "NCL",
            "ioc": null,
            "number": "540",
            "tel": "687",
            "latitude": "21 30 S",
            "longitude": "165 30 E",
            "un": "NC"
        },
        "NE": {
            "value": "NE",
            "name": "Niger",
            "names": [
                "Níger"
            ],
            "region": "Africa",
            "subregion": "Western Africa",
            "currency": "XOF",
            "alpha2": "NE",
            "alpha3": "NER",
            "ioc": "NIG",
            "number": "562",
            "tel": "227",
            "latitude": "16 00 N",
            "longitude": "8 00 E",
            "un": "NE"
        },
        "NF": {
            "value": "NF",
            "name": "Norfolk Island",
            "names": [
                "Norfolk Island",
                "Norfolk Island",
                "Île de Norfolk",
                "Isla de Norfolk"
            ],
            "region": "Oceania",
            "subregion": "Australia and New Zealand",
            "currency": "AUD",
            "alpha2": "NF",
            "alpha3": "NFK",
            "ioc": null,
            "number": "574",
            "tel": "672",
            "latitude": "29 02 S",
            "longitude": "167 57 E",
            "un": "NF"
        },
        "NG": {
            "value": "NG",
            "name": "Nigeria",
            "names": [
                "Nigeria",
                "Nigéria",
                "the Federal Republic of Nigeria"
            ],
            "region": "Africa",
            "subregion": "Western Africa",
            "currency": "NGN",
            "alpha2": "NG",
            "alpha3": "NGA",
            "ioc": "NGR",
            "number": "566",
            "tel": "234",
            "latitude": "10 00 N",
            "longitude": "8 00 E",
            "un": "NG"
        },
        "NI": {
            "value": "NI",
            "name": "Nicaragua",
            "names": [
                "Nicaragua",
                "Nicaragua",
                "Nicaragua",
                "Nicaragua"
            ],
            "region": "Americas",
            "subregion": "Central America",
            "currency": "NIO",
            "alpha2": "NI",
            "alpha3": "NIC",
            "ioc": "NCA",
            "number": "558",
            "tel": "505",
            "latitude": "13 00 N",
            "longitude": "85 00 W",
            "un": "NI"
        },
        "NL": {
            "value": "NL",
            "name": "Netherlands",
            "names": [
                "Netherlands",
                "Niederlande",
                "Pays-Bas",
                "Países Bajos"
            ],
            "region": "Europe",
            "subregion": "Western Europe",
            "currency": "EUR",
            "alpha2": "NL",
            "alpha3": "NLD",
            "ioc": "NED",
            "number": "528",
            "tel": "31",
            "latitude": "52 30 N",
            "longitude": "5 45 E",
            "un": "NL"
        },
        "NO": {
            "value": "NO",
            "name": "Norway",
            "names": [
                "Norway",
                "Norwegen",
                "Norvège",
                "Noruega"
            ],
            "region": "Europe",
            "subregion": "Northern Europe",
            "currency": "NOK",
            "alpha2": "NO",
            "alpha3": "NOR",
            "ioc": "NED",
            "number": "578",
            "tel": "47",
            "latitude": "62 00 N",
            "longitude": "10 00 E",
            "un": "NL"
        },
        "NP": {
            "value": "NP",
            "name": "Nepal",
            "names": [
                "Nepal",
                "Nepal",
                "Népal",
                "Nepal",
                "the Federal Democratic Republic of Nepal"
            ],
            "region": "Asia",
            "subregion": "Southern Asia",
            "currency": "NPR",
            "alpha2": "NP",
            "alpha3": "NPL",
            "ioc": "NEP",
            "number": "524",
            "tel": "977",
            "latitude": "28 00 N",
            "longitude": "84 00 E",
            "un": "NP"
        },
        "NR": {
            "value": "NR",
            "name": "Nauru",
            "names": [
                "Nauru",
                "Nauru",
                "Nauru",
                "Nauru"
            ],
            "region": "Oceania",
            "subregion": "Micronesia",
            "currency": "AUD",
            "alpha2": "NR",
            "alpha3": "NRU",
            "ioc": "NRU",
            "number": "520",
            "tel": "674",
            "latitude": "0 32 S",
            "longitude": "166 55 E",
            "un": "NR"
        },
        "NU": {
            "value": "NU",
            "name": "Niue",
            "names": [
                "Niue"
            ],
            "region": "Oceania",
            "subregion": "Polynesia",
            "currency": null,
            "alpha2": "NU",
            "alpha3": "NIU",
            "ioc": null,
            "number": "570",
            "tel": "683",
            "latitude": "19 02 S",
            "longitude": "169 52 W",
            "un": "NU"
        },
        "NZ": {
            "value": "NZ",
            "name": "New Zealand",
            "names": [
                "New Zealand",
                "Neuseeland",
                "Nouvelle ZÃ©lande",
                "Nueva Zelanda"
            ],
            "region": "Oceania",
            "subregion": "Australia and New Zealand",
            "currency": "NZD",
            "alpha2": "NZ",
            "alpha3": "NZL",
            "ioc": "NZL",
            "number": "554",
            "tel": "64",
            "latitude": "41 00 S",
            "longitude": "174 00 E",
            "un": "NZ"
        },
        "OM": {
            "value": "OM",
            "name": "Oman",
            "names": [
                "Oman",
                "Omán"
            ],
            "region": "Asia",
            "subregion": "Western Asia",
            "currency": "OMR",
            "alpha2": "OM",
            "alpha3": "OMN",
            "ioc": "OMA",
            "number": "512",
            "tel": "968",
            "latitude": "21 00 N",
            "longitude": "57 00 E",
            "un": "OM"
        },
        "PA": {
            "value": "PA",
            "name": "Panama",
            "names": [
                "Panama",
                "Panamá"
            ],
            "region": "Americas",
            "subregion": "Central America",
            "currency": "PAB",
            "alpha2": "PA",
            "alpha3": "PAN",
            "ioc": "PAN",
            "number": "591",
            "tel": "507",
            "latitude": "9 00 N",
            "longitude": "80 00 W",
            "un": "PA"
        },
        "PE": {
            "value": "PE",
            "name": "Peru",
            "names": [
                "Peru",
                "Pérou",
                "Perú"
            ],
            "region": "Americas",
            "subregion": "South America",
            "currency": "PEN",
            "alpha2": "PE",
            "alpha3": "PER",
            "ioc": "PER",
            "number": "604",
            "tel": "51",
            "latitude": "10 00 S",
            "longitude": "76 00 W",
            "un": "PE"
        },
        "PF": {
            "value": "PF",
            "name": "French Polynesia",
            "names": [
                "French Polynesia",
                "Französisch-Polynesien",
                "Polynésie Française",
                "Polinesia Francesa"
            ],
            "region": "Oceania",
            "subregion": "Polynesia",
            "currency": "XPF",
            "alpha2": "PF",
            "alpha3": "PYF",
            "ioc": null,
            "number": "258",
            "tel": "689",
            "latitude": "15 00 S",
            "longitude": "140 00 W",
            "un": "PF"
        },
        "PG": {
            "value": "PG",
            "name": "Papua New Guinea",
            "names": [
                "Papua New Guinea",
                "Papua-Neuguinea",
                "Papouasie Nouvelle-Guinée",
                "Papúa Nueva Guinea"
            ],
            "region": "Oceania",
            "subregion": "Melanesia",
            "currency": "PGK",
            "alpha2": "PG",
            "alpha3": "PNG",
            "ioc": "PNG",
            "number": "598",
            "tel": "675",
            "latitude": "6 00 S",
            "longitude": "147 00 E",
            "un": "PG"
        },
        "PH": {
            "value": "PH",
            "name": "Philippines",
            "names": [
                "Philippinen",
                "Philippines",
                "Filipinas"
            ],
            "region": "Asia",
            "subregion": "South-Eastern Asia",
            "currency": "PHP",
            "alpha2": "PH",
            "alpha3": "PHL",
            "ioc": "PHI",
            "number": "608",
            "tel": "63",
            "latitude": "13 00 N",
            "longitude": "122 00 E",
            "un": "PH"
        },
        "PK": {
            "value": "PK",
            "name": "Pakistan",
            "names": [
                "Pakistan",
                "Paquistán"
            ],
            "region": "Asia",
            "subregion": "Southern Asia",
            "currency": "PKR",
            "alpha2": "PK",
            "alpha3": "PAK",
            "ioc": "PAK",
            "number": "586",
            "tel": "92",
            "latitude": "30 00 N",
            "longitude": "70 00 E",
            "un": "PK"
        },
        "PL": {
            "value": "PL",
            "name": "Poland",
            "names": [
                "Poland",
                "Polen",
                "Pologne",
                "Polonia"
            ],
            "region": "Europe",
            "subregion": "Eastern Europe",
            "currency": "PLN",
            "alpha2": "PL",
            "alpha3": "POL",
            "ioc": "POL",
            "number": "616",
            "tel": "48",
            "latitude": "52 00 N",
            "longitude": "20 00 E",
            "un": "PL"
        },
        "PM": {
            "value": "PM",
            "name": "Saint Pierre And Miquelon",
            "names": [
                "Saint Pierre and Miquelon",
                "Saint-Pierre-et-Miquelon",
                "Saint-Pierre-et-Miquelon",
                "San Pedro y Miquelón"
            ],
            "region": "Americas",
            "subregion": "Northern America",
            "currency": "EUR",
            "alpha2": "PM",
            "alpha3": "SPM",
            "ioc": null,
            "number": "666",
            "tel": "508",
            "latitude": "46 50 N",
            "longitude": "56 20 W",
            "un": "PM"
        },
        "PN": {
            "value": "PN",
            "name": "Pitcairn",
            "names": [
                "Pitcairn"
            ],
            "region": "Oceania",
            "subregion": "Polynesia",
            "currency": "NZD",
            "alpha2": "PN",
            "alpha3": "PCN",
            "ioc": null,
            "number": "612",
            "tel": "",
            "latitude": "25 04 S",
            "longitude": "130 06 W",
            "un": "PN"
        },
        "PR": {
            "value": "PR",
            "name": "Puerto Rico",
            "names": [
                "Puerto Rico"
            ],
            "region": "Americas",
            "subregion": "Caribbean",
            "currency": "USD",
            "alpha2": "PR",
            "alpha3": "PRI",
            "ioc": "PUR",
            "number": "630",
            "tel": "1",
            "latitude": "18 15 N",
            "longitude": "66 30 W",
            "un": "PR"
        },
        "PS": {
            "value": "PS",
            "name": "Palestinian Territory, Occupied",
            "names": [
                "Palestine",
                "Palästina",
                "Palestine",
                "Palestina",
                "the Occupied Palestinian Territory"
            ],
            "region": "Asia",
            "subregion": "Western Asia",
            "currency": null,
            "alpha2": "PS",
            "alpha3": "PSE",
            "ioc": "PLE",
            "number": "275",
            "tel": "970",
            "latitude": "",
            "longitude": "",
            "un": null
        },
        "PT": {
            "value": "PT",
            "name": "Portugal",
            "names": [
                "Portugal"
            ],
            "region": "Europe",
            "subregion": "Southern Europe",
            "currency": "EUR",
            "alpha2": "PT",
            "alpha3": "PRT",
            "ioc": "POR",
            "number": "620",
            "tel": "351",
            "latitude": "39 30 N",
            "longitude": "8 00 W",
            "un": "PT"
        },
        "PW": {
            "value": "PW",
            "name": "Palau",
            "names": [
                "Palau"
            ],
            "region": "Oceania",
            "subregion": "Micronesia",
            "currency": "USD",
            "alpha2": "PW",
            "alpha3": "PLW",
            "ioc": "PLW",
            "number": "585",
            "tel": "680",
            "latitude": "7 30 N",
            "longitude": "134 30 E",
            "un": "PW"
        },
        "PY": {
            "value": "PY",
            "name": "Paraguay",
            "names": [
                "Paraguay"
            ],
            "region": "Americas",
            "subregion": "South America",
            "currency": "PYG",
            "alpha2": "PY",
            "alpha3": "PRY",
            "ioc": "PAR",
            "number": "600",
            "tel": "595",
            "latitude": "23 00 S",
            "longitude": "58 00 W",
            "un": "PY"
        },
        "QA": {
            "value": "QA",
            "name": "Qatar",
            "names": [
                "Qatar",
                "Katar"
            ],
            "region": "Asia",
            "subregion": "Western Asia",
            "currency": "QAR",
            "alpha2": "QA",
            "alpha3": "QAT",
            "ioc": "QAT",
            "number": "634",
            "tel": "974",
            "latitude": "25 30 N",
            "longitude": "51 15 E",
            "un": "QA"
        },
        "RE": {
            "value": "RE",
            "name": "Réunion",
            "names": [
                "Réunion",
                "Réunion",
                "Réunion",
                "Reunión"
            ],
            "region": "Africa",
            "subregion": "Eastern Africa",
            "currency": "EUR",
            "alpha2": "RE",
            "alpha3": "REU",
            "ioc": null,
            "number": "638",
            "tel": "262",
            "latitude": "",
            "longitude": "",
            "un": "RE"
        },
        "RO": {
            "value": "RO",
            "name": "Romania",
            "names": [
                "Romania",
                "Rumänien",
                "Roumanie",
                "Rumania"
            ],
            "region": "Europe",
            "subregion": "Eastern Europe",
            "currency": "RON",
            "alpha2": "RO",
            "alpha3": "ROU",
            "ioc": "ROU",
            "number": "642",
            "tel": "40",
            "latitude": "46 00 N",
            "longitude": "25 00 E",
            "un": "RO"
        },
        "RS": {
            "value": "RS",
            "name": "Serbia",
            "names": [
                "Serbia",
                "Serbien",
                "Serbie",
                "Serbia"
            ],
            "region": "Europe",
            "subregion": "Southern Europe",
            "currency": "RSD",
            "alpha2": "RS",
            "alpha3": "SRB",
            "ioc": "SRB",
            "number": "688",
            "tel": "381",
            "latitude": "44 00 N",
            "longitude": "21 00 E",
            "un": "RS"
        },
        "RU": {
            "value": "RU",
            "name": "Russian Federation",
            "names": [
                "Russia",
                "Russland",
                "Russie",
                "Rusia"
            ],
            "region": "Europe",
            "subregion": "Eastern Europe",
            "currency": "RUB",
            "alpha2": "RU",
            "alpha3": "RUS",
            "ioc": "RUS",
            "number": "643",
            "tel": "7",
            "latitude": "60 00 N",
            "longitude": "100 00 E",
            "un": "RU"
        },
        "RW": {
            "value": "RW",
            "name": "Rwanda",
            "names": [
                "Rwanda",
                "Ruanda"
            ],
            "region": "Africa",
            "subregion": "Eastern Africa",
            "currency": "RWF",
            "alpha2": "RW",
            "alpha3": "RWA",
            "ioc": "RWA",
            "number": "646",
            "tel": "250",
            "latitude": "2 00 S",
            "longitude": "30 00 E",
            "un": "RW"
        },
        "SA": {
            "value": "SA",
            "name": "Saudi Arabia",
            "names": [
                "Saudi Arabia",
                "Saudi-Arabien",
                "Arabie Saoudite",
                "Arabia Saudí"
            ],
            "region": "Asia",
            "subregion": "Western Asia",
            "currency": "SAR",
            "alpha2": "SA",
            "alpha3": "SAU",
            "ioc": "KSA",
            "number": "682",
            "tel": "966",
            "latitude": "25 00 N",
            "longitude": "45 00 E",
            "un": "SA"
        },
        "SB": {
            "value": "SB",
            "name": "Solomon Islands",
            "names": [
                "Solomon Islands",
                "Salomonen",
                "Îles Salomon",
                "Islas Salomón"
            ],
            "region": "Oceania",
            "subregion": "Melanesia",
            "currency": "SBD",
            "alpha2": "SB",
            "alpha3": "SLB",
            "ioc": "SOL",
            "number": "090",
            "tel": "677",
            "latitude": "8 00 S",
            "longitude": "159 00 E",
            "un": "SB"
        },
        "SC": {
            "value": "SC",
            "name": "Seychelles",
            "names": [
                "Seychelles"
            ],
            "region": "Africa",
            "subregion": "Eastern Africa",
            "currency": "SCR",
            "alpha2": "SC",
            "alpha3": "SYC",
            "ioc": "SEY",
            "number": "690",
            "tel": "248",
            "latitude": "4 35 S",
            "longitude": "55 40 E",
            "un": "SC"
        },
        "SD": {
            "value": "SD",
            "name": "Sudan",
            "names": [
                "Sudan",
                "Soudan",
                "Sudán"
            ],
            "region": "Africa",
            "subregion": "Northern Africa",
            "currency": "SDG",
            "alpha2": "SD",
            "alpha3": "SDN",
            "ioc": "SUD",
            "number": "736",
            "tel": "249",
            "latitude": "15 00 N",
            "longitude": "30 00 E",
            "un": "SD"
        },
        "SE": {
            "value": "SE",
            "name": "Sweden",
            "names": [
                "Sweden",
                "Schweden",
                "Suède",
                "Suecia"
            ],
            "region": "Europe",
            "subregion": "Northern Europe",
            "currency": "SEK",
            "alpha2": "SE",
            "alpha3": "SWE",
            "ioc": "SWE",
            "number": "752",
            "tel": "46",
            "latitude": "62 00 N",
            "longitude": "15 00 E",
            "un": "SE"
        },
        "SG": {
            "value": "SG",
            "name": "Singapore",
            "names": [
                "Singapore",
                "Singapur",
                "Singapour",
                "Singapur"
            ],
            "region": "Asia",
            "subregion": "South-Eastern Asia",
            "currency": "SGD",
            "alpha2": "SG",
            "alpha3": "SGP",
            "ioc": "SIN",
            "number": "702",
            "tel": "65",
            "latitude": "1 22 N",
            "longitude": "103 48 E",
            "un": "SG"
        },
        "SH": {
            "value": "SH",
            "name": "Saint Helena",
            "names": [
                "Saint Helena",
                "Sankt Helena",
                "Sainte Hélène",
                "Santa Helena"
            ],
            "region": "Africa",
            "subregion": "Western Africa",
            "currency": "SHP",
            "alpha2": "SH",
            "alpha3": "SHN",
            "ioc": null,
            "number": "654",
            "tel": "290",
            "latitude": "Saint Helena: 15 57 ",
            "longitude": "Saint Helena: 5 42 W",
            "un": "SH"
        },
        "SI": {
            "value": "SI",
            "name": "Slovenia",
            "names": [
                "Slovenia",
                "Slowenien",
                "Slovénie",
                "Eslovenia"
            ],
            "region": "Europe",
            "subregion": "Southern Europe",
            "currency": "EUR",
            "alpha2": "SI",
            "alpha3": "SVN",
            "ioc": "SLO",
            "number": "705",
            "tel": "386",
            "latitude": "46 07 N",
            "longitude": "14 49 E",
            "un": "SI"
        },
        "SJ": {
            "value": "SJ",
            "name": "Svalbard And Jan Mayen",
            "names": [
                "Svalbard and Jan Mayen",
                "Svalbard und Jan Mayen",
                "Îles Svalbard et Jan Mayen",
                "Islas Svalbard y Jan Mayen"
            ],
            "region": "Europe",
            "subregion": "Northern Europe",
            "currency": "NOK",
            "alpha2": "SJ",
            "alpha3": "SJM",
            "ioc": null,
            "number": "744",
            "tel": "47",
            "latitude": "78 00 N",
            "longitude": "20 00 E",
            "un": "SJ"
        },
        "SK": {
            "value": "SK",
            "name": "Slovakia",
            "names": [
                "Slovakia",
                "Slowakei",
                "Slovaquie",
                "República Eslovaca"
            ],
            "region": "Europe",
            "subregion": "Eastern Europe",
            "currency": "EUR",
            "alpha2": "SK",
            "alpha3": "SVK",
            "ioc": "SVK",
            "number": "703",
            "tel": "421",
            "latitude": "48 40 N",
            "longitude": "19 30 E",
            "un": "SK"
        },
        "SL": {
            "value": "SL",
            "name": "Sierra Leone",
            "names": [
                "Sierra Leone"
            ],
            "region": "Africa",
            "subregion": "Western Africa",
            "currency": "SLL",
            "alpha2": "SL",
            "alpha3": "SLE",
            "ioc": "SLE",
            "number": "694",
            "tel": "232",
            "latitude": "8 30 N",
            "longitude": "11 30 W",
            "un": "SL"
        },
        "SM": {
            "value": "SM",
            "name": "San Marino",
            "names": [
                "San Marino",
                "Saint-Marin"
            ],
            "region": "Europe",
            "subregion": "Southern Europe",
            "currency": "EUR",
            "alpha2": "SM",
            "alpha3": "SMR",
            "ioc": "SMR",
            "number": "674",
            "tel": "378",
            "latitude": "43 46 N",
            "longitude": "12 25 E",
            "un": "SM"
        },
        "SN": {
            "value": "SN",
            "name": "Senegal",
            "names": [
                "Senegal",
                "Sénégal"
            ],
            "region": "Africa",
            "subregion": "Western Africa",
            "currency": "XOF",
            "alpha2": "SN",
            "alpha3": "SEN",
            "ioc": "SEN",
            "number": "686",
            "tel": "221",
            "latitude": "14 00 N",
            "longitude": "14 00 W",
            "un": "SN"
        },
        "SO": {
            "value": "SO",
            "name": "Somalia",
            "names": [
                "Somalia"
            ],
            "region": "Africa",
            "subregion": "Eastern Africa",
            "currency": "SOS",
            "alpha2": "SO",
            "alpha3": "SOM",
            "ioc": "SOM",
            "number": "706",
            "tel": "252",
            "latitude": "10 00 N",
            "longitude": "49 00 E",
            "un": "SO"
        },
        "SR": {
            "value": "SR",
            "name": "Suriname",
            "names": [
                "Suriname",
                "Surinam"
            ],
            "region": "Americas",
            "subregion": "South America",
            "currency": "SRD",
            "alpha2": "SR",
            "alpha3": "SUR",
            "ioc": "SUR",
            "number": "740",
            "tel": "597",
            "latitude": "4 00 N",
            "longitude": "56 00 W",
            "un": "SR"
        },
        "ST": {
            "value": "ST",
            "name": "Sao Tome and Principe",
            "names": [
                "São Tomé and Príncipe",
                "São Tomé und Príncipe",
                "São Tomé et Príncipe",
                "Santo Tomé y Príncipe"
            ],
            "region": "Africa",
            "subregion": "Middle Africa",
            "currency": "STD",
            "alpha2": "ST",
            "alpha3": "STP",
            "ioc": "STP",
            "number": "678",
            "tel": "239",
            "latitude": "1 00 N",
            "longitude": "7 00 E",
            "un": "ST"
        },
        "SV": {
            "value": "SV",
            "name": "El Salvador",
            "names": [
                "Salvador",
                "El Salvador"
            ],
            "region": "Americas",
            "subregion": "Central America",
            "currency": "USD",
            "alpha2": "SV",
            "alpha3": "SLV",
            "ioc": "ESA",
            "number": "222",
            "tel": "503",
            "latitude": "13 50 N",
            "longitude": "88 55 W",
            "un": "SV"
        },
        "SY": {
            "value": "SY",
            "name": "Syrian Arab Republic",
            "names": [
                "Syria",
                "Syrien",
                "Syrie",
                "Siria"
            ],
            "region": "Asia",
            "subregion": "Western Asia",
            "currency": "SYP",
            "alpha2": "SY",
            "alpha3": "SYR",
            "ioc": "SYR",
            "number": "760",
            "tel": "963",
            "latitude": "35 00 N",
            "longitude": "38 00 E",
            "un": "SY"
        },
        "SZ": {
            "value": "SZ",
            "name": "Swaziland",
            "names": [
                "Swaziland",
                "Swasiland",
                "Swaziland",
                "Suazilandia"
            ],
            "region": "Africa",
            "subregion": "Southern Africa",
            "currency": "SZL",
            "alpha2": "SZ",
            "alpha3": "SWZ",
            "ioc": "SWZ",
            "number": "748",
            "tel": "268",
            "latitude": "26 30 S",
            "longitude": "31 30 E",
            "un": "SZ"
        },
        "TC": {
            "value": "TC",
            "name": "Turks and Caicos Islands",
            "names": [
                "Turks and Caicos Islands",
                "Turks- und Caicosinseln",
                "Îles Turks et Caïcos",
                "Islas Turks y Caicos"
            ],
            "region": "Americas",
            "subregion": "Caribbean",
            "currency": "USD",
            "alpha2": "TC",
            "alpha3": "TCA",
            "ioc": null,
            "number": "796",
            "tel": "1",
            "latitude": "21 45 N",
            "longitude": "71 35 W",
            "un": "TC"
        },
        "TD": {
            "value": "TD",
            "name": "Chad",
            "names": [
                "Chad",
                "Tschad",
                "Tchad"
            ],
            "region": "Africa",
            "subregion": "Middle Africa",
            "currency": "XAF",
            "alpha2": "TD",
            "alpha3": "TCD",
            "ioc": "CHA",
            "number": "148",
            "tel": "235",
            "latitude": "15 00 N",
            "longitude": "19 00 E",
            "un": "TD"
        },
        "TF": {
            "value": "TF",
            "name": "French Southern Territories",
            "names": [
                "French Southern Territories",
                "Französische Südgebiete",
                "Terres Australes Françaises",
                "Territorios Franceses del Sur"
            ],
            "region": "",
            "subregion": "",
            "currency": "EUR",
            "alpha2": "TF",
            "alpha3": "ATF",
            "ioc": null,
            "number": "260",
            "tel": "",
            "latitude": "",
            "longitude": "",
            "un": null
        },
        "TG": {
            "value": "TG",
            "name": "Togo",
            "names": [
                "Togo"
            ],
            "region": "Africa",
            "subregion": "Western Africa",
            "currency": "XOF",
            "alpha2": "TG",
            "alpha3": "TGO",
            "ioc": "TOG",
            "number": "768",
            "tel": "228",
            "latitude": "8 00 N",
            "longitude": "1 10 E",
            "un": "TG"
        },
        "TH": {
            "value": "TH",
            "name": "Thailand",
            "names": [
                "Thailand",
                "Thailand",
                "Thaïlande",
                "Tailandia"
            ],
            "region": "Asia",
            "subregion": "South-Eastern Asia",
            "currency": "THB",
            "alpha2": "TH",
            "alpha3": "THA",
            "ioc": "THA",
            "number": "764",
            "tel": "66",
            "latitude": "15 00 N",
            "longitude": "100 00 E",
            "un": "TH"
        },
        "TJ": {
            "value": "TJ",
            "name": "Tajikistan",
            "names": [
                "Tajikistan",
                "Tadschikistan",
                "Tajikistan",
                "Tayikistán"
            ],
            "region": "Asia",
            "subregion": "Central Asia",
            "currency": "TJS",
            "alpha2": "TJ",
            "alpha3": "TJK",
            "ioc": "TJK",
            "number": "762",
            "tel": "992",
            "latitude": "39 00 N",
            "longitude": "71 00 E",
            "un": "TJ"
        },
        "TK": {
            "value": "TK",
            "name": "Tokelau",
            "names": [
                "Tokelau",
                "Tokelau",
                "Îles Tokelau",
                "Islas Tokelau"
            ],
            "region": "Oceania",
            "subregion": "Polynesia",
            "currency": "NZD",
            "alpha2": "TK",
            "alpha3": "TKL",
            "ioc": null,
            "number": "772",
            "tel": "690",
            "latitude": "9 00 S",
            "longitude": "172 00 W",
            "un": "TK"
        },
        "TL": {
            "value": "TL",
            "name": "Timor-Leste",
            "names": [
                "East Timor",
                "Ost-Timor",
                "Timor oriental",
                "Timor Oriental"
            ],
            "region": "Asia",
            "subregion": "South-Eastern Asia",
            "currency": "IDR",
            "alpha2": "TL",
            "alpha3": "TLS",
            "ioc": null,
            "number": "626",
            "tel": "670",
            "latitude": "8 50 S",
            "longitude": "125 55 E",
            "un": null
        },
        "TM": {
            "value": "TM",
            "name": "Turkmenistan",
            "names": [
                "Turkmenistan",
                "Turkmenistan",
                "Turkménistan",
                "Turkmenistán"
            ],
            "region": "Asia",
            "subregion": "Central Asia",
            "currency": "TMT",
            "alpha2": "TM",
            "alpha3": "TKM",
            "ioc": "TKM",
            "number": "795",
            "tel": "993",
            "latitude": "40 00 N",
            "longitude": "60 00 E",
            "un": "TM"
        },
        "TN": {
            "value": "TN",
            "name": "Tunisia",
            "names": [
                "Tunisia",
                "Tunesien",
                "Tunisie",
                "Túnez"
            ],
            "region": "Africa",
            "subregion": "Northern Africa",
            "currency": "TND",
            "alpha2": "TN",
            "alpha3": "TUN",
            "ioc": "TUN",
            "number": "788",
            "tel": "216",
            "latitude": "34 00 N",
            "longitude": "9 00 E",
            "un": "TN"
        },
        "TO": {
            "value": "TO",
            "name": "Tonga",
            "names": [
                "Tonga"
            ],
            "region": "Oceania",
            "subregion": "Polynesia",
            "currency": "TOP",
            "alpha2": "TO",
            "alpha3": "TON",
            "ioc": "TGA",
            "number": "776",
            "tel": "676",
            "latitude": "20 00 S",
            "longitude": "175 00 W",
            "un": "TO"
        },
        "TR": {
            "value": "TR",
            "name": "Turkey",
            "names": [
                "Turkey",
                "Türkei",
                "Turquie",
                "Turquía"
            ],
            "region": "Asia",
            "subregion": "Western Asia",
            "currency": "TRY",
            "alpha2": "TR",
            "alpha3": "TUR",
            "ioc": "TUR",
            "number": "792",
            "tel": "90",
            "latitude": "39 00 N",
            "longitude": "35 00 E",
            "un": "TR"
        },
        "TT": {
            "value": "TT",
            "name": "Trinidad and Tobago",
            "names": [
                "Trinidad and Tobago",
                "Trinidad und Tobago",
                "Trinité et Tobago",
                "Trinidad y Tobago"
            ],
            "region": "Americas",
            "subregion": "Caribbean",
            "currency": "TTD",
            "alpha2": "TT",
            "alpha3": "TTO",
            "ioc": "TRI",
            "number": "780",
            "tel": "1",
            "latitude": "11 00 N",
            "longitude": "61 00 W",
            "un": "TT"
        },
        "TV": {
            "value": "TV",
            "name": "Tuvalu",
            "names": [
                "Tuvalu",
                "Tuvalu",
                "Tuvalu",
                "Tuvalu"
            ],
            "region": "Oceania",
            "subregion": "Polynesia",
            "currency": "TVD",
            "alpha2": "TV",
            "alpha3": "TUV",
            "ioc": "TUV",
            "number": "798",
            "tel": "688",
            "latitude": "8 00 S",
            "longitude": "178 00 E",
            "un": "TV"
        },
        "TW": {
            "value": "TW",
            "name": "Taiwan, Province Of China",
            "names": [
                "Taiwan",
                "Taiwán"
            ],
            "region": "Asia",
            "subregion": "Eastern Asia",
            "currency": "TWD",
            "alpha2": "TW",
            "alpha3": "TWN",
            "ioc": "TPE",
            "number": "158",
            "tel": "886",
            "latitude": "23 30 N",
            "longitude": "121 00 E",
            "un": "TW",
            "commonname": "Taiwan"
        },
        "TZ": {
            "value": "TZ",
            "names": [
                "Tanzania, United Republic of",
                "Tanzania",
                "Tansania",
                "Tanzanie"
            ],
            "region": "Africa",
            "subregion": "Eastern Africa",
            "currency": "TZS",
        },
        "UA": {
            "value": "UA",
            "names": [
                "Ukraine",
                "Ukraine",
                "Ukraine",
                "Ucrania"
            ],
            "region": "Europe",
            "subregion": "Eastern Europe",
            "currency": "UAH",
        },
        "UG": {
            "value": "UG",
            "names": [
                "Uganda"
            ],
            "region": "Africa",
            "subregion": "Eastern Africa",
            "currency": "UGX",
        },
        "UM": {
            "value": "UM",
            "names": [
                "United States Minor Outlying Islands",
                "US-Amerikanische Hoheitsgebiete",
                "Dépendances américaines",
                "Islas menores de Estados Unidos"
            ],
            "region": "Americas",
            "subregion": "Northern America",
            "currency": "USD",
        },
        "US": {
            "value": "US",
            "names": [
                "United States",
                "United States of America",
                "Vereinigte Staaten von Amerika",
                "États-Unis",
                "Estados Unidos"
            ],
            "region": "Americas",
            "subregion": "Northern America",
            "currency": "USD",
        },
        "UY": {
            "value": "UY",
            "names": [
                "Uruguay"
            ],
            "region": "Americas",
            "subregion": "South America",
            "currency": "UYU",
        },
        "UZ": {
            "value": "UZ",
            "names": [
                "Uzbekistan",
                "Usbekistan",
                "Ouzbékistan",
                "Uzbekistán"
            ],
            "region": "Asia",
            "subregion": "Central Asia",
            "currency": "UZS",
        },
        "VA": {
            "value": "VA",
            "names": [
                "Holy See (Vatican City State)",
                "Vatican City",
                "Vatikan",
                "Cité du Vatican",
                "Ciudad del Vaticano"
            ],
            "region": "Europe",
            "subregion": "Southern Europe",
            "currency": "EUR",
        },
        "VC": {
            "value": "VC",
            "names": [
                "Saint Vincent And The Grenedines",
                "Saint Vincent and the Grenadines",
                "Saint Vincent und die Grenadinen",
                "Saint-Vincent et les Grenadines",
                "San Vicente y Granadinas"
            ],
            "region": "Americas",
            "subregion": "Caribbean",
            "currency": "XCD",
        },
        "VE": {
            "value": "VE",
            "names": [
                "Venezuela, Bolivarian Republic of",
                "Venezuela"
            ],
            "region": "Americas",
            "subregion": "South America",
            "currency": "VEF",
        },
        "VG": {
            "value": "VG",
            "names": [
                "Virgin Islands, British",
                "British Virgin Islands",
                "Britische Jungferninseln",
                "Îles Vierges britanniques",
                "Islas Vírgenes del Reino Unido"
            ],
            "region": "Americas",
            "subregion": "Caribbean",
            "currency": "USD",
        },
        "VI": {
            "value": "VI",
            "names": [
                "Virgin Islands, U.S.",
                "Virgin Islands of the United States",
                "Amerikanische Jungferninseln",
                "Îles Vierges américaines",
                "Islas Vírgenes de los Estados Unidos"
            ],
            "region": "Americas",
            "subregion": "Caribbean",
            "currency": "USD",
        },
        "VN": {
            "value": "VN",
            "names": [
                "Viet Nam",
                "Vietnam"
            ],
            "region": "Asia",
            "subregion": "South-Eastern Asia",
            "currency": "VND",
        },
        "VU": {
            "value": "VU",
            "names": [
                "Vanuatu"
            ],
            "region": "Oceania",
            "subregion": "Melanesia",
            "currency": null,
        },
        "WF": {
            "value": "WF",
            "names": [
                "Wallis and Futuna",
                "Wallis und Futuna",
                "Wallis et Futuna",
                "Wallis y Futuna"
            ],
            "region": "Oceania",
            "subregion": "Polynesia",
            "currency": "XPF",
        },
        "WS": {
            "value": "WS",
            "name": "Samoa",
            "names": [
                "Samoa"
            ],
            "region": "Oceania",
            "subregion": "Polynesia",
            "currency": "USD",
        },
        "YE": {
            "value": "YE",
            "names": [
                "Yemen",
                "Jemen",
                "Yémen"
            ],
            "region": "Asia",
            "subregion": "Western Asia",
            "currency": "YER",
        },
        "YT": {
            "value": "YT",
            "names": [
                "Mayotte",
                "Mayotte",
                "Mayotte",
                "Mayotte"
            ],
            "region": "Africa",
            "subregion": "Eastern Africa",
            "currency": "EUR",
        },
        "ZA": {
            "value": "ZA",
            "names": [
                "South Africa",
                "Republik Südafrika",
                "Afrique du Sud",
                "República de Sudáfrica"
            ],
            "region": "Africa",
            "subregion": "Southern Africa",
            "currency": "ZAR",
        },
        "ZM": {
            "value": "ZM",
            "names": [
                "Zambia",
                "Sambia",
                "Zambie"
            ],
            "region": "Africa",
            "subregion": "Eastern Africa",
            "currency": "ZMK",
        },
        "ZW": {
            "value": "ZW",
            "names": [
                "Zimbabwe",
                "Simbabwe",
                "Zimbabue"
            ],
            "region": "Africa",
            "subregion": "Eastern Africa",
            "currency": "ZWD",
        }
    };

    let currencies = {
        "EUR": {
            "value": "EUR",
            "name": "EUR",
            "countries": [
                "AD",
                "AT",
                "BE",
                "CY",
                "DE",
                "ES",
                "FI",
                "FR",
                "GF",
                "GP",
                "GR",
                "IE",
                "IT",
                "LU",
                "MC",
                "ME",
                "MF",
                "MQ",
                "MT",
                "NL",
                "PM",
                "PT",
                "RE",
                "SI",
                "SK",
                "SM",
                "TF",
                "VA",
                "YT"
            ]
        },
        "AED": {
            "value": "AED",
            "name": "AED",
            "countries": [
                "AE"
            ]
        },
        "AFN": {
            "value": "AFN",
            "name": "AFN",
            "countries": [
                "AF"
            ]
        },
        "XCD": {
            "value": "XCD",
            "name": "XCD",
            "countries": [
                "AG",
                "AI",
                "DM",
                "GD",
                "KN",
                "LC",
                "MS",
                "VC"
            ]
        },
        "ALL": {
            "value": "ALL",
            "name": "ALL",
            "countries": [
                "AL"
            ]
        },
        "AMD": {
            "value": "AMD",
            "name": "AMD",
            "countries": [
                "AM"
            ]
        },
        "ANG": {
            "value": "ANG",
            "name": "ANG",
            "countries": [
                "AN"
            ]
        },
        "AOA": {
            "value": "AOA",
            "name": "AOA",
            "countries": [
                "AO"
            ]
        },
        "null": {
            "value": null,
            "name": null,
            "countries": [
                "AQ",
                "AX",
                "BL",
                "CD",
                "CG",
                "GQ",
                "GS",
                "MG",
                "MK",
                "NU",
                "PS",
                "VU"
            ]
        },
        "ARS": {
            "value": "ARS",
            "name": "ARS",
            "countries": [
                "AR"
            ]
        },
        "USD": {
            "value": "USD",
            "name": "USD",
            "countries": [
                "AS",
                "EC",
                "FJ",
                "FM",
                "GU",
                "HT",
                "IO",
                "MH",
                "MP",
                "PR",
                "PW",
                "SV",
                "TC",
                "UM",
                "US",
                "VG",
                "VI",
                "WS"
            ]
        },
        "AUD": {
            "value": "AUD",
            "name": "AUD",
            "countries": [
                "AU",
                "CC",
                "CX",
                "HM",
                "KI",
                "NF",
                "NR"
            ]
        },
        "AWG": {
            "value": "AWG",
            "name": "AWG",
            "countries": [
                "AW"
            ]
        },
        "AZN": {
            "value": "AZN",
            "name": "AZN",
            "countries": [
                "AZ"
            ]
        },
        "BAM": {
            "value": "BAM",
            "name": "BAM",
            "countries": [
                "BA"
            ]
        },
        "BBD": {
            "value": "BBD",
            "name": "BBD",
            "countries": [
                "BB"
            ]
        },
        "BTD": {
            "value": "BTD",
            "name": "BTD",
            "countries": [
                "BD"
            ]
        },
        "XOF": {
            "value": "XOF",
            "name": "XOF",
            "countries": [
                "BF",
                "BJ",
                "CI",
                "GW",
                "ML",
                "NE",
                "SN",
                "TG"
            ]
        },
        "BGN": {
            "value": "BGN",
            "name": "BGN",
            "countries": [
                "BG"
            ]
        },
        "BHD": {
            "value": "BHD",
            "name": "BHD",
            "countries": [
                "BH"
            ]
        },
        "BIF": {
            "value": "BIF",
            "name": "BIF",
            "countries": [
                "BI"
            ]
        },
        "BMD": {
            "value": "BMD",
            "name": "BMD",
            "countries": [
                "BM"
            ]
        },
        "BND": {
            "value": "BND",
            "name": "BND",
            "countries": [
                "BN"
            ]
        },
        "BOB": {
            "value": "BOB",
            "name": "BOB",
            "countries": [
                "BO"
            ]
        },
        "BRL": {
            "value": "BRL",
            "name": "BRL",
            "countries": [
                "BR"
            ]
        },
        "BSD": {
            "value": "BSD",
            "name": "BSD",
            "countries": [
                "BS"
            ]
        },
        "BTN": {
            "value": "BTN",
            "name": "BTN",
            "countries": [
                "BT"
            ]
        },
        "NOK": {
            "value": "NOK",
            "name": "NOK",
            "countries": [
                "BV",
                "NO",
                "SJ"
            ]
        },
        "BWP": {
            "value": "BWP",
            "name": "BWP",
            "countries": [
                "BW"
            ]
        },
        "BYR": {
            "value": "BYR",
            "name": "BYR",
            "countries": [
                "BY"
            ]
        },
        "BZD": {
            "value": "BZD",
            "name": "BZD",
            "countries": [
                "BZ"
            ]
        },
        "CAD": {
            "value": "CAD",
            "name": "CAD",
            "countries": [
                "CA"
            ]
        },
        "XAF": {
            "value": "XAF",
            "name": "XAF",
            "countries": [
                "CF",
                "CM",
                "GA",
                "TD"
            ]
        },
        "CHF": {
            "value": "CHF",
            "name": "CHF",
            "countries": [
                "CH",
                "LI"
            ]
        },
        "NZD": {
            "value": "NZD",
            "name": "NZD",
            "countries": [
                "CK",
                "NZ",
                "PN",
                "TK"
            ]
        },
        "CLP": {
            "value": "CLP",
            "name": "CLP",
            "countries": [
                "CL"
            ]
        },
        "CNY": {
            "value": "CNY",
            "name": "CNY",
            "countries": [
                "CN"
            ]
        },
        "COP": {
            "value": "COP",
            "name": "COP",
            "countries": [
                "CO"
            ]
        },
        "CRC": {
            "value": "CRC",
            "name": "CRC",
            "countries": [
                "CR"
            ]
        },
        "CUP": {
            "value": "CUP",
            "name": "CUP",
            "countries": [
                "CU"
            ]
        },
        "CVE": {
            "value": "CVE",
            "name": "CVE",
            "countries": [
                "CV"
            ]
        },
        "CZK": {
            "value": "CZK",
            "name": "CZK",
            "countries": [
                "CZ"
            ]
        },
        "DJF": {
            "value": "DJF",
            "name": "DJF",
            "countries": [
                "DJ"
            ]
        },
        "DKK": {
            "value": "DKK",
            "name": "DKK",
            "countries": [
                "DK",
                "FO",
                "GL"
            ]
        },
        "DOP": {
            "value": "DOP",
            "name": "DOP",
            "countries": [
                "DO"
            ]
        },
        "DZD": {
            "value": "DZD",
            "name": "DZD",
            "countries": [
                "DZ"
            ]
        },
        "EEK": {
            "value": "EEK",
            "name": "EEK",
            "countries": [
                "EE"
            ]
        },
        "EGP": {
            "value": "EGP",
            "name": "EGP",
            "countries": [
                "EG"
            ]
        },
        "MAD": {
            "value": "MAD",
            "name": "MAD",
            "countries": [
                "EH",
                "MA"
            ]
        },
        "ETB": {
            "value": "ETB",
            "name": "ETB",
            "countries": [
                "ER",
                "ET"
            ]
        },
        "FKP": {
            "value": "FKP",
            "name": "FKP",
            "countries": [
                "FK"
            ]
        },
        "GBP": {
            "value": "GBP",
            "name": "GBP",
            "countries": [
                "GB"
            ]
        },
        "GEL": {
            "value": "GEL",
            "name": "GEL",
            "countries": [
                "GE"
            ]
        },
        "GGP": {
            "value": "GGP",
            "name": "GGP",
            "countries": [
                "GG"
            ]
        },
        "GHS": {
            "value": "GHS",
            "name": "GHS",
            "countries": [
                "GH"
            ]
        },
        "GIP": {
            "value": "GIP",
            "name": "GIP",
            "countries": [
                "GI"
            ]
        },
        "GMD": {
            "value": "GMD",
            "name": "GMD",
            "countries": [
                "GM"
            ]
        },
        "GNF": {
            "value": "GNF",
            "name": "GNF",
            "countries": [
                "GN"
            ]
        },
        "GTQ": {
            "value": "GTQ",
            "name": "GTQ",
            "countries": [
                "GT"
            ]
        },
        "GYD": {
            "value": "GYD",
            "name": "GYD",
            "countries": [
                "GY"
            ]
        },
        "HKD": {
            "value": "HKD",
            "name": "HKD",
            "countries": [
                "HK"
            ]
        },
        "HNL": {
            "value": "HNL",
            "name": "HNL",
            "countries": [
                "HN"
            ]
        },
        "HRK": {
            "value": "HRK",
            "name": "HRK",
            "countries": [
                "HR"
            ]
        },
        "HUF": {
            "value": "HUF",
            "name": "HUF",
            "countries": [
                "HU"
            ]
        },
        "IDR": {
            "value": "IDR",
            "name": "IDR",
            "countries": [
                "ID",
                "TL"
            ]
        },
        "ILS": {
            "value": "ILS",
            "name": "ILS",
            "countries": [
                "IL"
            ]
        },
        "IMP": {
            "value": "IMP",
            "name": "IMP",
            "countries": [
                "IM"
            ]
        },
        "INR": {
            "value": "INR",
            "name": "INR",
            "countries": [
                "IN"
            ]
        },
        "IQD": {
            "value": "IQD",
            "name": "IQD",
            "countries": [
                "IQ"
            ]
        },
        "IRR": {
            "value": "IRR",
            "name": "IRR",
            "countries": [
                "IR"
            ]
        },
        "ISK": {
            "value": "ISK",
            "name": "ISK",
            "countries": [
                "IS"
            ]
        },
        "JEP": {
            "value": "JEP",
            "name": "JEP",
            "countries": [
                "JE"
            ]
        },
        "JMD": {
            "value": "JMD",
            "name": "JMD",
            "countries": [
                "JM"
            ]
        },
        "JOD": {
            "value": "JOD",
            "name": "JOD",
            "countries": [
                "JO"
            ]
        },
        "JPY": {
            "value": "JPY",
            "name": "JPY",
            "countries": [
                "JP"
            ]
        },
        "KES": {
            "value": "KES",
            "name": "KES",
            "countries": [
                "KE"
            ]
        },
        "KGS": {
            "value": "KGS",
            "name": "KGS",
            "countries": [
                "KG"
            ]
        },
        "KHR": {
            "value": "KHR",
            "name": "KHR",
            "countries": [
                "KH"
            ]
        },
        "KMF": {
            "value": "KMF",
            "name": "KMF",
            "countries": [
                "KM"
            ]
        },
        "KPW": {
            "value": "KPW",
            "name": "KPW",
            "countries": [
                "KP"
            ]
        },
        "KRW": {
            "value": "KRW",
            "name": "KRW",
            "countries": [
                "KR"
            ]
        },
        "KWD": {
            "value": "KWD",
            "name": "KWD",
            "countries": [
                "KW"
            ]
        },
        "KYD": {
            "value": "KYD",
            "name": "KYD",
            "countries": [
                "KY"
            ]
        },
        "KZT": {
            "value": "KZT",
            "name": "KZT",
            "countries": [
                "KZ"
            ]
        },
        "LAK": {
            "value": "LAK",
            "name": "LAK",
            "countries": [
                "LA"
            ]
        },
        "LBP": {
            "value": "LBP",
            "name": "LBP",
            "countries": [
                "LB"
            ]
        },
        "LKR": {
            "value": "LKR",
            "name": "LKR",
            "countries": [
                "LK"
            ]
        },
        "LRD": {
            "value": "LRD",
            "name": "LRD",
            "countries": [
                "LR"
            ]
        },
        "LSL": {
            "value": "LSL",
            "name": "LSL",
            "countries": [
                "LS"
            ]
        },
        "LTL": {
            "value": "LTL",
            "name": "LTL",
            "countries": [
                "LT"
            ]
        },
        "LVL": {
            "value": "LVL",
            "name": "LVL",
            "countries": [
                "LV"
            ]
        },
        "LYD": {
            "value": "LYD",
            "name": "LYD",
            "countries": [
                "LY"
            ]
        },
        "MDL": {
            "value": "MDL",
            "name": "MDL",
            "countries": [
                "MD"
            ]
        },
        "MNK": {
            "value": "MNK",
            "name": "MNK",
            "countries": [
                "MM"
            ]
        },
        "MNT": {
            "value": "MNT",
            "name": "MNT",
            "countries": [
                "MN"
            ]
        },
        "MOP": {
            "value": "MOP",
            "name": "MOP",
            "countries": [
                "MO"
            ]
        },
        "MRO": {
            "value": "MRO",
            "name": "MRO",
            "countries": [
                "MR"
            ]
        },
        "MUR": {
            "value": "MUR",
            "name": "MUR",
            "countries": [
                "MU"
            ]
        },
        "MVR": {
            "value": "MVR",
            "name": "MVR",
            "countries": [
                "MV"
            ]
        },
        "MWK": {
            "value": "MWK",
            "name": "MWK",
            "countries": [
                "MW"
            ]
        },
        "MXN": {
            "value": "MXN",
            "name": "MXN",
            "countries": [
                "MX"
            ]
        },
        "MYR": {
            "value": "MYR",
            "name": "MYR",
            "countries": [
                "MY"
            ]
        },
        "MZN": {
            "value": "MZN",
            "name": "MZN",
            "countries": [
                "MZ"
            ]
        },
        "NAD": {
            "value": "NAD",
            "name": "NAD",
            "countries": [
                "NA"
            ]
        },
        "XPF": {
            "value": "XPF",
            "name": "XPF",
            "countries": [
                "NC",
                "PF",
                "WF"
            ]
        },
        "NGN": {
            "value": "NGN",
            "name": "NGN",
            "countries": [
                "NG"
            ]
        },
        "NIO": {
            "value": "NIO",
            "name": "NIO",
            "countries": [
                "NI"
            ]
        },
        "NPR": {
            "value": "NPR",
            "name": "NPR",
            "countries": [
                "NP"
            ]
        },
        "OMR": {
            "value": "OMR",
            "name": "OMR",
            "countries": [
                "OM"
            ]
        },
        "PAB": {
            "value": "PAB",
            "name": "PAB",
            "countries": [
                "PA"
            ]
        },
        "PEN": {
            "value": "PEN",
            "name": "PEN",
            "countries": [
                "PE"
            ]
        },
        "PGK": {
            "value": "PGK",
            "name": "PGK",
            "countries": [
                "PG"
            ]
        },
        "PHP": {
            "value": "PHP",
            "name": "PHP",
            "countries": [
                "PH"
            ]
        },
        "PKR": {
            "value": "PKR",
            "name": "PKR",
            "countries": [
                "PK"
            ]
        },
        "PLN": {
            "value": "PLN",
            "name": "PLN",
            "countries": [
                "PL"
            ]
        },
        "PYG": {
            "value": "PYG",
            "name": "PYG",
            "countries": [
                "PY"
            ]
        },
        "QAR": {
            "value": "QAR",
            "name": "QAR",
            "countries": [
                "QA"
            ]
        },
        "RON": {
            "value": "RON",
            "name": "RON",
            "countries": [
                "RO"
            ]
        },
        "RSD": {
            "value": "RSD",
            "name": "RSD",
            "countries": [
                "RS"
            ]
        },
        "RUB": {
            "value": "RUB",
            "name": "RUB",
            "countries": [
                "RU"
            ]
        },
        "RWF": {
            "value": "RWF",
            "name": "RWF",
            "countries": [
                "RW"
            ]
        },
        "SAR": {
            "value": "SAR",
            "name": "SAR",
            "countries": [
                "SA"
            ]
        },
        "SBD": {
            "value": "SBD",
            "name": "SBD",
            "countries": [
                "SB"
            ]
        },
        "SCR": {
            "value": "SCR",
            "name": "SCR",
            "countries": [
                "SC"
            ]
        },
        "SDG": {
            "value": "SDG",
            "name": "SDG",
            "countries": [
                "SD"
            ]
        },
        "SEK": {
            "value": "SEK",
            "name": "SEK",
            "countries": [
                "SE"
            ]
        },
        "SGD": {
            "value": "SGD",
            "name": "SGD",
            "countries": [
                "SG"
            ]
        },
        "SHP": {
            "value": "SHP",
            "name": "SHP",
            "countries": [
                "SH"
            ]
        },
        "SLL": {
            "value": "SLL",
            "name": "SLL",
            "countries": [
                "SL"
            ]
        },
        "SOS": {
            "value": "SOS",
            "name": "SOS",
            "countries": [
                "SO"
            ]
        },
        "SRD": {
            "value": "SRD",
            "name": "SRD",
            "countries": [
                "SR"
            ]
        },
        "STD": {
            "value": "STD",
            "name": "STD",
            "countries": [
                "ST"
            ]
        },
        "SYP": {
            "value": "SYP",
            "name": "SYP",
            "countries": [
                "SY"
            ]
        },
        "SZL": {
            "value": "SZL",
            "name": "SZL",
            "countries": [
                "SZ"
            ]
        },
        "THB": {
            "value": "THB",
            "name": "THB",
            "countries": [
                "TH"
            ]
        },
        "TJS": {
            "value": "TJS",
            "name": "TJS",
            "countries": [
                "TJ"
            ]
        },
        "TMT": {
            "value": "TMT",
            "name": "TMT",
            "countries": [
                "TM"
            ]
        },
        "TND": {
            "value": "TND",
            "name": "TND",
            "countries": [
                "TN"
            ]
        },
        "TOP": {
            "value": "TOP",
            "name": "TOP",
            "countries": [
                "TO"
            ]
        },
        "TRY": {
            "value": "TRY",
            "name": "TRY",
            "countries": [
                "TR"
            ]
        },
        "TTD": {
            "value": "TTD",
            "name": "TTD",
            "countries": [
                "TT"
            ]
        },
        "TVD": {
            "value": "TVD",
            "name": "TVD",
            "countries": [
                "TV"
            ]
        },
        "TWD": {
            "value": "TWD",
            "name": "TWD",
            "countries": [
                "TW"
            ]
        },
        "TZS": {
            "value": "TZS",
            "name": "TZS",
            "countries": [
                "TZ"
            ]
        },
        "UAH": {
            "value": "UAH",
            "name": "UAH",
            "countries": [
                "UA"
            ]
        },
        "UGX": {
            "value": "UGX",
            "name": "UGX",
            "countries": [
                "UG"
            ]
        },
        "UYU": {
            "value": "UYU",
            "name": "UYU",
            "countries": [
                "UY"
            ]
        },
        "UZS": {
            "value": "UZS",
            "name": "UZS",
            "countries": [
                "UZ"
            ]
        },
        "VEF": {
            "value": "VEF",
            "name": "VEF",
            "countries": [
                "VE"
            ]
        },
        "VND": {
            "value": "VND",
            "name": "VND",
            "countries": [
                "VN"
            ]
        },
        "YER": {
            "value": "YER",
            "name": "YER",
            "countries": [
                "YE"
            ]
        },
        "ZAR": {
            "value": "ZAR",
            "name": "ZAR",
            "countries": [
                "ZA"
            ]
        },
        "ZMK": {
            "value": "ZMK",
            "name": "ZMK",
            "countries": [
                "ZM"
            ]
        },
        "ZWD": {
            "value": "ZWD",
            "name": "ZWD",
            "countries": [
                "ZW"
            ]
        }
    };

    return{
        addItem: function(type, desc, val) {
            var newItem, ID;
            //Create new ID
            if(data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            // Create new item based on 'inc' or 'exp' type
            if(type === 'inc'){
                newItem = new Income(ID, desc, val); 
            } else if(type === 'exp') {
                newItem = new Expense(ID, desc, val); 
            }
            // Push it into our data structure
            data.allItems[type].push(newItem);
            data.localItems[type].push(newItem);
            //Return the new element
            return newItem;
        },
        
        addLocal: function (type) {
            // Receive the type of the item (income/expense). 
            var itemStr, itemParse;
            data.allItems[type].forEach( (el, i) => {
                // Stringfy to save in localstorage
                itemStr = JSON.stringify(data.allItems[type][i]);
                // Saving each item in localstorage, easier to delete.
                localStorage.setItem(`i-${type}-${i}`, itemStr);
                // Turn the item back to an object
                itemParse = JSON.parse(itemStr);
            });

            localStorage.setItem('arr-inc', JSON.stringify(data.localItems['inc']));
            localStorage.setItem('arr-exp', JSON.stringify(data.localItems['exp']));

            // Fazer com que o array nao se perca a cada reload, manter os anteriores sempre.
        },

        deleteItem: function(type, id) {
            var ids, index;

            ids = data.allItems[type].map(function(curr) {
                return curr.id;
            });

            index = ids.indexOf(id);

            if (index !== -1){ // -1 is what the method above returns if didn't find the index
                data.allItems[type].splice(index, 1);

                localStorage.removeItem(`i-${type}-${id}`);
            }
        },

        calculateBudget: function() {

            // Calculate total income and expenses
            calculateTotal('inc');
            calculateTotal('exp');

            // Calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;

            if(data.totals.inc > 0){
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }

            // Expense = 100 and income 300, spent 33.33% - 100/300 - 0.333*100
        },

        calculatePercentages: function() {
            data.allItems.exp.forEach(function(curr) {
                curr.calcPercentage(data.totals.inc);
            });
        },

        getPercentages: function() {
            var allPerc = data.allItems.exp.map(function (curr) {
                return curr.getPercentage();
            });

            return allPerc;
        },

        getBudget: function () {
            return{
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                budget: data.budget,
                percentage: data.percentage 
            }
        },

        data: function() {
          return data
        }
    }

})();

// UI CONTROLLER
var UIController = (function() {
    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        inputBtnLocal: '.add__btn--local',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercLabel: '.item__percentage',
        dateLabel: '.budget__title--month' 
    },
    formatNumber,
    nodeListForEach;

    formatNumber = function(num, type) {
        /*
         * Received 2310 
         */
        var splitNum, int, dec;

        num = Math.abs(num);
        num = num.toFixed(2); // Returns a string: 2310.00

        splitNum = num.split('.');
        int = splitNum[0]; // 10000
        if (int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
            /**
             * int[0] = 1
             * int[int.length - 3] = 2 (int.length = 5)
             * first substr goes to the first element until the second.
             * int[int.length - 3] = 2
             * int[3]
             * second substr, goes to the second element until the third AHEAD
             */
        }

        dec = splitNum[1]; // 00

        return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;
    };

    // Creates a loop for each item of this node list.
    nodeListForEach = function (list, callback) {
        for (var i = 0; i < list.length; i++) {
            /* 
             Call my callback fn, for each item in my node list
             My callback fn, is executed with two parameters.
             First parameter is my current index, node list on the position i
             And the second parameter it's the index only.
            */
            callback(list[i], i);
        }
    }

    return{
        getInput: function () {
            return{
                type: document.querySelector(DOMStrings.inputType).value, //Inc or Exp
                description: description = document.querySelector(DOMStrings.inputDescription).value,
                value: value = parseFloat(document.querySelector(DOMStrings.inputValue).value)
            }
        },

        addListItem: function(obj, type) {
            var html, newHtml, element;

            if(type === 'inc'){
                element = DOMStrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            } else if(type === 'exp'){
                element = DOMStrings.expenseContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }

            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));

            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        localItems: function(obj) {
            var html, newHtml, element, item, arrInc, arrExp;

            arrInc = JSON.parse(localStorage.getItem('arr-inc'));
            arrExp = JSON.parse(localStorage.getItem('arr-exp'));
            // 1. Clear the current list.
            document.querySelector(DOMStrings.incomeContainer).textContent = "";
            document.querySelector(DOMStrings.expenseContainer).textContent = "";
            // 2. Fill the list with the Inc and Exp Array.
            // noinspection JSAnnotator

            if(arrExp !== null && arrExp !== undefined) {
                arrInc.forEach((el, i) => {
                    element = DOMStrings.incomeContainer;
                    html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'

                    item = JSON.parse(localStorage.getItem(`i-inc-${i}`));

                    newHtml = html.replace('%id%', item.id);
                    newHtml = newHtml.replace('%description%', item.description);
                    newHtml = newHtml.replace('%value%', formatNumber(item.value, 'inc'));

                    document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
                });
            }

            if(arrInc !== null && arrInc !== undefined) {
                arrExp.forEach((el, i) => {
                    element = DOMStrings.expenseContainer;
                    html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'

                    item = JSON.parse(localStorage.getItem(`i-exp-${i}`));

                    newHtml = html.replace('%id%', item.id);
                    newHtml = newHtml.replace('%description%', item.description);
                    newHtml = newHtml.replace('%value%', formatNumber(item.value, 'exp'));

                    document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
                });
            }
        },

        deleteListItem: function(selectorID) {
            var el = document.getElementById(selectorID);

            el.parentNode.removeChild(el);
        },

        clearFields: function() {
            var fields, fieldsArr;

            fields = document.querySelectorAll(DOMStrings.inputDescription +', '+ DOMStrings.inputValue);
            // Trick to convert the nodeList in an Array
            fieldsArr = Array.prototype.slice.call(fields);

            fields.forEach(function(curr, i, arr) {
                curr.value = "";
            });

            fields[0].focus();
        },

        displayBudget: function(obj) {
            var type;
            (type >= 0) ? '+' : '-';
            document.querySelector(DOMStrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMStrings.incomeLabel).textContent = formatNumber(obj.totalInc,'inc');
            document.querySelector(DOMStrings.expenseLabel).textContent = formatNumber(obj.totalExp,'exp');

            if(obj.percentage > 0) {
                document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage +'%';
            } else {
                document.querySelector(DOMStrings.percentageLabel).textContent = '---';
            }
        },

        displayPercentages: function(percentages) {
            var fields;

            fields = document.querySelectorAll(DOMStrings.expensesPercLabel);

            // Returns a node list.
            
            nodeListForEach(fields, function(curr, i) {
                if (percentages[i] > 0) {
                    curr.textContent = percentages[i] + '%';
                } else {
                    curr.textContent = '---';
                }
            });
        },

        displayMonth: function() {
            var now, currYear, currMonth, months;

            now = new Date();
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September' ,'October', 'November', 'December'];
            currYear = now.getFullYear();
            currMonth = now.getMonth();

            document.querySelector(DOMStrings.dateLabel).textContent = months[currMonth] + ' ' + currYear;
        },

        changedType: function() {
            var fields = document.querySelectorAll(
                DOMStrings.inputType + ',' +
                DOMStrings.inputDescription + ',' +
                DOMStrings.inputValue),
                btns = document.querySelectorAll(DOMStrings.inputBtn);
            
            nodeListForEach(fields, function(curr) {
                curr.classList.toggle('red-focus');
            });
            
            nodeListForEach(btns, function(curr) {
                curr.classList.toggle('red')
            });
        },

        getDOMstrings: function() {
            return DOMStrings;
        }
    };
})();

// GLOBAL APP CONTROLLER
var controller = (function  (budgetCtrl, UICtrl) {
    /*  
     *   Connection between the two module upahead.
     *   They don't connect with each other,
     *   Because each one has your own responsability;
     *   And in our controller we make the connection of them,
     *   Passing into parameters
     */
    var ctrlAddItem, setupEventListeners, updateBudget, ctrlDeleteItem, updatePercentages, ctrlAddLocal;

    setupEventListeners = function() {
        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
        document.querySelector(DOM.inputBtnLocal).addEventListener('click', ctrlAddLocal);

        document.addEventListener('keypress', function (e) {

            if (e.keyCode === 13 || e.which === 13) { //Which for older browser
                ctrlAddItem();
            }

        });

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);
    };

    updateBudget = function() {
        var budget;
        // 1. Calculate the budget
        budgetCtrl.calculateBudget();

        // 2. Return the budget
        budget = budgetCtrl.getBudget();

        // 3. Display the budget on the ui
        UICtrl.displayBudget(budget);
    };

    updatePercentages = function() {
        var percentages;
        // 1. Calculate Percentages
        budgetCtrl.calculatePercentages();

        // 2. Reade percentages from the budget controller
        percentages = budgetCtrl.getPercentages();

        // 3. Update the UI with the new percentages
        UICtrl.displayPercentages(percentages);
    };

    ctrlAddItem = function() {
        var input, newItem;

        // 1. Get the input data
        input = UICtrl.getInput();

        if(input.description !== "" && !isNaN(input.value) && input.value > 0){
            // 2. Add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // 3. Add the new item to the UI
            UICtrl.addListItem(newItem, input.type);

            // 4. Clear all fields
            UICtrl.clearFields();

            // 5. Calculate n display the budget on the ui
            updateBudget();

            // 6. Calculate n update percentages
            updatePercentages();
        }
    };

    ctrlAddLocal = function() {
        var input;

        input = UICtrl.getInput();
        budgetCtrl.addLocal(input.type);
        
        // Retrieving the data structure, and the UICtrl can have access
        UICtrl.localItems(budgetCtrl.data());

        
    };

    ctrlDeleteItem = function(event) {
        var itemID, spliID, type, ID;

        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if(itemID) {

            // inc-1
            splitID = itemID.split('-');
            type = splitID[0];
            ID = splitID[1];
            numberID = parseInt(ID);

            // 1. Delete the item from the data structure
            budgetCtrl.deleteItem(type, numberID);

            // 2. Delete the item from the ui
            UICtrl.deleteListItem(itemID);

            // 3. Update and show the new budget
            updateBudget();

            // 4. Calculate n update percentages
            updatePercentages();
        }
    }

    return{
        init: function() {
            console.log('Application has started.');
            setupEventListeners();
            UICtrl.displayMonth();
            UICtrl.displayBudget({
                totalInc: 0,
                totalExp: 0,
                budget: 0,
                //percentage: -1
            });
            UICtrl.localItems();
        }
    }

})(budgetController, UIController);

controller.init();
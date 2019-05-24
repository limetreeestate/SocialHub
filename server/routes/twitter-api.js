/*jshint esversion: 6 */
const express = require("express");
const Twit = require("twit");
const support = require("./support");
const bodyParser = require("body-parser");
const _request = require("request");
const Twitter = require("./twitter-premium-search");

const router = express.Router();
/* //Applicaation only config
const config = {
    consumer_key:   'um6jF7ckNjIYv1x1RDzK6Icmj',
    consumer_secret: 'T20pITV3BQalhkYHQhWnq8BKyepW5peqZG9s1IB7JvkfMEPfPb',
    app_only_auth: true
};
//Initialize application-only twitter
let twit = new Twit(config);
//Middleware to use json related features in the server
router.use(bodyParser.json());
//Twitter standard API search using Twit
router.post("/search", support.verifyUser, (request, response) => {
    delete request.verified;
    delete request.userID;
    delete request.headers.authorization;
    const req = request.body;
    console.log(req)
    //params that are passed as seperate fields
    const params = {
        q: req.q,
        count: 100,
        result_type: req.result_type,
        until: req.until
    };
    //Append filter params that are entered in the query
    const keys = Object.keys(req)
    keys.forEach(element => {
        const field = req[element]
        if (field === true) {
            params.q += " filter:" + element;
        }
    });
    console.log(params)
    twit.get('search/tweets', params, (err, data, res) => {
        response.send(data.statuses);
    });
}); */
//Middleware to use json related features in the server
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

let twitter = new Twitter();

router.post("/search", support.verifyUser, (request, response) => {
    delete request.userID;
    delete request.headers.authorization;
    twitter.search(request.body, (err, data, res) => {
        if (err){
            response.json(err);
        }
        else {
            response.json(JSON.parse(data.body).results);
        }
    });
});

router.get("/rate", (request, response) => {
    twitter.getRateLimit((err, data, res) => {
        response.json(JSON.parse(data.body));
    });
});

module.exports = router; 
/**1934) Born to Be Bad [Bad Mikki]\

(1963)\

(1963) Tystnaden\

(1966) Nattlek [Night Games]\

(1969) Cuore di Mamma [Mother&amp;#39;s Heart][Сердце мамы]\

(1971) Friends\

(1971) Le souffle au coeur [Murmur of the Heart]\

(1971) Sweet Sweetback&amp;#39;s Baadasssss Song\

(1971) Tomato Kecchappu Kotei\

(1971) Viva la muerte [Long Live Death]\

(1972) Das goldene Ding [Золотое руно]\

(1972) Diabolica malicia [Night Child][What the Peeper Saw]\

(1972) Non si sevizia un paperino [Don&amp;#39;t Torture A Duckling]\

(1972) Schulmadchen-Report 3 Was Eltern nicht mal ahnen\

(1973) Fruhreifen-Report [14 and Under]\

(1973) Jeremy\

(1973) J&amp;#39;irai comme un cheval fou\

(1973) Malizia\

(1973) Mischievous Nymphs - Fruhreifen-Report\

(1973) Rewizja osobista\

(1973) The Sensuous Sicilian\

(1973) Was Schulmadchen verschweigen [Secrets of Sweet Sixteen](Christina Lindberg)\

(1974) Cugini carnali\

(1974) La prima volta sull&amp;#39;erba [The First Time on the Grass][Love Under the Elms]\

(1974) Peccato Veniale\

(1974) Sweet Movie\

(1975) Innocenza e turbamento\

(1975) La Collegiale\

(1975) Le dolci zie\

(1975) L&amp;#39;insegnante [Учительница]\

(1975) Lover boy (Grazie… nonna) (Edwige Fenech)\

(1975) Private Lessons [Lezioni private]\

(1976) La marge [The Margin]\

(1977) L&amp;#39;une chante, l&amp;#39;autre pas [One Sings, the Other Doesn&amp;#39;t]\

(1977) Mi primer pecado\

(1977) Nene\

(1977) Spielen wir Liebe [Maladolescenza][Распутное детство]\

(1978) Moritz, lieber Moritz\

(1978) Preparez vos mouchoirs (Carole_Laure)\

(1979) Die Blechtrommel [The Tin Drum][LE TAMBOUR]\

(1979) Kramer vs. Kramer\

(1979) La Luna\

(1980) Barnens o [Children&amp;#39;s Island][Детский остров]\

(1980) Le voyage en douce\

(1980) Secrets d&amp;#39;adolescentes [Le segrete esperienze di Luca e Fanny]\

(1980) Tendres Cousines\

(1981) Bad Girls\

(1981) Eros, O Deus do Amor [Эрос, бог любви]\

(1981) Jen si tak trochu pisknout [Just Whistle a Little]\

(1981) La Disubbidienza [Непокорность]\

(1981) Les folies d&amp;#39;Elodie\

(1981) Pixote A Lei do Mais Fraco\

(1981) Private lessons [Частные уроки]\

(1981) Twee Vorstinnen En Een Vorst\

(1981) Zombie 3 [Le notti del terrore] [Burial Ground The Nights of Terror]\

(1982) Amor Estranho Amor [Love strange love]\

(1982) Bekenntnisse des Hochstaplers Felix Krull [Confessions of Felix Krull]\

(1982) Dulces horas\

(1982) Pecado Horizontal\

(1982) Piso Pisello\

(1983) Esperame Mucho\

(1983) Kanda-gawa inran senso [Kandagawa Wars]\

(1984) They&amp;#39;re Playing with Fire (Sybil Danning)\

(1984) Vive les femmes! [Unter Frauen]\

(1985) Brennende blomster [Burning Flowers]\

(1985) Hubo sa dilim\

(1985) Piccoli fuochi [Little flames][Маленький огонь]\

(1985) Playa prohibida\

(1985) Yo, &amp;#39;El Vaquilla&amp;#39;\

(1986) A tree without leaves [Japan]\

(1986) Alex Hole Ahava\

(1986) Diavolo in corpo [Дьявол во плоти]\

(1986) El ano de las luces\

(1986) Raku-yo-ju [Tree without leaves][Дерево без листьев]\

(1986) Senza vergogna [One-Sided Passion]\

(1987) Il est genial papy!\

(1987) Point de fuite\ */
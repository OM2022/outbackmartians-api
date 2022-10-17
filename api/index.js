
const app = require('express')();

const jsonData = require("./metadata.json")

const cachedData = {}

jsonData.forEach(opt => {
    let id = opt.name.substr(opt.name.indexOf("#") + 1)
    cachedData[id] = opt
})

app.get('/api', (req, res) => {
    const path = `/metadata/:tokenId`;
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

app.get("/metadata/:tokenId", async (req, res) => {
    try {
        if(req.params.tokenId > 1) {
            return res.status(200).json({
                error: "This PGC does not exist."
            })
        }
        console.log(req.params.tokenId);
        let data = req.params.tokenId === "0"
            ?
            {
                "image": "ipfs://Qmek2skbPJ1fmsWGkv61tYd7hncWRBFE11tFRHPZjvDMUJ",
                "name": "Black Portal Gas Cannon",
                "description": "The Portal Gas Cannon (PGC) is a collection of 2500 3D NFTs. The first and perhaps the most ingenious invention from the Mad Scientist Dr. Alberto, who lives onboard the Outback Martians Mothership.",
                "attributes": []
            } :
            {
                "image": "ipfs://QmVu9R6kdYGuMHK2hzx1Zjox7DAGcYFxyqUcQrvhUxqGtT",
                "name": "Gold Portal Gas Cannon",
                "description": "The Portal Gas Cannon (PGC) is a collection of 2500 3D NFTs. The first and perhaps the most ingenious invention from the Mad Scientist Dr. Alberto, who lives onboard the Outback Martians Mothership.",
                "attributes": []
            }
        res.status(200).json(data)
    } catch (e) {
        console.log(e)
        res.status(200).json({
            error: "The Portal Gun you requested does not exist."
        })
    }
})

app.get("/metadata/martians/:tokenId", async (req, res) => {
    try {
        /*if(req.params.tokenId > 1) {
            return res.status(200).json({
                error: "The Martian you requested does not exist."
            })
        }*/
        res.status(200).json(cachedData[req.params.tokenId])
    } catch (e) {
        console.log(e)
        res.status(200).json({
            error: "The Martian you requested does not exist."
        })
    }
})
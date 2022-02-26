require("dotenv").config()
const express = require("express")

const app = express().set('port', process.env.PORT || 3000)

app.get("/metadata/:tokenId", async (req, res) => {
    try {
        if(req.params.tokenId > 1) {
            return res.status(200).json({
                error: "The item you requested does not exist in the Zombie Trading Post."
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
        res.status(200).json({
            "image": "ipfs://Qmek2skbPJ1fmsWGkv61tYd7hncWRBFE11tFRHPZjvDMUJ",
            "name": "Black Portal Gas Cannon",
            "description": "The Portal Gas Cannon (PGC) is a collection of 2500 3D NFTs. The first and perhaps the most ingenious invention from the Mad Scientist Dr. Alberto, who lives onboard the Outback Martians Mothership.",
            "attributes": []
        })
    } catch (e) {
        console.log(e)
        res.status(200).json({
            error: "The Portal Gun you requested does not exist."
        })
    }
})
app.listen(app.get('port'), () => console.log("Listening on port {}...", app.get('port')))
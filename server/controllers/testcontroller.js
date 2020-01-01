module.exports = {

    connection: async (req, res, next) => {
        res.status(200).json({ connection: 'connection to backend successful!' })
    }
}
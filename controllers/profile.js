const handleProfile = (req, res, db) => {
	const { id } = req.params;
	db.select('*').from('users')
	.where({id})
	.then(user => {
		if (user.length){
			return res.status(200).json(user[0]);
		}
		else {
			return res.status(400).json('Not Found');
		}
	})
	.catch(err => res.status(400).json('User Not Found'));
}

module.exports = {
	handleProfile
}
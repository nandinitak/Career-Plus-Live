const DOMAIN = process.env.EMAIL_DOMAIN;

const EMAIL_ADDRESS = {
	EMAIL_VERIFICATION: `no-reply@${DOMAIN}`,
};

module.exports = EMAIL_ADDRESS;

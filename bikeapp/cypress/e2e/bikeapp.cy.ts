describe('Basic tests for bikeapp', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000');
	});

	it('Navigation to home page works', function () {
		cy.visit('http://localhost:3000');
	});

	it('Navigation to journeys page works', function () {
		cy.visit('http://localhost:3000/journeys');
	});

	it('Navigation to stations page works', function () {
		cy.visit('http://localhost:3000/stations');
	});

	it('Navigation to single station page works', function () {
		cy.visit('http://localhost:3000/stations/1');
	});
});

describe('Stations Page Component', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000/stations');
	});

	it('should render the list of stations', function () {
		cy.get('#station-list #station').should('have.length.gt', 0);
		cy.get('#station-list #station').should('have.length', 10);
	});

	it('should navigate to the next page when "Next" button is clicked', function () {
		cy.url().then((url) => {
			// Get the current page number
			const page = new URL(url).searchParams.get('page');
			const initialPageNumber = page ? parseInt(page) : 1;

			// Click on the "Next" button
			cy.contains('Next').click();

			// Verify that the URL has been updated with the correct page number
			cy.url().should('include', `page=${initialPageNumber + 1}`);
		});
	});

	it('should navigate to the previous page when "Prev" button is clicked', function () {
		cy.visit('http://localhost:3000/stations/?page=10');

		cy.url().then((url) => {
			// Get the current page number
			const page = new URL(url).searchParams.get('page');
			const initialPageNumber = page ? parseInt(page) : 1;

			// Click on the "Prev" button
			cy.contains('Prev').click();

			// Verify that the URL has been updated with the correct page number
			cy.url().should('include', `page=${initialPageNumber - 1}`);
		});
	});

	it('should navigate to single station page when station is clicked', function () {
		// Check that the 7th element exists and is clickable
		cy.get('#station-list #station').eq(6).should('exist').click();

		// Check that we landed on the correct URL
		cy.url().should('include', '/stations/7');
	});
});

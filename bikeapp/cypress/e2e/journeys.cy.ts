describe('Journeys Page Component', () => {
	beforeEach(() => {
		// render the journeys page
		cy.visit('http://localhost:3000/journeys');
	});

	it('should render the table with journey data', function () {
		// Ensure that the table is rendered
		cy.get<HTMLTableElement>('table').should('exist');

		// Ensure that there are journey rows in the table
		cy.get<HTMLTableRowElement>('tbody tr').should('have.length.gt', 0);

		// Ensure that the full table contains 10 elements
		cy.get<HTMLTableRowElement>('tbody tr').should('have.length', 10);
	});

	it('should navigate to the next page when "Next" button is clicked', function () {
		cy.url().then((url) => {
			// Get the initial page number
			const page = new URL(url).searchParams.get('page');
			const initialPageNumber = page ? parseInt(page) : 1;
			cy.contains('Next').click();

			// Verify that the url has been updated with the correct page number
			cy.url().should('include', `page=${initialPageNumber + 1}`);

			// Sanity check
			cy.contains('Next').click();
			cy.contains('Next').click();

			cy.url().should('include', `page=${initialPageNumber + 2}`);
		});
	});

	it('should navigate to the previous page when "Prev" button is clicked', function () {
		// Get a page past the first one
		cy.visit('http://localhost:3000/journeys/?page=10');

		cy.url().then((url) => {
			// Get the page number
			const page = new URL(url).searchParams.get('page');
			const initialPageNumber = page ? parseInt(page) : 1;

			// Check if the initial page number is greater than 1
			if (initialPageNumber > 1) {
				cy.contains('Prev').click();

				// Verify that the url has been updated with the correct page number
				cy.url().should('include', `page=${initialPageNumber - 1}`);
			} else {
				// If the page number is < 1, "Prev" should not be rendered
				cy.contains('Prev').should('not.exist');
			}
		});
	});
});

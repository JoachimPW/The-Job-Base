import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import Location from './Location';
import {BrowserRouter as Router} from "react-router-dom";


it('renders App with header text', () => {
    const comp =
        <Router>
            <Location locations={locationsTestData} categories={categoriesTestData} jobs={jobsTestData}/>
        </Router>;
    const {getByText} = render(comp);
    expect(getByText("Nordjylland (0)")).toBeInTheDocument();

});
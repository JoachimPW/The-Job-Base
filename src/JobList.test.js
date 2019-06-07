import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import JobList from './JobList';
import {BrowserRouter as Router} from "react-router-dom";


it('renders App with header text', () => {
    const comp =
        <Router>
            <JobList category={"Healthcare"} location={"Midtjylland"} jobs={jobsTestData}/>
        </Router>;
    const {getByText} = render(comp);
    expect(getByText('Doctor')).toBeInTheDocument();

});
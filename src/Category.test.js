import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import Category from './Category';
import {BrowserRouter as Router} from "react-router-dom";


it('renders App with header text', () => {
    const comp =
        <Router>
            <Category categories={categoriesTestData} jobs={jobsTestData}/>
        </Router>;
    const {getByText} = render(comp);
    expect(getByText("Service (1)")).toBeInTheDocument();

});
import React from 'react';
import HomeComponent from '../components/HomeComponent';
import TableSample from '../components/TableSample';
import CsvUploader from '../components/CsvUploader';
import ModalComponent from '../components/ModalComponent';

const HomeContainer = () => {
    return (
        <div className="home-container">
            This is the wrapper
            <ModalComponent />
            <CsvUploader />
            <HomeComponent />

        </div>
    )
}

export default HomeContainer;
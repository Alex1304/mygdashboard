import React from 'react';
import './DailyTable.css';

import Button from '../Button';

const DailyTable = ({ type, dailies, onDelete }) => (
    <div className="table-responsive">
        <table className={"DailyTable table table-striped " + (type ? "table-dark" : "table-light")}>
            <thead>
                <tr>
                    <th scope="col">LevelID</th>
                    <th scope="col">Name/Creator</th>
                    <th scope="col">Start</th>
                    <th scope="col">End</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {dailies.map((daily, i) => (
                    <tr key={i}>
                        <th scope="row">{daily.level.id}</th>
                        <td>{daily.level.name} by {daily.level.creator.name}</td>
                        <td>{daily.periodStart}</td>
                        <td>{daily.periodEnd}</td>
                        <td><Button type="danger" text="Delete" onClick={() => onDelete(daily.index)} /></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

DailyTable.defaultProps = {
    type: "light",
    onClick: () => {}
};

export default DailyTable;

import React from 'react';
import './DailyTable.css';

import Button from '../Button';
import InputGroup from '../InputGroup';
import * as utils from '../../utils.js';

const DailyTable = ({ type, dailies, onDelete, onAdd, onReload }) => (
    <div className="DailyTable">
        <div className="DailyTable-bar">
            <div className="DailyTable-addWrapper">
                <InputGroup inputID={"add-daily-" + type} placeholder="Add a level..." groupText="+" />
                <Button type="success" text="Add" onClick={() => onAdd(document.getElementById('add-daily-' + type).value, type)} />
            </div>
            <div className="DailyTable-reloadWrapper">
                <Button text="Reload" onClick={() => onReload(type)} />
            </div>
        </div>
        <div className="table-responsive">
            <table className={"table " + (type ? "table-dark" : "table-light")}>
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
                        <tr key={i} className={"DailyTable-row" + (i === 0 ? " table-active" : "")}>
                            <th className="align-middle" scope="row">{daily.level.id} {i === 0 && <span className="DailyTable-current">[current]</span>}</th>
                            <td className="align-middle"><span className="DailyTable-levelName">{daily.level.name}</span> by {daily.level.creator.name}</td>
                            <td className="align-middle">{utils.formatDate(daily.period_start)}</td>
                            <td className="align-middle">{utils.formatDate(daily.period_end)}</td>
                            <td className="align-middle"><Button type="danger btn-sm" text="Delete" onClick={() => onDelete(daily.index, type)} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

DailyTable.defaultProps = {
    type: "light",
    onClick: () => {}
};

export default DailyTable;

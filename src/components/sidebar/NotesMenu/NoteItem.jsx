import React from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import moment from 'moment';

export default function NoteItem(props) {
    const calculateDays = () => {
        const { date } = props;
        const miliseconds = Date.now() - new Date(date);
        const diff = moment(Date.now()).diff(new Date(date));
        const days = miliseconds / (1000 * 60 * 60 * 24);
        if (moment.duration(diff).asDays() > 1)
            return `${Math.floor(moment.duration(diff).asDays())}d`;
        else if (moment.duration(diff).asHours() > 1)
            return `${Math.floor(moment.duration(diff).asHours())}h`;
        else if (moment.duration(diff).asMinutes() > 1)
            return `${Math.floor(moment.duration(diff).asMinutes())}m`;
        else return `${Math.floor(moment.duration(diff).asSeconds())}s`;
    };
    return (
        <Link to={`/notes/${props.id}`}>
            <li
                onMouseEnter={props.onMouseEnter}
                onMouseLeave={props.onMouseOut}
                onClick={props.onClick}
                className={classNames(
                    'p-5 rounded-xl flex justify-between mt-2 transition-all duration-300 cursor-pointer w-full',
                    {
                        'bg-selected-note': props.active,
                    }
                )}
            >
                <div
                    className={classNames('flex items-center gap-4 w-3/4', {
                        'gap-3': props.icon,
                    })}
                >
                    <span
                        className={classNames(
                            'text-lg text-orange-400 font-semibold',
                            {
                                'text-xs': props.icon,
                            }
                        )}
                    >
                        {props.icon ? props.icon : '#'}
                    </span>
                    <p className="text-sm block truncate">{props.name}</p>
                </div>
                <div className="text-2xs flex items-center gap-1 opacity-80">
                    <span>{<FaPencilAlt />}</span>
                    <span>{calculateDays()}</span>
                </div>
            </li>
        </Link>
    );
}

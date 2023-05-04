import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filtersActions, filtersState } from '../../features';
import { IFilter } from '../../models';

export function useFilter (type : string)
{
    const dispach = useDispatch();
    const filters = useSelector(filtersState);

    const filter = filters[type];

    function setFilter (filter : IFilter)
    {
        dispach(filtersActions.setFilter({type, filter}))
    }

    return [filter, setFilter];
}
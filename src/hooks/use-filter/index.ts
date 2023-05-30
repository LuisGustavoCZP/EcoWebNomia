import { useDispatch, useSelector } from 'react-redux';
import { filtersActions, filtersState } from '../../features';

export function useFilter (type : string)
{
    const dispach = useDispatch();
    const filters = useSelector(filtersState);

    const filter = filters[type];

    function setFilter (filterType : string, value : string)
    {
        const newFilter = Object.assign({}, filter);
        if(value === "any" || !value) delete newFilter[filterType];
        else newFilter[filterType] = value;
            
        dispach(filtersActions.setFilter({type, filter:newFilter}))
    }

    return [filter, setFilter];
}